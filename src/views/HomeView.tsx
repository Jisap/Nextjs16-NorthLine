"use client";

import Footer from "@/components/Footer";
import ParallaxImage from "@/components/ParallaxImage";
import SamplePlayer from "@/components/SamplePlayer";

// TODO: register GSAP's ScrollTrigger plugin and create a trigger on the
// ".mix-tape" section (start "top bottom", end "bottom bottom") that sets
// the ".strip" element's x position to `self.progress * 300` on update.

export default function HomeView() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-screen w-full overflow-hidden">
        <ParallaxImage src="/home/hero.jpg" alt="" />
        {/* TODO: headline, tagline, CTA button, news blurb */}
      </section>

      {/* Intro: sample player + mission copy */}
      <section className="flex flex-col gap-16 bg-graphite px-8 py-24 md:flex-row">
        <div className="flex-1">
          {/* TODO: kicker copy */}
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
