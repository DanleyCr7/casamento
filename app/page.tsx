"use client";

import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  ChevronRight,
  CircleDollarSign,
  Copy,
  Gift,
  Heart,
  Clock3,
  MapPinned,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { CopyButton } from "@/components/copy-button";
import { ConfirmationSection } from "@/components/confirmation-form";
import { buildPixPayload } from "@/lib/pix";
import { siteConfig } from "@/lib/site";

function publicAsset(path: string) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function formatTimeLeft(target: string): TimeLeft {
  const difference = new Date(target).getTime() - Date.now();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const totalSeconds = Math.floor(difference / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds };
}

function StatChip({
  value,
  label,
}: {
  value: string | number;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-white/70 bg-white/75 px-4 py-3 shadow-[0_14px_50px_rgba(77,67,50,0.08)] backdrop-blur">
      <div className="text-2xl font-semibold tracking-tight text-stone-900">{value}</div>
      <div className="text-[11px] uppercase tracking-[0.28em] text-stone-500">{label}</div>
    </div>
  );
}

function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-2xl space-y-3">
      <div className="inline-flex items-center gap-2 rounded-full border border-emerald-900/10 bg-white/70 px-4 py-1 text-[11px] uppercase tracking-[0.35em] text-emerald-900/70 backdrop-blur">
        <Sparkles className="h-3.5 w-3.5" />
        {eyebrow}
      </div>
      <h2 className="text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
        {title}
      </h2>
      <p className="text-base leading-7 text-stone-600 sm:text-lg">{description}</p>
    </div>
  );
}

function EnvelopeCard({ guestName }: { guestName: string }) {
  return (
    <section className="flex min-h-[calc(100vh-3rem)] items-center justify-center py-8">
      <div className="w-full max-w-5xl">
        <input id="invite-open" type="checkbox" className="invite-toggle peer sr-only" />
        <label
          htmlFor="invite-open"
          className="envelope-stage group relative mx-auto block w-full max-w-4xl cursor-pointer text-left"
        >
          <span className="sr-only">Abrir convite</span>
          <span className="envelope-shadow" />
          <span className="envelope-card">
            <span className="envelope-invite">
              <span className="relative grid h-full gap-4 overflow-hidden rounded-[1.35rem] border border-[#d9c79c] bg-[#fffdf8] p-5 shadow-[0_20px_70px_rgba(45,35,25,0.16)] sm:grid-cols-[0.85fr_1.15fr] sm:p-7">
                <span className="absolute inset-x-8 top-5 h-px bg-[#c9ad74]" />
                <span className="relative min-h-56 overflow-hidden rounded-[1rem]">
                  <Image
                    src={publicAsset("/images/couple-portrait.jpg")}
                    alt="Foto do casal"
                    fill
                    priority
                    className="object-cover"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-stone-950/35 to-transparent" />
                  <span className="absolute bottom-4 left-4 font-script text-5xl leading-none text-white">
                    {siteConfig.coupleNames}
                  </span>
                </span>
                <span className="flex flex-col justify-center gap-5 py-2">
                  <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#f4ead7] px-3 py-1 text-[11px] uppercase tracking-[0.35em] text-[#7c6337]">
                    <Heart className="h-3.5 w-3.5" />
                    Nosso convite
                  </span>
                  <span className="inline-flex w-fit items-center rounded-full border border-[#d9c79c] bg-white/70 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-[#8b6f35]">
                    Para {guestName}
                  </span>
                  <span className="font-script text-6xl leading-none text-[#8b6f35] sm:text-7xl">
                    {siteConfig.coupleNames}
                  </span>
                  <span className="max-w-md text-base leading-7 text-stone-700">
                    É com imensa alegria que convidamos você para viver conosco esse dia tão sonhado.
                  </span>
                  <span className="grid gap-3 sm:grid-cols-2">
                    <StatChip value={siteConfig.eventDateLabel} label="Data" />
                    <StatChip value={siteConfig.eventTimeLabel} label="Horário" />
                  </span>
                </span>
              </span>
            </span>
            <span className="envelope-back">
              <span className="envelope-floral envelope-floral-left" />
              <span className="envelope-floral envelope-floral-right" />
              <span className="envelope-flap envelope-flap-left" />
              <span className="envelope-flap envelope-flap-right" />
              <span className="envelope-flap envelope-flap-bottom" />
              <span className="envelope-flap envelope-flap-top" />
              <span className="absolute left-1/2 top-8 z-10 -translate-x-1/2 rounded-full border border-white/50 bg-white/35 px-4 py-1 text-[11px] uppercase tracking-[0.3em] text-white backdrop-blur-sm">
                Para {guestName}
              </span>
              <span className="wax-seal">
                <span className="font-script text-4xl leading-none">J F</span>
              </span>
            </span>
          </span>
        </label>

        <div className="envelope-caption mt-7 text-center">
          <p className="font-script text-5xl leading-none text-[#8b6f35] sm:text-6xl">
            {siteConfig.coupleNames}
          </p>
          <p className="mt-2 text-[11px] uppercase tracking-[0.35em] text-stone-500">
            <span className="caption-closed">Toque no selo e descubra esse amor</span>
            <span className="caption-open">Nosso dia começou</span>
          </p>
        </div>
      </div>
    </section>
  );
}

