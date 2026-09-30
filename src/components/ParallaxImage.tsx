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

// Posición absoluta de la imagen dentro del documento (en píxeles).
// top: distancia desde el inicio de la página hasta el borde superior.
// bottom: idem hasta el borde inferior (aquí se guarda pero no se usa,
//   se deja por si se quiere optimizar y no animar fuera de pantalla).
type Bounds = { top: number; bottom: number; };

export default function ParallaxImage({
  src, // URL de la imagen a mostrar
  alt, // Texto alternativo (accesibilidad + SEO)
}: {
  src: string;
  alt: string;
}) {
  // Se usan refs (no useState) porque estos valores cambian en CADA frame
  // (~60 veces/segundo). Con state re-renderizaríamos el componente 60fps,
  // con refs solo mutamos el DOM directamente, mucho más performante.

  // Referencia directa al <img> para modificar su style.transform sin re-render.
  const imageRef = useRef<HTMLImageElement | null>(null);

  // Guarda la posición inicial de la imagen en el documento. Se calcula una
  // vez al montar + en cada resize (si cambia el layout).
  const bounds = useRef<Bounds | null>(null);

  // Valor que realmente se aplica al transform en cada frame (suavizado).
  const currentTranslateY = useRef(0);

  // Valor al que QUEREMOS llegar, calculado desde el scroll de Lenis.
  const targetTranslateY = useRef(0);

  // ID del requestAnimationFrame activo, para poder cancelarlo al desmontar
  // el componente y evitar fugas de memoria.
  const reftID = useRef<number | null>(null);

  // Efecto principal: medir posición + arrancar el bucle de animación.
  // Se ejecuta solo una vez al montar ([]) porque el bucle es continuo.
  useEffect(() => {

    const updateBounds = () => {                                         // Calcula dónde está la imagen en coordenadas absolutas del documento.
      if (imageRef.current) {                                            // Solo si el <img> ya existe en el DOM
        const rect = imageRef.current.getBoundingClientRect()            // getBoundingClientRect da posición relativa al VIEWPORT...  
        bounds.current = {
          top: rect.top + window.scrollY,                                // ...por eso se suma window.scrollY para convertirla a posición
          bottom: rect.bottom + window.scrollY,                          // absoluta respecto al inicio del documento.
        }
      }
    }

    updateBounds();                                                      // Medición inicial

    window.addEventListener("resize", updateBounds);                     // Si la ventana cambia de tamaño, la imagen puede moverse -> re-medir.

    // Bucle de animación ejecutado ~60 veces por segundo.
    const animate = () => {
      if (imageRef.current) {
        currentTranslateY.current = lerp(                                // Acerca el valor actual al objetivo un 10% por frame (suavizado).
          currentTranslateY.current,
          targetTranslateY.current,
          0.1
        );

        // Solo toca el DOM si la diferencia es perceptible (>0.01px).
        // Evita aplicar transforms innecesarios cuando está quieto.
        if (Math.abs(currentTranslateY.current - targetTranslateY.current) > 0.01) {
          // Aplica el desplazamiento + el zoom de seguridad (scale 1.5).
          imageRef.current.style.transform = `translateY(${currentTranslateY.current}px) scale(1.5)`;
        }
      }
      // Programa el siguiente frame -> bucle infinito hasta desmontar.
      reftID.current = requestAnimationFrame(animate);
    }

    animate(); // Arranca el bucle

    // Limpieza al desmontar: quitar listener y parar el bucle.
    return () => {
      window.removeEventListener("resize", updateBounds);
      if (reftID.current) {
        cancelAnimationFrame(reftID.current);
      }
    }
  }, []);

  // Callback de Lenis: se ejecuta en cada evento de scroll suave.
  // NO anima directamente, solo actualiza el VALOR OBJETIVO.
  // El bucle `animate` de arriba se encargará de alcanzarlo poco a poco.
  useLenis(({ scroll }: { scroll: number }) => {
    if (!bounds.current) return; // Aún no se ha medido la imagen

    // Distancia recorrida desde que el scroll pasó por el top de la imagen.
    // Negativa si aún no hemos llegado, positiva si ya la pasamos.
    const relativeScroll = scroll - bounds.current.top;

    // Solo usamos el 20% de ese recorrido -> la imagen "se retrasa"
    // respecto al scroll = efecto parallax.
    targetTranslateY.current = relativeScroll * 0.2;
  })



  return (
    // El padre debe tener `overflow-hidden` y una altura fija para que el
    // efecto se vea como una ventana por la que se desplaza la imagen.
    <img
      ref={imageRef}
      src={src}
      alt={alt}
      // h-full w-full object-cover: rellena el contenedor recortando.
      // will-change-transform: avisa al navegador que el transform animará,
      // así lo optimiza en la GPU y evita parpadeos.
      className="h-full w-full object-cover will-change-transform"
      // Estado inicial: sin desplazamiento pero ya con zoom 1.5 para que
      // no haya un salto visual en el primer frame de la animación.
      style={{ transform: "translateY(0) scale(1.5)" }}
    />
  )
}
