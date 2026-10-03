"use client";


import { use, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "@/components/Footer";
import ParallaxImage from "@/components/ParallaxImage";
import SamplePlayer from "@/components/SamplePlayer";



export default function HomeView() {

  /**
   * Crea una animación vinculada al scroll que mueve horizontalmente un elemento (.strip) a medida que el 
   * usuario desplaza la página a través de otro elemento (.mix-tape), y se limpia correctamente cuando el componente se desmonta.
   */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.create({
      trigger: ".mix-tape",                          // El elemento del DOM que "observa" el scroll. 
      start: "top bottom",                           // La animación comienza cuando el borde superior (top) del elemento .mix-tape cruza el borde inferior (bottom) de la ventana del navegador (viewport).
      end: "bottom bottom",                          // La animación termina cuando el borde inferior (bottom) del elemento .mix-tape cruza el borde inferior (bottom) de la ventana.
      onUpdate: (self) => {                          // Esta función se ejecuta continuamente mientras el usuario hace scroll entre los puntos start y end. 
        gsap.set(".strip", { x: self.progress * 300 }) // Aplica una transformación CSS translateX al elemento .strip
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    }
  }, [])

  return (
    <div>
      {/* Hero */}
      <section className="relative h-screen w-full overflow-hidden">
        <ParallaxImage src="/home/hero.jpg" alt="" />
        {/* headline, tagline, CTA button, news blurb */}
        <div className="absolute bottom-16 left-8 right-8 text-sand">
          <h1 className="font-display text-display-1 uppercase text-sand mobile:text-[24vw]">
            North
            <br />
            line
          </h1>

          <p className="mt-4 max-w-md">Build for the Field</p>

          <button className="mt-6 !bg-rust !text-graphite px-6 py-3 font-display font-bold uppercase">
            <Link href="/contact" className="font-display uppercase text-graphite">
              Get in touch
            </Link>
          </button>
        </div>

        <div className="absolute right-8 top-28 max-w-xs text-right text-sand mobile:hidden">
          <p className="font-display uppercase">
            Field Kits Sell Out: Restock Ahead?
          </p>

          <div className="mt-2 flex gap-4 text-sand/70">
            <p>7.1.2026</p>
            <p>News</p>
          </div>
        </div>
      </section>

      {/* Intro: sample player + mission copy */}
      <section className="flex flex-col gap-16 bg-graphite px-8 py-24 md:flex-row">
        <div className="flex-1">
          <p className="font-display uppercase text-rust">
            Real Sound. Unfiltered
          </p>

          <p className="mt-8 text-sand">
            Recording tools for people who works outdoors.
          </p>

          <div className="mt-8 bg-sand">
            <SamplePlayer />
          </div>
        </div>

        <div className="flex-1">
          {/* TODO: heading + body copy */}
          <div className="mt-6 h-64 w-full overflow-hidden">
            <ParallaxImage src="/home/site-intro.jpg" alt="" />
          </div>
        </div>
      </section>

      {/* Mission / cover */}
      <section className="flex flex-col gap-8 bg-graphite px-8 py-24 md:flex-row">
        <div className="h-96 flex-1 overflow-hidden md:h-auto">
          <ParallaxImage src="/home/cover.jpg" alt="" />
        </div>
        <div className="flex-1">{/* TODO: heading + body + CTA */}</div>
      </section>

      {/* Mix-tape marquee strip (ScrollTrigger-driven) */}
      <section className="mix-tape relative overflow-hidden bg-rust px-8 py-24 text-graphite">
        {/* TODO: heading */}
        <div className="relative mt-12 overflow-hidden">
          <div className="strip flex gap-8 whitespace-nowrap">
            {/* TODO: marquee content */}
          </div>
        </div>
        {/* TODO: supporting copy */}
      </section>

      {/* Field notes preview */}
      <section className="bg-graphite px-8 py-24">
        {/* TODO: heading + "view all" link + article preview grid */}
      </section>

      <Footer />
    </div>
  );
}
