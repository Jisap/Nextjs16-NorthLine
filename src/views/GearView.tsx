import Footer from "@/components/Footer";
import ParallaxImage from "@/components/ParallaxImage";

// TODO: fill in the rest of the features.
const FEATURES = [
  {
    number: "01.",
    title: "Weatherproff Housing",
    body: "Every recorder ships in a sealed, drop-tested shell rated for rain, dust, and extreme temperatures."
  },
  {
    number: "02.",
    title: "Lossless, Long-Form Capture",
    body: "Record unattended for days on a single charge with high-resolution, lossless file formats."
  },
  {
    number: "03.",
    title: "Field-Replaceable Everything",
    body: "Batteries, mic capsules, and cables are all swappable in the field with basic tools."
  },
  {
    number: "04.",
    title: "Open File Formats",
    body: "No propietary lock-in. Every recording exports as standard WAV/BFM with full metadata embedded."
  },
  {
    number: "05.",
    title: "Built-In Enviromental Loggin",
    body: "Temperature, humidity, and GPS are logged alongside every recording, so the context is never lost."
  },
];

// TODO: fill in the rest of the capabilities.
const CAPABILITIES = [
  {
    index: "(01)",
    title: "Choos Your Setup",
    lines: [
      "Modular mic capsules",
      "Interchangeable housings",
      "Custom mount options"
    ],
  },
  {
    index: "(02)",
    title: "Protect Your Recordings",
    lines: [
      "Redundant dual-card capture",
      "Checksum-verified files",
      "Tamper-evident metadata"
    ],
  },
  {
    index: "(03)",
    title: "Work Anywhere",
    lines: [
      "30-day standby battery",
      "Field-serviceable parts",
      "Built for -20C to +60C"
    ],
  },

];

export default function GearView() {
  return (
    <div>
      {/* Hero */}
      <section className="relative flex h-[70vh] w-full flex-col justify-end overflow-hidden">
        <ParallaxImage src="/gear/hero.jpg" alt="" />

        <div className="absolute bottom-16 left-8">
          <h1 className="font-display text-display-1 uppercase text-sand mobile:text-[24vw]">
            Gear
          </h1>
        </div>

        <div className="absolute bottom-8 right-8 flex flex-col gap-1 text-right text-sand">
          <p className="font-display up">Field Recorders</p>
          <p className="font-display up">Spatial Capture Software</p>
          <p className="font-display up">Mounts & Housings</p>
          <p className="font-display up">Northline SDK</p>
        </div>
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