function PixSection() {
  const pixPayload = useMemo(
    () =>
      buildPixPayload({
        key: siteConfig.pix.key,
        name: siteConfig.pix.name,
        city: siteConfig.pix.city,
        txid: siteConfig.pix.txid,
        description: siteConfig.pix.description,
      }),
    [],
  );

  return (
    <section className="relative overflow-hidden rounded-[2.25rem] border border-emerald-900/10 bg-[#fbf7f0] p-6 shadow-[0_30px_100px_rgba(62,51,39,0.08)] sm:p-8">
      <div className="absolute right-0 top-0 h-44 w-44 rounded-full bg-emerald-200/30 blur-3xl" />
      <div className="absolute -bottom-8 left-0 h-40 w-40 rounded-full bg-amber-200/25 blur-3xl" />

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-6">
          <SectionTitle
            eyebrow="Um carinho"
            title="Se quiser abençoar nosso começo, o Pix está aqui com amor."
            description="Sua presença já é o maior presente. Se desejar, um gesto de carinho ficará guardado com muito afeto."
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-stone-200 bg-white/80 p-5 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-semibold text-stone-800">
                <CircleDollarSign className="h-4 w-4 text-emerald-700" />
                Pix
              </div>
              <p className="mt-3 break-all text-xl font-semibold tracking-wide text-stone-900">
                {siteConfig.pix.key}
              </p>
              <div className="mt-4">
                <CopyButton value={siteConfig.pix.key} label="Levar carinho" className="w-full bg-emerald-800 text-white hover:bg-emerald-700" />
              </div>
            </div>

            <div className="rounded-3xl border border-stone-200 bg-white/80 p-5 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-semibold text-stone-800">
                <Gift className="h-4 w-4 text-amber-700" />
                Nosso carinho
              </div>
              <p className="mt-3 text-base leading-7 text-stone-600">
                Sua presença é o presente mais bonito. Tudo o que vier com carinho será recebido com muito amor.
              </p>
              <div className="mt-4 flex items-center gap-2 rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
                <Sparkles className="h-4 w-4" />
                Um gesto doce para celebrar esse dia.
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative w-full max-w-[22rem] overflow-hidden rounded-[2rem] border border-white/80 bg-gradient-to-b from-white to-stone-100 p-5 shadow-[0_30px_90px_rgba(62,51,39,0.12)]">
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-emerald-200/60 to-transparent" />
            <div className="relative mx-auto flex aspect-square w-full max-w-[17rem] items-center justify-center rounded-[1.5rem] border border-stone-200 bg-white p-4">
              <div className="absolute inset-6 rounded-[1.25rem] bg-[radial-gradient(circle_at_center,rgba(165,186,127,0.14),transparent_60%)]" />
              <QRCodeSVG value={pixPayload} size={220} level="M" includeMargin className="h-full w-full" />
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm uppercase tracking-[0.35em] text-stone-500">Um gesto de carinho</p>
              <p className="mt-2 text-base leading-7 text-stone-600">
                Um caminho simples para deixar seu afeto.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => formatTimeLeft(siteConfig.eventDateTime));
  const [guestName, setGuestName] = useState("Você");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const rawName = params.get("nome") ?? params.get("name") ?? params.get("para");
    const trimmedName = rawName?.trim().replace(/\s+/g, " ") ?? "";

    if (trimmedName.length > 0) {
      setGuestName(trimmedName);
    }
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft(formatTimeLeft(siteConfig.eventDateTime));
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <main className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-80">
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-white/70 to-transparent" />
        <div className="absolute bottom-0 left-0 h-56 w-full bg-gradient-to-t from-[#d5c5ac]/35 to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <EnvelopeCard guestName={guestName} />

        <div className="site-after-open animate-site-reveal">
        <header className="flex items-center justify-between rounded-full border border-white/70 bg-white/65 px-4 py-3 shadow-[0_12px_40px_rgba(62,51,39,0.08)] backdrop-blur">
          <div>
            <p className="font-script text-3xl leading-none text-emerald-900">
              {siteConfig.coupleNames}
            </p>
            <p className="text-[11px] uppercase tracking-[0.35em] text-stone-500">
              Nosso convite
            </p>
          </div>
          <a
            href="#confirmar"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800"
          >
            <Heart className="h-4 w-4" />
            Confirmar presença
          </a>
        </header>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="space-y-6">
            <div className="rounded-[2rem] border border-amber-900/10 bg-amber-50/65 px-5 py-4 shadow-[0_16px_60px_rgba(62,51,39,0.08)] backdrop-blur">
              <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.35em] text-stone-500">
                <Clock3 className="h-3.5 w-3.5" />
                Contagem regressiva
              </p>
              <div className="mt-4 grid grid-cols-4 gap-3">
                <StatChip value={timeLeft.days} label="Dias" />
                <StatChip value={timeLeft.hours} label="Horas" />
                <StatChip value={timeLeft.minutes} label="Min" />
                <StatChip value={timeLeft.seconds} label="Seg" />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] border border-white/70 bg-white/75 p-6 shadow-[0_20px_70px_rgba(62,51,39,0.1)] backdrop-blur">
              <SectionTitle
                eyebrow="Nosso dia"
                title="Tudo o que faz esse encontro ser inesquecível."
                description="Uma composição leve, feita para guardar a data, o lugar e o carinho desse momento."
              />

              <div className="mt-8 grid gap-4">
                <div className="flex items-start gap-4 rounded-3xl border border-stone-200 bg-stone-50 p-4">
                  <CalendarDays className="mt-0.5 h-5 w-5 text-emerald-800" />
                  <div>
                    <p className="text-sm font-semibold text-stone-900">Quando nos encontraremos</p>
                    <p className="mt-1 text-sm leading-6 text-stone-600">
                      {siteConfig.eventDateLabel} às {siteConfig.eventTimeLabel}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-3xl border border-stone-200 bg-stone-50 p-4">
                  <MapPinned className="mt-0.5 h-5 w-5 text-amber-800" />
                  <div>
                    <p className="text-sm font-semibold text-stone-900">Onde o amor espera</p>
                    <p className="mt-1 text-sm leading-6 text-stone-600">{siteConfig.venueName}</p>
                    <p className="text-sm leading-6 text-stone-500">{siteConfig.venueAddress}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-3xl border border-stone-200 bg-stone-50 p-4">
                  <MessageCircle className="mt-0.5 h-5 w-5 text-rose-700" />
                  <div>
                    <p className="text-sm font-semibold text-stone-900">Um abraço em palavras</p>
                    <p className="mt-1 text-sm leading-6 text-stone-600">{siteConfig.venueHint}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#confirmar"
                  className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-stone-800"
                >
                  <MessageCircle className="h-4 w-4" />
                  Confirmar presença
                </a>
                <a
                  href="#pix"
                  className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white/85 px-4 py-2 text-sm font-semibold text-stone-800 transition hover:border-stone-400 hover:bg-white"
                >
                  <Gift className="h-4 w-4" />
                  Ver Pix
                </a>
              </div>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 shadow-[0_20px_70px_rgba(62,51,39,0.1)]">
              <div className="grid gap-4 p-4 sm:grid-cols-[0.9fr_1.1fr]">
                <div className="relative overflow-hidden rounded-[1.5rem]">
                  <Image
                    src={publicAsset("/images/couple-selfie.jpg")}
                    alt="Foto do casal sorrindo"
                    width={900}
                    height={1100}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-between rounded-[1.5rem] bg-gradient-to-b from-[#f7f1e7] to-[#ece2d0] p-5">
                  <div className="space-y-4">
                    <p className="font-script text-4xl leading-none text-emerald-900">
                      {siteConfig.coupleNames}
                    </p>
                    <p className="text-sm leading-7 text-stone-700">
                      Criado para guardar a delicadeza desse dia e a doçura de receber cada pessoa querida.
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-2 text-sm text-stone-600">
                    <Sparkles className="h-4 w-4 text-amber-700" />
                    Abra com carinho e deixe-se envolver.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <ConfirmationSection guestName={guestName} />
        </section>

        <section className="mt-10" id="pix">
          <PixSection />
        </section>

        <section className="mt-10 grid gap-4 sm:grid-cols-3">
          {siteConfig.highlights.map((item) => (
            <article
              key={item.title}
              className="rounded-[1.75rem] border border-white/70 bg-white/75 p-5 shadow-[0_18px_60px_rgba(62,51,39,0.08)] backdrop-blur"
            >
              <p className="text-sm font-semibold text-stone-900">{item.title}</p>
              <p className="mt-2 text-sm leading-6 text-stone-600">{item.text}</p>
            </article>
          ))}
        </section>

        <footer className="mt-10 flex flex-col items-start justify-between gap-4 rounded-[1.75rem] border border-white/70 bg-stone-950 px-6 py-5 text-stone-100 shadow-[0_20px_70px_rgba(62,51,39,0.14)] sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold">Um gesto de amor</p>
            <p className="mt-1 text-sm text-stone-300">
              Seu carinho é recebido com gratidão e afeto.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <CopyButton value={siteConfig.pix.key} label="Levar carinho" className="bg-white text-stone-950 hover:bg-stone-100" />
            <a
              href="#confirmar"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <ChevronRight className="h-4 w-4" />
              Confirmar presença
            </a>
          </div>
        </footer>
        </div>
      </div>
    </main>
  );
}
