"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { Eyebrow } from "@/components/ui/Primitives";
import { STAGES } from "@/lib/content";

/** Matches Tailwind's `lg` breakpoint. */
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return isDesktop;
}

export function PitToPort() {
  const isDesktop = useIsDesktop();

  return (
    <section aria-labelledby="journey-heading" className="bg-charcoal">
      <div className="container-atlas pt-[var(--spacing-section)]">
        <Eyebrow>Operations</Eyebrow>
        <div className="mt-8 grid-atlas items-end gap-y-6">
          <h2
            id="journey-heading"
            className="col-span-12 type-h2 text-chalk lg:col-span-6"
          >
            From Pit to Port.
          </h2>
          <p className="col-span-12 measure type-lead text-stone lg:col-span-5 lg:col-start-8">
            Every stage. Every transaction. Six disciplined stages, coordinated
            end to end.
          </p>
        </div>
      </div>

      {/* Desktop: pinned stage with scroll-linked progression.
          Mobile: the same six stages, read vertically. */}
      {isDesktop === null ? (
        <div className="container-atlas pb-[var(--spacing-section)]">
          <StageList />
        </div>
      ) : isDesktop ? (
        <PinnedJourney />
      ) : (
        <div className="container-atlas pb-[var(--spacing-section)]">
          <StageList />
        </div>
      )}
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Desktop — pinned                                                           */
/* -------------------------------------------------------------------------- */

function PinnedJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const node = containerRef.current;
      if (!node) return;

      const rect = node.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return;

      const raw = -rect.top / scrollable;
      const clamped = Math.min(1, Math.max(0, raw));
      setProgress(clamped);
      setIndex(
        Math.min(STAGES.length - 1, Math.floor(clamped * STAGES.length)),
      );
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative mt-20"
      style={{ height: `${STAGES.length * 90}svh` }}
    >
      <div className="sticky top-0 flex h-svh items-center overflow-hidden">
        <div className="container-atlas w-full">
          <div className="grid-atlas items-center gap-y-10">
            {/* Stage list */}
            <ol className="col-span-5 relative">
              {/* Progress rail */}
              <span
                aria-hidden
                className="absolute left-0 top-2 bottom-2 w-px bg-hairline"
              />
              <span
                aria-hidden
                className="absolute left-0 top-2 w-px origin-top bg-copper transition-transform duration-300 ease-out"
                style={{
                  height: "calc(100% - 1rem)",
                  transform: `scaleY(${progress})`,
                }}
              />

              {STAGES.map((stage, i) => {
                const isActive = i === index;
                return (
                  <li key={stage.index} className="relative pl-8">
                    <div
                      className={`border-b py-[clamp(0.85rem,1.4vw,1.35rem)] transition-colors duration-500 ${
                        isActive ? "border-copper/40" : "border-transparent"
                      }`}
                    >
                      <div className="flex items-baseline gap-5">
                        <span
                          className={`type-index transition-colors duration-500 ${
                            isActive ? "text-copper" : "text-stone"
                          }`}
                        >
                          {stage.index}
                        </span>
                        <h3
                          className={`type-h3 transition-colors duration-500 ${
                            isActive ? "text-chalk" : "text-stone/80"
                          }`}
                        >
                          {stage.title}
                        </h3>
                      </div>

                      <div
                        className="grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                        style={{
                          gridTemplateRows: isActive ? "1fr" : "0fr",
                          opacity: isActive ? 1 : 0,
                        }}
                      >
                        <div className="overflow-hidden">
                          <p className="measure pt-3 pl-[3.1rem] type-body text-mist">
                            {stage.body}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>

            {/* Crossfading imagery */}
            <div className="col-span-6 col-start-7">
              <div className="relative aspect-4/5 max-h-[74svh] w-full overflow-hidden bg-ink">
                {STAGES.map((stage, i) => (
                  <Image
                    key={stage.index}
                    src={stage.image}
                    alt={stage.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 46vw"
                    quality={90}
                    priority={i === 0}
                    className="object-cover transition-[opacity,transform] duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{
                      opacity: i === index ? 1 : 0,
                      transform: i === index ? "scale(1)" : "scale(1.05)",
                    }}
                  />
                ))}

                {/* Keeps the caption legible over any frame. */}
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink/85 to-transparent"
                />

                <div className="absolute inset-x-0 bottom-0 p-7">
                  <p className="type-eyebrow text-copper">
                    Stage {STAGES[index].index} / {STAGES.length}
                  </p>
                  <p className="mt-3 type-h3 text-chalk">
                    {STAGES[index].summary}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Mobile — vertical                                                          */
/* -------------------------------------------------------------------------- */

function StageList() {
  return (
    <ol className="mt-14 space-y-14">
      {STAGES.map((stage, i) => (
        <li key={stage.index} className="border-t border-hairline pt-7">
          <div className="flex items-baseline gap-4">
            <span className="type-index text-copper">{stage.index}</span>
            <h3 className="type-h3 text-chalk">{stage.title}</h3>
          </div>

          <div className="relative mt-6 aspect-16/10 w-full overflow-hidden bg-ink">
            <Image
              src={stage.image}
              alt={stage.imageAlt}
              fill
              sizes="(max-width: 640px) 92vw, 88vw"
              loading={i === 0 ? "eager" : "lazy"}
              className="object-cover"
            />
          </div>

          <p className="mt-6 measure type-body text-mist">{stage.body}</p>
        </li>
      ))}
    </ol>
  );
}
