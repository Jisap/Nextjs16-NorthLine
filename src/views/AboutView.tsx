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

          <h3 className="mt-6 font-display uppercase text-sand">
            Get early access to new gear drops
          </h3>

          <p className="mt-2">
            Every Voice From the Field Count
          </p>

          <button className="mt-6 !bg-rust px-6 py-3">
            <Link href="/contact" className="font-display uppercase text-graphite">
              Sign Up
            </Link>
          </button>
        </div>

        <div className="flex-1">
          <h3 className="font-display uppercase text-sand">
            We build for people who record outside a studio, and we design every product to survive getting there.
          </h3>

          <p className="mt-6 text-sand/70">
            At Northline, we make recording tools for field conditions: researchers, sound designers, and crews who need
            gear that keeps working after the studio-grade equipment would have failed. We partner with universities and
            acoustic programs to test new hardware in the field, and we build every product around one question &mdash;
            wil this still work after the trip out there ?
          </p>

          <button className="mt-6 !bg-rust px-6 py-3">
            <Link href="/contact" className="font-display uppercase text-graphite">
              Sign Up
            </Link>
          </button>
        </div>
      </section>

      {/* Team */}
      <section className="relative overflow-hidden bg-graphite px-8 py-24">
        <div className="absolute inset-0 opacity-30">
          <ParallaxImage src="/about/team-bg.jpg" alt="" />
        </div>
        <div className="relative">
          <h3 className="font-display text-3xl uppercase text-sand">
            The Northline
          </h3>

          <h1 className="font-display text-display-2 uppercase text-rust mobile:text-[20vw]">
            Team
          </h1>

          <div className="mt-8 max-w-md bg-sand p-6 text-graphite">
            <h3 className="font-display uppercase">Be Part of Our Journey</h3>
            <p className="mt-2">
              Northline runs lean and hands-on &mdash; everyone here has actually taken ger into the field.
            </p>
            <button className="mt-4 !bg-rust px-5 py-3">
              <Link href="/contact" className="font-display uppercase text-graphite">
                Careers
              </Link>
            </button>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-2">
            {TEAM.map((member) => (
              <div key={member.name} className="flex flex-col gap-4">
                <div className="h-96 overflow-hidden">
                  <ParallaxImage src={member.img} alt={`Portrait of ${member.name}`} />
                </div>

                <div>
                  <h3 className="font-display uppercase text-sand">{member.name}</h3>
                  <p className="text-sand/70">{member.role}</p>
                  <p className="text-sand/70">{member.bio}</p>
                  <Link href="/contact" className="font-display uppercase text-rust">Linkedin</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="w-full overflow-hidden whitespace-nowrap bg-rust py-1">
        <div className="flex w-max animate-marquee [animation-duration:80s]">
          {/* Se renderizan 2 veces lo mismo */}
          {[0, 1, 2, 3].map((copy) => (
            <div key={copy} className="flex shrink-0">
              {["Built to Survive", "Real Sound", "No Compromise"].map(
                (phrase) => (
                  <h1
                    key={`${copy} - {${phrase}`}
                    className="mr-12 inline-block font-display text-6xl uppercase text-graphite"
                  >
                    {phrase}
                  </h1>
                )
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Principles */}
      <section className="bg-sand px-4 py-32 text-graphite">
        <div className="mx-auto flex max-w-4xl flex-col gap-12">
          {PRINCIPLES.map((p) => (
            <div key={p.number} className="flex flex-col gap-4 md:flex-row md:gap-12">
              <div className="flex gap-4 md:w-1/2">
                <h3 className="font-display uppercase">{p.number}</h3>
                <h3 className="font-display uppercase">{p.title}</h3>
              </div>

              <div className="md:w-1/2">
                <p className="font-display uppercase">{p.kicker}</p>
                <p className="mt-2">{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Location */}
      <section className="flex flex-col gap-8 bg-graphite px-8 py-24 md:flex-row">
        <div className="flex-1">
          <h2 className="font-display text-display-2 upperacase text-sand mobile:text-[20vw]">
            North
            <br />
            line
          </h2>

          <p className="mt-4 font-display uppercase text-rust">
            118 Foundry Row, Porland, OR 97209, USA
          </p>

          <div className="mt-8">
            <p className="font-display uppercase text-rust">hello@northline.com</p>
            <p className="text-sand/70">Established 2026</p>
          </div>

          <p className="mt-8 max-w-md text-sand/70">
            Northline designs field recorders and spatial-capture software, built and tested for the
            consditions real fieldwork actually happens in.
          </p>
        </div>

        <div className="h-64 flex-1 overflow-hidden md:h-auto">
          <ParallaxImage src="/about/banner.jpg" alt="Northline workshop" />
        </div>
      </section>

      <Footer />
    </div>
  );
}
