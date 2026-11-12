import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowLink } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { SOLUTIONS } from "@/lib/content";

/**
 * Each solution as a full-width numbered row rather than an equal card.
 * The number sits in the left margin so the rows share the section's anchors.
 */
export function SolutionsEditorial() {
  return (
    <section aria-labelledby="solutions-heading" className="bg-paper text-ink">
      <div className="container-atlas section-y">
        <SectionHeader
          id="solutions-heading"
          eyebrow="Solutions"
          title="Services engineered for certainty."
          lead="Three disciplines that carry a transaction from first conversation to delivered material."
          tone="light"
        />

        <ul className="mt-[clamp(3rem,5vw,5rem)]">
          {SOLUTIONS.map((solution, i) => (
            <li key={solution.index}>
              <Reveal delay={i * 90}>
                <div className="group grid-atlas items-baseline gap-y-5 border-t border-paper-line py-[clamp(2rem,3.4vw,3.25rem)] transition-colors duration-500 hover:border-navy/40">
                  <div className="col-span-12 lg:col-span-3">
                    <span className="type-index text-copper-deep">
                      {solution.index}
                    </span>
                  </div>

                  <div className="col-span-12 lg:col-span-5">
                    <h3 className="type-h3 text-ink">{solution.title}</h3>
                    <p className="mt-4 measure type-body text-ink/65">
                      {solution.summary}
                    </p>
                  </div>

                  <div className="col-span-12 lg:col-span-4">
                    <ul className="space-y-3">
                      {solution.points.map((point) => (
                        <li
                          key={point}
                          className="flex items-baseline gap-3 type-body text-ink/70"
                        >
                          <span
                            aria-hidden
                            className="mt-2 h-px w-4 shrink-0 bg-copper-deep"
                          />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="border-t border-paper-line pt-8">
          <Reveal>
            <ArrowLink href="/solutions" tone="dark">
              Explore all solutions
            </ArrowLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
