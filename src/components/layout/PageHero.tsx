import Image from "next/image";

import { Reveal, RevealText } from "@/components/ui/Reveal";

/**
 * Shared page opener. Every interior page uses the same anchors and the same
 * scrim recipe so headers never drift between pages.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  image,
  imageAlt,
  objectPosition = "50% 50%",
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  image: string;
  imageAlt: string;
  objectPosition?: string;
}) {
  return (
    <section className="relative isolate flex min-h-[30rem] flex-col justify-end overflow-hidden pt-[clamp(9rem,16vw,13rem)] pb-[clamp(3.5rem,6vw,5.5rem)]">
      <div aria-hidden className="absolute inset-0 -z-20">
        <Image
          src={image}
          alt=""
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition }}
        />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/70 to-ink/40"
      />

      {/* Screen-reader description of the decorative background. */}
      <span className="sr-only">{imageAlt}</span>

      <div className="container-atlas">
        <div className="grid-atlas gap-y-8">
          <div className="col-span-12 lg:col-span-3">
            <Reveal>
              <p className="type-eyebrow text-copper">
                <span className="inline-flex items-center gap-3">
                  <span aria-hidden className="h-px w-6 bg-current" />
                  {eyebrow}
                </span>
              </p>
            </Reveal>
          </div>

          <div className="col-span-12 lg:col-span-9">
            <RevealText as="h1" text={title} className="type-h1 text-chalk" />
            {lead ? (
              <Reveal delay={340}>
                <p className="mt-8 measure type-lead text-mist">{lead}</p>
              </Reveal>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
