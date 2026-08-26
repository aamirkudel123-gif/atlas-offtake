import type { Metadata } from "next";

import { InquiryCTA } from "@/components/home/InquiryCTA";
import { PageHero } from "@/components/layout/PageHero";
import { StickySolutions } from "@/components/solutions/StickySolutions";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ENGAGEMENT } from "@/lib/content";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Strategic procurement, structured offtake, supply chain advisory and risk & compliance — the commercial architecture that moves materials between producers and industry.",
  alternates: { canonical: "/solutions" },
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="Services engineered for certainty."
        lead="We do not sell products. We build the commercial architecture that moves materials between producers and industry — reliably, and at scale."
        image="/images/solutions-hero.jpg"
        imageAlt="The interior of a heavy industrial plant lit by the glow of molten metal."
        objectPosition="50% 50%"
      />

      <section aria-labelledby="disciplines-heading" className="bg-ink">
        <div className="container-atlas section-y">
          <SectionHeader
            id="disciplines-heading"
            eyebrow="Disciplines"
            title="Four disciplines, one mandate."
          />

          <div className="mt-[clamp(3.5rem,6vw,6rem)]">
            <StickySolutions />
          </div>
        </div>
      </section>

      {/* Engagement */}
      <section aria-labelledby="process-heading" className="bg-paper text-ink">
        <div className="container-atlas section-y">
          <SectionHeader
            id="process-heading"
            eyebrow="Process"
            title="How an engagement runs."
            lead="Five stages from first conversation to ongoing performance reporting."
            tone="light"
          />

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
