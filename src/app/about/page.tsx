import type { Metadata } from "next";
import Image from "next/image";

import { InquiryCTA } from "@/components/home/InquiryCTA";
import { PageHero } from "@/components/layout/PageHero";
import { Eyebrow } from "@/components/ui/Primitives";
import { Reveal, RevealText } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ABOUT } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Atlas Offtake bridges producers and industry across global commodity markets through precision logistics, ethical procurement and long-term partnerships.",
  alternates: { canonical: "/about" },
};

const PILLARS = [ABOUT.vision, ABOUT.mission, ABOUT.approach];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={ABOUT.tagline}
        lead={ABOUT.lead}
        image="/images/about-hero.jpg"
        imageAlt="Four counterparties standing together above a container terminal at dusk, the city beyond."
        objectPosition="50% 42%"
      />

      {/* Vision / Mission / Approach */}
      <section aria-labelledby="foundation-heading" className="bg-paper text-ink">
        <div className="container-atlas section-y">
          <SectionHeader
            id="foundation-heading"
            eyebrow="Foundation"
            title="What the firm is for."
            tone="light"
          />

          <dl className="mt-[clamp(3rem,5vw,5rem)] grid-atlas gap-y-12">
            {PILLARS.map((pillar, i) => (
              <div
                key={pillar.title}
                className="col-span-12 md:col-span-6 lg:col-span-4"
              >
                <Reveal delay={i * 110}>
                  <div className="h-px w-full bg-paper-line" />
                  <dt className="pt-6 type-h3 text-ink">{pillar.title}</dt>
                  <dd className="mt-5 measure type-body text-ink/65">
                    {pillar.body}
                  </dd>
                </Reveal>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Founding principle */}
      <section className="relative isolate overflow-hidden bg-navy-abyss">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(75% 80% at 25% 10%, rgba(15,42,98,0.8) 0%, rgba(6,18,46,0) 70%)",
          }}
        />
        <div className="container-atlas section-y">
          <div className="grid-atlas gap-y-8">
            <div className="col-span-12 lg:col-span-3">
              <Reveal>
                <Eyebrow>Principle</Eyebrow>
              </Reveal>
            </div>
            <div className="col-span-12 lg:col-span-9">
              <blockquote>
                <RevealText
                  as="p"
                  text={ABOUT.quote.body}
                  className="type-h2 text-chalk"
                />
                <Reveal delay={420}>
                  <footer className="mt-9 type-index text-copper">
                    {ABOUT.quote.attribution}
                  </footer>
                </Reveal>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section aria-labelledby="values-heading" className="bg-ink">
        <div className="container-atlas section-y">
          <SectionHeader
            id="values-heading"
            eyebrow="Values"
            title="Four commitments, applied to every engagement."
          />

          <div className="mt-[clamp(3rem,5vw,5rem)] grid-atlas items-start gap-y-12">
            <ul className="col-span-12 lg:col-span-7">
              {ABOUT.values.map((value, i) => (
                <li key={value.index}>
                  <Reveal delay={i * 90}>
                    <div className="border-t border-hairline py-[clamp(1.5rem,2.4vw,2.25rem)]">
                      <div className="flex items-baseline gap-5">
                        <span className="type-index text-copper">
                          {value.index}
                        </span>
                        <h3 className="type-h3 text-chalk">{value.title}</h3>
                      </div>
                      <p className="mt-4 measure pl-[3.1rem] type-body text-mist">
                        {value.body}
                      </p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>

            <div className="col-span-12 lg:col-span-4 lg:col-start-9">
              <Reveal delay={160}>
                <div className="relative aspect-4/5 w-full overflow-hidden bg-charcoal">
                  <Image
                    src="/images/about-partnership.jpg"
                    alt="Financial district towers at blue hour across the river."
                    fill
                    loading="lazy"
                    sizes="(max-width: 1024px) 92vw, 32vw"
                    className="object-cover object-[62%_50%]"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <InquiryCTA />
    </>
  );
}
