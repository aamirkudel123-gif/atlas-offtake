import type { Metadata } from "next";

import { CommodityIndex } from "@/components/home/CommodityIndex";
import { ComplianceBand } from "@/components/home/ComplianceBand";
import { Hero } from "@/components/home/Hero";
import { InquiryCTA } from "@/components/home/InquiryCTA";
import { NetworkSection } from "@/components/home/NetworkSection";
import { PitToPort } from "@/components/home/PitToPort";
import { Positioning } from "@/components/home/Positioning";
import { SolutionsEditorial } from "@/components/home/SolutionsEditorial";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Positioning />
      <NetworkSection />
      <PitToPort />
      <CommodityIndex />
      <SolutionsEditorial />
      <ComplianceBand />
      <InquiryCTA />
    </>
  );
}
