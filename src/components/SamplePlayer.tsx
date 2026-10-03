"use client";

// Reproductor de samples con disco vinilo 3D flippable.
// - Muestra la carátula del sample actual en un disco de dos caras (front/back).
// - Al pulsar prev/next, gira 180deg con GSAP y luego cambia de pista.
// - Play/pause controla el <audio> nativo y activa la rotación continua (animate-vinyl-spin).
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

// Forma de cada pista: arte para el disco + audio para el <audio>.
type Sample = {
  id: number;
  title: string;
  location: string;
  art: string;
  audio: string;
};

// Playlist. front = SAMPLES[0], back = SAMPLES[1], por eso el disco solo soporta 2 caras.
const SAMPLES: Sample[] = [
  {
    id: 1,
    title: "Tidepool, Dawn",
    location: "Recorded on the Northline SF-1",
    art: "/samples/tidepool.png",
    audio: "/samples/tidepool.mp3",
  },
  {
    id: 2,
    title: "Ridge Wind",
    location: "Recorded on the Northline SF-1",
    art: "/samples/ridge-wind.png",
    audio: "/samples/ridge-wind.mp3",
  },
];

export default function SamplePlayer() {
  // Índice de la pista activa dentro de SAMPLES.
  const [currentIndex, setCurrentIndex] = useState(0);
  // true = sonando. Gobierna audio.play()/pause() y la clase animate-vinyl-spin.
  const [isPlaying, setIsPlaying] = useState(false);
  // Cerrojo durante el giro 3D: evita flips solapados y deshabilita prev/next.
  const [isFlipping, setIsFlipping] = useState(false);
  // Contenedor del disco que rota GSAP (rotateY). Necesita preserve-3d.
  const diskRef = useRef<HTMLDivElement | null>(null);
  // Elemento <audio> nativo para load/play/pause.
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 1. Al cambiar de pista: recarga la fuente y continúa sonando si ya estaba en play.
  // Si el autoplay lo bloquea el navegador, vuelve a pausa.
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      }
    }
  }, [currentIndex]);

  // 2. Sincroniza el estado isPlaying con el <audio> nativo.
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(() => setIsPlaying(false));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Gira el disco 180deg hacia next (+180) o prev (-180) y al terminar
  // cambia de pista, pausa el audio y libera el cerrojo isFlipping.
  // El índice es circular: del último vuelve al 0 y viceversa.
  const handleFlip = (direction: "next" | "prev" = "next") => {
    if (isFlipping || !diskRef.current) return;
    setIsFlipping(true);

    // nextIndex circular: next envuelve al 0, prev envuelve al último.
    const nextIndex =
      direction === "next"                          // Si la dirección es next
        ? currentIndex === SAMPLES.length - 1       // Y el índice actual es el último
          ? 0                                       // último -> primero
          : currentIndex + 1                        // avanza uno
        : currentIndex === 0                        // Si la dirección es prev
          ? SAMPLES.length - 1                      // primero -> último
          : currentIndex - 1;                       // retrocede uno

    // Lee la rotación acumulada para encadenar giros sin saltos (0, 180, 360...).
    const currentRotation = Number(gsap.getProperty(diskRef.current, "rotateY")) || 0;

    // Tween GSAP del disco. onComplete aplica el cambio de pista ya con el reverso a la vista.
    gsap.to(diskRef.current, {
      duration: 0.8,
      rotateY: direction === "next" ? currentRotation + 180 : currentRotation - 180,
      ease: "power2.inOut",
      onComplete: () => {
        setCurrentIndex(nextIndex);
        setIsPlaying(false);
        setIsFlipping(false);
      },
    });
  };

  // Pista para texto y src del audio. front/back son las dos caras fijas del disco 3D.
  const current = SAMPLES[currentIndex]!;
  const front = SAMPLES[0]!;
  const back = SAMPLES[1]!;

  return (
    <div className="mx-auto max-w-full px-8 py-16">
      {/* Audio nativo. src cambia con current; onEnded auto-avanza al siguiente sample. */}
      <audio
        ref={audioRef}
        src={current.audio}
        onEnded={() => handleFlip("next")}
      />

      {/* Escenario 3D: la perspectiva crea la profundidad del giro. */}
      <div
        className="mx-auto mb-6 aspect-square w-[70%]"
        style={{ perspective: "1000px" }}
      >
        {/* Disco animado por GSAP. preserve-3d mantiene front/back en el espacio 3D. */}
        <div
          ref={diskRef}
          className="relative h-full w-full"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Cara frontal a 0deg, oculta su reverso con backface-visibility. */}
          <div
            className="absolute inset-0 h-full w-full [backface-visibility:hidden]"
            style={{ transform: "rotateY(0deg)" }}
          >
            {/* rounded-full + animate-vinyl-spin = efecto vinilo girando solo en play. */}
            <img
              src={front.art}
              alt={`Waveform art for ${front.title}`}
              className={`block h-full w-full rounded-full object-cover ${isPlaying ? "animate-vinyl-spin" : ""}`}
            />
          </div>

          {/* Cara trasera pre-rotada 180deg: aparece al completar el flip. */}
          <div
            className="absolute inset-0 h-full w-full [backface-visibility:hidden]"
            style={{ transform: "rotateY(180deg)" }}
          >
            <img
              src={back.art}
              alt={`Waveform art for ${back.title}`}
              className={`block h-full w-full rounded-full object-cover ${isPlaying ? "animate-vinyl-spin" : ""}`}
            />
          </div>
        </div>
      </div>

      {/* Título y origen de la pista activa. Tema claro: grafito sobre arena. */}
      <div className="mb-5 text-center">
        <h2 className="text-graphite text-2xl font-bold">{current.title}</h2>
        <p className="text-graphite/70 text-sm">{current.location}</p>
      </div>

      {/* Controles: prev / play-pause / next. Prev/next se bloquean con isFlipping. */}
      <div className="flex items-center justify-center gap-6">
        {/* Prev: icono con línea + triángulo relleno, trazo currentColor para heredar text-graphite. */}
        <button
          onClick={() => handleFlip("prev")}
          aria-label="Previous Sample"
          disabled={isFlipping}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-graphite/30 text-graphite hover:border-rust hover:text-rust transition-colors disabled:opacity-40"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="5" x2="5" y2="19" />
            <polygon points="19 4 9 12 19 20 19 4" fill="currentColor" />
          </svg>
        </button>

        {/* Play/pause central: alterna isPlaying. Muestra pausa (2 rects) o play (triángulo). */}
        <button
          onClick={() => setIsPlaying((p) => !p)}
          aria-label={isPlaying ? "Pause" : "Play"}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-rust text-graphite shadow-lg hover:scale-105 transition-transform"
        >
          {/* Pausa: fill currentColor, sin stroke. Play: triángulo con ml-1 para centrado óptico. */}
          {isPlaying ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="ml-1">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          )}
        </button>

        {/* Next: espejo de prev (triángulo + línea final). */}
        <button
          onClick={() => handleFlip("next")}
          aria-label="Next Sample"
          disabled={isFlipping}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-graphite/30 text-graphite hover:border-rust hover:text-rust transition-colors disabled:opacity-40"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="5 4 15 12 5 20 5 4" fill="currentColor" />
            <line x1="19" y1="5" x2="19" y2="19" />
          </svg>
        </button>
      </div>
    </div>
  );
}
