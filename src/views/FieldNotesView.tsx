import Footer from "@/components/Footer";
import ParallaxImage from "@/components/ParallaxImage";

// TODO: fill in the rest of the articles.
const ARTICLES = [
  { img: "/field-notes/article1.jpg", title: "Article title", date: "1.1.2026" },
];

export default function FieldNotesView() {
  return (
    <div>
      {/* Hero */}
      <section className="flex h-[40vh] items-center justify-center bg-graphite">
        {/* TODO: headline */}
      </section>

      {/* Article grid */}
      <section className="grid grid-cols-1 gap-x-8 gap-y-16 bg-graphite px-8 py-16 md:grid-cols-2">
        {ARTICLES.map((article) => (
          <div key={article.title} className="flex flex-col gap-4">
            <div className="relative h-64 overflow-hidden">
              <img src={article.img} alt={article.title} className="h-full w-full object-cover" />
              {/* TODO: date/category tag overlay */}
            </div>
            {/* TODO: title + read-more link */}
          </div>
        ))}
      </section>

      {/* Closing */}
      <section className="flex flex-col gap-8 bg-graphite px-8 py-24 md:flex-row">
        <div className="flex-1">{/* TODO: heading + copy */}</div>
        <div className="h-64 flex-1 overflow-hidden md:h-auto">
          <ParallaxImage src="/field-notes/banner.jpg" alt="Northline in the field" />
        </div>
      </section>

      <Footer />
    </div>
  );
}
