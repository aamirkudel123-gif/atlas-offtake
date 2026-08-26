/**
 * Single source of truth for site copy.
 *
 * Every corporate claim here is carried over from the existing Atlas Offtake
 * site. No statistics, offices, clients, certifications, owned assets or ESG
 * claims have been introduced. Framework references use "informed by" language
 * deliberately - Atlas is not stated to be certified by or affiliated with any
 * of the named bodies.
 */

export const SITE = {
  name: "Atlas Offtake",
  domain: "https://atlasofftake.com",
  tagline:
    "Strategic procurement and structured offtake for critical industrial commodities.",
  email: "inquiries@atlasofftake.com",
  complianceEmail: "compliance@atlasofftake.com",
  registeredOffice: "Hong Kong SAR",
} as const;

export type NavItem = { label: string; href: string };

export const NAV: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Operations", href: "/operations" },
  { label: "Commodities", href: "/commodities" },
  { label: "Solutions", href: "/solutions" },
  { label: "Global Network", href: "/global-network" },
  { label: "Compliance", href: "/compliance" },
];

/**
 * Privacy, Legal and AML Policy are linked from the existing site but every
 * one of those URLs returns 404. They are intentionally left out of the footer
 * until the client supplies the actual documents - inventing legal or AML copy
 * would be inventing corporate policy.
 */
export const LEGAL_NAV: NavItem[] = [];

/* ------------------------------------------------------------------ HOME */

export const HERO = {
  eyebrow: "Strategic Procurement · Global Execution",
  headline: "Where Critical Supply Begins.",
  lead: "Atlas Offtake helps industrial buyers secure dependable access to critical materials through disciplined procurement, transparent partnerships, and responsible global sourcing.",
  primary: { label: "Explore Our Commodities", href: "/commodities" },
  secondary: { label: "Start an Inquiry", href: "/contact" },
} as const;

export const POSITIONING = {
  eyebrow: "The Firm",
  statement:
    "We do not sell products. We build the commercial architecture that moves materials between producers and industry — reliably, and at scale.",
  body: [
    "Atlas Offtake operates between the producers of the world's critical raw materials and the industries that depend on them. We design procurement solutions that connect qualified producers with industrial consumers — reliably, transparently, and at scale.",
    "Our strength lies not in owning infrastructure, but in connecting the right partners, markets and opportunities with precision, transparency and long-term commitment.",
  ],
  pillars: [
    {
      index: "01",
      title: "Strategic Procurement",
      body: "Connecting industrial buyers with qualified producers to create dependable long-term access to critical materials.",
    },
    {
      index: "02",
      title: "Structured Offtake",
      body: "Commercial structures between producers and consumers — longer-term supply arrangements, volume commitments and structured frameworks.",
    },
    {
      index: "03",
      title: "Global Sourcing",
      body: "Critical minerals, base metals, battery materials and industrial commodities sourced through international supply relationships.",
    },
  ],
} as const;

/* -------------------------------------------------------------- COMMODITIES */

export type Commodity = {
  index: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  image: string;
  imageAlt: string;
};

export const COMMODITIES: Commodity[] = [
  {
    index: "01",
    slug: "copper",
    name: "Copper",
    category: "Base Metals",
    description: "Grade A cathodes for wiring, motors and grids.",
    image: "/images/commodity-copper.jpg",
    imageAlt: "Coiled copper conductor lit against a dark industrial background.",
  },
  {
    index: "02",
    slug: "lithium",
    name: "Lithium",
    category: "Battery Materials",
    description: "Carbonate and hydroxide for cell manufacturing.",
    image: "/images/commodity-lithium.jpg",
    imageAlt: "Aerial view of lithium brine evaporation ponds in graded tones.",
  },
  {
    index: "03",
    slug: "cobalt",
    name: "Cobalt",
    category: "Battery Materials",
    description: "Hydroxide sourced through validated channels.",
    image: "/images/commodity-cobalt.jpg",
    imageAlt: "Deep blue cobalt-bearing mineral crystals against black.",
  },
  {
    index: "04",
    slug: "nickel",
    name: "Nickel",
    category: "Base Metals",
    description: "Briquettes and sulphate from LME-registered brands.",
    image: "/images/commodity-nickel.jpg",
    imageAlt: "Coiled steel-grey metal wire in close macro detail.",
  },
  {
    index: "05",
    slug: "iron-ore",
    name: "Iron Ore",
    category: "Bulk Commodities",
    description: "Fines and pellets to steelmaking specification.",
    image: "/images/commodity-iron-ore.jpg",
    imageAlt: "Crushed dark iron ore rock at close range.",
  },
  {
    index: "06",
    slug: "rare-earths",
    name: "Rare Earths",
    category: "Critical Minerals",
    description: "Oxides and concentrates for magnets and clean tech.",
    image: "/images/commodity-rare-earths.jpg",
    imageAlt: "Iridescent mineral concentrate catching light against dark rock.",
  },
];

