import Image from "next/image";

import { Button } from "@/components/ui/Primitives";
import { Reveal, RevealText } from "@/components/ui/Reveal";
import { HERO } from "@/lib/content";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[640px] h-svh flex-col justify-end overflow-hidden">
      {/*
        Cinematic ground.

        `sizes` deliberately overstates the layout width: the hero-media drift
        scales the image to 1.10, and a candidate picked for 100vw would be
        stretched across those extra pixels and go soft.

        The focal point shifts on small screens so the crop keeps the cranes
        rather than an empty band of sky.
      */}
      <div aria-hidden className="absolute inset-0 -z-20">
        <Image
          src="/images/hero-port.jpg"
          alt=""
          fill
          priority
          quality={90}
          sizes="112vw"
          className="hero-media object-cover object-[68%_45%] md:object-[50%_42%]"
        />
      </div>

      {/* Deliberate, layered scrim: enough to guarantee contrast, not enough
          to turn the photograph to mud. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/60 to-ink/25"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/55 via-ink/10 to-transparent"
      />

      <div className="container-atlas pb-[clamp(3.5rem,7vw,6rem)]">
        <div className="grid-atlas items-end gap-y-10">
          <div className="col-span-12 xl:col-span-9">
            <Reveal delay={150}>
              <p className="type-eyebrow text-copper">
                {/* The rule is dropped on small screens so the eyebrow fits on
                    one line instead of stranding the separator. */}
                <span className="inline-flex items-center gap-3">
                  <span
                    aria-hidden
                    className="hidden h-px w-8 bg-current sm:block"
                  />
                  {HERO.eyebrow}
                </span>
              </p>
            </Reveal>

            <RevealText
              as="h1"
              text={HERO.headline}
              className="mt-7 type-display text-chalk"
              offset={2}
            />
          </div>

          <div className="col-span-12 md:col-span-8 lg:col-span-6 xl:col-span-5">
            <Reveal delay={620}>
              <p className="measure type-lead text-mist">{HERO.lead}</p>
            </Reveal>

            <Reveal delay={760}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
                <Button href={HERO.primary.href} variant="solid">
                  {HERO.primary.label}
                </Button>
                <Button href={HERO.secondary.href} variant="outline">
                  {HERO.secondary.label}
                </Button>
              </div>
            </Reveal>
          </div>

          {/* Scroll cue — sits on the container's right anchor, aligned to the
              baseline of the actions rather than floating mid-canvas. */}
          <div className="col-span-3 col-start-10 hidden self-end justify-self-end pb-1 xl:block">
            <Reveal delay={1000}>
              <div className="flex items-center gap-4">
                <span className="type-index text-stone">Scroll</span>
                <span aria-hidden className="relative block h-12 w-px bg-chalk/15">
                  <span className="scroll-cue absolute inset-x-0 top-0 h-5 bg-copper" />
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <div aria-hidden className="container-atlas">
        <div className="h-px w-full bg-chalk/12" />
      </div>
    </section>
  );
}
