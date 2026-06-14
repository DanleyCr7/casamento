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
  { src: "/images/VID-20260612-WA0047.jpg.jpeg", position: "50% 42%" },
  { src: "/images/VID-20260612-WA0047(1).jpg.jpeg", position: "50% 42%" },
  { src: "/images/VID-20260612-WA0047(2).jpg.jpeg", position: "50% 42%" },
  { src: "/images/VID-20260612-WA0047(3).jpg.jpeg", position: "50% 42%" },
  { src: "/images/VID-20260612-WA0047(6).jpg.jpeg", position: "50% 42%" },
  { src: "/images/VID-20260612-WA0047(7).jpg.jpeg", position: "50% 42%" },
  { src: "/images/VID-20260612-WA0047(8).jpg.jpeg", position: "50% 42%" },
  { src: "/images/VID-20260612-WA0047(12).jpg.jpeg", position: "50% 42%" },
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
              <span className="relative grid h-full gap-4 overflow-hidden rounded-[1.35rem] border border-[#f2c8d8] bg-[#fffaf7] p-5 shadow-[0_20px_70px_rgba(45,35,25,0.12)] sm:grid-cols-[0.85fr_1.15fr] sm:p-7">
                <span className="absolute inset-x-8 top-5 h-px bg-gradient-to-r from-transparent via-[#efb5c6] to-transparent" />
                <span className="absolute right-5 top-5 inline-flex items-center gap-2 rounded-full border border-[#f4d5df] bg-white/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#c36d8c] shadow-sm">
                  <Heart className="h-3.5 w-3.5 fill-current" />
                  Convite da Melinda
                </span>
                <span className="relative min-h-56 overflow-hidden rounded-[1rem] border border-white/80 bg-[#fff6ef]">
                  <Image
                    src={publicAsset("/images/VID-20260612-WA0047(2).jpg.jpeg")}
                    alt="Bebê celebrando seu primeiro aniversário"
                    fill
                    priority
                    sizes="(max-width: 640px) 82vw, 36vw"
                    className="object-cover object-[50%_42%]"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-stone-950/35 to-transparent" />
                  <span className="absolute right-3 top-3 rounded-full border border-white/80 bg-[#fff7df]/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#a55f72] shadow-sm backdrop-blur">
                    1 aninho
                  </span>
                  <span className="absolute bottom-4 left-4 font-script text-5xl leading-none text-white">
                    {siteConfig.coupleNames}
                  </span>
                </span>
                <span className="flex flex-col justify-center gap-5 py-2">
                  <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#fdeef4] px-3 py-1 text-[11px] uppercase tracking-[0.35em] text-[#b35f7e]">
                    <Sparkles className="h-3.5 w-3.5" />
                    Convite encantado
                  </span>
                  <span className="inline-flex w-fit items-center gap-1 rounded-full border border-[#f0d5e0] bg-white/80 px-3 py-1 text-[11px] text-[#8a6070]">
                    <span className="uppercase tracking-[0.3em]">Para</span>
                    <span className="font-semibold tracking-wide">{guestName}</span>
                  </span>
                  <span className="font-script text-6xl leading-none text-[#b35f7e] sm:text-7xl">
                    {siteConfig.coupleNames}
                  </span>
                  <span className="max-w-md text-base leading-7 text-stone-700">
                    É com imensa alegria que convidamos você para entrar no bosque encantado e celebrar o primeiro aninho da Melinda.
                  </span>
                  <span className="grid gap-3 sm:grid-cols-2">
                    <StatChip value={siteConfig.eventDateLabel} label="Dia da festa" />
                    <StatChip value={siteConfig.eventTimeLabel} label="Hora da magia" />
                  </span>
                </span>
              </span>
            </span>
            <span className="envelope-back">
              <span className="envelope-floral envelope-floral-left" />
              <span className="envelope-floral envelope-floral-right" />
              <span className="envelope-heart envelope-heart-left" aria-hidden="true" />
              <span className="envelope-heart envelope-heart-right" aria-hidden="true" />
              <span className="envelope-flap envelope-flap-left" />
              <span className="envelope-flap envelope-flap-right" />
              <span className="envelope-flap envelope-flap-bottom" />
              <span className="envelope-flap envelope-flap-top" />
              <span className="wax-seal">
                <Image
                  src={publicAsset("/images/PASSARINHO.png")}
                  alt=""
                  fill
                  sizes="96px"
                  className="object-contain p-2 drop-shadow-[0_6px_10px_rgba(86,58,36,0.24)]"
                />
              </span>
              <span className="envelope-recipient">
                <span className="block text-[10px] font-semibold uppercase tracking-[0.4em] text-[#b96b84]">
                  Para
                </span>
                <span className="block text-base font-semibold leading-none text-[#4f3411] sm:text-lg">
                  {guestName}
                </span>
              </span>
            </span>
          </span>
        </label>

        <div className="envelope-caption mt-7 text-center">
          <p className="font-script text-5xl leading-none text-[#8b6f35] sm:text-6xl">
            {siteConfig.coupleNames}
          </p>
          <p className="mt-2 text-[11px] uppercase tracking-[0.35em] text-stone-500">
            <span className="caption-closed">Toque no selo e desperte o bosque</span>
            <span className="caption-open">O bosque encantado despertou</span>
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
              className="inline-flex items-center gap-1 transition hover:text-emerald-600"
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

