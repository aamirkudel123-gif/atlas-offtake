"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { NAV, SITE } from "@/lib/content";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);

  /* Transparent over the hero, solid once the page has moved. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close the panel on navigation. */
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  /* Lock the page and trap focus while the mobile panel is open. */
  useEffect(() => {
    if (!open) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-100 transition-[background-color,backdrop-filter,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        scrolled || open
          ? "border-b border-hairline bg-ink/88 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container-atlas">
        <div
          className={`flex items-center justify-between transition-[height] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            scrolled ? "h-[68px]" : "h-[84px] md:h-[96px]"
          }`}
        >
          {/* Logo — reversed lockup for dark grounds. Letterforms unaltered. */}
          <Link
            href="/"
            aria-label={`${SITE.name} — home`}
            className="relative z-10 shrink-0"
          >
            <Image
              src="/atlas-logo-reversed.png"
              alt={SITE.name}
              width={1360}
              height={544}
              priority
              sizes="(max-width: 768px) 132px, 164px"
              className={`w-auto transition-[height] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                scrolled ? "h-[26px] md:h-[28px]" : "h-[30px] md:h-[34px]"
              }`}
            />
          </Link>

          {/* Desktop navigation */}
          <nav
            aria-label="Primary"
            className="hidden items-center gap-8 lg:flex xl:gap-10"
          >
            {NAV.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`group relative type-eyebrow transition-colors duration-300 ${
                    active ? "text-copper" : "text-mist hover:text-chalk"
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden
                    className={`absolute -bottom-2 left-0 h-px w-full origin-right bg-copper transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      active
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:origin-left group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="group hidden items-center gap-2.5 border border-chalk/25 px-5 py-3 type-eyebrow text-chalk transition-colors duration-400 hover:border-copper hover:bg-copper hover:text-ink lg:inline-flex"
            >
              Start an Inquiry
              <svg
                aria-hidden
                width="14"
                height="8"
                viewBox="0 0 14 8"
                fill="none"
                className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
              >
                <path
                  d="M0 4h12M9 1l3 3-3 3"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="square"
                />
              </svg>
            </Link>

            {/* Mobile trigger */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              className="relative z-10 -mr-2 flex h-11 w-11 items-center justify-center lg:hidden"
            >
              <span className="sr-only">
                {open ? "Close menu" : "Open menu"}
              </span>
              <span aria-hidden className="relative block h-3 w-6">
                <span
                  className={`absolute left-0 block h-px w-6 bg-chalk transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    open ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-px w-6 bg-chalk transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    open ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile panel */}
      <div
        id="mobile-nav"
        ref={panelRef}
        hidden={!open}
        className="fixed inset-0 top-0 -z-10 bg-ink lg:hidden"
      >
        <div className="container-atlas flex h-dvh flex-col pt-[104px] pb-10">
          <nav aria-label="Primary" className="flex-1 overflow-y-auto">
            <ul className="flex flex-col">
              {NAV.map((item, i) => {
                const active = pathname === item.href;
                return (
                  <li
                    key={item.href}
                    className="border-b border-hairline"
                    style={{
                      opacity: open ? 1 : 0,
                      transform: open ? "none" : "translateY(12px)",
                      transition: `opacity 600ms cubic-bezier(0.16,1,0.3,1) ${80 + i * 55}ms, transform 600ms cubic-bezier(0.16,1,0.3,1) ${80 + i * 55}ms`,
                    }}
                  >
                    <Link
                      href={item.href}
                      className="flex items-baseline justify-between py-5"
                    >
                      <span
                        className={`type-h3 ${active ? "text-copper" : "text-chalk"}`}
                      >
                        {item.label}
                      </span>
                      <span className="type-index text-stone">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div
            className="mt-8 shrink-0"
            style={{
              opacity: open ? 1 : 0,
              transition: "opacity 600ms cubic-bezier(0.16,1,0.3,1) 460ms",
            }}
          >
            <Link
              href="/contact"
              className="flex w-full items-center justify-center gap-3 bg-copper px-6 py-4.5 type-eyebrow text-ink"
            >
              Start an Inquiry
              <svg
                aria-hidden
                width="14"
                height="8"
                viewBox="0 0 14 8"
                fill="none"
              >
                <path
                  d="M0 4h12M9 1l3 3-3 3"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="square"
                />
              </svg>
            </Link>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-5 block type-index text-stone"
            >
              {SITE.email}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
