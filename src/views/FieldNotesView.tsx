import Link from "next/link";
import Footer from "@/components/Footer";
import ParallaxImage from "@/components/ParallaxImage";



const ARTICLES = [
  { img: "/field-notes/article1.jpg", title: "Why We Waterproog Every Cable Port", date: "1.14.2026" },
  { img: "/field-notes/article2.jpg", title: "Recording Wind Without Recording Wind Noise", date: "1.9.2026" },
  { img: "/field-notes/article3.jpg", title: "A Season of Testing Gear in Alpine Cold", date: "12.20.2025" },
  { img: "/field-notes/article4.jpg", title: "Choosing Mic Capsules for Coeastal Conditions", date: "12.8.2025" },
  { img: "/field-notes/article5.jpg", title: "Inside Our Drop-Test Process", date: "11.30.2025" },
  { img: "/field-notes/article6.jpg", title: "Battery Life in the Field vs. the Spec Sheet", date: "11.12.2025" },
  { img: "/field-notes/article7.jpg", title: "What We Learned Shipping the SF-1", date: "10.2.2025" },
];

export default function FieldNotesView() {
  return (
    <div>
      {/* Hero */}
      <section className="flex h-[40vh] items-center justify-center bg-graphite">
        <h1 className="font-display text-display-1 uppercase text-sand mobile:text-[24vw]">
          Field Notes
        </h1>
      </section>

      {/* Article grid */}
      <section className="grid grid-cols-1 gap-x-8 gap-y-16 bg-graphite px-8 py-16 md:grid-cols-2">
        {ARTICLES.map((article) => (
          <div key={article.title} className="flex flex-col gap-4">
            <div className="relative h-64 overflow-hidden">
              <img
                src={article.img}
                alt={article.title}
                className="h-full w-full object-cover"
              />

              <div className="absolute bottom-2 left-2 bg-graphite/80 px-2 py-1 text-sand">
                <p>{article.date}&nbsp;Field Notes</p>
              </div>
            </div>

            <h3 className="font-display uppercase text-sand">{article.title}</h3>

            <Link
              href="/field-notes"
              className="font-display uppercase text-rust"
            >
              Read More
            </Link>
          </div>
        ))}
      </section>

      {/* Closing */}
      <section className="flex flex-col gap-8 bg-graphite px-8 py-24 md:flex-row">
        <div className="flex-1">
          <h2 className="font-display text-display-2 uppercase text-sand mobile:text-[20vw]">
            Built With
            <br />
            Integrity
          </h2>

          <p className="mt-4 font-display uppercase test-rust">
            Reach out to collaborate or learn more about what we&rsquo;re building.
          </p>

          <div className="mt-8">
            <p className="font-display uppercase text-rust">press@northline.com</p>
            <p className="text-rust/70">Since 2026</p>
          </div>

          <p className="mt-8 max-w-md text-sand/70">
            Northline builds field-tested recording hardware and spatial-capture software,
            with transparent design decisions and repair-first approach to gear that lasts.
          </p>

        </div>

        <div className="h-64 flex-1 overflow-hidden md:h-auto">
          <ParallaxImage src="/field-notes/banner.jpg" alt="Northline in the field" />
        </div>
      </section>

      <Footer />
    </div>
  );
}