export const EXTENDED_PORTFOLIO = [
  "Manganese",
  "Bauxite",
  "Chromite",
  "Graphite",
  "Zinc",
  "Tin",
] as const;

/* ---------------------------------------------------------------- SOLUTIONS */

export type Solution = {
  index: string;
  title: string;
  summary: string;
  points: string[];
};

export const SOLUTIONS: Solution[] = [
  {
    index: "01",
    title: "Strategic Procurement",
    summary: "Long-term procurement solutions for buyers who value certainty.",
    points: [
      "Multi-year contracting",
      "Volume commitments",
      "Price stability mechanisms",
    ],
  },
  {
    index: "02",
    title: "Structured Offtake",
    summary: "Predictable revenue for producers, dependable supply for consumers.",
    points: [
      "Prepayment structures",
      "Take-or-pay frameworks",
      "Blended pricing formulas",
    ],
  },
  {
    index: "03",
    title: "Supply Chain Advisory",
    summary: "Strategic market intelligence for resilient supply chains.",
    points: ["Market analysis", "Route optimisation", "Compliance mapping"],
  },
  {
    index: "04",
    title: "Risk & Compliance",
    summary: "Diligence, sanctions and responsible sourcing built into every trade.",
    points: ["KYC / KYS onboarding", "Sanctions screening", "Chain-of-custody"],
  },
];

export const ENGAGEMENT = [
  { index: "01", title: "Discover", body: "Map demand, spec, tenor and geography." },
  { index: "02", title: "Structure", body: "Design commercial terms and financing." },
  { index: "03", title: "Contract", body: "Diligence, documentation, sign-off." },
  { index: "04", title: "Execute", body: "Logistics, quality, settlement." },
  { index: "05", title: "Optimise", body: "Ongoing performance and reporting." },
] as const;

/* --------------------------------------------------------------- OPERATIONS */

export type Stage = {
  index: string;
  title: string;
  summary: string;
  body: string;
  image: string;
  imageAlt: string;
};

export const STAGES: Stage[] = [
  {
    index: "01",
    title: "Sourcing",
    summary: "Qualified suppliers. Commercially aligned.",
    body: "Producers are identified, screened and commercially aligned before any material moves.",
    image: "/images/journey-01-sourcing.jpg",
    imageAlt: "Aerial view of terraced open-pit mine benches.",
  },
  {
    index: "02",
    title: "Contracting",
    summary: "Structured agreements. Long-term certainty.",
    body: "Commercial terms, tenor and pricing mechanisms are documented into durable agreements.",
    image: "/images/journey-02-contracting.jpg",
    imageAlt: "Silhouette of a harbour crane against a pale sky.",
  },
  {
    index: "03",
    title: "Logistics",
    summary: "Coordinated global logistics.",
    body: "Routing, freight, transhipment and documentation are coordinated across each corridor.",
    image: "/images/journey-03-logistics.jpg",
    imageAlt: "Container terminal at dusk seen from above, stacked to the horizon.",
  },
  {
    index: "04",
    title: "Quality",
    summary: "Independent inspection at every stage.",
    body: "Independent inspection and assay confirm the material matches contracted specification.",
    image: "/images/journey-04-quality.jpg",
    imageAlt: "Close macro detail of dark mineral ore under raking light.",
  },
  {
    index: "05",
    title: "Storage",
    summary: "Secure storage and inventory management.",
    body: "Material is held, tracked and released against agreed inventory positions.",
    image: "/images/journey-05-storage.jpg",
    imageAlt: "Long aisle inside a dimly lit industrial storage warehouse.",
  },
  {
    index: "06",
    title: "Delivery",
    summary: "Delivered on time and to specification.",
    body: "Final delivery is completed to the consumer's plant, terminal or nominated facility.",
    image: "/images/journey-06-delivery.jpg",
    imageAlt: "Heavy industrial processing plant structures against an overcast sky.",
  },
];

