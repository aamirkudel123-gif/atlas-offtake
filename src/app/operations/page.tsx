import type { Metadata } from "next";

import { InquiryCTA } from "@/components/home/InquiryCTA";
import { PitToPort } from "@/components/home/PitToPort";
import { PageHero } from "@/components/layout/PageHero";
import { Eyebrow } from "@/components/ui/Primitives";
import { Reveal, RevealText } from "@/components/ui/Reveal";
import { ENGAGEMENT } from "@/lib/content";

export const metadata: Metadata = {
  title: "Operations",
  description:
    "Disciplined operations. Reliable outcomes. From sourcing to delivery, every stage is coordinated with precision — six disciplined stages, from pit to port.",
  alternates: { canonical: "/operations" },
};

export default function OperationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Operations"
        title="From source to market. Coordinated end to end."
        lead="Disciplined operations. Reliable outcomes. From sourcing to delivery, every stage is coordinated with precision."
        image="/images/operations-hero.jpg"
        imageAlt="Two engineers above a working open-pit mine at dusk, the haul roads, plant and loading berth below."
        objectPosition="50% 50%"
      />

      <PitToPort ground="ink" />

      {/* Engagement sequence */}
      <section aria-labelledby="engagement-heading" className="bg-paper text-ink">
        <div className="container-atlas section-y">
          <div className="grid-atlas gap-y-8">
            <div className="col-span-12 lg:col-span-3">
              <Reveal>
                <Eyebrow tone="navy">Engagement</Eyebrow>
              </Reveal>
            </div>
            <div className="col-span-12 lg:col-span-9">
              <RevealText
                as="h2"
                id="engagement-heading"
                text="Execution is where strategy becomes performance."
                className="type-h2 text-ink"
              />
              <Reveal delay={320}>
                <p className="mt-7 measure type-lead text-ink/60">
                  Disciplined procurement, structured contracts and reliable
                  delivery — sequenced the same way on every mandate.
                </p>
              </Reveal>
            </div>
          </div>

          <ol className="mt-[clamp(3rem,5vw,5rem)] grid grid-cols-1 gap-x-[clamp(1rem,2vw,2rem)] gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
            {ENGAGEMENT.map((step, i) => (
              <li key={step.index}>
                <Reveal delay={i * 80}>
                  <div className="h-px w-full bg-paper-line" />
                  <span className="mt-6 block type-index text-copper-deep">
                    {step.index}
                  </span>
                  <h3 className="mt-4 text-[1.0625rem] font-medium text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[0.875rem] leading-relaxed text-ink/70">
                    {step.body}
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
