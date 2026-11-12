"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  CalendarDays,
  BadgeCheck,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Heart,
  AtSign,
  Clock3,
  MapPinned,
  MessageCircle,
  Pause,
  Play,
  Sparkles,
  Volume2,
  VolumeX,
} from "lucide-react";
import { ConfirmationSection } from "@/components/confirmation-form";
import { getGuestNameFromSearchParams } from "@/lib/guest-name";
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

const memoryPhotos = [
  {
    src: "/images/momentos/bebe-sorriso.jpg",
    position: "50% 0%",
    alt: "Isaac sorrindo, de roupa azul, sentado em uma colcha florida",
  },
  {
    src: "/images/momentos/isaac-em-pe.jpg",
    position: "75% 38%",
    alt: "Isaac de camisa bege, sorrindo em pé com apoio de um adulto",
  },
  {
    src: "/images/momentos/isaac-sorriso-02.jpg",
    position: "50% 0%",
    alt: "Isaac de roupa azul, dando uma gargalhada na colcha florida",
  },
  {
    src: "/images/momentos/bebe-cadeira-01.jpg",
    position: "50% 22%",
    alt: "Isaac de camisa clara sorrindo em uma cadeira de madeira",
  },
  {
    src: "/images/momentos/bebe-cadeira-02.jpg",
    position: "50% 25%",
    alt: "Isaac fazendo biquinho, de camisa clara, em uma cadeira de madeira",
  },
  {
    src: "/images/momentos/bebe-brinquedo-01.jpg",
    position: "50% 50%",
    alt: "Isaac de roupa laranja sentado em um brinquedo azul",
  },
  {
    src: "/images/momentos/bebe-brinquedo-02.jpg",
    position: "50% 40%",
    alt: "Isaac fazendo biquinho, de roupa laranja, em um brinquedo azul",
  },
] as const;