/* --------------------------------------------------------------- COMPLIANCE */

export const COMPLIANCE_PRINCIPLES = [
  {
    index: "01",
    title: "Regulatory Excellence",
    body: "Maintaining compliance with applicable international regulations across commercial activities.",
  },
  {
    index: "02",
    title: "Responsible Sourcing",
    body: "Working with qualified counterparties through responsible and transparent procurement practices.",
  },
  {
    index: "03",
    title: "Risk Management",
    body: "Managing commercial, operational and counterparty risks throughout the procurement lifecycle.",
  },
  {
    index: "04",
    title: "Transparency",
    body: "Promoting clear communication, accountability and ethical business conduct.",
  },
] as const;

export const COMPLIANCE_LIFECYCLE = [
  {
    index: "01",
    title: "Assessment",
    body: "Origin, counterparty and jurisdiction analysis.",
  },
  {
    index: "02",
    title: "Verification",
    body: "Documentary and independent third-party checks.",
  },
  {
    index: "03",
    title: "Approval",
    body: "Governance sign-off across risk and compliance.",
  },
  {
    index: "04",
    title: "Monitoring",
    body: "Ongoing surveillance across the trade lifecycle.",
  },
  {
    index: "05",
    title: "Reporting",
    body: "Transparent disclosure to partners and regulators.",
  },
] as const;

export const FRAMEWORKS = [
  { name: "OECD Due Diligence Guidance", scope: "Responsible mineral supply chains" },
  { name: "LME Responsible Sourcing Guidance", scope: "Listed brand expectations" },
  { name: "EITI Principles", scope: "Extractive sector transparency" },
  {
    name: "UN Global Compact Principles",
    scope: "Human rights, labour, environment, anti-corruption",
  },
  { name: "ISO 37001", scope: "Anti-bribery management systems" },
] as const;

export const FRAMEWORK_DISCLAIMER =
  "Our approach is informed by internationally recognised frameworks. Reference to these frameworks describes the standards that guide our diligence, and does not indicate certification by, membership of, or affiliation with the named organisations.";

/* -------------------------------------------------------------------- ABOUT */

export const ABOUT = {
  tagline: "Built on trust. Driven by purpose.",
  lead: "Atlas Offtake bridges producers and industry across global commodity markets through precision logistics, ethical procurement and long-term partnerships.",
  vision: {
    title: "Vision",
    body: "To be the trusted global procurement partner for critical industrial commodities.",
  },
  mission: {
    title: "Mission",
    body: "To connect reliable producers with industrial consumers through disciplined sourcing and responsible execution.",
  },
  approach: {
    title: "Approach",
    body: "Market intelligence, commercial discipline and operational precision, combined to deliver dependable supply solutions.",
  },
  values: [
    {
      index: "01",
      title: "Integrity",
      body: "Commercial conduct that holds up to scrutiny at every stage.",
    },
    {
      index: "02",
      title: "Accountability",
      body: "Clear ownership of obligations, documentation and outcomes.",
    },
    {
      index: "03",
      title: "Excellence",
      body: "Precision in specification, timing and contractual execution.",
    },
    {
      index: "04",
      title: "Long-term Partnership",
      body: "Relationships measured in decades, not single transactions.",
    },
  ],
  quote: {
    body: "We are custodians of long-term value — the kind measured in decades, not quarters.",
    attribution: "Founding principle",
  },
} as const;

