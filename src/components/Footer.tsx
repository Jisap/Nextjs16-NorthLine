import ParallaxImage from "@/components/ParallaxImage";

export default function Footer() {
  return (
    <div className="relative">
      <div className="relative h-[50vh] w-full overflow-hidden">
        <ParallaxImage src="/footer/footer.jpg" alt="" />
      </div>

      {/* TODO: two-column contact/location block */}
      <div className="bg-graphite px-8 py-16">{/* TODO */}</div>

      {/* TODO: newsletter sign-up form */}
      <div className="bg-graphite px-4 pb-16">{/* TODO */}</div>
    </div>
  );
}
