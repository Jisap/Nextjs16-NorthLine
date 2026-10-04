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
        <div className="flex-1">
          <h2 className="font-display text-display-2 uppercase text-sand mobile:text-[20vw]">
            Built for
            <br />
            Extremes
          </h2>

          <p className="mt-6 font-display uppercase text-rust">
            Recording gear that goes where the story is.
          </p>

          <div className="mt-8">
            <p className="font-display uppercase text-rust">sale@northline.com</p>
            <p className="text-rust/70">Founded 2026</p>
          </div>

          <p className="mt-8 max-w-md text-sand/70">
            Northline builds field recorders and spatial-capture software engineered for conditions
            that would damage studio-grade gear, supporting researchers, sound designers, and location crews.
          </p>
        </div>

        <div className="relative h-64 flex-1 overflow-hidden md:h-auto md:min-h-[400px]">
          <ParallaxImage src="/gear/banner.jpg" alt="Northline field recorder in use" />
        </div>
      </section>

      {/* Feature list */}
      <section className="bg-sand px-4 py-24 text-graphite">
        <div className="mx-auto flex max-w-4xl flex-col gap-2 md:flex-row">
          <div className="flex-1">
            <h3 className="font-display uppercase">Field Recorder</h3>
          </div>

          <div className="flex-1">
            <h3 className="font-display uppercase">Northline SDK</h3>
          </div>
        </div>

        <div className="mx-auto mt-12 flex max-w-4xl flex-col gap-8">
          {FEATURES.map((f) => (
            <div key={f.number} className="flex flex-col gap-2 border-t border-graphite/20 pt-6 md:flex-row md:gap-12">
              <div className="flex gap-3 md:w-1/4">
                <p className="font-display uppercase">{f.number}</p>
                <p className="font-display uppercase">{f.title}</p>
              </div>

              <div className="md:w-3/4">
                <p>{f.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Callout */}
      <section className="relative overflow-hidden bg-graphite px-8 py-32">
        <div className="absolute inset-0 opacity-40">
          <ParallaxImage src="/gear/callout-bg.jpg" alt="" />
        </div>

        <div className="relative max-w-xl">
          <h2 className="font-display text-display-2 uppercase text-sand mobile:text-[20vw]">
            Reliable
            <br />
            in the Field
            <br />
            and Beyond
          </h2>

          <p className="mt-6 text-sand/70">
            Be part of a growing community of recordists, researchers, and location crews who need gear that doesn&rsquo;t quit when
            the conditions get hard.
          </p>

          <p className="mt-6 text-sand/70">
            Mos consumer recording gear is designed for a desk. Northline gear is designed for a trip you can&rsquo;t reschedule &mdash;
            built to keep capturing when the weather, the terrain, or the timeline won&rsquo;t cooperate.
          </p>
        </div>
      </section>

      {/* Support */}
      <section className="bg-graphite px-8 py-24">

      </section>

      {/* Capabilities */}
      <section className="flex flex-col gap-12 bg-graphite px-8 pb-24 md:flex-row">
        {CAPABILITIES.map((c) => (
          <div key={c.index} className="flex-1">
            <p className="text-sand/70">{c.index}</p>

            <h3 className="mt-2 font-display uppercase text-sand">{c.title}</h3>

            <div className="mt-4 flex flex-col gap-1">
              {c.lines.map((line) => (
                <p key={line} className="text-sand/70">
                  {line}
                </p>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Closing */}
      <section className="flex flex-col gap-8 bg-graphite px-8 py-24 md:flex-row">
        <div className="flex-1">
          <h2 className="font-display text-display-2 uppercase text-sand mobile:text-[20vw]">
            Shaping
            <br />
            Tomorrow&rsquo;s Field Kit
          </h2>

          <p className="mt-4 font-display uppercase text-rust">
            Gear built with the people who use it.
          </p>

          <div className="mt-8">
            <p className="font-display uppercase text-rust">gear@northline.com</p>
            <p className="text-sand/70">Founded 2026</p>
          </div>

          <p className="mt-8 max-w-md text-sand">
            Northline designs field-tested recording hardware and software, built with the researchers
            and recordist who use it, so gear keeps working where it matters most.
          </p>
        </div>

        <div className="relative h-64 flex-1 overflow-hidden md:h-auto md:min-h-[400px]">
          <ParallaxImage src="/gear/banner2.jpg" alt="Northline gear in the field" />
        </div>
      </section>

      <Footer />
    </div>
  );
}
