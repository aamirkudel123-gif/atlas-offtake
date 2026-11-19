import type { Metadata } from "next";

import { InquiryForm } from "@/components/contact/InquiryForm";
import { Reveal, RevealText } from "@/components/ui/Reveal";
import { REGIONS, SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start an inquiry with Atlas Offtake for procurement, offtake and supply chain requirements. Registered in Hong Kong SAR.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-ink pt-[clamp(9rem,15vw,12rem)]">
        <div className="container-atlas pb-[var(--spacing-section)]">
          <div className="grid-atlas gap-y-8">
            <div className="col-span-12 lg:col-span-3">
              <Reveal>
                <p className="type-eyebrow text-copper">
                  <span className="inline-flex items-center gap-3">
                    <span aria-hidden className="h-px w-6 bg-current" />
                    Contact
                  </span>
                </p>
              </Reveal>
            </div>
            <div className="col-span-12 lg:col-span-9">
              <RevealText
                as="h1"
                text="Start an inquiry."
                className="type-h1 text-chalk"
              />
              <Reveal delay={300}>
                <p className="mt-8 measure type-lead text-mist">
                  Procurement, offtake and supply chain enquiries. Tell us the
                  material, the volume and the tenor.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Form and details share the page grid. */}
          <div className="mt-[clamp(3.5rem,6vw,6rem)] grid-atlas gap-y-16">
            <div className="col-span-12 lg:col-span-7">
              <Reveal>
                {/* Matches the aside's rule so both columns start on the same
                    horizontal line. */}
                <div className="border-t border-hairline pt-7">
                  <p className="type-eyebrow text-stone">Inquiry</p>
                </div>
                <div className="mt-9">
                  <InquiryForm />
                </div>
              </Reveal>
            </div>

            <aside className="col-span-12 lg:col-span-4 lg:col-start-9">
              <Reveal delay={140}>
                <div className="border-t border-hairline pt-7">
                  <p className="type-eyebrow text-stone">Direct</p>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="group mt-5 inline-block type-h3 break-words text-chalk transition-colors duration-300 hover:text-copper"
                  >
                    <span className="relative">
                      {SITE.email}
                      <span
                        aria-hidden
                        className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:origin-left group-hover:scale-x-100"
                      />
                    </span>
                  </a>
                </div>

                <div className="mt-10 border-t border-hairline pt-7">
                  <p className="type-eyebrow text-stone">Registered Office</p>
                  <address className="mt-5 type-body leading-relaxed text-chalk not-italic">
                    {SITE.address.map((line, i) => (
                      <span key={line}>
                        {line}
                        {i < SITE.address.length - 1 ? <br /> : null}
                      </span>
                    ))}
                  </address>
                </div>

                <div className="mt-10 border-t border-hairline pt-7">
                  <p className="type-eyebrow text-stone">Commercial Coverage</p>
                  <p className="mt-5 type-body text-stone">
                    Markets served from Hong Kong. Not office locations.
                  </p>
                  <ul className="mt-5 space-y-2.5">
                    {REGIONS.map((region) => (
                      <li key={region.id} className="type-body text-mist">
                        {region.name}
                      </li>
                    ))}
                  </ul>
                </div>

              </Reveal>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
