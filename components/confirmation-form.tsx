"use client";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { BadgeCheck, Loader2 } from "lucide-react";
import { useMemo, useState } from "react";
import { db } from "@/lib/firebase";
import { DEFAULT_GUEST_NAME, formatGuestName } from "@/lib/guest-name";
import { siteConfig } from "@/lib/site";

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
        "Não consegui registrar sua presença agora. Tente novamente em instantes.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="relative flex flex-col items-center justify-center gap-4 py-8" id="confirmar">
      <div className="rounded-full border border-white/70 bg-white/75 p-2 shadow-[0_20px_70px_rgba(62,51,39,0.12)] backdrop-blur">
        <button
          type="button"
          disabled={loading || confirmed}
          onClick={handleConfirm}
          className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-blue-700 px-7 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-80 sm:px-9"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <BadgeCheck className="h-4 w-4" />}
          {loading ? "Guardando..." : confirmed ? "Presença guardada" : "Confirmar presença"}
        </button>
      </div>

      {status === "success" ? (
        <p role="status" aria-live="polite" className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-center text-sm font-semibold text-blue-900 shadow-sm">
          Sua presença está confirmada para celebrar o primeiro aninho do {siteConfig.celebrantName}!
        </p>
      ) : null}

      {status === "error" ? (
        <p role="alert" className="max-w-sm rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3 text-center text-sm font-semibold text-blue-900 shadow-sm">
          {errorText}
        </p>
      ) : null}
    </section>
  );
}
