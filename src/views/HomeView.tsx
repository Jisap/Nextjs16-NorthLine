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
      {/* Hero Section */}
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

          <div className="mt-8 flex gap-4 text-sand/70">
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
          <p className="text-sand/70">
            Field recording used to mean choosing between fragile studio gear and gear that couldn&rsquot;t capture what you needed.
          </p>

          <h2 className="mt-6 font-display text-display-2 uppercase text-sand mobile:text-[20vw]">
            Built for
            <br />
            Weather
          </h2>

          <h3 className="mt-4 font-display text-display-3 uppercase text-sand mobile:text-[10vw]">
            Precision that survives the trip out there.
          </h3>

          <p className="mt-6 text-sand/70">
            We design recorders and spatial-capture software for people who work outside a studio &mdash; researches, sound designers,
            and field crews who need gear that keeps up with the terrain. Every Northline product is built to the same standard: capture
            real soun, without compromise, in conditions that would kill most studio equipment.
          </p>

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

        <div className="flex-1">
          <h3 className="font-display text-display-3 uppercase text-sand mobile:text-[10vw]">
            Commited to
          </h3>

          <h2 className="font-display text-display-2 uppercase text-rust mobile:text-[20vw]">
            Durable Design
          </h2>

          <p className="mt-6 text-sand/70">
            We design recorders and spatial-capture software for people who work outside a studio &mdash;
            researches, sound designers, adn field crews who need gear that keeps up with the terrain.
            Every Northline product is built to the same standart:  capture de real sound, without
            compromise, in conditions thar would kill most studio equipment.
          </p>

          <p className="mt-6 text-sand/70">
            We work with acouticians, hardware engineers, and the field crews who use our gear every
            day to keep raising that bar.
          </p>

          <div className="mt-8">
            <button className="!bg-rust px-6 py-3">
              <Link href="/about" className="font-display uppercase text-graphite">
                Our Mission
              </Link>
            </button>
          </div>
        </div>
      </section>

      {/* Mix-tape marquee strip (ScrollTrigger-driven) */}
      <section className="mix-tape relative overflow-hidden bg-rust px-8 py-24 text-graphite">
        <p className="font-display uppercase">Field-Tested, Not Lab-Tested</p>

        <p className="font-display uppercase">Northline</p>

        <h1 className="mt-4 font-display text-display-1 uppercase mobile:text-[24vw]">
          From Prototype
          <br />
          to Field-Ready
        </h1>

        <div className="relative mt-12 overflow-hidden">
          <div className="strip flex gap-8 whitespace-nowrap">
            <p className="font-display text-5xl uppercase">
              Northline &middot; Built for the Field &middot; Northline &middot; Built for the Field &middot; Northline &middot; Built for the Field
            </p>
          </div>
        </div>

        <div className="mt-12 max-w-2xl">
          <p>
            The next generation of acoustic engineers and field recordists is shaping
            the tools that will define outdoor audio work.
          </p>

          <p className="mt-6">
            Northline partners with university acoustics and engineering programs to test
            new hardware in real conditions, adn offers residencies for recordists and engineers pushing
            the format forward.
          </p>
        </div>
      </section>

      {/* Field notes preview */}
      <section className="bg-graphite px-8 py-24">
        <h1 className="font-display text-display-2 uppercase text-sand mobile:text-[20vw]">
          Field Notes
        </h1>

        <p className="mt-4 max-w-xl text-sand/70">
          Dispatches from the workshop, gear brakdowns,
          people using Northline in the field.
        </p>

        <div className="mt-4">
          <Link
            href="/field-notes"
            className="font-display uppercase text-rust"
          >
            View All Field Notes
          </Link>
        </div>

        <div className="mt-12 flex flex-col gap-12 md:flex-row">
          <div className="flex-1">
            <div className="h-64 overflow-hidden">
              <ParallaxImage src="/field-notes/article1.jpg" alt="" />
            </div>

            <h3 className="mt-4 font-display text-2xl uppercase text-sand">
              Why We Waterproof Everthing, Even the Cable Ports
            </h3>

            <Link href="/field-notes" className="mt-2 inline-block font-display uppercase text-rust">
              Read More
            </Link>
          </div>

          <div className="flex-1">
            <div className="h.64 overflow-hidden">
              <ParallaxImage src="/field-notes/article2.jpg" alt="" />
            </div>

            <h3 className="mt-4 font-display text-2xl uppercase text-sand">
              Recording Wind Without Recording Wind Noise
            </h3>

            <Link href="/field-notes" className="mt-2 inline-block font-display uppercase text-rust">
              Read More
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
