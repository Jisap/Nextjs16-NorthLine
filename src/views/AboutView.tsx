import Footer from "@/components/Footer";
import ParallaxImage from "@/components/ParallaxImage";

// TODO: fill in the rest of the team.
const TEAM = [
  {
    name: "Name",
    role: "Role",
    img: "/about/team1.jpg",
    bio: "Bio placeholder.",
  },
];

// TODO: fill in the rest of the principles.
const PRINCIPLES = [
  {
    number: "01.",
    title: "Title",
    kicker: "Kicker",
    body: "Body copy placeholder.",
  },
];

export default function AboutView() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[70vh] w-full overflow-hidden">
        <ParallaxImage src="/about/hero.jpg" alt="" />
        {/* TODO: headline, supporting line */}
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
