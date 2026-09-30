import Footer from "@/components/Footer";
import ParallaxImage from "@/components/ParallaxImage";

export default function ContactView() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden">
        <ParallaxImage src="/contact/hero.jpg" alt="" />
        {/* TODO: headline */}
      </section>

      {/* Intro + form */}
      <section className="flex flex-col gap-16 bg-graphite px-8 py-24 md:flex-row">
        <div className="flex-1">{/* TODO: copy + CTA + careers blurb */}</div>

        <div id="form" className="flex-1 bg-sand p-6 text-graphite">
          {/* TODO: contact form fields + submit button */}
        </div>
      </section>

      {/* Closing */}
      <section className="flex flex-col gap-8 bg-graphite px-8 py-24 md:flex-row">
        <div className="flex-1">{/* TODO: heading + copy */}</div>
        <div className="h-64 flex-1 overflow-hidden md:h-auto">
          <ParallaxImage src="/contact/banner.jpg" alt="Northline field gear" />
        </div>
      </section>

      <Footer />
    </div>
  );
}
