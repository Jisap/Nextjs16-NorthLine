"use client";

// TODO: this component renders a single image and parallax-shifts it as the
// page scrolls, using Lenis's scroll value + a manual lerp toward a target
// translateY, updated on a requestAnimationFrame loop. The scroll target is
// (currentScroll - imageTop) * a speed factor (~0.2), eased toward with a
// lerp factor (~0.1). Needs `useLenis` from "lenis/react".

export default function ParallaxImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  // TODO: track the image's ref, its bounding box top/bottom, a current +
  // target translateY, and animate them together in a rAF loop.

  return <img src={src} alt={alt} className="h-full w-full object-cover" />;
}
