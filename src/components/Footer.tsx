import ParallaxImage from "@/components/ParallaxImage";

export default function Footer() {
  return (
    <div className="relative">
      <div className="relative h-[50vh] w-full overflow-hidden">
        <ParallaxImage src="/footer/footer.jpg" alt="" />
      </div>

      <div className="flex justify-between gap-8 bg-graphite px-8 pb-16 pt-16 mobile:flex-col">
        <div>
          <p className="text-sand">Have Question</p>
          <h3 className="text-sand">Get in Touch</h3>
          <p className="font-display uppercase text-rust">
            hello@Northline.com
            <br />
            LinkedIn / Careers
          </p>
          <p className="text-sand">
            @ 2026 NorthLine
          </p>
        </div>

        <div>
          <p className="text-sand">Planning a Visit?</p>
          <h3 className="text-sand">Our Workshop</h3>
          <p className="font-display uppercase text-rust">
            118 Foundry Row
            <br />
            Portland, Or 97209, USA
          </p>
          <p className="text-sand">Build With Script Valley</p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 bg-graphite px-4 pb-16 text-center">
        <p className="font-display text-3xl uppercase text-rust">
          Get Field Notes In Your inbox.
        </p>
        <p className="text-sand">
          New gear, field recordings, and dispatches from the field.
        </p>
        <span className="text-sand/70">No Span. Unsubscribe any time</span>

        <div className="mt-4 flex w-full max-w-md flex-col gap-3">
          <input
            type="text"
            placeholder="First Name"
            className="border-b border-sand/40 bg-transparent px-2 py-2 text-sand placeholder:text-sand/50"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="border-b border-sand/40 bg-transparent px-2 py-2 text-sand placeholder:text-sand/50"
          />
          <input
            type="email"
            placeholder="Email Address"
            className="border-b border-sand/40 bg-transparent px-2 py-2 text-sand placeholder:text-sand/50"
          />

          <button className="mt-2 !bg-rust px-6 py-3 text-graphite">
            <span className="font-display uppercase">Submit</span>
          </button>
        </div>
      </div>
    </div>
  );
}
