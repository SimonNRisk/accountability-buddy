import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 👇 new key lives at the root
  serverExternalPackages: ["mjml", "html-minifier", "uglify-js"],

  webpack: (config, { isServer }) => {
    if (isServer) {
      // Keep these resolved at runtime from node_modules
      config.externals = config.externals || [];
      config.externals.push({
        mjml: "commonjs mjml",
        "html-minifier": "commonjs html-minifier",
        "uglify-js": "commonjs uglify-js",
      });
    }
    return config;
  },
};

export default nextConfig;
