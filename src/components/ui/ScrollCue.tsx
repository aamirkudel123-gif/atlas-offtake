import { Reveal } from "@/components/ui/Reveal";

/**
 * The scroll indicator introduced on the home hero, shared verbatim by every
 * page hero so the position, styling and animation stay identical site-wide.
 * Desktop only — on smaller viewports there is no spare gutter for it and the
 * page is obviously scrollable anyway.
 */
export function ScrollCue({ delay = 800 }: { delay?: number }) {
  return (
    <Reveal delay={delay}>
      <div className="flex items-center gap-4">
        <span className="type-index text-stone">Scroll</span>
        <span aria-hidden className="relative block h-12 w-px bg-chalk/15">
          <span className="scroll-cue absolute inset-x-0 top-0 h-5 bg-copper" />
        </span>
      </div>
    </Reveal>
  );
}
