import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first: meaningfully smaller at the same visual quality, which lets
    // the large industrial photography stay sharp without a weight penalty.
    formats: ["image/avif", "image/webp"],
    // Next 16 narrowed the default to [75]. 90 is reserved for hero and
    // commodity imagery, where compression artefacts would be visible.
    qualities: [75, 90],
  },
  poweredByHeader: false,
};

export default nextConfig;