function formatTimeLeft(target: string, now = Date.now()): TimeLeft {
  const difference = new Date(target).getTime() - now;

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
      <div className="inline-flex items-center gap-2 rounded-full border border-sky-900/10 bg-white/70 px-4 py-1 text-[11px] uppercase tracking-[0.35em] text-sky-800/70 backdrop-blur">
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

type InvitationState = "closed" | "opening" | "open";

function EnvelopeCard({
  guestName,
  state,
  onOpenChange,
}: {
  guestName: string;
  state: InvitationState;
  onOpenChange: (open: boolean) => void;
}) {
  const isOpen = state !== "closed";

  return (
    <section className="hero-garden flex min-h-[calc(100vh-3rem)] items-center justify-center py-8">
      <div className="w-full max-w-6xl">
        <input
          id="invite-open"
          type="checkbox"
          className="invite-toggle peer sr-only"
          checked={isOpen}
          disabled={state === "opening"}
          onChange={(event) => onOpenChange(event.target.checked)}
          aria-label={`${isOpen ? "Fechar" : "Abrir"} o convite do ${siteConfig.celebrantName}`}
          aria-expanded={isOpen}
          aria-controls="memorias"
        />
        <label
          htmlFor="invite-open"
          className="hero-garden-stage group relative mx-auto block w-full cursor-pointer overflow-hidden rounded-[2.5rem] text-left shadow-[0_30px_100px_rgba(39,75,110,0.16)]"
          aria-busy={state === "opening"}
        >
          <span className="sr-only">{isOpen ? "Fechar convite" : "Abrir convite"}</span>
          <span className="hero-garden-photo">
            <Image
              src={publicAsset("/images/momentos/bebe-sorriso.jpg")}
              alt="Isaac sorrindo, de roupa azul, sentado em uma colcha florida"
              fill
              priority
              loading="eager"
              sizes="(max-width: 640px) 72vw, 38vw"
              className="object-cover object-[50%_10%]"
            />
          </span>
          <span className="hero-garden-copy">
            <span className="hero-guest">
              {state === "open" ? <><BadgeCheck aria-hidden="true" />Convite aberto</> :
                state === "opening" ? "Abrindo seu convite..." : <>Para {guestName}</>}
            </span>
            <span className="font-script text-[clamp(4.8rem,10vw,8rem)] leading-[0.72] text-[#89512b]">
              {siteConfig.celebrantName}
            </span>
            <span className="hero-age">{siteConfig.eventAgeLabel}</span>
            <span className="font-script text-[clamp(2.7rem,6vw,5.25rem)] leading-[0.9] text-[#315e91]">
              {siteConfig.themeLabel}
            </span>
            <span className="mt-4 grid gap-2 text-sm font-semibold text-[#315e91] sm:text-base">
              <span className="inline-flex items-center gap-2"><CalendarDays className="h-4 w-4" />{siteConfig.eventDateLabel}</span>
              <span className="inline-flex items-center gap-2"><Clock3 className="h-4 w-4" />{siteConfig.eventTimeLabel}</span>
            </span>
            <span className="hero-open-button">
              {state === "opening" ? "Abrindo..." : isOpen ? "Fechar o convite" : "Abrir o convite"}
            </span>
          </span>
        </label>

        <div className="envelope-caption mt-7 text-center">
          <p className="mt-2 text-[11px] uppercase tracking-[0.35em] text-stone-500" aria-live="polite">
            <span className="caption-closed">Toque no convite e descubra essa celebração</span>
            <span className="caption-open">
              {state === "opening" ? "Preparando os detalhes dessa celebração" :
                <><ChevronDown aria-hidden="true" />Convite aberto! Confira os detalhes abaixo</>}
            </span>
          </p>
          <p className="caption-closed mt-4 text-[10px] uppercase tracking-[0.25em] text-stone-400/80">
            Desenvolvido por
          </p>
          <div className="caption-closed mt-1 flex items-center justify-center gap-2 text-xs text-stone-500/80">
            <a
              href="https://www.instagram.com/conv.idei?igsh=MXRhYTJta3lrd3h5dA=="
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 transition hover:text-sky-600"
            >
              <AtSign className="h-3 w-3" />
              @conv.idei
            </a>
            <span className="text-stone-300">|</span>
            <a
              href="https://wa.me/5586981696937"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 transition hover:text-sky-600"
            >
              <MessageCircle className="h-3 w-3" />
              (86) 98169-6937
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function GardenCover() {
  return (
    <section className="sec" id="convite">
      <h2>1 ano de um presente de Deus</h2>
      <p>
        Um aniversário cheio de amor, fé e alegria para celebrar o
        Isaac. Role a página e conheça os detalhes dessa história.
      </p>
    </section>
  );
}

function MemoryFilm() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isManuallyPaused, setIsManuallyPaused] = useState(false);
  const [isUserPaused, setIsUserPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || isInteracting || isManuallyPaused || isUserPaused) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % memoryPhotos.length);
    }, 4000);

    return () => window.clearInterval(interval);
  }, [isInteracting, isManuallyPaused, isUserPaused, prefersReducedMotion]);

  useEffect(
    () => () => {
      if (resumeTimer.current) {
        clearTimeout(resumeTimer.current);
      }
    },
    [],
  );

  const selectPhoto = useCallback(
    (index: number) => {
      setActiveIndex((index + memoryPhotos.length) % memoryPhotos.length);
      setIsManuallyPaused(true);

      if (resumeTimer.current) {
        clearTimeout(resumeTimer.current);
      }

      if (!isUserPaused && !prefersReducedMotion) {
        resumeTimer.current = setTimeout(() => setIsManuallyPaused(false), 7000);
      }
    },
    [isUserPaused, prefersReducedMotion],
  );

  return (
    <section
      className="memory-film mt-10"
      aria-labelledby="memory-film-title"
      onMouseEnter={() => setIsInteracting(true)}
      onMouseLeave={() => setIsInteracting(false)}
      onFocusCapture={() => setIsInteracting(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsInteracting(false);
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          selectPhoto(activeIndex - 1);
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          selectPhoto(activeIndex + 1);
        }
      }}
    >
      <div className="memory-balloon memory-balloon-pink" aria-hidden="true" />
      <div className="memory-balloon memory-balloon-lilac" aria-hidden="true" />
      <div className="memory-butterfly memory-butterfly-left" aria-hidden="true" />
      <div className="memory-butterfly memory-butterfly-right" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#d8bd83] bg-white/75 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#315e91] backdrop-blur">
          <Sparkles className="h-3.5 w-3.5" />
          1 ano
        </span>
        <h2
          id="memory-film-title"
          className="mt-4 font-script text-5xl leading-none text-[#315e91] sm:text-6xl"
        >
          Um ano de sorrisos
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-stone-600">
          Um pedacinho de cada descoberta e de cada sorriso, guardado com amor
          para celebrar o primeiro ano do Isaac.
        </p>
      </div>

      <div className="relative z-10 mx-auto mt-8 max-w-5xl">
        <div className="memory-stage">
          <div className="memory-stage-glow" aria-hidden="true" />
          {memoryPhotos.map((photo, index) => (
            <Image
              key={photo.src}
              src={publicAsset(photo.src)}
              alt={`${photo.alt}, foto ${index + 1} de ${memoryPhotos.length}`}
              fill
              sizes="(max-width: 768px) 92vw, 800px"
              style={{ objectPosition: photo.position }}
              className={`memory-slide ${index === activeIndex ? "is-active" : ""}`}
              priority={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
            />
          ))}
          <div className="memory-stage-shade" aria-hidden="true" />

          <div className="absolute inset-x-4 bottom-4 z-20 flex items-end justify-between gap-3 sm:inset-x-6 sm:bottom-6">
            <div className="rounded-2xl border border-white/40 bg-stone-950/30 px-4 py-2 text-white shadow-lg backdrop-blur-md">
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/75">
                O amor em cena
              </p>
              <p className="mt-1 font-script text-3xl leading-none">
                Memória {activeIndex + 1}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                className="memory-control"
                onClick={() => selectPhoto(activeIndex - 1)}
                aria-label="Ver foto anterior"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="memory-control"
                onClick={() => {
                  if (resumeTimer.current) {
                    clearTimeout(resumeTimer.current);
                  }
                  setIsUserPaused((paused) => !paused);
                  setIsManuallyPaused(false);
                }}
                aria-label={isUserPaused ? "Reproduzir filme" : "Pausar filme"}
              >
                {isUserPaused ? (
                  <Play className="h-4 w-4 fill-current" />
                ) : (
                  <Pause className="h-4 w-4 fill-current" />
                )}
              </button>
              <button
                type="button"
                className="memory-control"
                onClick={() => selectPhoto(activeIndex + 1)}
                aria-label="Ver próxima foto"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-5 flex justify-center gap-2" aria-label="Escolher memória">
          {memoryPhotos.map((photo, index) => (
            <button
              key={`indicator-${photo.src}`}
              type="button"
              className={`memory-dot ${index === activeIndex ? "is-active" : ""}`}
              onClick={() => selectPhoto(index)}
              aria-label={`Ir para foto ${index + 1}`}
              aria-current={index === activeIndex ? "true" : undefined}
            />
          ))}
        </div>

        <div className="memory-thumbnails mt-5">
          {memoryPhotos.map((photo, index) => (
            <button
              key={`thumbnail-${photo.src}`}
              type="button"
              className={`memory-thumbnail ${index === activeIndex ? "is-active" : ""}`}
              onClick={() => selectPhoto(index)}
              aria-label={`Mostrar foto ${index + 1}`}
              aria-current={index === activeIndex ? "true" : undefined}
            >
              <Image
                src={publicAsset(photo.src)}
                alt=""
                fill
                sizes="80px"
                style={{ objectPosition: photo.position }}
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function CelebrationMessage() {
  return (
    <section className="celebration-message mt-10" aria-labelledby="celebration-message-title">
      <div className="celebration-butterfly celebration-butterfly-left" aria-hidden="true" />
      <div className="celebration-butterfly celebration-butterfly-right" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.38em] text-sky-700/75">
          Um pequeno presente de Deus
        </p>
        <h2
          id="celebration-message-title"
          className="mt-4 font-script text-6xl leading-none text-sky-800 sm:text-7xl"
        >
          {siteConfig.celebrantName}
        </h2>

        <div className="mx-auto mt-7 max-w-2xl space-y-5 text-base leading-8 text-stone-700 sm:text-lg">
          <p>
            Há um ano, Deus nos presenteou com uma vida muito especial: Isaac.
          </p>
          <p>
            Desde então, cada sorriso e cada descoberta renovam o nosso amor e a nossa gratidão a Deus.
          </p>
          <p className="font-script text-4xl leading-tight text-[#89512b] sm:text-5xl">
            “{siteConfig.scripture.text}”
            <span className="mt-3 block font-sans text-sm font-semibold tracking-wide">
              {siteConfig.scripture.reference}
            </span>
          </p>
          <p>
            Será uma alegria compartilhar esse momento tão especial ao lado de pessoas queridas, que fazem parte da nossa história.
          </p>
        </div>

        <div className="mx-auto mt-8 h-px max-w-xs bg-gradient-to-r from-transparent via-sky-300 to-transparent" />
        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.32em] text-stone-700">
          {siteConfig.celebrantName} <span className="px-1 text-sky-400">•</span> {siteConfig.eventAgeLabel}
        </p>

        <div className="mt-7 grid gap-3 text-left sm:grid-cols-3">
          <div className="celebration-detail">
            <CalendarDays className="h-5 w-5 text-sky-700" />
            <div>
              <p className="celebration-detail-label">Data</p>
              <p className="celebration-detail-value">{siteConfig.eventDateLabel}</p>
            </div>
          </div>
          <div className="celebration-detail">
            <Clock3 className="h-5 w-5 text-blue-700" />
            <div>
              <p className="celebration-detail-label">Horário</p>
              <p className="celebration-detail-value">{siteConfig.eventTimeLabel}</p>
            </div>
          </div>
          <a
            href={siteConfig.venueMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="celebration-detail transition hover:border-sky-300 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-700"
          >
            <MapPinned className="h-5 w-5 text-amber-700" />
            <div>
              <p className="celebration-detail-label">Local</p>
              <p className="celebration-detail-value leading-5">
                {siteConfig.venueName}
              </p>
              <p className="mt-1 text-sm leading-5 text-stone-600">{siteConfig.venueAddress}</p>
              <span className="mt-2 inline-block text-xs font-semibold text-sky-700 underline underline-offset-4">Abrir no mapa</span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const searchParams = useSearchParams();
  const guestName = getGuestNameFromSearchParams(searchParams);
  const [invitationState, setInvitationState] = useState<InvitationState>("closed");
  const openedHeaderRef = useRef<HTMLElement | null>(null);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    formatTimeLeft(siteConfig.eventDateTime, new Date(siteConfig.eventDateTime).getTime()),
  );

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  useEffect(() => {
    if (invitationState !== "opening") return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => {
      setInvitationState("open");
      const header = openedHeaderRef.current;
      header?.focus({ preventScroll: true });
      header?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
    }, reducedMotion ? 0 : 760);

    return () => window.clearTimeout(timer);
  }, [invitationState]);

  const toggleMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      void audio.play().then(() => {
        setIsMusicPlaying(true);
      }).catch(() => setIsMusicPlaying(false));
    } else {
      audio.pause();
      setIsMusicPlaying(false);
    }
  }, []);

  useEffect(() => {
    const audio = new Audio(
      publicAsset("/images/forest-ambience-light-birdsong-distant-rooster-vincentmets-1-03-38.mp3"),
    );
    audio.loop = true;
    audio.volume = 0.3;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    setTimeLeft(formatTimeLeft(siteConfig.eventDateTime));

    const timer = window.setInterval(() => {
      setTimeLeft(formatTimeLeft(siteConfig.eventDateTime));
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <main className={`butterfly-garden-site relative overflow-x-hidden${invitationState !== "closed" ? " invite-is-open" : ""}${invitationState === "opening" ? " invite-is-opening" : ""}`}>
      <div className="pointer-events-none absolute inset-0 opacity-80">
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-white/70 to-transparent" />
        <div className="absolute bottom-0 left-0 h-56 w-full bg-gradient-to-t from-[#b7cde0]/35 to-transparent" />
      </div>

      <div className="relative mx-auto flex max-w-[1440px] flex-col px-4 py-6 sm:px-6 lg:px-8">
        <EnvelopeCard
          guestName={guestName}
          state={invitationState}
          onOpenChange={(open) => setInvitationState(open ? "opening" : "closed")}
        />

        <div className="site-after-open animate-site-reveal" id="memorias">
          <header
            ref={openedHeaderRef}
            tabIndex={-1}
            aria-label="Convite aberto: detalhes da festa"
            className="opened-invite-header flex items-center justify-between gap-3 rounded-[1.5rem] border border-white/70 bg-white/65 px-4 py-3 shadow-[0_12px_40px_rgba(62,51,39,0.08)] backdrop-blur sm:rounded-full"
          >
            <div className="opened-invite-status">
              <BadgeCheck aria-hidden="true" />
              <div>
                <p>Convite aberto</p>
                <span>Para {guestName}</span>
              </div>
            </div>
            <a
              href="#confirmar"
              className="inline-flex items-center gap-2 rounded-full bg-sky-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-800"
            >
              <Heart className="h-4 w-4" />
              Confirmar presença
            </a>
          </header>

          <section className="event-garden-section mt-6 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
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
                  eyebrow="A festa"
                  title="Tudo o que faz essa noite ser inesquecível."
                  description="Uma celebração cheia de amor, fé e gratidão pelo primeiro ano do Isaac."
                />

                <div className="mt-8 grid gap-4">
                  <div className="flex items-start gap-4 rounded-3xl border border-stone-200 bg-stone-50 p-4">
                    <CalendarDays className="mt-0.5 h-5 w-5 text-sky-700" />
                    <div>
                      <p className="text-sm font-semibold text-stone-900">Quando a celebração começa</p>
                      <p className="mt-1 text-sm leading-6 text-stone-600">
                        {siteConfig.eventDateLabel} às {siteConfig.eventTimeLabel}
                      </p>
                    </div>
                  </div>

                  <a
                    href={siteConfig.venueMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 rounded-3xl border border-stone-200 bg-stone-50 p-4 transition hover:border-sky-300 hover:bg-sky-50/60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-700"
                  >
                    <MapPinned className="mt-0.5 h-5 w-5 text-amber-800" />
                    <div>
                      <p className="text-sm font-semibold text-stone-900">Onde a festa acontece</p>
                      <p className="mt-1 text-sm leading-6 text-stone-600">{siteConfig.venueName}</p>
                      <p className="text-sm leading-6 text-stone-500">{siteConfig.venueAddress}</p>
                      <span className="mt-2 inline-block text-sm font-semibold text-sky-700 underline underline-offset-4">Como chegar</span>
                    </div>
                  </a>

                  <div className="flex items-start gap-4 rounded-3xl border border-stone-200 bg-stone-50 p-4">
                    <MessageCircle className="mt-0.5 h-5 w-5 text-sky-700" />
                    <div>
                      <p className="text-sm font-semibold text-stone-900">Um recado com carinho</p>
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
                </div>
              </div>

              <div className="birthday-photo-card overflow-hidden rounded-[2rem] border border-[#d8bd83] bg-[#fffaf1]/90 shadow-[0_20px_70px_rgba(116,86,74,0.12)]">
                <div className="grid gap-4 p-4 sm:grid-cols-[0.9fr_1.1fr]">
                  <div className="relative min-h-80 overflow-hidden rounded-[1.5rem]">
                    <Image
                      src={publicAsset("/images/momentos/isaac-em-pe.jpg")}
                      alt="Isaac sorrindo em pé, de camisa bege, com apoio de um adulto"
                      fill
                      sizes="(max-width: 640px) 88vw, 34vw"
                      className="object-cover object-[75%_38%]"
                    />
                    <div className="absolute right-3 top-3 rounded-full border border-white/80 bg-[#e8f3fd]/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#315e91] shadow-sm backdrop-blur">
                      1 ano
                    </div>
                  </div>
                  <div className="relative flex flex-col justify-between overflow-hidden rounded-[1.5rem] bg-gradient-to-b from-[#edf6ff] via-[#fffaf0] to-[#e8f0fa] p-5">
                    <div className="memory-butterfly memory-butterfly-card" aria-hidden="true" />
                    <div className="space-y-4">
                      <p className="font-script text-4xl leading-none text-sky-800">
                        {siteConfig.celebrantName}
                      </p>
                      <p className="text-sm leading-7 text-stone-700">
                        Isaac é um presente de Deus que ilumina nossos dias. Vamos comemorar seu primeiro aninho com muito amor, gratidão e pessoas queridas por perto.
                      </p>
                    </div>
                    <div className="mt-6 flex items-center gap-2 text-sm text-stone-600">
                      <Sparkles className="h-4 w-4 text-amber-700" />
                      Um dia cheio de amor espera por você.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="garden-divider garden-divider-meadow" aria-hidden="true" />
          <MemoryFilm />

          <CelebrationMessage />

          <div className="garden-divider garden-divider-garland" aria-hidden="true" />
          <div className="rsvp-surface">
            <section className="mt-10">
              <ConfirmationSection guestName={guestName} />
            </section>
          </div>

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

          <footer className="closing-garden mt-10">
            <div className="closing-garden-copy">
              <p className="font-script text-5xl leading-tight text-[#315e91] sm:text-7xl">
                Esperamos você para celebrar conosco!
              </p>
              <p className="mt-3 font-script text-6xl leading-none text-[#89512b] sm:text-8xl">{siteConfig.celebrantName}</p>
              <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-stone-600 sm:text-base">
                O melhor presente é ter você celebrando o primeiro aninho do Isaac.
              </p>
            </div>
          </footer>

          <div className="mt-6 rounded-2xl border border-white/50 bg-white/40 px-5 py-4 text-center shadow-sm backdrop-blur">
            <p className="text-[11px] uppercase tracking-[0.3em] text-stone-500">
              Desenvolvido com carinho por
            </p>
            <div className="mt-2 flex items-center justify-center gap-3">
              <a
                href="https://www.instagram.com/conv.idei?igsh=MXRhYTJta3lrd3h5dA=="
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-stone-800 transition hover:text-sky-700"
              >
                <AtSign className="h-4 w-4" />
                @conv.idei
              </a>
              <span className="text-stone-300">|</span>
              <a
                href="https://wa.me/5586981696937"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-stone-800 transition hover:text-sky-700"
              >
                <MessageCircle className="h-4 w-4" />
                (86) 98169-6937
              </a>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/70 bg-white/80 text-stone-700 shadow-[0_8px_30px_rgba(62,51,39,0.15)] backdrop-blur transition hover:bg-white hover:text-stone-900 active:scale-95"
        aria-label={isMusicPlaying ? "Pausar música de fundo" : "Tocar música de fundo"}
      >
        {isMusicPlaying ? (
          <Volume2 className="h-5 w-5" />
        ) : (
          <VolumeX className="h-5 w-5" />
        )}
      </button>
    </main>
  );
}
