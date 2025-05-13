import type { NextConfig } from "next";
import type { WebpackConfigContext } from "next/dist/server/config-shared";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config, { isServer }) => {
    // Handle rax as external to prevent build issues
    if (isServer) {
      config.externals = [...(config.externals || []), 'rax'];
    }
    
    return config;
  },
};

export default nextConfig;
