"use client";

import { useEffect, useRef, useState } from "react";

import { Reveal } from "@/components/ui/Reveal";
import { SOLUTIONS } from "@/lib/content";

/**
 * Sticky index on the left, expanded detail on the right.
 *
 * The index is a real navigation list, so keyboard users can jump between
 * disciplines; the highlight simply follows whichever block is in view.
 */
export function StickySolutions() {
  const [activeIndex, setActiveIndex] = useState(0);
  const blockRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const i = blockRefs.current.indexOf(entry.target as HTMLElement);
            if (i >= 0) setActiveIndex(i);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    for (const node of blockRefs.current) {
      if (node) observer.observe(node);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div className="grid-atlas items-start gap-y-12">
      {/* Index */}
      <nav
        aria-label="Solutions"
        className="col-span-12 lg:sticky lg:top-[7.5rem] lg:col-span-3"
      >
        <ol className="flex flex-wrap gap-x-6 gap-y-3 lg:block lg:space-y-4">
          {SOLUTIONS.map((solution, i) => {
            const active = i === activeIndex;
            return (
              <li key={solution.index}>
                <a
                  href={`#solution-${solution.index}`}
                  className={`group flex items-baseline gap-3 transition-colors duration-400 ${
                    active ? "text-chalk" : "text-stone hover:text-mist"
                  }`}
                >
                  <span
                    className={`type-index transition-colors duration-400 ${
                      active ? "text-copper" : "text-stone"
                    }`}
                  >
                    {solution.index}
                  </span>
                  <span className="type-index uppercase">{solution.title}</span>
                </a>
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Detail */}
      <div className="col-span-12 lg:col-span-8 lg:col-start-5">
        {SOLUTIONS.map((solution, i) => (
          <section
            key={solution.index}
            id={`solution-${solution.index}`}
            ref={(node) => {
              blockRefs.current[i] = node;
            }}
            aria-labelledby={`solution-heading-${solution.index}`}
            className="scroll-mt-32 border-t border-hairline py-[clamp(2.5rem,4.5vw,4.5rem)] first:border-t-0 first:pt-0"
          >
            <Reveal>
              <span className="type-index text-copper lg:hidden">
                {solution.index}
              </span>
              <h3
                id={`solution-heading-${solution.index}`}
                className="mt-4 type-h2 text-chalk lg:mt-0"
              >
                {solution.title}
              </h3>
              <p className="mt-6 measure type-lead text-mist">
                {solution.summary}
              </p>

              <ul className="mt-9 grid gap-x-[clamp(1rem,2vw,2rem)] gap-y-6 sm:grid-cols-3">
                {solution.points.map((point) => (
                  <li key={point}>
                    <div className="h-px w-full bg-hairline" />
                    <span className="mt-4 block type-body text-mist">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </section>
        ))}
      </div>
    </div>
  );
}
