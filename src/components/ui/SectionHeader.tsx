import type { ReactNode } from "react";

import { Eyebrow } from "@/components/ui/Primitives";
import { Reveal, RevealText } from "@/components/ui/Reveal";

/**
 * The site-wide section opener.
 *
 * A hanging label in the left three columns with the heading starting at
 * column four gives every section on every page the same two alignment
 * anchors. This is the main defence against the drifting margins on the
 * previous site.
 */
export function SectionHeader({
  eyebrow,
  title,
  lead,
  tone = "dark",
  id,
  children,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  tone?: "dark" | "light";
  id?: string;
  children?: ReactNode;
}) {
  const headingColor = tone === "dark" ? "text-chalk" : "text-ink";
  const leadColor = tone === "dark" ? "text-stone" : "text-ink/60";
  const ruleColor = tone === "dark" ? "bg-hairline" : "bg-paper-line";

  return (
    <div className="grid-atlas gap-y-7">
      <Reveal
        variant="line"
        className={`col-span-12 h-px ${ruleColor}`}
        as="div"
      >
        <span className="sr-only" />
      </Reveal>

      <div className="col-span-12 pt-2 lg:col-span-3">
        <Reveal delay={80}>
          <Eyebrow tone={tone === "dark" ? "copper" : "navy"}>{eyebrow}</Eyebrow>
        </Reveal>
      </div>

      <div className="col-span-12 lg:col-span-9">
        <RevealText
          as="h2"
          id={id}
          text={title}
          className={`type-h2 ${headingColor}`}
        />
        {lead ? (
          <Reveal delay={320}>
            <p className={`mt-7 measure type-lead ${leadColor}`}>{lead}</p>
          </Reveal>
        ) : null}
        {children}
      </div>
    </div>
  );
}
