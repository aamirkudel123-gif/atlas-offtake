import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { InquiryCTA } from "@/components/home/InquiryCTA";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  COMMODITIES,
  EXTENDED_PORTFOLIO,
  EXTENDED_PORTFOLIO_NOTE,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Commodities",
  description:
    "Copper, lithium, cobalt, nickel, iron ore and rare earths — procured to specification for industrial consumers, alongside a broader portfolio of industrial and critical commodities.",
  alternates: { canonical: "/commodities" },
};

export default function CommoditiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Commodities"
        title="The materials that build economies."
        lead="We do not simply supply raw materials. We design procurement solutions that connect qualified producers with industrial consumers — reliably, transparently and with precision."
        image="/images/commodities-hero.jpg"
        imageAlt="A conveyor discharging bulk material onto a large stockpile."
        objectPosition="50% 42%"
        scrim="strong"
      />

      {/* Full-bleed alternating editorial rows. */}
      <section aria-labelledby="portfolio-heading" className="bg-ink">
        <div className="container-atlas section-y">
          <SectionHeader
            id="portfolio-heading"
            eyebrow="Portfolio"
            title="Six core commodities."
            lead="Each procurement opportunity is assessed against contracted specification, with independent inspection arranged where required."
          />

          <ul className="mt-[clamp(3.5rem,6vw,6rem)]">
            {COMMODITIES.map((commodity, i) => {
              const reversed = i % 2 === 1;
              return (
                <li key={commodity.slug}>
                  <Reveal>
                    <article className="group grid-atlas items-center gap-y-8 border-t border-hairline py-[clamp(2.5rem,4vw,4rem)]">
                      <div
                        className={`col-span-12 lg:col-span-5 ${
                          reversed ? "lg:order-2 lg:col-start-8" : ""
                        }`}
                      >
                        <div className="relative aspect-4/3 w-full overflow-hidden bg-charcoal">
                          <Image
                            src={commodity.image}
                            alt={commodity.imageAlt}
                            fill
                            quality={90}
                            priority={i === 0}
                            loading={i === 0 ? undefined : "lazy"}
                            sizes="(max-width: 1024px) 92vw, 40vw"
                            className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                          />
                        </div>
                      </div>

                      <div
                        className={`col-span-12 lg:col-span-6 ${
                          reversed ? "lg:order-1 lg:col-start-1" : "lg:col-start-7"
                        }`}
                      >
                        <div className="flex items-baseline gap-4">
                          <span className="type-index text-copper">
                            {commodity.index}
                          </span>
                          <span className="type-index text-stone">
                            {commodity.category.toUpperCase()}
                          </span>
                        </div>

                        <h3 className="mt-6 type-h2 text-chalk">
                          {commodity.name}
                        </h3>
                        <p className="mt-5 measure type-lead text-mist">
                          {commodity.description}
                        </p>

                        <Link
                          href="/contact"
                          className="group/link mt-9 inline-flex items-baseline gap-2.5 type-eyebrow text-chalk transition-colors duration-300 hover:text-copper"
                        >
                          <span className="relative">
                            Enquire
                            <span
                              aria-hidden
                              className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/link:origin-left group-hover/link:scale-x-100"
                            />
                          </span>
                          <svg
                            aria-hidden
                            width="14"
                            height="8"
                            viewBox="0 0 14 8"
                            fill="none"
                            className="translate-y-px transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/link:translate-x-1"
                          >
                            <path
                              d="M0 4h12M9 1l3 3-3 3"
                              stroke="currentColor"
                              strokeWidth="1"
                              strokeLinecap="square"
                            />
                          </svg>
                        </Link>
                      </div>
                    </article>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Extended portfolio */}
      <section aria-labelledby="extended-heading" className="bg-paper text-ink">
        <div className="container-atlas section-y">
          <SectionHeader
            id="extended-heading"
            eyebrow="Extended portfolio"
            title="Procurement capability beyond the core six."
            lead="Our procurement capabilities extend across a broader range of industrial and critical commodities."
            tone="light"
          />

          <ul className="mt-[clamp(2.5rem,4vw,4rem)] grid-atlas gap-y-px">
            {EXTENDED_PORTFOLIO.map((name, i) => (
              <li key={name} className="col-span-12 sm:col-span-6 lg:col-span-4">
                <Reveal delay={i * 60}>
                  <div className="flex items-baseline gap-5 border-t border-paper-line py-6">
                    <span className="type-index text-copper-deep">
                      {String(i + 7).padStart(2, "0")}
                    </span>
                    <span className="type-h3 text-ink">{name}</span>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>

          <div className="mt-10 grid-atlas">
            <div className="col-span-12 lg:col-span-8">
              <Reveal>
                <p className="text-[0.875rem] leading-relaxed text-ink/60">
                  {EXTENDED_PORTFOLIO_NOTE}
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <InquiryCTA />
    </>
  );
}
