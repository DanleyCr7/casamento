"use client";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { BadgeCheck, Loader2 } from "lucide-react";
import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { db } from "@/lib/firebase";
import { DEFAULT_GUEST_NAME, formatGuestName } from "@/lib/guest-name";

type ConfirmationStatus = "idle" | "success" | "error";

function normalizeGuestName(value: string | null) {
  const normalized = formatGuestName(value ?? "");
  return normalized.length > 0 ? normalized : DEFAULT_GUEST_NAME;
}

export function ConfirmationSection({ guestName }: { guestName: string }) {
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [status, setStatus] = useState<ConfirmationStatus>("idle");
  const [errorText, setErrorText] = useState("");

  const guestLabel = useMemo(() => normalizeGuestName(guestName), [guestName]);

  async function handleConfirm() {
    setLoading(true);
    setStatus("idle");
    setErrorText("");

    try {
      await addDoc(collection(db, "confirmacoes"), {
        nome: guestLabel,
        convitePara: guestLabel,
        origem: "convite",
        criadoEm: serverTimestamp(),
      });

      setConfirmed(true);
      setStatus("success");
    } catch (error) {
      console.error("Erro ao registrar confirmação no Firebase:", error);
      setConfirmed(false);
      setStatus("error");
      setErrorText(
        error instanceof Error
          ? `Não consegui registrar agora: ${error.message}`
          : "Não consegui registrar agora. Tente de novo em instantes.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="relative flex flex-col items-center justify-center gap-4 py-8" id="confirmar">
      {confirmed ? (
        <div className="confirmation-hearts" aria-hidden="true">
          {Array.from({ length: 22 }, (_, index) => (
            <span
              key={index}
              style={
                {
                  "--heart-delay": `${index * 75}ms`,
                  "--heart-drift": `${index % 2 === 0 ? "-4.5rem" : "4.5rem"}`,
                  left: `${8 + ((index * 17) % 84)}%`,
                } as CSSProperties
              }
            >
              ♥
            </span>
          ))}
        </div>
      ) : null}

      <div className="rounded-full border border-white/70 bg-white/75 p-2 shadow-[0_20px_70px_rgba(62,51,39,0.12)] backdrop-blur">
        <button
          type="button"
          disabled={loading || confirmed}
          onClick={handleConfirm}
          className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-emerald-900 px-7 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-80 sm:px-9"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <BadgeCheck className="h-4 w-4" />}
          {loading ? "Guardando..." : confirmed ? "Presença confirmada" : "Confirmar presença"}
        </button>
      </div>

      {status === "success" ? (
        <p className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-center text-sm font-semibold text-emerald-900 shadow-sm">
          Sua presença foi guardada com carinho.
        </p>
      ) : null}

      {status === "error" ? (
        <p className="max-w-sm rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-center text-sm font-semibold text-rose-900 shadow-sm">
          {errorText}
        </p>
      ) : null}
    </section>
  );
}
