"use client";

import gsap from "gsap";
import { useLenis } from "lenis/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";



const NAV_ITEMS = [
  { label: "About Us", href: "/about" },
  { label: "Gear", href: "/gear" },
  { label: "Field Notes", href: "/field-notes" },
  { label: "Contact", href: "/contact" },
];

function WaveMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <g stroke="currentColor" strokeWidth="4" strokeLinecap="round">
        <line x1="4" y1="20" x2="4" y2="28" />
        <line x1="12" y1="14" x2="12" y2="34" />
        <line x1="20" y1="6" x2="20" y2="42" />
        <line x1="28" y1="14" x2="28" y2="34" />
        <line x1="36" y1="20" x2="36" y2="28" />
        <line x1="44" y1="22" x2="44" y2="26" />
      </g>
    </svg>
  );
}

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const menuColsRef = useRef<HTMLDivElement[]>([]);
  const menuOverlayRef = useRef<HTMLDivElement | null>(null);
  const menuItemRef = useRef<HTMLDivElement[]>([]);
  const menuCloseRef = useRef<HTMLDivElement | null>(null);
  const menuFooterRef = useRef<HTMLDivElement | null>(null);
  const menuBgRef = useRef<HTMLDivElement | null>(null);
  const menuPatternRef = useRef<HTMLDivElement | null>(null);
  const topBarRef = useRef<HTMLDivElement | null>(null);
  const lastScrollRef = useRef(0);
  const barHiddenRef = useRef(false);
  const navigationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);  // Guarda el ID del timeout usado para el menú overlay
  const router = useRouter();
  const pathName = usePathname();

  // ── 1. Ocultar/mostrar la barra superior según la dirección del scroll ──
  useLenis(({ scroll }: { scroll: number }) => {
    if (!topBarRef.current) return;                                                 // Salir si no existe la ref (no está renderizado)
    const delta = scroll - lastScrollRef.current;                                   // Diferencia con el scroll del frame anterior: >0 = bajando, <0 = subiendo
    const scrollingDown = delta > 0;                                                // Comprueba si el usuario está bajando
    const pastThreshold = scroll > 120;                                             // Evita ocultar la barra mientras estamos cerca del inicio de la página

    if (scrollingDown && pastThreshold && !barHiddenRef.current) {                  // Bajando, pasado el umbral y la barra visible → ocultar 
      barHiddenRef.current = true;                                                  // Marca la barra como oculta para no re-lanzar la animación mientras se sigue bajando
      gsap.to(topBarRef.current, {                                                  // Para ello usamos GSAP y su método to para animar el translateY
        yPercent: -100,                                                             // sale por arriba
        duration: 0.5,                                                              // 0.5 segundos
        ease: "power2.inOut",                                                       // curva de aceleración
      });
    } else if ((!scrollingDown || !pastThreshold) && barHiddenRef.current) {        // Subiendo o de vuelta cerca del inicio, y la barra oculta → mostrar      
      barHiddenRef.current = false;                                                 // Actualiza la referencia para que el siguiente frame se muestre
      gsap.to(topBarRef.current, {                                                  // Para ello usamos GSAP y su método to para animar el translateY
        yPercent: 0,                                                                // vuelve a su posición original
        duration: 0.5,                                                              // 0.5 segundos
        ease: "power2.inOut",                                                       // curva de aceleración
      });
    }

    lastScrollRef.current = scroll;                                                 // Guardamos la posición para calcular el delta en el siguiente frame
  });

  // ── 2. Resetear el menú overlay cuando cambia la ruta ──
  // Su objetivo es garantizar que, al navegar a una nueva página,
  // el menú overlay (que podría estar abierto o a medio animar) 
  // se cierre limpiamente y el estado global se reinicie.
  useEffect(() => {
    if (navigationTimeoutRef.current) {                                             // Evita timeouts duplicados si la ruta cambia varias veces seguidas
      clearTimeout(navigationTimeoutRef.current);                                   // Limpia el timeout anterior
    }

    navigationTimeoutRef.current = setTimeout(() => {                               // Espera 750ms a que termine la transición de página antes de resetear las posiciones del menú
      gsap.set(menuColsRef.current, {                                               // 1º Colapsa las columnas del menú en una línea superior (menú "cerrado")
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      });

      gsap.set(menuOverlayRef.current, { pointerEvents: "none" });                  // 2º El overlay deja de capturar clics

      gsap.set(
        [menuCloseRef.current, ...menuItemRef.current, menuFooterRef.current],      // 3º Oculta botón de cerrar, ítems y footer del menú
        { opacity: 0 }
      );

      gsap.set(menuBgRef.current, { xPercent: -10, opacity: 0 });                   // 4º Resetea el fondo: lo desplaza a la izquierda y lo vuelve transparente
      gsap.set(menuPatternRef.current, {                                            // 5º Colapsa la capa del patrón diagonal a una línea vertical invisible (ancho 0)
        clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"
      });

      gsap.set(topBarRef.current, { yPercent: 0 });                                 // 6º Restaura la barra superior a su posición original visible
      barHiddenRef.current = false;                                                 // 7º Sincroniza la ref: la barra ya no está oculta
      lastScrollRef.current = 0;                                                    // 8º Reinicia el contador de scroll para la nueva página
      setIsOpen(false);                                                             // 9º Actualiza el estado de React confirmando que el menú está cerrado

    }, 750);


    return () => {
      if (navigationTimeoutRef.current) {                                           // Limpieza al desmontar o antes de la siguiente ejecución del efecto
        clearTimeout(navigationTimeoutRef.current);
      }
    };
  }, [pathName]);




  const handleMenuOpen = () => {
    // 1. CLÁUSULA DE GUARDA (Guard Clause)
    // Evita que se dispare la animación si ya está en progreso. 
    // Previene glitches visuales, reinicios de timeline y corrupción de estado por clics rápidos.
    if (isAnimating) return;

    // 2. BLOQUEO DE ESTADO
    // Marca que la animación ha comenzado. Esto deshabilita botones de apertura/cierre 
    // hasta que la secuencia termine por completo.
    setIsAnimating(true);

    // 3. CREACIÓN DE LA LÍNEA DE TIEMPO (Timeline)
    // Se usa un timeline para orquestar múltiples animaciones de forma secuencial y superpuesta.
    // 'onComplete' libera el bloqueo de animación solo cuando TODA la secuencia ha finalizado.
    const timeline = gsap.timeline({
      onComplete: () => setIsAnimating(false)
    });

    timeline
      // PASO A: Expansión de las columnas del menú
      // Anima el clip-path de 0% de altura (línea superior) a 100% (pantalla completa).
      // 'stagger: 0.125' crea un efecto cascada premium entre las columnas.
      // 'power4.inOut' ofrece una aceleración y desaceleración muy suave y cinematográfica.
      .to(menuColsRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1,
        stagger: 0.125,
        ease: "power4.inOut",
      })

      // PASO B: Habilitación de interacción del overlay
      // 'set' es instantáneo (duración 0). Se ejecuta al terminar el Paso A.
      // Permite que el usuario pueda hacer clic en el overlay (ej. para cerrar el menú) 
      // una vez que las columnas ya se han expandido visualmente.
      .set(menuOverlayRef.current, { pointerEvents: "all" })

      // PASO C: Aparición del fondo del menú
      // Mueve el fondo a su posición original (xPercent: 0) y lo hace opaco.
      // "-=0.5": Comienza 0.5 segundos ANTES de que termine el Paso B (solapamiento).
      .to(
        menuBgRef.current,
        {
          xPercent: 0, // ⚠️ Nota: GSAP es sensible a mayúsculas. Usa 'xPercent' en lugar de 'xpercent'
          opacity: 1,
          duration: 1.5,
          ease: "power3.out"
        },
        "-=0.5"
      )

      // PASO D: Expansión del patrón diagonal
      // Anima el clip-path del patrón para que ocupe toda la pantalla.
      // "-=2": Comienza 2 segundos antes del final de la animación anterior. 
      // Como la anterior dura 1.5s, esto significa que en realidad comienza 0.5s 
      // DESPUÉS del inicio del timeline, solapándose con la expansión de las columnas.
      .to(
        menuPatternRef.current,
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 1,
          ease: "power4.out"
        },
        "-=2"
      )

      // PASO E: Revelado del contenido interno (botón cerrar, ítems, footer)
      // Hace fade-in de los elementos interactivos del menú.
      // 'stagger: 0.0075' es un valor muy bajo, creando un efecto de aparición casi 
      // simultáneo pero con un micro-desfase que el ojo percibe como "orgánico" y fluido.
      // "-=1.5": Comienza al mismo tiempo que el Paso C (aparición del fondo).
      .to(
        [menuCloseRef.current, ...menuItemRef.current, menuFooterRef.current],
        {
          opacity: 1,
          duration: 0.5,
          stagger: 0.0075,
          ease: "power2.inOut"
        },
        "-=1.5"
      );

    // 4. ACTUALIZACIÓN DEL ESTADO LÓGICO DE REACT
    // Se ejecuta de forma SÍNCRONA (no espera a la animación).
    // Esto es una buena práctica de accesibilidad (a11y): los lectores de pantalla 
    // y la lógica de la app saben inmediatamente que el menú está "abierto", 
    // aunque visualmente la animación tarde 1.5s en completarse.
    setIsOpen(true);
  };

  const handleMenuClose = () => {
    // 1. CLÁUSULA DE GUARDA (Guard Clause)
    // Evita que se reinicie o superponga la animación de cierre si ya está en progreso.
    if (isAnimating) return;

    // 2. BLOQUEO DE ESTADO
    // Bloquea nuevas interacciones hasta que la secuencia de cierre finalice.
    setIsAnimating(true);

    // 3. CREACIÓN DE LA LÍNEA DE TIEMPO (Timeline)
    // Orquesta la secuencia de salida. 'onComplete' libera el bloqueo al finalizar.
    const timeline = gsap.timeline({
      onComplete: () => setIsAnimating(false)
    });

    timeline
      // PASO A: Desvanecimiento del contenido interno
      // Oculta el botón de cerrar, los ítems y el footer.
      // 'ease: "power2.in"' acelera la salida, dando sensación de caída o cierre rápido.
      .to(
        [menuCloseRef.current, ...menuItemRef.current, menuFooterRef.current],
        { opacity: 0, duration: 0.5, stagger: 0.075, ease: "power2.in" }
      )

      // PASO B: Desactivación de interacción del overlay
      // 'set' es instantáneo. Se ejecuta justo después de que el contenido comienza a desaparecer.
      // Previene clics accidentales en el menú mientras se está cerrando.
      .set(menuOverlayRef.current, { pointerEvents: "none" })

      // PASO C: Colapso del patrón diagonal
      // Reduce el clip-path a una línea vertical invisible en el lado izquierdo (ancho 0%).
      .to(
        menuPatternRef.current,
        {
          clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
          duration: 1,
          ease: "power2.inOut"
        }
      )

      // PASO D: Animación de salida del fondo
      // Desplaza el fondo a la izquierda y lo desvanece suavemente.
      // "-=0.5": Comienza 0.5s antes de que termine el Paso C.
      .to(
        menuBgRef.current,
        {
          xPercent: -10,
          opacity: 0,
          duration: 1.2,
          ease: "power3.in"
        },
        "-=0.5"
      )

      // PASO E: Colapso de las columnas del menú
      // Reduce el clip-path a una línea horizontal superior (altura 0%), cerrando el menú visualmente.
      // "-=0.8": Comienza 0.8s antes de que termine la animación anterior (Paso D).
      .to(
        menuColsRef.current,
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 1,
          stagger: 0.125,
          ease: "power4.inOut"
        },
        "-=0.8"
      );

    // 4. ACTUALIZACIÓN DEL ESTADO LÓGICO DE REACT
    // Sincrónico. Informa inmediatamente a React y a las herramientas de accesibilidad 
    // (lectores de pantalla, atributos aria) que el menú está cerrado, sin esperar a que 
    // termine la animación visual de 2+ segundos.
    setIsOpen(false);
  };

  // Función de Orden Superior (Higher-Order Function) -> Básicamente, es una función que devuelve otra función
  // Primera función recibe el href de la ruta a la que queremos navegar
  // Segunda función recibe el evento de click y ejecuta la navegación
  // Esto se hace para sincronizar Estado y animación, evitar condiciones de carrera y gestionar el foco del naegador.
  const handleNavigation = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setTimeout(() => router.push(href), 0);
  }

  /**
 * Callback Ref para recolectar múltiples elementos DOM en un array.
 * 
 * En React, no puedes usar useRef() dentro de un .map() o bucle,
 * porque los hooks deben llamarse siempre en el mismo orden y cantidad.
 * Este patrón (Callback Ref) es la solución oficial de React para
 * almacenar referencias a una lista dinámica de elementos.
 * 
 * @param {HTMLDivElement | null} el - El elemento DOM que React pasa 
 *   automáticamente cuando el componente se monta (o null cuando se desmonta).
 */
  const addToColsRef = (el: HTMLDivElement | null) => {
    // 1. CLÁUSULA DE GUARDA
    // 'el' será null cuando el componente se desmonte (React llama al callback 
    // con null para indicar que el elemento ya no existe en el DOM).
    // También verificamos que el elemento no esté ya en el array para evitar 
    // duplicados en caso de re-renders.
    if (el && !menuColsRef.current.includes(el)) {
      // 2. AGREGAR AL ARRAY DE REFS
      // Añade el elemento al array almacenado en la ref.
      // Este array es el que luego pasas a GSAP para animar con 'stagger'.
      menuColsRef.current.push(el);
    }
  }

  const addToItemsRef = (el: HTMLDivElement | null) => {
    if (el && !menuItemRef.current.includes(el)) {
      menuItemRef.current.push(el);
    }
  }

  return (
    <div className="absolute left-0 top-0 h-screen w-screen">
      <div
        ref={topBarRef}
        className="fixed left-0 top-0 z-menu-bar flex w-screen items-center justify-between px-4 py-2 will-change-transform"
      >
        <Link href="/" onClick={handleNavigation("/")} className="text-rust">
          <WaveMark className="w-[50px] pt-3" />
        </Link>

        <div
          onClick={handleMenuOpen}
          aria-expanded={isOpen}
          className="cursor-pointer font-display text-[48px] uppercase text-rust"
        >
          <p>
            Menu
          </p>
        </div>

        <div
          ref={menuOverlayRef}
          aria-hidden={!isOpen}
          className="pointer-events-none fixed left-0 top-0 z-menu-overlay flex h-screen w-screen"
        >
          <div
            ref={addToColsRef}
            className="relative h-full w-full flex-1 overflow-hidden bg-graphite [clip-path:polygon(0%_0%,100%_0%,100%_0%,0%_0%)
              will-change-[clip-path] mobile:hidden"
          >
            <div
              ref={menuBgRef}
              className="absolute left-0 top-0 h-full w-full origin-center scale-150 opacity-0 will-change-[transform,opacity]"
            >
              <div className="flex h-full w-full items-center justify-center bg-graphite">
                <WaveMark className="w-1/3 text-rust/40" />
              </div>
            </div>

            <div
              ref={menuPatternRef}
              className="absolute left-0 top-0 h-full w-full bg-[repeating-linear-gradient(135deg,theme(colors.rust)_0px,theme(color.rust)_2px,transparent_2px,transparent_18px)]
              opacity-20 [clip-path:polygon(0%_0%,0%_0%,0%_100%,0%_100%)] will-change-[clip-path]"
            />
          </div>

          <div
            ref={addToColsRef}
            className="relative h-full w-full flex-1 overflow-hidden bg-rust [clip-path:polygon(0%_0%,100%_0%,100%_0%,0%_0%)]
            will-change-[clip-path]"
          >
            <div
              ref={menuCloseRef}
              onClick={handleMenuClose}
              className="absolute right-4 top-2 z-menu-bar cursor-pointer opacity-0 will-change-[opacity]"
            >
              <p className="font-display text-[48px] uppercase text-graphite">
                Close
              </p>
            </div>

            <div className="relative flex h-full w-full flex-col items-center justify-center gap-1">
              {NAV_ITEMS.map((item) => (
                <div
                  key={item.href}
                  ref={addToItemsRef}
                  className="relative h-[100px] opacity-0 [clip-path:polygon(0%_0%,100%_0%,100%_100%,0%_100%)] will-change-[opacity]"
                >
                  <p className="relative h-0 leading-[130px]">
                    <Link
                      href={item.href}
                      onClick={handleNavigation(item.href)}
                      className="relative top-[-20px] inline-block cursor-pointer font-display text-[130px] uppercase leding-[120px] text-graphite"
                    >
                      {item.label}
                    </Link>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};


//   return (
//     <div className="absolute left-0 top-0 h-screen w-screen">
//       <div className="fixed left-0 top-0 z-menu-bar flex w-screen items-center justify-between px-4 py-2">
//         <Link href="/" className="text-rust">
//           <WaveMark className="w-[50px] pt-3" />
//         </Link>

//         <div onClick={handleMenuOpen} className="cursor-pointer font-display text-[48px] uppercase text-rust">
//           <p>Menu</p>
//         </div>
//       </div>

//       {/* TODO: full-screen overlay, hidden until opened. Two columns: a
//           background/pattern column, and a rust column with the close
//           button, nav items below, and a small footer block. */}
//       <div className="pointer-events-none fixed left-0 top-0 z-menu-overlay hidden h-screen w-screen">
//         <div className="relative flex h-full w-full flex-col items-center justify-center gap-1">
//           {NAV_ITEMS.map((item) => (
//             <Link
//               key={item.href}
//               href={item.href}
//               className="font-display text-[80px] uppercase text-graphite"
//             >
//               {item.label}
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
