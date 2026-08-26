import { SupplyNetwork } from "@/components/network/SupplyNetwork";
import { ArrowLink } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function NetworkSection() {
  return (
    <section aria-labelledby="network-heading" className="bg-ink">
      <div className="container-atlas section-y">
        <SectionHeader
          id="network-heading"
          eyebrow="Global Network"
          title="The Atlas global supply network."
          lead="Origin, coordination, processing and industrial demand — connected across six regions and the corridors between them."
        />

        <div className="mt-[clamp(3rem,5vw,5rem)]">
          <SupplyNetwork />
        </div>

        <div className="mt-14 border-t border-hairline pt-8">
          <Reveal>
            <ArrowLink href="/global-network">
              Explore the global network
            </ArrowLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
