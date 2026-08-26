"use client";

import {
  createElement,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

type RevealProps = {
  children: ReactNode;
  /** Milliseconds of stagger relative to the element entering the viewport. */
  delay?: number;
  className?: string;
  as?: ElementType;
  /** "line" animates a hairline drawing itself instead of a fade-and-rise. */
  variant?: "rise" | "line";
  style?: CSSProperties;
};

/**
 * Scroll reveal.
 *
 * Content is rendered in the DOM regardless, so it stays available without JS
 * and to crawlers. The stylesheet disables the transform entirely under
 * prefers-reduced-motion.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
  variant = "rise",
  style,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const base = variant === "line" ? "rule-draw" : "reveal";

  return createElement(
    as,
    {
      ref,
      className: `${base}${visible ? " is-visible" : ""}${className ? ` ${className}` : ""}`,
      style: { ...style, ["--reveal-delay" as string]: `${delay}ms` },
    },
    children,
  );
}

type RevealTextProps = {
  text: string;
  className?: string;
  as?: ElementType;
  id?: string;
  /** Extra stagger index offset, for headings that follow other revealed text. */
  offset?: number;
};

/**
 * Word-by-word masked reveal for major headings.
 *
 * Each word is wrapped in its own overflow-hidden box so the words rise out of
 * a clean baseline rather than fading in place.
 */
export function RevealText({
  text,
  className = "",
  as = "h2",
  id,
  offset = 0,
}: RevealTextProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.15 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const words = text.split(" ");

  return createElement(
    as,
    {
      ref,
      id,
      className: `word-reveal${visible ? " is-visible" : ""}${className ? ` ${className}` : ""}`,
    },
    words.map((word, i) => (
      <span key={`${word}-${i}`}>
        <span style={{ ["--word-index" as string]: i + offset }}>
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      </span>
    )),
  );
}
