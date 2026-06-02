"use client";

import { addDoc, collection, onSnapshot, serverTimestamp } from "firebase/firestore";
import { BadgeCheck, Loader2, Send, Users } from "lucide-react";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { db } from "@/lib/firebase";
import { DEFAULT_GUEST_NAME, formatGuestName } from "@/lib/guest-name";

type ConfirmationSummary = {
  entries: number;
  people: number;
};

function normalizeGuestName(value: string | null) {
  const normalized = formatGuestName(value ?? "");
  return normalized.length > 0 ? normalized : DEFAULT_GUEST_NAME;
}

export function ConfirmationSection({ guestName }: { guestName: string }) {
  const initialName = guestName === DEFAULT_GUEST_NAME ? "" : guestName;
  const [name, setName] = useState(initialName);
  const [people, setPeople] = useState(1);
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [summary, setSummary] = useState<ConfirmationSummary>({ entries: 0, people: 0 });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "confirmacoes"), (snapshot) => {
      let totalPeople = 0;

      snapshot.forEach((docSnapshot) => {
        const data = docSnapshot.data() as { acompanhantes?: unknown };
        const rawPeople = Number(data.acompanhantes);
        totalPeople += Number.isFinite(rawPeople) && rawPeople > 0 ? rawPeople : 1;
      });

      setSummary({
        entries: snapshot.size,
        people: totalPeople,
      });
    });

    return () => unsubscribe();
  }, []);

  const guestLabel = useMemo(() => normalizeGuestName(guestName), [guestName]);

  useEffect(() => {
    setName(guestName === DEFAULT_GUEST_NAME ? "" : guestName);
  }, [guestName]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = name.trim();
    if (!trimmedName) {
      setStatus("error");
      setErrorText("Escreva seu nome para deixar essa confirmação guardada.");
      return;
    }

    const totalPeople = Math.max(1, Number.isFinite(people) ? Math.floor(people) : 1);

    setLoading(true);
    setStatus("idle");
    setErrorText("");

    try {
      await addDoc(collection(db, "confirmacoes"), {
        nome: trimmedName,
        acompanhantes: totalPeople,
        telefone: phone.trim(),
        mensagem: message.trim(),
        convitePara: guestLabel,
        origem: "convite",
        criadoEm: serverTimestamp(),
      });

      setStatus("success");
      setName(initialName);
      setPeople(1);
      setPhone("");
      setMessage("");
    } catch {
      setStatus("error");
      setErrorText("Não consegui registrar agora. Tente de novo em instantes.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded-[2.25rem] border border-emerald-900/10 bg-[#fbf7f0] p-6 shadow-[0_30px_100px_rgba(62,51,39,0.08)] sm:p-8" id="confirmar">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-900/10 bg-white/75 px-4 py-1 text-[11px] uppercase tracking-[0.35em] text-emerald-900/70 backdrop-blur">
            <BadgeCheck className="h-3.5 w-3.5" />
            Confirmação
          </div>
          <div className="space-y-3">
            <h2 className="text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
              Deixe sua presença registrada com carinho.
            </h2>
            <p className="text-base leading-7 text-stone-600 sm:text-lg">
              Cada nome aqui guardado ajuda a sentir de perto quem vai celebrar esse dia com a gente.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-stone-200 bg-white/80 p-5 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-semibold text-stone-800">
                <Users className="h-4 w-4 text-emerald-700" />
                Pessoas confirmadas
              </div>
              <p className="mt-3 text-3xl font-semibold tracking-tight text-stone-900">
                {summary.people.toLocaleString("pt-BR")}
              </p>
            </div>

            <div className="rounded-3xl border border-stone-200 bg-white/80 p-5 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-semibold text-stone-800">
                <Send className="h-4 w-4 text-amber-700" />
                Registros
              </div>
              <p className="mt-3 text-3xl font-semibold tracking-tight text-stone-900">
                {summary.entries.toLocaleString("pt-BR")}
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-stone-200 bg-white/80 p-5 shadow-sm">
            <p className="text-sm font-semibold text-stone-800">Para {guestLabel}</p>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              Esse convite pode ganhar o seu nome pela URL. Exemplo: `?nome=Flávia`.
            </p>
          </div>
        </div>

        <form className="rounded-[2rem] border border-white/70 bg-white/85 p-5 shadow-[0_20px_70px_rgba(62,51,39,0.1)] backdrop-blur sm:p-6" onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-stone-800">Seu nome</span>
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder={`Ex.: ${guestLabel}`}
                className="rounded-2xl border border-stone-200 bg-white px-4 py-3 text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-emerald-700"
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-stone-800">Quantas pessoas vão?</span>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={people}
                  onChange={(event) => setPeople(Number(event.target.value) || 1)}
                  className="rounded-2xl border border-stone-200 bg-white px-4 py-3 text-stone-900 outline-none transition focus:border-emerald-700"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-semibold text-stone-800">Telefone</span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="Opcional"
                  className="rounded-2xl border border-stone-200 bg-white px-4 py-3 text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-emerald-700"
                />
              </label>
            </div>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-stone-800">Mensagem</span>
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Deixe uma palavra de carinho, se quiser."
                rows={4}
                className="rounded-2xl border border-stone-200 bg-white px-4 py-3 text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-emerald-700"
              />
            </label>

            {status === "success" ? (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
                Sua presença foi guardada com carinho.
              </div>
            ) : null}

            {status === "error" ? (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900">
                {errorText}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <BadgeCheck className="h-4 w-4" />}
              {loading ? "Guardando..." : "Confirmar presença"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
