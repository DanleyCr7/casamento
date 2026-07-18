"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Footprints,
  Gift,
  Heart,
  AtSign,
  Clock3,
  MapPinned,
  MessageCircle,
  Pause,
  Play,
  Shirt,
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
    src: "/images/melinda-newborn-01.png",
    position: "50% 48%",
    alt: "Pérola recém-nascida dormindo em um cenário delicado",
  },
  {
    src: "/images/melinda-newborn-02.png",
    position: "50% 35%",
    alt: "Retrato de Pérola recém-nascida dormindo",
  },
  {
    src: "/images/melinda-natal-01.png",
    position: "50% 45%",
    alt: "Pérola em seu ensaio de Natal com vestido vermelho",
  },
  {
    src: "/images/melinda-natal-02.png",
    position: "50% 46%",
    alt: "Pérola em frente à árvore de Natal",
  },
  {
    src: "/images/melinda-ensaio-01.png",
    position: "50% 38%",
    alt: "Pérola em seu ensaio de um ano",
  },
  {
    src: "/images/melinda-ensaio-02.png",
    position: "50% 38%",
    alt: "Pérola em pé durante seu ensaio de um ano",
  },
  {
    src: "/images/melinda-ensaio-03.png",
    position: "50% 42%",
    alt: "Pérola sentada durante seu ensaio de um ano",
  },
  {
    src: "/images/melinda-familia-01.png",
    position: "50% 35%",
    alt: "Pérola com seus pais na comemoração de um ano",
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
      <div className="inline-flex items-center gap-2 rounded-full border border-rose-900/10 bg-white/70 px-4 py-1 text-[11px] uppercase tracking-[0.35em] text-rose-800/70 backdrop-blur">
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
    <section className="hero-garden flex min-h-[calc(100vh-3rem)] items-center justify-center py-8">
      <div className="w-full max-w-6xl">
        <input id="invite-open" type="checkbox" className="invite-toggle peer sr-only" />
        <label
          htmlFor="invite-open"
          className="hero-garden-stage group relative mx-auto block w-full cursor-pointer overflow-hidden rounded-[2.5rem] text-left shadow-[0_30px_100px_rgba(126,74,91,0.16)]"
        >
          <span className="sr-only">Abrir convite</span>
          <span className="hero-garden-photo">
            <Image
              src={publicAsset("/images/melinda-ensaio-01.png")}
              alt="Pérola celebrando seu primeiro aniversário"
              fill
              priority
              loading="eager"
              sizes="(max-width: 640px) 72vw, 38vw"
              className="object-cover object-[50%_38%]"
            />
          </span>
          <span className="hero-garden-copy">
            <span className="hero-guest">Para {guestName}</span>
            <span className="font-script text-[clamp(4.8rem,10vw,8rem)] leading-[0.72] text-[#e83f7e]">
              {siteConfig.coupleNames}
            </span>
            <span className="hero-age">1 aninho</span>
            <span className="font-script text-[clamp(2.7rem,6vw,5.25rem)] leading-[0.9] text-[#8d6bb0]">
              Jardim das Borboletas
            </span>
            <span className="mt-4 grid gap-2 text-sm font-semibold text-[#c34270] sm:text-base">
              <span className="inline-flex items-center gap-2"><CalendarDays className="h-4 w-4" />{siteConfig.eventDateLabel}</span>
              <span className="inline-flex items-center gap-2"><Clock3 className="h-4 w-4" />{siteConfig.eventTimeLabel}</span>
            </span>
            <span className="hero-open-button">Abrir o convite</span>
          </span>
        </label>

        <div className="envelope-caption mt-7 text-center">
          <p className="mt-2 text-[11px] uppercase tracking-[0.35em] text-stone-500">
            <span className="caption-closed">Toque no convite e abra o jardim</span>
            <span className="caption-open">O jardim das borboletas ganhou vida</span>
          </p>
          <p className="caption-closed mt-4 text-[10px] uppercase tracking-[0.25em] text-stone-400/80">
            Desenvolvido por
          </p>
          <div className="caption-closed mt-1 flex items-center justify-center gap-2 text-xs text-stone-500/80">
            <a
              href="https://www.instagram.com/conv.idei?igsh=MXRhYTJta3lrd3h5dA=="
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 transition hover:text-rose-600"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3 w-3"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
              @conv.idei
            </a>
            <span className="text-stone-300">|</span>
            <a
              href="https://wa.me/5586981696937"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 transition hover:text-rose-600"
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
      <h2>1 ano no Jardim das Borboletas</h2>
      <p>
        Um aniversário cheio de flores, cores e delicadeza para celebrar a
        Pérola. Role a página e deixe as borboletas contarem essa história.
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
        <span className="inline-flex items-center gap-2 rounded-full border border-[#e9bac8] bg-white/75 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#a75d73] backdrop-blur">
          <Sparkles className="h-3.5 w-3.5" />
          1 ano
        </span>
        <h2
          id="memory-film-title"
          className="mt-4 font-script text-5xl leading-none text-[#6e8061] sm:text-6xl"
        >
          Jardim das borboletas
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-stone-600">
          Um pedacinho de cada sorriso, guardado entre flores, cores suaves e o
          delicado voo das borboletas.
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
            />
          ))}
          <div className="memory-stage-shade" aria-hidden="true" />

          <div className="absolute inset-x-4 bottom-4 z-20 flex items-end justify-between gap-3 sm:inset-x-6 sm:bottom-6">
            <div className="rounded-2xl border border-white/40 bg-stone-950/30 px-4 py-2 text-white shadow-lg backdrop-blur-md">
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/75">
                A magia em cena
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
        <p className="text-[11px] font-semibold uppercase tracking-[0.38em] text-rose-700/75">
          Uma flor preciosa desabrochou
        </p>
        <h2
          id="celebration-message-title"
          className="mt-4 font-script text-6xl leading-none text-rose-800 sm:text-7xl"
        >
          Pérolaaaa
        </h2>

        <div className="mx-auto mt-7 max-w-2xl space-y-5 text-base leading-8 text-stone-700 sm:text-lg">
          <p>
            Há um ano, Deus fez florescer em nossos corações a mais preciosa das dádivas: Pérola.
          </p>
          <p>
            Com delicadeza, amor e a beleza de uma flor em seu primeiro desabrochar, ela ilumina nossos dias e transforma cada instante em um jardim de felicidade.
          </p>
          <p className="font-script text-4xl leading-tight text-[#a85f7b] sm:text-5xl">
            Venha celebrar a vida da flor mais linda do nosso jardim.
          </p>
          <p>
            Será uma alegria compartilhar esse momento tão especial ao lado de pessoas queridas, que fazem parte da nossa história.
          </p>
        </div>

        <div className="mx-auto mt-8 h-px max-w-xs bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.32em] text-stone-700">
          Pérola <span className="px-1 text-rose-400">•</span> 1 ano
        </p>

        <div className="mt-7 grid gap-3 text-left sm:grid-cols-3">
          <div className="celebration-detail">
            <CalendarDays className="h-5 w-5 text-rose-700" />
            <div>
              <p className="celebration-detail-label">Data</p>
              <p className="celebration-detail-value">07/08/2026</p>
            </div>
          </div>
          <div className="celebration-detail">
            <Clock3 className="h-5 w-5 text-violet-700" />
            <div>
              <p className="celebration-detail-label">Horário</p>
              <p className="celebration-detail-value">19 horas</p>
            </div>
          </div>
          <a
            href={siteConfig.venueMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="celebration-detail transition hover:border-rose-300 hover:bg-white"
          >
            <MapPinned className="h-5 w-5 text-amber-700" />
            <div>
              <p className="celebration-detail-label">Local</p>
              <p className="celebration-detail-value leading-5">
                Rua Argentina, Quadra 18 e Casa 09. Conjunto Jardim América. Bairro Rodoviária.
              </p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

function GiftSuggestions() {
  const suggestions = [
    {
      icon: Shirt,
      title: "Roupas",
      subtitle: "12 a 24 meses",
      desc: "Vestidinhos, bodies, macacões — tudo que vista a Pérola com charme e conforto.",
      color: "text-pink-700",
      bg: "bg-pink-50",
      border: "border-pink-200/70",
      iconBg: "bg-pink-600",
    },
    {
      icon: Footprints,
      title: "Sapatinhos",
      subtitle: "Tamanhos 19 e 20",
      desc: "Uns pezinhos delicados merecem calçados cheios de fofura para seus primeiros passos.",
      color: "text-sky-700",
      bg: "bg-sky-50",
      border: "border-sky-200/70",
      iconBg: "bg-sky-600",
    },
    {
      icon: Gift,
      title: "Brinquedos",
      subtitle: "",
      desc: "Ela ama neném! Bonecas, carrinhos de encaixe e tudo que estimule o faz de conta com muito amor.",
      color: "text-amber-700",
      bg: "bg-amber-50",
      border: "border-amber-200/70",
      iconBg: "bg-amber-600",
    },
  ];

  return (
    <section className="relative overflow-hidden rounded-[2.25rem] border border-rose-900/10 bg-[#fbf7f0] p-6 shadow-[0_30px_100px_rgba(62,51,39,0.08)] sm:p-8">
      <div className="absolute -right-8 -top-8 h-44 w-44 rounded-full bg-pink-200/30 blur-3xl" />
      <div className="absolute -bottom-8 left-0 h-40 w-40 rounded-full bg-amber-200/25 blur-3xl" />

      <div className="space-y-6">
        <SectionTitle
          eyebrow="Sugestões de presentes"
          title="Se quiser trazer um carinho para a Pérola"
          description="Sua presença é o melhor presente. Mas se quiser mimá-la ainda mais, aqui vão algumas ideias escolhidas para o jardim das borboletas."
        />

        <div className="grid gap-4 sm:grid-cols-3">
          {suggestions.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`group rounded-2xl border ${item.border} ${item.bg} p-5 shadow-sm transition hover:shadow-md`}
              >
                <span
                  className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${item.iconBg} text-white shadow-inner`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <p className={`text-sm font-semibold ${item.color}`}>{item.title}</p>
                {item.subtitle && (
                  <p className="mt-0.5 text-xs font-medium uppercase tracking-[0.2em] text-stone-500">
                    {item.subtitle}
                  </p>
                )}
                <p className="mt-2 text-sm leading-6 text-stone-600">{item.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-2 rounded-2xl bg-white/80 px-5 py-4 text-sm leading-6 text-stone-600 shadow-sm">
          <Sparkles className="h-4 w-4 shrink-0 text-rose-400" />
          Qualquer gesto de carinho será recebido com o mesmo sorriso da Pérola.
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const searchParams = useSearchParams();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    formatTimeLeft(siteConfig.eventDateTime, new Date(siteConfig.eventDateTime).getTime()),
  );
  const guestName = useMemo(
    () => getGuestNameFromSearchParams(searchParams),
    [searchParams],
  );

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const toggleMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play().then(() => {
        setIsMusicPlaying(true);
        setHasInteracted(true);
      });
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
    <main className="butterfly-garden-site relative overflow-x-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-80">
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-white/70 to-transparent" />
        <div className="absolute bottom-0 left-0 h-56 w-full bg-gradient-to-t from-[#d5c5ac]/35 to-transparent" />
      </div>

      <div className="relative mx-auto flex max-w-[1440px] flex-col px-4 py-6 sm:px-6 lg:px-8">
        <EnvelopeCard guestName={guestName} />

        <div className="site-after-open animate-site-reveal" id="memorias">
          <header className="flex items-center justify-end rounded-full border border-white/70 bg-white/65 px-4 py-3 shadow-[0_12px_40px_rgba(62,51,39,0.08)] backdrop-blur">
            <a
              href="#confirmar"
              className="inline-flex items-center gap-2 rounded-full bg-rose-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-800"
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
                  title="Tudo o que faz essa tarde ser inesquecível."
                  description="Uma composição leve, feita para guardar a data, o lugar e a magia do primeiro ano da Pérola."
                />

                <div className="mt-8 grid gap-4">
                  <div className="flex items-start gap-4 rounded-3xl border border-stone-200 bg-stone-50 p-4">
                    <CalendarDays className="mt-0.5 h-5 w-5 text-rose-700" />
                    <div>
                      <p className="text-sm font-semibold text-stone-900">Quando a magia começa</p>
                      <p className="mt-1 text-sm leading-6 text-stone-600">
                        {siteConfig.eventDateLabel} às {siteConfig.eventTimeLabel}
                      </p>
                    </div>
                  </div>

                  <a
                    href={siteConfig.venueMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 rounded-3xl border border-stone-200 bg-stone-50 p-4 transition hover:border-amber-300 hover:bg-amber-50/60"
                  >
                    <MapPinned className="mt-0.5 h-5 w-5 text-amber-800" />
                    <div>
                      <p className="text-sm font-semibold text-stone-900">Onde a festa acontece</p>
                      <p className="mt-1 text-sm leading-6 text-stone-600">{siteConfig.venueName}</p>
                      <p className="text-sm leading-6 text-stone-500">{siteConfig.venueAddress}</p>
                    </div>
                    <MapPinned className="ml-auto mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                  </a>

                  <div className="flex items-start gap-4 rounded-3xl border border-stone-200 bg-stone-50 p-4">
                    <MessageCircle className="mt-0.5 h-5 w-5 text-rose-700" />
                    <div>
                      <p className="text-sm font-semibold text-stone-900">Um recado do jardim</p>
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
                    Ver mimo
                  </a>
                </div>
              </div>

              <div className="birthday-photo-card overflow-hidden rounded-[2rem] border border-[#efcad3] bg-[#fffaf1]/90 shadow-[0_20px_70px_rgba(116,86,74,0.12)]">
                <div className="grid gap-4 p-4 sm:grid-cols-[0.9fr_1.1fr]">
                  <div className="relative min-h-80 overflow-hidden rounded-[1.5rem]">
                    <Image
                      src={publicAsset("/images/melinda-familia-01.png")}
                      alt="Pérola com seus pais na comemoração de seu primeiro aniversário"
                      fill
                      sizes="(max-width: 640px) 88vw, 34vw"
                      className="object-cover object-[50%_35%]"
                    />
                    <div className="absolute right-3 top-3 rounded-full border border-white/80 bg-[#f8e4ea]/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#9f536c] shadow-sm backdrop-blur">
                      1 ano
                    </div>
                  </div>
                  <div className="relative flex flex-col justify-between overflow-hidden rounded-[1.5rem] bg-gradient-to-b from-[#fff5f7] via-[#fffaf0] to-[#edf3e8] p-5">
                    <div className="memory-butterfly memory-butterfly-card" aria-hidden="true" />
                    <div className="space-y-4">
                      <p className="font-script text-4xl leading-none text-rose-800">
                        {siteConfig.coupleNames}
                      </p>
                      <p className="text-sm leading-7 text-stone-700">
                        Com delicadeza, amor e a beleza de uma flor em seu primeiro desabrochar, Pérola ilumina nossos dias e transforma cada instante em um jardim de felicidade.
                      </p>
                    </div>
                    <div className="mt-6 flex items-center gap-2 text-sm text-stone-600">
                      <Sparkles className="h-4 w-4 text-amber-700" />
                      Abra com carinho e deixe-se envolver por este jardim.
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
          <div className="rsvp-gift-surface">
          <section className="mt-10">
            <ConfirmationSection guestName={guestName} />
          </section>

          <section className="mt-10" id="presentes">
            <GiftSuggestions />
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
              <p className="font-script text-5xl leading-tight text-[#8d6bb0] sm:text-7xl">
                Esperamos você para celebrar conosco!
              </p>
              <p className="mt-3 font-script text-6xl leading-none text-[#e83f7e] sm:text-8xl">Pérola</p>
              <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-stone-600 sm:text-base">
                O melhor presente é ter você no nosso Jardim das Borboletas.
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
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-stone-800 transition hover:text-rose-700"
              >
                <AtSign className="h-4 w-4" />
                @conv.idei
              </a>
              <span className="text-stone-300">|</span>
              <a
                href="https://wa.me/5586981696937"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-stone-800 transition hover:text-rose-700"
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
      <a
        href={siteConfig.venueMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="location-badge-fixed fixed bottom-6 left-6 z-50 flex items-center gap-2.5 rounded-full border border-amber-900/15 bg-gradient-to-r from-amber-50 to-amber-100/80 px-4 py-2.5 shadow-[0_8px_30px_rgba(217,157,50,0.15)] backdrop-blur transition hover:from-amber-100 hover:to-amber-200/80 hover:shadow-[0_8px_35px_rgba(217,157,50,0.25)]"
        aria-label="Abrir localização no Google Maps"
      >
        <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-amber-800 text-white shadow-inner">
          <MapPinned className="h-3.5 w-3.5" />
          <span className="location-badge-ping absolute inset-0 rounded-full bg-amber-800/40" />
        </span>
        <span className="text-left leading-tight">
          <span className="block text-[9px] uppercase tracking-[0.3em] text-amber-800/70">Onde vai ser</span>
          <span className="block text-xs font-semibold text-stone-800">{siteConfig.venueName}</span>
        </span>
        <MapPinned className="h-3 w-3 shrink-0 text-amber-600/50" />
      </a>
    </main>
  );
}
