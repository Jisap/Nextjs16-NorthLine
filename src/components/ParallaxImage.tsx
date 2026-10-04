"use client";
// ============================================================================
// ParallaxImage — Imagen con efecto parallax suavizado por scroll
// ----------------------------------------------------------------------------
// ¿Qué hace?
//  Renderiza una <img> a pantalla completa de su contenedor y la desplaza
//  verticalmente (translateY) a una velocidad distinta a la del scroll de la
//  página, creando la ilusión de profundidad (parallax).
//
// ¿Cómo funciona? (3 piezas)
//  1. Lenis (`useLenis`) nos avisa en cada cambio de scroll y calcula un
//     DESPLAZAMIENTO OBJETIVO: (scrollActual - topDeLaImagen) * 0.2.
//     El 0.2 es el "factor de velocidad": la imagen se mueve al 20% de la
//     velocidad del scroll.
//  2. Un bucle `requestAnimationFrame` acerca poco a poco el valor ACTUAL
//     hacia el OBJETIVO usando interpolación lineal (lerp con factor 0.1).
//     Esto evita saltos bruscos y da un movimiento "con inercia".
//  3. Se mide la posición inicial de la imagen (`getBoundingClientRect` +
//     `window.scrollY`) para que el cálculo sea relativo a dónde está la
//     imagen en el documento, no solo al scroll global.
//
// ¿Por qué `scale(1.5)`?
//  Al mover la imagen con translateY quedarían huecos visibles en los bordes
//  del contenedor. Agrandarla un 50% da "margen" para desplazarla sin que se
//  vea el fondo.
//
// Requisito: debe existir un proveedor <ReactLenis> más arriba en el árbol,
// de lo contrario `useLenis` no recibe eventos de scroll.
// ============================================================================

import { useRef, useEffect } from 'react';
import { useLenis } from 'lenis/react';

// lerp = Linear Interpolation (interpolación lineal).
// Devuelve un punto intermedio entre `start` y `end`.
// factor 0 = se queda en `start`, factor 1 = salta directo a `end`.
// Aquí se usa con 0.1 => en cada frame avanza solo el 10% de la distancia
// restante, lo que produce una animación suavizada con efecto "ease-out".
const lerp = (start: number, end: number, factor: number) =>
  start + (end - start) * factor;

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
  scale?: number;
}

export default function ParallaxImage({
  src,
  alt,
  className = "",
  speed = 0.8,
  scale = 1.35,
}: ParallaxImageProps) {
  // Referencia directa al <img> para modificar su style.transform sin re-render.
  const imageRef = useRef<HTMLImageElement | null>(null);

  // Valor que realmente se aplica al transform en cada frame (suavizado).
  const currentTranslateY = useRef(0);

  // Valor al que QUEREMOS llegar, calculado desde el scroll de Lenis.
  const targetTranslateY = useRef(0);

  // ID del requestAnimationFrame activo.
  const reftID = useRef<number | null>(null);

  useEffect(() => {
    // Bucle de animación (~60fps) con interpolación lineal (lerp).
    const animate = () => {
      if (imageRef.current) {
        currentTranslateY.current = lerp(
          currentTranslateY.current,
          targetTranslateY.current,
          0.1
        );

        if (Math.abs(currentTranslateY.current - targetTranslateY.current) > 0.01) {
          imageRef.current.style.transform = `translateY(${currentTranslateY.current}px) scale(${scale})`;
        }
      }
      reftID.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (reftID.current) {
        cancelAnimationFrame(reftID.current);
      }
    };
  }, [scale]);

  // Callback de Lenis: se ejecuta en cada evento de scroll y calcula el progreso visual en pantalla en tiempo real.
  useLenis(() => {
    if (!imageRef.current) return;

    const container = imageRef.current.parentElement || imageRef.current;
    const rect = container.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    // Si el elemento está completamente fuera de la pantalla, no calculamos
    if (rect.bottom < -100 || rect.top > viewportHeight + 100) return;

    // Centro del viewport y centro del elemento en coordenadas de pantalla
    const elementCenter = rect.top + rect.height / 2;
    const viewportCenter = viewportHeight / 2;

    // Distancia desde el centro del viewport al centro del elemento
    const distFromCenter = viewportCenter - elementCenter;
    const totalTravel = (viewportHeight + rect.height) / 2;

    // Progreso normalizado entre -1 (entrando por abajo) y +1 (saliendo por arriba)
    const progress = Math.max(-1, Math.min(1, distFromCenter / totalTravel));

    // Margen máximo permitido por la escala de la imagen para nunca mostrar los bordes
    const maxOffset = (rect.height * (scale - 1)) / 2;

    // Desplazamiento objetivo suave y continuo a lo largo de todo el scroll
    targetTranslateY.current = progress * maxOffset * speed;
  });

  return (
    <img
      ref={imageRef}
      src={src}
      alt={alt}
      className={`h-full w-full object-cover will-change-transform ${className}`}
      style={{ transform: `translateY(0) scale(${scale})` }}
    />
  );
}
