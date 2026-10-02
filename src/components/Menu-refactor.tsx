"use client";

import gsap from "gsap";
import { useLenis } from "lenis/react";
import type Lenis from "lenis";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const NAV_ITEMS = [
  { label: "About Us", href: "/about" },
  { label: "Gear", href: "/gear" },
  { label: "Field Notes", href: "/field-notes" },
  { label: "Contact", href: "/contact" },
];

// Dos columnas según diseño: [0] fondo/patrón, [1] contenido rust.
const COLS_CLOSED = "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)";
const COLS_OPEN = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
const PATTERN_CLOSED = "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)";
const PATTERN_OPEN = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";

// useLayoutEffect hace ruido en SSR; en servidor usamos useEffect.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

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

function collectTargets(
  ...nodes: Array<HTMLElement | null | Array<HTMLElement | null>>
): HTMLElement[] {
  return nodes.flat().filter((n): n is HTMLElement => n instanceof HTMLElement);
}

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const menuColsRef = useRef<Array<HTMLDivElement | null>>([]);
  const menuOverlayRef = useRef<HTMLDivElement | null>(null);
  const menuItemsRef = useRef<Array<HTMLAnchorElement | null>>([]);
  const menuCloseRef = useRef<HTMLButtonElement | null>(null);
  const menuFooterRef = useRef<HTMLDivElement | null>(null);
  const menuBgRef = useRef<HTMLDivElement | null>(null);
  const menuPatternRef = useRef<HTMLDivElement | null>(null);
  const topBarRef = useRef<HTMLDivElement | null>(null);

  const lastScrollRef = useRef(0);
  const barHiddenRef = useRef(false);
  const isAnimatingRef = useRef(false);
  const isOpenRef = useRef(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const pendingNavRef = useRef<string | null>(null);

  const router = useRouter();
  const pathname = usePathname();
  const lenis = useLenis(({ scroll }: Lenis) => {
    if (!topBarRef.current) return;
    // No ocultar la barra mientras el menú está abierto.
    if (isOpenRef.current || isAnimatingRef.current) {
      lastScrollRef.current = scroll;
      return;
    }
    const delta = scroll - lastScrollRef.current;
    if (delta === 0) return;
    const scrollingDown = delta > 0;
    const pastThreshold = scroll > 120;

    if (scrollingDown && pastThreshold && !barHiddenRef.current) {
      barHiddenRef.current = true;
      gsap.to(topBarRef.current, {
        yPercent: -100,
        duration: 0.5,
        ease: "power2.inOut",
        overwrite: "auto",
      });
    } else if ((!scrollingDown || !pastThreshold) && barHiddenRef.current) {
      barHiddenRef.current = false;
      gsap.to(topBarRef.current, {
        yPercent: 0,
        duration: 0.5,
        ease: "power2.inOut",
        overwrite: "auto",
      });
    }

    lastScrollRef.current = scroll;
  });

  const setAnimating = (value: boolean) => {
    isAnimatingRef.current = value;
    setIsAnimating(value);
  };

  const setOpenState = (value: boolean) => {
    isOpenRef.current = value;
    setIsOpen(value);
  };

  const killTimeline = () => {
    timelineRef.current?.kill();
    timelineRef.current = null;
  };

  const resetToClosed = () => {
    killTimeline();
    pendingNavRef.current = null;
    setAnimating(false);
    setOpenState(false);
    gsap.set(menuColsRef.current.filter(Boolean), { clipPath: COLS_CLOSED });
    gsap.set(menuOverlayRef.current, {
      autoAlpha: 0,
      pointerEvents: "none",
    });
    gsap.set(
      collectTargets(
        menuCloseRef.current,
        menuItemsRef.current,
        menuFooterRef.current
      ),
      { opacity: 0 }
    );
    gsap.set(menuBgRef.current, { xPercent: -10, opacity: 0 });
    gsap.set(menuPatternRef.current, { clipPath: PATTERN_CLOSED });
    gsap.set(topBarRef.current, { yPercent: 0 });
    barHiddenRef.current = false;
    lastScrollRef.current = 0;
  };

  // Estado inicial: todo oculto antes del primer paint (evita flash).
  useIsomorphicLayoutEffect(() => {
    resetToClosed();
  }, []);

  // Al cambiar de ruta, cerrar de forma síncrona: sin timeouts que
  // desincronicen isOpen/isAnimating si el usuario navega a medio timeline.
  useEffect(() => {
    resetToClosed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Matar tweens al desmontar.
  useEffect(() => {
    const topBar = topBarRef.current;
    return () => {
      killTimeline();
      gsap.killTweensOf(topBar);
    };
  }, []);

  // Bloquear scroll de fondo mientras el menú está abierto.
  useEffect(() => {
    if (isOpen) {
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [isOpen, lenis]);

  const handleMenuOpen = () => {
    if (isAnimatingRef.current || isOpenRef.current) return;
    if (!menuOverlayRef.current) return;
    setAnimating(true);
    killTimeline();

    const contentTargets = collectTargets(
      menuCloseRef.current,
      menuItemsRef.current,
      menuFooterRef.current
    );

    const timeline = gsap.timeline({
      onComplete: () => {
        setAnimating(false);
      },
    });
    timelineRef.current = timeline;

    timeline
      // Overlay visible desde el frame 0 (antes era pointerEvents al final,
      // lo que dejaba el menú invisible pero con estado "abierto").
      .set(menuOverlayRef.current, {
        autoAlpha: 1,
        pointerEvents: "auto",
      })
      // PASO A: expansión de columnas en cascada.
      .to(
        menuColsRef.current.filter(Boolean),
        {
          clipPath: COLS_OPEN,
          duration: 1,
          stagger: 0.125,
          ease: "power4.inOut",
        },
        0
      )
      // PASO C: fondo.
      .to(
        menuBgRef.current,
        {
          xPercent: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power3.out",
        },
        0.5
      )
      // PASO D: patrón diagonal solapado con las columnas.
      .to(
        menuPatternRef.current,
        {
          clipPath: PATTERN_OPEN,
          duration: 1,
          ease: "power4.out",
        },
        0.5
      )
      // PASO E: contenido con micro-stagger.
      .to(
        contentTargets,
        {
          opacity: 1,
          duration: 0.5,
          stagger: 0.0075,
          ease: "power2.inOut",
        },
        1
      );

    setOpenState(true);
  };

  const handleMenuClose = (onDone?: () => void) => {
    if (isAnimatingRef.current || !isOpenRef.current) {
      onDone?.();
      return;
    }
    if (!menuOverlayRef.current) {
      onDone?.();
      return;
    }
    setAnimating(true);
    killTimeline();

    const contentTargets = collectTargets(
      menuCloseRef.current,
      menuItemsRef.current,
      menuFooterRef.current
    );

    const timeline = gsap.timeline({
      onComplete: () => {
        gsap.set(menuOverlayRef.current, {
          autoAlpha: 0,
          pointerEvents: "none",
        });
        setAnimating(false);
        setOpenState(false);
        onDone?.();
      },
    });
    timelineRef.current = timeline;

    timeline
      .to(contentTargets, {
        opacity: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: "power2.in",
      })
      .set(menuOverlayRef.current, { pointerEvents: "none" })
      .to(
        menuPatternRef.current,
        {
          clipPath: PATTERN_CLOSED,
          duration: 0.8,
          ease: "power2.inOut",
        },
        "<"
      )
      .to(
        menuBgRef.current,
        {
          xPercent: -10,
          opacity: 0,
          duration: 1,
          ease: "power3.in",
        },
        "-=0.4"
      )
      .to(
        menuColsRef.current.filter(Boolean),
        {
          clipPath: COLS_CLOSED,
          duration: 0.8,
          stagger: 0.1,
          ease: "power4.inOut",
        },
        "-=0.6"
      );
  };

  // Navegación: cierra primero y navega al terminar el cierre.
  // Antes los <Link> navegaban con el overlay abierto y un timeout de
  // 750ms intentaba arreglarlo a posteriori (bloqueaba la UI en transición).
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    if (isAnimatingRef.current) return;
    pendingNavRef.current = href;
    handleMenuClose(() => {
      const target = pendingNavRef.current;
      pendingNavRef.current = null;
      if (target) router.push(target);
    });
  };

  // Escape cierra el menú.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleMenuClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <>
      <div
        ref={topBarRef}
        className="fixed left-0 top-0 z-menu-bar flex w-screen items-center justify-between px-4 py-2"
      >
        <Link href="/" className="text-rust" aria-label="Northline home">
          <WaveMark className="w-[50px] pt-3" />
        </Link>

        <button
          type="button"
          onClick={handleMenuOpen}
          disabled={isAnimating || isOpen}
          aria-expanded={isOpen}
          aria-controls="menu-overlay"
          className="cursor-pointer font-display text-[48px] uppercase text-rust disabled:cursor-default disabled:opacity-60"
        >
          Menu
        </button>
      </div>

      <div
        ref={menuOverlayRef}
        id="menu-overlay"
        aria-hidden={!isOpen}
        className="invisible fixed left-0 top-0 z-menu-overlay h-screen w-screen opacity-0"
        style={{ visibility: "hidden" }}
      >
        <div className="flex h-full w-full flex-col md:flex-row">
          {/* Columna 1: fondo + patrón */}
          <div
            ref={(el) => {
              menuColsRef.current[0] = el;
            }}
            className="relative hidden flex-1 overflow-hidden bg-graphite md:block"
            style={{ clipPath: COLS_CLOSED }}
          >
            <div
              ref={menuBgRef}
              className="absolute inset-0 bg-gradient-to-br from-sand via-graphite to-rust"
              style={{ opacity: 0 }}
            />
            <div
              ref={menuPatternRef}
              className="absolute inset-0 opacity-40"
              style={{
                clipPath: PATTERN_CLOSED,
                backgroundImage:
                  "repeating-linear-gradient(-45deg, currentColor 0 2px, transparent 2px 18px)",
                color: "#e2571c",
              }}
            />
          </div>

          {/* Columna 2: contenido rust */}
          <div
            ref={(el) => {
              menuColsRef.current[1] = el;
            }}
            className="relative flex flex-1 flex-col bg-rust px-6 py-6"
            style={{ clipPath: COLS_CLOSED }}
          >
            <div className="flex items-start justify-end">
              <button
                ref={menuCloseRef}
                type="button"
                onClick={() => handleMenuClose()}
                disabled={isAnimating}
                aria-label="Close menu"
                className="font-display text-[32px] uppercase text-graphite disabled:opacity-60"
                style={{ opacity: 0 }}
              >
                Close
              </button>
            </div>

            <nav
              aria-label="Primary"
              className="flex flex-1 flex-col items-start justify-center gap-1"
            >
              {NAV_ITEMS.map((item, i) => (
                <Link
                  key={item.href}
                  ref={(el) => {
                    menuItemsRef.current[i] = el;
                  }}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="font-display text-[48px] uppercase leading-none text-graphite transition-opacity hover:opacity-70 md:text-[80px]"
                  style={{ opacity: 0 }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div
              ref={menuFooterRef}
              className="flex items-center justify-between font-editorial text-sm uppercase text-graphite"
              style={{ opacity: 0 }}
            >
              <span>Built for the field</span>
              <span>Northline © 2026</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
