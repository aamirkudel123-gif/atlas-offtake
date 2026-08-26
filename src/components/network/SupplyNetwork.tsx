"use client";

import { useId, useMemo, useState } from "react";

import { CORRIDORS, NETWORK_DISCLAIMER, REGIONS, type Region } from "@/lib/content";
import { WORLD_LAND_PATH } from "@/lib/world-path";

const MAP_W = 1000;
const MAP_H = 500;

/**
 * Quadratic arc between two nodes, always bowing away from the equator side so
 * corridors read as routes over the map rather than chords through it.
 */
function corridorPath(a: Region, b: Region, bow: number) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const dist = Math.hypot(dx, dy);
  if (dist === 0) return "";

  const midX = (a.x + b.x) / 2;
  const midY = (a.y + b.y) / 2;

  // Perpendicular unit vector.
  let px = dy / dist;
  let py = -dx / dist;

  // Force the bow upward.
  if (py > 0) {
    px = -px;
    py = -py;
  }

  const cx = midX + px * dist * bow;
  const cy = midY + py * dist * bow;

  return `M${a.x} ${a.y} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${b.x} ${b.y}`;
}

export function SupplyNetwork() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const gradientId = useId();

  const byId = useMemo(
    () => Object.fromEntries(REGIONS.map((r) => [r.id, r])) as Record<string, Region>,
    [],
  );

  const corridors = useMemo(
    () =>
      CORRIDORS.map((c) => ({
        ...c,
        d: corridorPath(byId[c.from], byId[c.to], c.bow),
      })).filter((c) => c.d),
    [byId],
  );

  const active = activeId ? byId[activeId] : null;

  /** A corridor is lit when either end is the active region. */
  const isCorridorActive = (from: string, to: string) =>
    activeId === null || from === activeId || to === activeId;

  return (
    <div className="grid-atlas items-start gap-y-10">
      {/* -------------------------------------------------------------- map */}
      <div className="col-span-12 lg:col-span-8">
        <div className="relative isolate">
          {/* Atmospheric ground behind the map. `isolate` keeps this behind the
              map but in front of the section background. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(68% 62% at 52% 46%, rgba(15,42,98,0.75) 0%, rgba(15,42,98,0.22) 46%, transparent 74%)",
            }}
          />

          {/* Cropped to the inhabited latitudes: the full 0 0 1000 500 frame
              leaves a dead polar band top and bottom. */}
          <svg
            viewBox="0 22 1000 400"
            className="w-full"
            role="img"
            aria-label="World map showing Atlas Offtake commercial commodity corridors between Latin America, North America, Europe, Africa, the Middle East and Asia-Pacific."
          >
            <defs>
              <linearGradient id={`${gradientId}-corridor`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#d5771c" stopOpacity="0" />
                <stop offset="50%" stopColor="#d5771c" stopOpacity="1" />
                <stop offset="100%" stopColor="#d5771c" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Graticule — 30° spacing, barely there. */}
            <g stroke="#171b23" strokeWidth="0.5" opacity="0.85">
              {[60, 30, 0, -30, -60].map((lat) => {
                const y = ((90 - lat) / 180) * MAP_H;
                return <line key={`lat-${lat}`} x1="0" y1={y} x2={MAP_W} y2={y} />;
              })}
              {[-150, -120, -90, -60, -30, 0, 30, 60, 90, 120, 150].map((lon) => {
                const x = ((lon + 180) / 360) * MAP_W;
                return <line key={`lon-${lon}`} x1={x} y1="0" x2={x} y2={MAP_H} />;
              })}
            </g>

            {/* Land */}
            <path
              d={WORLD_LAND_PATH}
              fillRule="nonzero"
              fill="#252a36"
              stroke="#39404f"
              strokeWidth="0.5"
            />

            {/* Corridors — base line */}
            <g fill="none" strokeLinecap="round">
              {corridors.map((c) => (
                <path
                  key={`base-${c.from}-${c.to}`}
                  d={c.d}
                  stroke="#d5771c"
                  strokeWidth="0.9"
                  className="transition-opacity duration-500"
                  opacity={isCorridorActive(c.from, c.to) ? 0.42 : 0.1}
                />
              ))}

              {/* Corridors — travelling pulse */}
              {corridors.map((c) => (
                <path
                  key={`pulse-${c.from}-${c.to}`}
                  d={c.d}
                  pathLength={1000}
                  stroke={`url(#${gradientId}-corridor)`}
                  strokeWidth="1.6"
                  className="corridor-pulse transition-opacity duration-500"
                  style={{
                    animationDelay: `${c.delay}s`,
                    opacity: isCorridorActive(c.from, c.to) ? 1 : 0.12,
                  }}
                />
              ))}
            </g>

            {/* Nodes */}
            <g>
              {REGIONS.map((region, i) => {
                const isActive = activeId === region.id;
                const dimmed = activeId !== null && !isActive;

                return (
                  <g
                    key={region.id}
                    className="cursor-pointer transition-opacity duration-500 focus:outline-none"
                    opacity={dimmed ? 0.35 : 1}
                    onMouseEnter={() => setActiveId(region.id)}
                    onMouseLeave={() => setActiveId(null)}
                    onFocus={() => setActiveId(region.id)}
                    onBlur={() => setActiveId(null)}
                    onClick={() =>
                      setActiveId((prev) => (prev === region.id ? null : region.id))
                    }
                  >
                    {/* Generous invisible hit area. */}
                    <circle cx={region.x} cy={region.y} r="22" fill="transparent" />

                    <circle
                      className="node-halo"
                      cx={region.x}
                      cy={region.y}
                      r="5"
                      fill="none"
                      stroke="#d5771c"
                      strokeWidth="0.8"
                      style={{ animationDelay: `${i * 0.7}s` }}
                    />
                    <circle
                      cx={region.x}
                      cy={region.y}
                      r={isActive ? 6.5 : 5}
                      fill="none"
                      stroke="#d5771c"
                      strokeWidth="0.9"
                      opacity="0.75"
                      className="transition-all duration-400"
                    />
                    <circle
                      cx={region.x}
                      cy={region.y}
                      r={isActive ? 3.4 : 2.6}
                      fill="#d5771c"
                      className="transition-all duration-400"
                    />

                    <text
                      x={region.anchor === "start" ? region.x + 13 : region.x - 13}
                      y={region.y + 3.6}
                      textAnchor={region.anchor === "start" ? "start" : "end"}
                      fill={isActive ? "#e8e9ec" : "#b9bec7"}
                      className="transition-colors duration-400"
                      style={{
                        fontFamily: "var(--font-plex-mono), monospace",
                        fontSize: "10.5px",
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                      }}
                    >
                      {region.name}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>
        </div>

        {/* Keyboard-accessible equivalent of the map nodes. */}
        <div className="mt-8 flex flex-wrap gap-2">
          {REGIONS.map((region) => {
            const isActive = activeId === region.id;
            return (
              <button
                key={region.id}
                type="button"
                aria-pressed={isActive}
                onClick={() =>
                  setActiveId((prev) => (prev === region.id ? null : region.id))
                }
                onMouseEnter={() => setActiveId(region.id)}
                onMouseLeave={() => setActiveId(null)}
                onFocus={() => setActiveId(region.id)}
                onBlur={() => setActiveId(null)}
                className={`border px-4 py-2.5 type-index uppercase transition-colors duration-300 ${
                  isActive
                    ? "border-copper bg-copper/10 text-copper"
                    : "border-hairline text-stone hover:border-stone hover:text-mist"
                }`}
              >
                {region.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* ------------------------------------------------------------ panel */}
      <div className="col-span-12 lg:col-span-4 lg:pl-[clamp(1rem,3vw,3rem)]">
        <div className="border-l border-hairline pl-6 lg:min-h-[22rem]">
          <p className="type-eyebrow text-stone">
            {active ? active.role : "Network"}
          </p>

          <div aria-live="polite">
            <h3 className="mt-5 type-h3 text-chalk">
              {active ? active.name : "Six regions, one commercial network."}
            </h3>
            <p className="mt-5 measure type-body text-mist">
              {active
                ? active.body
                : "Atlas Offtake connects qualified producers with industrial consumers through disciplined procurement, responsible sourcing and dependable commercial execution across global markets."}
            </p>
          </div>

          <p
            className={`mt-7 type-index text-stone transition-opacity duration-400 ${
              active ? "opacity-0" : "opacity-100"
            }`}
            aria-hidden
          >
            Hover or select a region
          </p>

          <p className="mt-9 border-t border-hairline pt-6 text-[0.75rem] leading-relaxed text-stone">
            {NETWORK_DISCLAIMER}
          </p>
        </div>
      </div>
    </div>
  );
}
