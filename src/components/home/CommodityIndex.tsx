import Image from "next/image";
import Link from "next/link";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowLink } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import {
  COMMODITIES,
  EXTENDED_PORTFOLIO,
  EXTENDED_PORTFOLIO_NOTE,
} from "@/lib/content";

/**
 * Editorial commodity panels.
 *
 * The first panel is deliberately wider than the rest so the grid reads as a
 * composed spread rather than six identical cards.
 */
export function CommodityIndex() {
  const [lead, ...rest] = COMMODITIES;

  return (
    <section aria-labelledby="commodities-heading" className="bg-ink">
      <div className="container-atlas section-y">
        <SectionHeader
          id="commodities-heading"
          eyebrow="Portfolio"
          title="The materials that build economies."
          lead="Base metals, battery materials, bulk commodities and critical minerals, procured to specification and delivered against contract."
        />

        <div className="mt-[clamp(3.5rem,6vw,6rem)] grid-atlas gap-y-6">
          {/* Lead panel — wide. `sizes` is declared in px at the top end
              because the container is capped at 1440px, so the panel never
              grows past ~845px however wide the viewport gets. Declaring it as
              a vw fraction makes the browser pick a candidate that is too
              small, and the photograph goes soft. */}
          <div className="col-span-12 lg:col-span-8">
            <CommodityPanel
              commodity={lead}
              aspect="aspect-16/10"
              sizes="(max-width: 640px) 92vw, (max-width: 1024px) 94vw, 920px"
              priority
            />
          </div>

          {/* Second panel — tall companion */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-4">
            <CommodityPanel
              commodity={rest[0]}
              aspect="aspect-16/10 lg:aspect-auto lg:h-full"
              sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 470px"
            />
          </div>

          {/* Remaining four */}
          {rest.slice(1).map((commodity, i) => (
            <div
              key={commodity.slug}
              className="col-span-12 sm:col-span-6 lg:col-span-3"
            >
              <CommodityPanel
                commodity={commodity}
                aspect="min-h-[20rem] lg:min-h-[24rem]"
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 350px"
                delay={i * 80}
              />
            </div>
          ))}
        </div>

        {/* Extended portfolio */}
        <div className="mt-[clamp(3rem,5vw,5rem)] grid-atlas items-end gap-y-8">
          <div className="col-span-12 lg:col-span-7">
            <Reveal>
              <p className="type-eyebrow text-stone">Also procured</p>
              <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
                {EXTENDED_PORTFOLIO.map((name) => (
                  <li key={name} className="type-body text-mist">
                    {name}
                  </li>
                ))}
              </ul>
              <p className="mt-6 measure text-[0.8125rem] leading-relaxed text-stone">
                {EXTENDED_PORTFOLIO_NOTE}
              </p>
            </Reveal>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:col-start-9 lg:justify-self-end">
            <Reveal delay={140}>
              <ArrowLink href="/commodities">View all commodities</ArrowLink>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function CommodityPanel({
  commodity,
  aspect,
  sizes,
  priority = false,
  delay = 0,
}: {
  commodity: (typeof COMMODITIES)[number];
  aspect: string;
  sizes: string;
  priority?: boolean;
  delay?: number;
}) {
  return (
    <Reveal delay={delay} className="h-full">
      <Link
        href="/commodities"
        className="group relative block h-full overflow-hidden bg-charcoal"
        aria-label={`${commodity.name} — ${commodity.description}`}
      >
        <div className={`relative h-full w-full ${aspect}`}>
          <Image
            src={commodity.image}
            alt={commodity.imageAlt}
            fill
            quality={90}
            priority={priority}
            loading={priority ? undefined : "lazy"}
            sizes={sizes}
            /* These cards are small and sit under a caption, so they stay on
               cover even for a graphic: contained, a chart here is unreadable
               and fights the text. The full chart is shown on /commodities. */
            className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
          />

          {/* Contrast floor for the caption. */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/5"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-navy/0 transition-colors duration-700 group-hover:bg-navy/15"
          />

          {/* In flow rather than absolutely positioned. The four small cards
              carry no fixed aspect, so a longer description grows the card
              (and, via grid stretch, its whole row) instead of being clipped. */}
          <div className="relative flex h-full flex-col justify-between gap-10 p-6 lg:p-7">
            <div className="flex items-start justify-between gap-4">
              <span className="type-index text-copper">{commodity.index}</span>
              <span className="type-index text-right text-stone">
                {commodity.category.toUpperCase()}
              </span>
            </div>

            <div>
              <h3 className="type-h3 text-chalk">{commodity.name}</h3>
              <p className="mt-2.5 measure-tight type-body text-mist">
                {commodity.description}
              </p>

              <span className="mt-5 inline-flex items-center gap-2.5 type-eyebrow text-chalk transition-colors duration-300 group-hover:text-copper">
                Explore Commodity
                <svg
                  aria-hidden
                  width="14"
                  height="8"
                  viewBox="0 0 14 8"
                  fill="none"
                  className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
                >
                  <path
                    d="M0 4h12M9 1l3 3-3 3"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="square"
                  />
                </svg>
              </span>
            </div>
          </div>

          {/* Restrained brand accent on hover. */}
          <span
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-copper transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
          />
        </div>
      </Link>
    </Reveal>
  );
}
