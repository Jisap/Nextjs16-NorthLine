"use client";

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
    title: "Sample Title",
    location: "Recorded on the Northline SF-1",
    art: "/samples/tidepool.png",
    audio: "/samples/tidepool.mp3",
  },
];

export default function SamplePlayer() {
  // TODO: currentIndex / isPlaying / isFlipping state.
  // TODO: audio ref + effect to load/play the current sample.
  // TODO: disk ref + GSAP tween that rotates the disk 180deg (rotateY) on
  // flip, swapping to the next/previous sample onComplete.
  // TODO: play/pause + prev/next button handlers.

  const current = SAMPLES[0]!;

  return (
    <div className="mx-auto max-w-full px-8 py-16">
      <audio>
        <source src={current.audio} type="audio/mpeg" />
      </audio>

      <div className="mx-auto mb-6 aspect-square w-[70%] bg-sand">
        {/* TODO: 3D-flippable disk with front/back art */}
        <img src={current.art} alt={`Waveform art for ${current.title}`} className="block h-full w-full" />
      </div>

      <div className="mb-5 text-center">
        <h2 className="text-graphite">{current.title}</h2>
        <p className="text-graphite">{current.location}</p>
      </div>

      <div className="flex items-center justify-center gap-6">
        {/* TODO: prev / play-pause / next buttons */}
      </div>
    </div>
  );
}