/* ----------------------------------------------------------- GLOBAL NETWORK */

export type Region = {
  id: string;
  name: string;
  role: string;
  body: string;
  /** Equirectangular anchor, in the 1000 x 500 map viewBox. */
  x: number;
  y: number;
  /** Which side the label sits on. */
  anchor: "start" | "end";
};

export const REGIONS: Region[] = [
  {
    id: "latin-america",
    name: "Latin America",
    role: "Origin",
    body: "Access to globally significant mineral-producing regions through established commercial relationships.",
    x: 305,
    y: 322,
    anchor: "start",
  },
  {
    id: "north-america",
    name: "North America",
    role: "Industrial Demand",
    body: "Connecting industrial buyers with dependable international supply solutions.",
    x: 248,
    y: 152,
    anchor: "start",
  },
  {
    id: "europe",
    name: "Europe",
    role: "Industrial Demand",
    body: "Supporting industrial consumers with compliant sourcing and long-term procurement strategies.",
    x: 522,
    y: 116,
    anchor: "end",
  },
  {
    id: "africa",
    name: "Africa",
    role: "Origin",
    body: "Origin sourcing of critical minerals and industrial commodities through qualified mining and supply partners.",
    x: 562,
    y: 288,
    anchor: "start",
  },
  {
    id: "middle-east",
    name: "Middle East",
    role: "Coordination",
    body: "Commercial coordination, regional distribution and cross-border procurement solutions.",
    x: 646,
    y: 180,
    anchor: "end",
  },
  {
    id: "asia-pacific",
    name: "Asia-Pacific",
    role: "Processing & Demand",
    body: "Strategic procurement across manufacturing, processing and global export markets.",
    x: 812,
    y: 170,
    anchor: "start",
  },
];

/** Commercial corridors - not owned routes or infrastructure. */
export const CORRIDORS: {
  from: string;
  to: string;
  bow: number;
  delay: number;
}[] = [
  { from: "africa", to: "middle-east", bow: 0.16, delay: 0 },
  { from: "middle-east", to: "asia-pacific", bow: 0.18, delay: 1.4 },
  { from: "latin-america", to: "asia-pacific", bow: 0.3, delay: 2.6 },
  { from: "africa", to: "europe", bow: 0.22, delay: 3.4 },
  { from: "asia-pacific", to: "north-america", bow: 0.26, delay: 4.6 },
  { from: "latin-america", to: "north-america", bow: 0.2, delay: 5.8 },
];

export const NETWORK_DISCLAIMER =
  "This visualisation represents Atlas Offtake's commercial sourcing and supply relationships across global commodity corridors. It does not depict offices, mines, vessels, warehouses or other infrastructure owned or operated by Atlas Offtake.";

export const ECOSYSTEM = [
  {
    index: "01",
    title: "Producers",
    body: "Qualified mining and processing counterparties at origin.",
  },
  {
    index: "02",
    title: "Inspection",
    body: "Independent surveyors verifying quantity and quality.",
  },
  {
    index: "03",
    title: "Logistics",
    body: "Freight, transhipment and multi-modal transport providers.",
  },
  {
    index: "04",
    title: "Financial Partners",
    body: "Institutions supporting trade structures and settlement.",
  },
  {
    index: "05",
    title: "Processors",
    body: "Refiners and converters transforming material for end use.",
  },
  {
    index: "06",
    title: "Industrial Consumers",
    body: "Manufacturers and industrial buyers of finished inputs.",
  },
] as const;

/* ------------------------------------------------------------------ CONTACT */

export const AREAS_OF_INTEREST = [
  "Strategic Procurement",
  "Structured Offtake",
  "Supply Chain Advisory",
  "Risk & Compliance",
  "Producer Partnership",
  "General Inquiry",
] as const;

export const CLOSING_STATEMENT =
  "Securing the world's most critical industrial inputs — with precision, discipline and long-term partnership.";
