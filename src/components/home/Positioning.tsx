import { Eyebrow, ArrowLink } from "@/components/ui/Primitives";
import { Reveal, RevealText } from "@/components/ui/Reveal";
import { POSITIONING } from "@/lib/content";

export function Positioning() {
  return (
    <section aria-labelledby="positioning-heading" className="bg-paper text-ink">
      <div className="container-atlas section-y">
        <div className="grid-atlas gap-y-10">
          <div className="col-span-12 lg:col-span-3">
            <Reveal>
              <Eyebrow tone="navy">{POSITIONING.eyebrow}</Eyebrow>
            </Reveal>
          </div>

          <div className="col-span-12 lg:col-span-9">
            <RevealText
              as="h2"
              id="positioning-heading"
              text={POSITIONING.statement}
              className="type-h2 measure-wide text-ink"
            />
          </div>
        </div>

        <div className="mt-[clamp(3rem,5vw,5rem)] grid-atlas gap-y-8">
          <div className="col-span-12 lg:col-span-4 lg:col-start-4">
            <Reveal delay={120}>
              <p className="type-body text-ink/70">{POSITIONING.body[0]}</p>
            </Reveal>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:col-start-9">
            <Reveal delay={220}>
              <p className="type-body text-ink/70">{POSITIONING.body[1]}</p>
            </Reveal>
            <Reveal delay={320}>
              <ArrowLink href="/about" tone="dark" className="mt-8">
                About Atlas
              </ArrowLink>
            </Reveal>
          </div>
        </div>

        {/* Three capabilities, on the same grid anchors as everything above. */}
        <ul className="mt-[clamp(4rem,7vw,7rem)] grid-atlas gap-y-12">
          {POSITIONING.pillars.map((pillar, i) => (
            <li key={pillar.index} className="col-span-12 md:col-span-6 lg:col-span-4">
              <Reveal delay={i * 110}>
                <div className="h-px w-full bg-paper-line" />
                <div className="flex items-baseline gap-4 pt-6">
                  <span className="type-index text-copper-deep">{pillar.index}</span>
                  <h3 className="type-h3 text-ink">{pillar.title}</h3>
                </div>
                <p className="mt-5 measure type-body text-ink/65">
                  {pillar.body}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
