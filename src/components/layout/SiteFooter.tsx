import Image from "next/image";
import Link from "next/link";

import { LEGAL_NAV, NAV, NETWORK_DISCLAIMER, SITE } from "@/lib/content";

/**
 * The footer is the one light band that carries the logo in its original
 * navy-and-copper form, at a size where the lockup reads properly.
 */
export function SiteFooter() {
  return (
    <footer className="bg-paper text-ink">
      <div className="container-atlas">
        <div className="grid-atlas gap-y-14 pt-[clamp(4rem,7vw,7rem)] pb-12">
          {/* Identity */}
          <div className="col-span-12 lg:col-span-5">
            <Link href="/" aria-label={`${SITE.name} — home`}>
              <Image
                src="/atlas-logo.png"
                alt={SITE.name}
                width={1360}
                height={544}
                sizes="200px"
                className="h-[38px] w-auto md:h-[44px]"
              />
            </Link>
            <p className="mt-7 measure-tight type-body text-ink/65">
              {SITE.tagline}
            </p>
            <a
              href={`mailto:${SITE.email}`}
              className="group mt-7 inline-flex items-center gap-2.5 type-index text-navy transition-colors duration-300 hover:text-copper"
            >
              <span className="relative">
                {SITE.email}
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:origin-left group-hover:scale-x-100"
                />
              </span>
            </a>
          </div>

          <div className="col-span-12 sm:col-span-6 lg:col-span-3 lg:col-start-7">
            <p className="type-eyebrow text-ink/60">Navigate</p>
            <ul className="mt-6 space-y-3.5">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-2 text-[0.9375rem] text-ink/75 transition-colors duration-300 hover:text-navy"
                  >
                    <span
                      aria-hidden
                      className="h-px w-0 bg-copper transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-4"
                    />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-12 sm:col-span-6 lg:col-span-3">
            <p className="type-eyebrow text-ink/60">Office</p>
            <p className="mt-6 text-[0.9375rem] leading-relaxed text-ink/75">
              Registered Office
              <br />
              <span className="text-ink">{SITE.registeredOffice}</span>
            </p>

            {LEGAL_NAV.length > 0 ? (
              <>
                <p className="mt-8 type-eyebrow text-ink/60">Legal</p>
                <ul className="mt-6 space-y-3.5">
                  {LEGAL_NAV.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-[0.9375rem] text-ink/75 transition-colors duration-300 hover:text-navy"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>
        </div>

        {/* Scope note — keeps the network visualisation honest. */}
        <div className="border-t border-paper-line py-8">
          <p className="measure-wide text-[0.75rem] leading-relaxed text-ink/60">
            {NETWORK_DISCLAIMER}
          </p>
        </div>

        <div className="flex flex-col gap-4 border-t border-paper-line py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="type-index text-ink/60">
            © {new Date().getFullYear()} {SITE.name} · Registered in{" "}
            {SITE.registeredOffice}
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="type-index text-ink/60 transition-colors duration-300 hover:text-navy"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="type-index text-ink/60 transition-colors duration-300 hover:text-navy"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
