import type { Metadata } from "next";

import { ComplianceBand } from "@/components/home/ComplianceBand";
import { InquiryCTA } from "@/components/home/InquiryCTA";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FRAMEWORK_DISCLAIMER, FRAMEWORKS, SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Compliance",
  description:
    "Regulatory excellence, responsible sourcing, risk management and transparency. Atlas Offtake's approach to diligence is informed by internationally recognised frameworks.",
  alternates: { canonical: "/compliance" },
};

export default function CompliancePage() {
  return (
    <>
      <PageHero
        eyebrow="Compliance"
        title="Compliance and governance."
        lead="Compliance is integrated into the procurement process and supports the trust required for long-term global partnerships."
        image="/images/compliance-hero.jpg"
        imageAlt="A laboratory bench arranged with analytical instruments."
        objectPosition="50% 50%"
        scrim="strong"
      />

      <ComplianceBand />

      {/* Frameworks */}
      <section aria-labelledby="frameworks-heading" className="bg-paper text-ink">
        <div className="container-atlas section-y">
          <SectionHeader
            id="frameworks-heading"
            eyebrow="Frameworks"
            title="Informed by internationally recognised standards."
            tone="light"
          />

          <ul className="mt-[clamp(2.5rem,4vw,4rem)]">
            {FRAMEWORKS.map((framework, i) => (
              <li key={framework.name}>
                <Reveal delay={i * 70}>
                  <div className="grid-atlas items-baseline gap-y-3 border-t border-paper-line py-[clamp(1.5rem,2.4vw,2.25rem)]">
                    <span className="col-span-12 type-index text-copper-deep lg:col-span-1">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="col-span-12 type-h3 text-ink lg:col-span-6">
                      {framework.name}
                    </h3>
                    <p className="col-span-12 type-body text-ink/60 lg:col-span-5">
                      {framework.scope}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>

          {/* The wording here matters — see FRAMEWORK_DISCLAIMER. */}
          <div className="mt-10 grid-atlas">
            <div className="col-span-12 lg:col-span-8 lg:col-start-2">
              <Reveal>
                <p className="border-l-2 border-copper-deep pl-6 text-[0.875rem] leading-relaxed text-ink/60">
                  {FRAMEWORK_DISCLAIMER}
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance contact */}
      <section aria-labelledby="compliance-contact-heading" className="bg-ink">
        <div className="container-atlas section-y">
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
              <Reveal>
                <h2
                  id="compliance-contact-heading"
                  className="type-h3 text-chalk"
                >
                  Compliance enquiries
                </h2>
                <a
                  href={`mailto:${SITE.complianceEmail}`}
                  className="group mt-6 inline-block type-lead text-copper transition-colors duration-300 hover:text-copper-lift"
                >
                  <span className="relative">
                    {SITE.complianceEmail}
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

      <InquiryCTA />
    </>
  );
}
