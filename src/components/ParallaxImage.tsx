"use client";

// This component renders a single image and parallax-shifts it as the
// page scrolls, using Lenis's scroll value + a manual lerp toward a target
// translateY, updated on a requestAnimationFrame loop. The scroll target is
// (currentScroll - imageTop) * a speed factor (~0.2), eased toward with a
// lerp factor (~0.1). Needs `useLenis` from "lenis/react".

import { useRef, useEffect } from 'react';
import { useLenis } from 'lenis/react';

const lerp = (start: number, end: number, factor: number) =>  // lerp representa 
  start + (end - start) * factor;

type Bounds = { top: number; bottom: number; };

export default function ParallaxImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  // track the image's ref, its bounding box top/bottom, a current +
  // target translateY, and animate them together in a rAF loop.

  const imageRef = useRef<HTMLImageElement | null>(null);
  const bounds = useRef<Bounds | null>(null);
  const currentTranslateY = useRef(0);
  const targetTranslateY = useRef(0);
  const reftID = useRef<number | null>(null);

  useEffect(() => {
    const updateBounds = () => {
      if (imageRef.current) {                                          // si la imagen existe
        const rect = imageRef.current.getBoundingClientRect()        // obtenemos los limites de la imagen
        bounds.current = {                                           // actualizamos los limites
          top: rect.top + window.scrollY,                            // 
          bottom: rect.bottom + window.scrollY,                      // 
        }
      }
    }

    updateBounds();
    window.addEventListener("resize", updateBounds);

    const animate = () => {
      if (imageRef.current) {
        currentTranslateY.current = lerp(
          currentTranslateY.current,
          targetTranslateY.current,
          0.1
        );

        if (Math.abs(currentTranslateY.current - targetTranslateY.current) > 0.01) {
          imageRef.current.style.transform = `translateY(${currentTranslateY.current}px) scale(1.5)`;
        }
      }
      reftID.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("resize", updateBounds);
      if (reftID.current) {
        cancelAnimationFrame(reftID.current);
      }
    }
  }, []);

  useLenis(({ scroll }: { scroll: number }) => {
    if (!bounds.current) return;
    const relativeScroll = scroll - bounds.current.top;
    targetTranslateY.current = relativeScroll * 0.2;
  })



  return (
    <img
      ref={imageRef}
      src={src}
      alt={alt}
      className="h-full w-full object-cover will-change-transform"
      style={{ transform: "translateY(0) scale(1.5)" }}
    />
  )
}
