"use client";

import Link from "next/link";

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
  // TODO: state for isOpen / isAnimating.
  // TODO: refs for the two overlay columns, the background wave layer, the
  // diagonal pattern layer, the close button, each nav item, the footer
  // block, and the fixed top bar.
  // TODO: GSAP open/close timelines animating clip-path on the overlay
  // columns + pattern layer, opacity on the nav items/close/footer, and
  // xPercent/opacity on the background layer.
  // TODO: useLenis subscription that hides the fixed top bar
  // (yPercent: -100) on scroll down past a threshold, and reveals it
  // (yPercent: 0) on scroll up.
  // TODO: reset all of the above on route change (usePathname effect).

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
