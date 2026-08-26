import type { Metadata } from "next";

import { Button } from "@/components/ui/Primitives";
import { NAV } from "@/lib/content";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="bg-ink pt-[clamp(9rem,15vw,12rem)]">
      <div className="container-atlas pb-[var(--spacing-section)]">
        <div className="grid-atlas gap-y-8">
          <div className="col-span-12 lg:col-span-3">
            <p className="type-eyebrow text-copper">
              <span className="inline-flex items-center gap-3">
                <span aria-hidden className="h-px w-6 bg-current" />
                Error 404
              </span>
            </p>
          </div>

          <div className="col-span-12 lg:col-span-9">
            <h1 className="type-h1 text-chalk">This page could not be found.</h1>
            <p className="mt-8 measure type-lead text-mist">
              The address may have changed, or the page may no longer exist.
            </p>

            <div className="mt-10">
              <Button href="/" variant="outline">
                Return home
              </Button>
            </div>

            <nav aria-label="Site" className="mt-16 border-t border-hairline pt-8">
              <ul className="flex flex-wrap gap-x-8 gap-y-3">
                {NAV.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="type-index text-stone transition-colors duration-300 hover:text-copper"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
}
