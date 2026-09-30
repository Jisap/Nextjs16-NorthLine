"use client";

// TODO: wrap `children` in framer-motion's <AnimatePresence> keyed by
// `usePathname()`, with two full-screen motion.div "wipe" layers (one
// origin-top, one origin-bottom) that scale in/out on route change and on
// first load. See tutorial step "Page Transitions".

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="relative h-full w-screen">{children}</div>;
}
