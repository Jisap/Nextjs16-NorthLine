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
    // TODO
  };

  // TODO: wire this up to the close button inside the overlay.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleMenuClose = () => {
    // TODO
  };

  return (
    <div className="absolute left-0 top-0 h-screen w-screen">
      <div className="fixed left-0 top-0 z-menu-bar flex w-screen items-center justify-between px-4 py-2">
        <Link href="/" className="text-rust">
          <WaveMark className="w-[50px] pt-3" />
        </Link>

        <div onClick={handleMenuOpen} className="cursor-pointer font-display text-[48px] uppercase text-rust">
          <p>Menu</p>
        </div>
      </div>

      {/* TODO: full-screen overlay, hidden until opened. Two columns: a
          background/pattern column, and a rust column with the close
          button, nav items below, and a small footer block. */}
      <div className="pointer-events-none fixed left-0 top-0 z-menu-overlay hidden h-screen w-screen">
        <div className="relative flex h-full w-full flex-col items-center justify-center gap-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-display text-[80px] uppercase text-graphite"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
