import Footer from "@/components/Footer";
import ParallaxImage from "@/components/ParallaxImage";

// TODO: fill in the rest of the features.
const FEATURES = [
  { number: "01.", title: "Title", body: "Body copy placeholder." },
];

// TODO: fill in the rest of the capabilities.
const CAPABILITIES = [
  { index: "(01)", title: "Title", lines: ["Line one", "Line two"] },
];

export default function GearView() {
  return (
    <div>
      {/* Hero */}
      <section className="relative flex h-[70vh] w-full flex-col justify-end overflow-hidden">
        <ParallaxImage src="/gear/hero.jpg" alt="" />
        {/* TODO: headline, product category list */}
      </section>

      {/* Intro */}
      <section className="flex flex-col gap-8 bg-graphite px-8 py-24 md:flex-row">
        <div className="flex-1">{/* TODO: heading + copy */}</div>
        <div className="h-64 flex-1 overflow-hidden md:h-auto">
          <ParallaxImage src="/gear/banner.jpg" alt="Northline field recorder in use" />
        </div>
      </section>

      {/* Feature list */}
      <section className="bg-sand px-4 py-24 text-graphite">
        <div className="mx-auto mt-12 flex max-w-4xl flex-col gap-8">
          {FEATURES.map((f) => (
            <div key={f.number} className="flex flex-col gap-2 border-t border-graphite/20 pt-6 md:flex-row md:gap-12">
              {/* TODO: number/title + body layout */}
            </div>
          ))}
        </div>
      </section>

      {/* Callout */}
      <section className="relative overflow-hidden bg-graphite px-8 py-32">
        <div className="absolute inset-0 opacity-40">
          <ParallaxImage src="/gear/callout-bg.jpg" alt="" />
        </div>
        <div className="relative max-w-xl">{/* TODO: heading + copy */}</div>
      </section>

      {/* Support */}
      <section className="bg-graphite px-8 py-24">{/* TODO: heading + copy */}</section>

      {/* Capabilities */}
      <section className="flex flex-col gap-12 bg-graphite px-8 pb-24 md:flex-row">
        {CAPABILITIES.map((c) => (
          <div key={c.index} className="flex-1">
            {/* TODO: index, title, feature lines */}
          </div>
        ))}
      </section>

      {/* Closing */}
      <section className="flex flex-col gap-8 bg-graphite px-8 py-24 md:flex-row">
        <div className="flex-1">{/* TODO: heading + copy */}</div>
        <div className="h-64 flex-1 overflow-hidden md:h-auto">
          <ParallaxImage src="/gear/banner2.jpg" alt="Northline gear in the field" />
        </div>
      </section>

      <Footer />
    </div>
  );
}
