"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";



type Sample = {
  id: number;
  title: string;
  location: string;
  art: string;
  audio: string;
};

// TODO: add more samples here as you build out the flip/playback logic.
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const diskRef = useRef<HTMLDivElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 1. Resetear el audio cuando cambia la muestra (índice)
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false))
      }
    }
  }, [currentIndex]);

  // 2. Control de reproducción y bloqueo durante el flip
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(() => setIsFlipping(false));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const handleFlip = (direction: "next" | "prev") => {
    if (isFlipping || !diskRef.current) return;
    setIsFlipping(true);

    const nextIndex =
      direction === "next"
        ? currentIndex === SAMPLES.length - 1
          ? 0
          : currentIndex + 1
        : currentIndex === 0
          ? SAMPLES.length - 1
          : currentIndex - 1;

    const currentRotation = Number(gsap.getProperty(diskRef.current, "rotateY"));

    gsap.to(diskRef.current, {
      duration: 1,
      rotateY: currentRotation + 180,
      ease: "power1.inOut",
      onComplete: () => {
        setCurrentIndex(nextIndex);
        setIsPlaying(false);
      }
    })
  }

  const current = SAMPLES[currentIndex]!;
  const front = SAMPLES[0]!;
  const back = SAMPLES[1]!;




  return (
    <div className="mx-auto max-w-full px-8 py-16">
      <audio
        ref={audioRef}
        onEnded={() => handleFlip("next")}
      >
        <source src={current.audio} type="audio/mpeg" />
      </audio>

      <div className="mx-auto mb-6 aspect-square w-[70%] bg-sand"
        style={{ perspective: "1000px" }}
      >
        <div
          className="absolute h-full w-full [backface-visibility:hidden]"
          style={{ transform: "rotateY(0deg)" }}
        >
          <img
            src={front.art}
            alt={`Waveform art for ${front.title}`}
            className={`block h-full w-full ${isPlaying ? "animate-vinyl-spin" : ""}`}
          />
        </div>

        <div
          className="absolute h-full w-full [backface-visibility:hidden]"
          style={{ transform: "rotateY(180deg)" }}
        >
          <img
            src={back.art}
            alt={`Waveform art for ${back.title}`}
            className={`block h-full w-full ${isPlaying ? "animate-vinyl-spin" : ""}`}
          />
        </div>
      </div>

      <div className="mb-5 text-center">
        <h2 className="text-graphite">{current.title}</h2>
        <p className="text-graphite">{current.location}</p>
      </div>

      <div className="flex items-center justify-center gap-6">
        <button
          onClick={() => setIsPlaying((p) => !p)}
          aria-label={isPlaying ? "Pause" : "Play"}
          className="flex items-center justify-center rounded-full !bg-graphite p-6"
        >
          {isPlaying ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          )}
        </button>

        <button
          onClick={() => handleFlip("next")}
          aria-label="Next Sample"
          disabled={isFlipping}
          className="flex items-center justify-center rounded-full border-2 border-graphite !bg-transparent p-2"
        >
          <path d="M5 4l10 8-10 8V4z" />
          <line x1="19" y1="5" x2="19" y2="19" />
        </button>
      </div>
    </div>
  );
}
