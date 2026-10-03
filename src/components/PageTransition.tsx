"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";


export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {

  // obtiene la ruta actual, y se usa como key del div contenedor. Cuando cambia la ruta, React considera que es otro elemento:
  // desmonta el anterior y monta uno nuevo.
  const pathname = usePathname();

  return (
    // AnimatePresence detecta esa desmontación y permite que el elemento saliente ejecute su animación exit antes de desaparecer del DOM.
    <AnimatePresence>
      <div key={pathname} className="page relative h-full w-screen">
        {children}

        {/* Cortina de salida */}
        <motion.div
          className="pointer-events-none fixed left-0 top-0 z-transition h-screen w-full origin-top bg-graphite"
          initial={{ scaleY: 0 }} // Mientras la página está activa, está oculta
          animate={{ scaleY: 0 }} // Animación durante el montaje (sin cambios)
          exit={{ scaleY: 1 }}    // Cuando la página se desmonta, se expande hasta cubrir la pantalla desde arriba hacia abajo
          transition={{ duration: 0.75, ease: [0.83, 0, 0.17, 1] }}
        />

        {/* Cortina de entrada */}
        <motion.div
          className="pointer-events-none fixed left-0 top-0 z-transition h-screen w-full origin-top bg-graphite"
          initial={{ scaleY: 1 }} // Mientras la página está entrando, está tapada por la cortina
          animate={{ scaleY: 0 }} // Animación durante el montaje (sin cambios)
          exit={{ scaleY: 0 }}    // Cuando la página se monta, se contrae desde arriba hacia abajo hasta ocultarse
          transition={{ duration: 0.75, ease: [0.83, 0, 0.17, 1] }}
        />
      </div>
    </AnimatePresence>
  )
}
