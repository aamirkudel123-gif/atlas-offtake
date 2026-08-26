import { ArrowLink, Eyebrow } from "@/components/ui/Primitives";
import { Reveal, RevealText } from "@/components/ui/Reveal";
import {
  COMPLIANCE_LIFECYCLE,
  COMPLIANCE_PRINCIPLES,
  FRAMEWORK_DISCLAIMER,
} from "@/lib/content";

/**
 * The one section that uses the brand navy as a ground rather than an accent.
 * Reserving it for governance gives the colour a job instead of a habit.
 */
export function ComplianceBand() {
  return (
    <section
      aria-labelledby="compliance-heading"
      className="relative isolate overflow-hidden bg-navy-abyss"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(80% 70% at 20% 0%, rgba(15,42,98,0.85) 0%, rgba(6,18,46,0) 65%)",
        }}
      />

      <div className="container-atlas section-y">
        <div className="grid-atlas gap-y-8">
          <div className="col-span-12 lg:col-span-3">
            <Reveal>
              <Eyebrow>Governance</Eyebrow>
            </Reveal>
          </div>
          <div className="col-span-12 lg:col-span-9">
            <RevealText
              as="h2"
              id="compliance-heading"
              text="Compliance is the foundation of trust."
              className="type-h2 text-chalk"
            />
            <Reveal delay={300}>
              <p className="mt-7 measure type-lead text-mist">
                Large industrial transactions depend on governance that holds up
                to scrutiny. Diligence, screening and chain-of-custody sit inside
                every trade rather than alongside it.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Four principles */}
        <ul className="mt-[clamp(3.5rem,6vw,6rem)] grid-atlas gap-y-10">
          {COMPLIANCE_PRINCIPLES.map((principle, i) => (
            <li
              key={principle.index}
              className="col-span-12 sm:col-span-6 lg:col-span-3"
            >
              <Reveal delay={i * 90}>
                <div className="h-px w-full bg-chalk/15" />
                <span className="mt-6 block type-index text-copper">
                  {principle.index}
                </span>
                <h3 className="mt-4 type-h3 text-chalk">{principle.title}</h3>
                <p className="mt-4 type-body text-mist">{principle.body}</p>
              </Reveal>
            </li>
          ))}
        </ul>

        {/* Lifecycle */}
        <div className="mt-[clamp(4rem,7vw,7rem)]">
          <Reveal>
            <p className="type-eyebrow text-stone">Compliance lifecycle</p>
          </Reveal>

          <ol className="mt-8 grid grid-cols-1 gap-x-[clamp(1rem,2vw,2rem)] gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
            {COMPLIANCE_LIFECYCLE.map((step, i) => (
              <li key={step.index}>
                <Reveal delay={i * 70}>
                  <div className="h-px w-full bg-chalk/15" />
                  <span className="mt-6 block type-index text-copper">
                    {step.index}
                  </span>
                  <h3 className="mt-4 text-[1.0625rem] font-medium text-chalk">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[0.875rem] leading-relaxed text-mist/85">
                    {step.body}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-12 grid-atlas gap-y-8">
          <div className="col-span-12 lg:col-span-7">
            <Reveal>
              <p className="text-[0.8125rem] leading-relaxed text-mist/75">
                {FRAMEWORK_DISCLAIMER}
              </p>
            </Reveal>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:col-start-9 lg:justify-self-end">
            <Reveal delay={120}>
              <ArrowLink href="/compliance">
                Compliance &amp; governance
              </ArrowLink>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
