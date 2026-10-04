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

// Posición absoluta de la imagen/contenedor dentro del documento (en píxeles).
type Bounds = {
  top: number;
  height: number;
};

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
  speed = 0.15,
  scale = 1.35,
}: ParallaxImageProps) {
  // Referencia directa al <img> para modificar su style.transform sin re-render.
  const imageRef = useRef<HTMLImageElement | null>(null);

  // Guarda la posición y altura de la imagen/contenedor en el documento.
  const bounds = useRef<Bounds | null>(null);

  // Valor que realmente se aplica al transform en cada frame (suavizado).
  const currentTranslateY = useRef(0);

  // Valor al que QUEREMOS llegar, calculado desde el scroll de Lenis.
  const targetTranslateY = useRef(0);

  // ID del requestAnimationFrame activo.
  const reftID = useRef<number | null>(null);

  useEffect(() => {
    const updateBounds = () => {
      if (imageRef.current) {
        // Medimos el elemento contenedor padre para obtener las dimensiones reales
        const container = imageRef.current.parentElement || imageRef.current;
        const rect = container.getBoundingClientRect();
        bounds.current = {
          top: rect.top + window.scrollY,
          height: rect.height,
        };
      }
    };

    updateBounds();
    window.addEventListener("resize", updateBounds);

    // Bucle de animación (~60fps).
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
      window.removeEventListener("resize", updateBounds);
      if (reftID.current) {
        cancelAnimationFrame(reftID.current);
      }
    };
  }, [scale]);

  // Callback de Lenis: calcula el desplazamiento en función de cuándo el elemento entra en pantalla.
  useLenis(({ scroll }: { scroll: number }) => {
    if (!bounds.current) return;

    // Centro del viewport y centro del elemento en el documento
    const viewportCenter = scroll + window.innerHeight / 2;
    const elementCenter = bounds.current.top + bounds.current.height / 2;

    // Distancia relativa desde el centro de la pantalla al centro del elemento
    const relativeScroll = viewportCenter - elementCenter;

    // Margen máximo que permite el zoom (scale) sin dejar huecos visibles
    const maxOffset = (bounds.current.height * (scale - 1)) / 2;
    const rawOffset = relativeScroll * speed;

    // Limitamos (clamp) para asegurar que nunca se descubra el fondo del contenedor
    targetTranslateY.current = Math.max(-maxOffset, Math.min(maxOffset, rawOffset));
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
