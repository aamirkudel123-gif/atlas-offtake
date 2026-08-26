import type { Metadata } from "next";

import { InquiryCTA } from "@/components/home/InquiryCTA";
import { PageHero } from "@/components/layout/PageHero";
import { SupplyNetwork } from "@/components/network/SupplyNetwork";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ECOSYSTEM, REGIONS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Global Network",
  description:
    "Atlas Offtake connects producers, inspection, logistics, financial partners, processors and industrial consumers across Africa, Asia-Pacific, the Middle East, Europe, Latin America and North America.",
  alternates: { canonical: "/global-network" },
};

export default function GlobalNetworkPage() {
  return (
    <>
      <PageHero
        eyebrow="Global Network"
        title="Connecting partners, markets and opportunities."
        lead="Our strength lies not in owning infrastructure, but in connecting the right partners, markets and opportunities with precision, transparency and long-term commitment."
        image="/images/network-hero.jpg"
        imageAlt="A single bulk carrier crossing deep open ocean, seen from high above."
        objectPosition="50% 50%"
      />

      {/* The interactive network */}
      <section aria-labelledby="corridors-heading" className="bg-ink">
        <div className="container-atlas section-y">
          <SectionHeader
            id="corridors-heading"
            eyebrow="Corridors"
            title="Origin, coordination, processing, demand."
            lead="Six regions and the commercial corridors that run between them."
          />

          <div className="mt-[clamp(3rem,5vw,5rem)]">
            <SupplyNetwork />
          </div>
        </div>
      </section>

      {/* Regions in full */}
      <section aria-labelledby="regions-heading" className="bg-charcoal">
        <div className="container-atlas section-y">
          <SectionHeader
            id="regions-heading"
            eyebrow="Regions"
            title="Where Atlas operates commercially."
          />

          <ul className="mt-[clamp(3rem,5vw,5rem)] grid-atlas gap-y-10">
            {REGIONS.map((region, i) => (
              <li
                key={region.id}
                className="col-span-12 md:col-span-6 lg:col-span-4"
              >
                <Reveal delay={i * 80}>
                  <div className="h-px w-full bg-hairline" />
                  <div className="flex items-baseline justify-between gap-4 pt-6">
                    <h3 className="type-h3 text-chalk">{region.name}</h3>
                    <span className="type-index text-copper">
                      {region.role.toUpperCase()}
                    </span>
                  </div>
                  <p className="mt-5 type-body text-mist">{region.body}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Ecosystem */}
      <section aria-labelledby="ecosystem-heading" className="bg-paper text-ink">
        <div className="container-atlas section-y">
          <SectionHeader
            id="ecosystem-heading"
            eyebrow="The Atlas Ecosystem"
            title="Six counterparties, coordinated."
            lead="Atlas coordinates the participants that move a commodity from origin to industrial consumer. It does not own them."
            tone="light"
          />

          <ol className="mt-[clamp(3rem,5vw,5rem)] grid-atlas gap-y-12">
            {ECOSYSTEM.map((node, i) => (
              <li
                key={node.index}
                className="col-span-12 md:col-span-6 lg:col-span-4"
              >
                <Reveal delay={i * 70}>
                  <div className="h-px w-full bg-paper-line" />
                  <span className="mt-6 block type-index text-copper-deep">
                    {node.index}
                  </span>
                  <h3 className="mt-4 type-h3 text-ink">{node.title}</h3>
                  <p className="mt-4 measure type-body text-ink/70">
                    {node.body}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <InquiryCTA />
    </>
  );
}
