import { createMDX } from "fumadocs-mdx/next";

import type { NextConfig } from "next";

const withMDX = createMDX();

const config: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/llms.mdx/:slug*",
        destination: "/llms.mdx/:slug*",
      },
    ];
  },
};

export default withMDX(config);
