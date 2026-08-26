import Link from "next/link";
import type { ReactNode } from "react";

/* -------------------------------------------------------------------------- */
/*  Eyebrow — the small mono label that opens most sections.                    */
/* -------------------------------------------------------------------------- */

export function Eyebrow({
  children,
  tone = "copper",
  className = "",
}: {
  children: ReactNode;
  tone?: "copper" | "stone" | "navy";
  className?: string;
}) {
  const color =
    tone === "copper"
      ? "text-copper"
      : tone === "navy"
        ? "text-navy"
        : "text-stone";

  return (
    <p className={`type-eyebrow ${color} ${className}`}>
      <span className="inline-flex items-center gap-3">
        <span aria-hidden className="h-px w-6 bg-current opacity-60" />
        {children}
      </span>
    </p>
  );
}

/* -------------------------------------------------------------------------- */
/*  ArrowLink — the standard forward action.                                    */
/* -------------------------------------------------------------------------- */

export function ArrowLink({
  href,
  children,
  tone = "light",
  className = "",
}: {
  href: string;
  children: ReactNode;
  tone?: "light" | "dark" | "copper";
  className?: string;
}) {
  const color =
    tone === "dark"
      ? "text-ink hover:text-navy"
      : tone === "copper"
        ? "text-copper hover:text-copper-lift"
        : "text-chalk hover:text-copper";

  return (
    <Link
      href={href}
      className={`group inline-flex items-baseline gap-2.5 type-eyebrow transition-colors duration-300 ${color} ${className}`}
    >
      <span className="relative">
        {children}
        <span
          aria-hidden
          className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:origin-left group-hover:scale-x-100"
        />
      </span>
      <Arrow />
    </Link>
  );
}

function Arrow() {
  return (
    <svg
      aria-hidden
      width="14"
      height="8"
      viewBox="0 0 14 8"
      fill="none"
      className="translate-y-px transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
    >
      <path
        d="M0 4h12M9 1l3 3-3 3"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="square"
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Button — solid and outline, used sparingly.                                 */
/* -------------------------------------------------------------------------- */

export function Button({
  href,
  children,
  variant = "solid",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "outlineDark";
  className?: string;
}) {
  const styles = {
    solid:
      "bg-copper text-ink hover:bg-copper-lift border border-copper hover:border-copper-lift",
    outline:
      "border border-chalk/30 text-chalk hover:border-chalk/70 hover:bg-chalk/5",
    outlineDark:
      "border border-ink/25 text-ink hover:border-ink/60 hover:bg-ink/5",
  }[variant];

  return (
    <Link
      href={href}
      className={`group inline-flex items-center justify-center gap-3 px-7 py-4 type-eyebrow transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${styles} ${className}`}
    >
      {children}
      <Arrow />
    </Link>
  );
}