function BosqueCover() {
  return (
    <section className="sec" id="convite">
      <h2>1 aninho no Bosque Encantado</h2>
      <p>
        Um aniversário cheio de folhas, flores e delicadeza para celebrar a
        Melinda. Role a página e deixe o bosque contar a história com leveza.
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
      <div className="memory-balloon memory-balloon-green" aria-hidden="true" />
      <div className="memory-butterfly memory-butterfly-left" aria-hidden="true" />
      <div className="memory-butterfly memory-butterfly-right" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#e9bac8] bg-white/75 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#a75d73] backdrop-blur">
          <Sparkles className="h-3.5 w-3.5" />
          1 aninho
        </span>
        <h2
          id="memory-film-title"
          className="mt-4 font-script text-5xl leading-none text-[#6e8061] sm:text-6xl"
        >
          Bosque encantado
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-stone-600">
          Um pedacinho de cada sorriso, guardado entre musgos, borboletas e a
          delicadeza da floresta encantada.
        </p>
      </div>

      <div className="relative z-10 mx-auto mt-8 max-w-5xl">
        <div className="memory-stage">
          <div className="memory-stage-glow" aria-hidden="true" />
          {memoryPhotos.map((photo, index) => (
            <Image
              key={photo.src}
              src={publicAsset(photo.src)}
              alt={`Memória do primeiro aniversário, foto ${index + 1} de ${memoryPhotos.length}`}
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

function GiftSuggestions() {
  const suggestions = [
    {
      icon: Shirt,
      title: "Roupas",
      subtitle: "12 a 24 meses",
      desc: "Vestidinhos, bodies, macacões — tudo que vista a Melinda com charme e conforto.",
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
          title="Se quiser trazer um carinho para a Melinda"
          description="Sua presença é o melhor presente. Mas se quiser mimá-la ainda mais, aqui vão algumas ideias que cabem no bosque encantado."
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
          Qualquer gesto de carinho será recebido com o mesmo sorriso da Melinda.
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

  useEffect(() => {
    const leaf = document.getElementById("leaf");
    const hill1 = document.getElementById("hill1");
    const hill4 = document.getElementById("hill4");
    const hill5 = document.getElementById("hill5");

    if (!leaf || !hill1 || !hill4 || !hill5) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      const value = window.scrollY;

      leaf.style.transform = `translate(${value * 0.08}px, ${value * -0.08}px)`;
      hill5.style.transform = `translateX(${value * 0.08}px)`;
      hill4.style.transform = `translateX(${value * -0.08}px)`;
      hill1.style.transform = `translateY(${value * 0.05}px)`;

      frame = 0;
    };

    const onScroll = () => {
      if (reduceMotion.matches) {
        return;
      }

      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    reduceMotion.addEventListener("change", update);

    return () => {
      window.removeEventListener("scroll", onScroll);
      reduceMotion.removeEventListener("change", update);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  return (
    <main className="relative overflow-x-hidden">
      <section className="parallax" aria-label="Bosque encantado">
        <img
          src={publicAsset("/images/parallax/hill1.png")}
          id="hill1"
          alt="Colina principal"
        />
        <img
          src={publicAsset("/images/parallax/hill2.png")}
          id="hill2"
          alt="Colina ao fundo"
        />
        <img
          src={publicAsset("/images/parallax/hill3.png")}
          id="hill3"
          alt="Colina central"
        />
        <img
          src={publicAsset("/images/parallax/hill4.png")}
          id="hill4"
          alt="Colina lateral esquerda"
        />
        <img
          src={publicAsset("/images/parallax/hill5.png")}
          id="hill5"
          alt="Colina lateral direita"
        />
        <img
          src={publicAsset("/images/parallax/tree.png")}
          id="tree"
          alt="Árvore do bosque"
        />
        <img
          src={publicAsset("/images/parallax/leaf.png")}
          id="leaf"
          alt="Folha em movimento"
        />
        <img
          src={publicAsset("/images/parallax/plant.png")}
          id="plant"
          alt="Planta do bosque"
        />
      </section>

      <div className="pointer-events-none absolute inset-0 opacity-80">
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-white/70 to-transparent" />
        <div className="absolute bottom-0 left-0 h-56 w-full bg-gradient-to-t from-[#d5c5ac]/35 to-transparent" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <EnvelopeCard guestName={guestName} />

        <div className="site-after-open animate-site-reveal" id="memorias">
          <header className="flex items-center justify-end rounded-full border border-white/70 bg-white/65 px-4 py-3 shadow-[0_12px_40px_rgba(62,51,39,0.08)] backdrop-blur">
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
                  eyebrow="A festa"
                  title="Tudo o que faz essa tarde ser inesquecível."
                  description="Uma composição leve, feita para guardar a data, o lugar e a magia desse primeiro aninho."
                />

                <div className="mt-8 grid gap-4">
                  <div className="flex items-start gap-4 rounded-3xl border border-stone-200 bg-stone-50 p-4">
                    <CalendarDays className="mt-0.5 h-5 w-5 text-emerald-800" />
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
                      <p className="text-sm font-semibold text-stone-900">Um recado do bosque</p>
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
                      src={publicAsset("/images/VID-20260612-WA0047(8).jpg.jpeg")}
                      alt="Bebê sorrindo em seu ensaio de primeiro aniversário"
                      fill
                      sizes="(max-width: 640px) 88vw, 34vw"
                      className="object-cover object-[50%_42%]"
                    />
                    <div className="absolute right-3 top-3 rounded-full border border-white/80 bg-[#f8e4ea]/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#9f536c] shadow-sm backdrop-blur">
                      1 aninho
                    </div>
                  </div>
                  <div className="relative flex flex-col justify-between overflow-hidden rounded-[1.5rem] bg-gradient-to-b from-[#fff5f7] via-[#fffaf0] to-[#edf3e8] p-5">
                    <div className="memory-butterfly memory-butterfly-card" aria-hidden="true" />
                    <div className="space-y-4">
                      <p className="font-script text-4xl leading-none text-emerald-900">
                        {siteConfig.coupleNames}
                      </p>
                      <p className="text-sm leading-7 text-stone-700">
                        Criado para guardar a delicadeza desse primeiro aninho e a doçura de receber cada pessoa querida no bosque encantado.
                      </p>
                    </div>
                    <div className="mt-6 flex items-center gap-2 text-sm text-stone-600">
                      <Sparkles className="h-4 w-4 text-amber-700" />
                      Abra com carinho e deixe-se envolver pela floresta.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <MemoryFilm />

          <section className="mt-10">
            <ConfirmationSection guestName={guestName} />
          </section>

          <section className="mt-10" id="presentes">
            <GiftSuggestions />
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
              <p className="text-sm font-semibold">Carinho e presença</p>
              <p className="mt-1 text-sm text-stone-300">
                O melhor presente é ter você no bosque encantado.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="#presentes"
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-stone-950 transition hover:bg-stone-100"
              >
                <Gift className="h-4 w-4" />
                Sugestões de presente
              </a>
              <a
                href="#confirmar"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                <ChevronRight className="h-4 w-4" />
                Confirmar presença
              </a>
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
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
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
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-stone-800 transition hover:text-emerald-700"
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
