import Image from "next/image";

import { Button } from "@/components/ui/Primitives";
import { Reveal, RevealText } from "@/components/ui/Reveal";
import { CLOSING_STATEMENT, SITE } from "@/lib/content";

export function InquiryCTA() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="relative isolate overflow-hidden bg-ink"
    >
      <div aria-hidden className="absolute inset-0 -z-20">
        <Image
          src="/images/cta-band.jpg"
          alt=""
          fill
          loading="lazy"
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-ink/82" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/70 to-ink/40"
      />

      <div className="container-atlas section-y">
        <div className="grid-atlas gap-y-10">
          <div className="col-span-12 lg:col-span-7">
            <RevealText
              as="h2"
              id="cta-heading"
              text={CLOSING_STATEMENT}
              className="type-h2 text-chalk"
            />
          </div>

          <div className="col-span-12 lg:col-span-4 lg:col-start-9">
            <Reveal delay={280}>
              <p className="type-body text-mist">
                Tell us the material, the volume and the tenor. We will come back
                with a structure.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <Button href="/contact" variant="solid">
                  Start an Inquiry
                </Button>
              </div>

              <a
                href={`mailto:${SITE.email}`}
                className="group mt-8 inline-block type-index text-stone transition-colors duration-300 hover:text-copper"
              >
                <span className="relative">
                  {SITE.email}
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:origin-left group-hover:scale-x-100"
                  />
                </span>
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
