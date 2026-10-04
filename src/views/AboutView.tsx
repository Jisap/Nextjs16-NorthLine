import Link from "next/link";
import Footer from "@/components/Footer";
import ParallaxImage from "@/components/ParallaxImage";


const TEAM = [
  {
    name: "Mara Ostrom",
    role: "Co-Founder & CEO",
    img: "/about/team1.jpg",
    bio: "Mara spent a decade recording wildlife audio in the field before founding Northline.",
  },
  {
    name: "Devin Smith",
    role: "Chief Engineer",
    img: "/about/team2.jpg",
    bio: "Devin leads hardware design, with a background ruggedized electronics for fleld instruments.",
  },
  {
    name: "Priya Nair",
    role: "Head of Field Testing",
    img: "/about/team3.jpg",
    bio: "Priya runs Northline's test program, takin prototypes through deserts costalines.",
  },
  {
    name: "Sam Whitfield",
    role: "Director of Partnerships",
    img: "/about/team4.jpg",
    bio: "Sam works with universities, research stations, and studios to make sure Northline.",
  },
];


const PRINCIPLES = [
  {
    number: "01.",
    title: "Built to Survice the Trip",
    kicker: "Durabilit Ins't Optional",
    body: "Every product goes through the same conditions it's rated for before it ships - sandstorms, tropical humidity, freezing cold, and the occasional drop.",
  },
  {
    number: "02.",
    title: "Designed With the People Who Use It",
    kicker: "Field Testing, No Focus Groups",
    body: "Our test program puts prototypes in the hands of working recordists for months.",
  },
  {
    number: "03.",
    title: "Open Formats, No Lock-In",
    kicker: "Your Recordings Are Yours",
    body: "Northline gear exports to standar formats with no propietary lock-in - recording workflow should always be open",
  },
  {
    number: "04.",
    title: "Repairable by Design",
    kicker: "Built to Be Fixed, Not Replaced",
    body: "Every unit ships with a repair guide and parts diagram",
  },
];

export default function AboutView() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[70vh] w-full overflow-hidden">
        <ParallaxImage src="/about/hero.jpg" alt="" />

        <div className="absolute bottom-16 left-8">
          <h1 className="font-display text-display-1 uppercase text-sand mobile:text-[24vw]">
            Our Story
          </h1>
        </div>

        <div className="absolute bottom-8 right-8 max-w-sm text-right text-sand">
          <p>
            Designing recording tools thar survive the field, not just the lab.
          </p>
        </div>
      </section>

      {/* Sign-up + mission intro */}
      <section className="flex flex-col gap-16 bg-graphite px-8 py-24 md:flex-row">
        <div className="flex-1">
          <div className="h-64 overflow-hidden bg-sand">
            <ParallaxImage src="/about/sign-up-card.jpg" alt="" />
          </div>
          {/* TODO: heading + copy + CTA */}
        </div>
        <div className="flex-1">{/* TODO: mission copy + CTA */}</div>
      </section>

      {/* Team */}
      <section className="relative overflow-hidden bg-graphite px-8 py-24">
        <div className="absolute inset-0 opacity-30">
          <ParallaxImage src="/about/team-bg.jpg" alt="" />
        </div>
        <div className="relative">
          {/* TODO: heading + careers card */}
          <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-2">
            {TEAM.map((member) => (
              <div key={member.name} className="flex flex-col gap-4">
                <div className="h-96 overflow-hidden">
                  <ParallaxImage src={member.img} alt={`Portrait of ${member.name}`} />
                </div>
                {/* TODO: name, role, bio, link */}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="w-full overflow-hidden whitespace-nowrap bg-rust py-1">
        {/* TODO: two-copy flex row, animate-marquee, seamless loop */}
      </section>

      {/* Principles */}
      <section className="bg-sand px-4 py-32 text-graphite">
        <div className="mx-auto flex max-w-4xl flex-col gap-12">
          {PRINCIPLES.map((p) => (
            <div key={p.number} className="flex flex-col gap-4 md:flex-row md:gap-12">
              {/* TODO: number/title + kicker/body layout */}
            </div>
          ))}
        </div>
      </section>

      {/* Location */}
      <section className="flex flex-col gap-8 bg-graphite px-8 py-24 md:flex-row">
        <div className="flex-1">{/* TODO: wordmark, address, contact info */}</div>
        <div className="h-64 flex-1 overflow-hidden md:h-auto">
          <ParallaxImage src="/about/banner.jpg" alt="Northline workshop" />
        </div>
      </section>

      <Footer />
    </div>
  );
}
