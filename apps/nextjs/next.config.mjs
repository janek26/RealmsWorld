// Importing env files here to validate on build
import "./src/env.mjs";
import "@realms-world/auth/env.mjs";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  /** Enables hot reloading for local packages without a build step */
  transpilePackages: [
    "@realms-world/api",
    "@realms-world/auth",
    "@realms-world/db",
  ],
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  webpack(config, { isServer }) {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        dns: false,
        tls: false,
        net: false,
      };
    }

    config.module = {
      ...config.module,
      exprContextCritical: false,
    };

    config.module.rules.push({
      test: /\.svg$/i,
      //issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    config.externals.push("pino-pretty", "lokijs", "encoding");
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
  experimental: {
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
    webpackBuildWorker: true,
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      { protocol: "https", hostname: "loot-survivor.vercel.app" },
      { protocol: "https", hostname: "*.seadn.io" },
      { protocol: "https", hostname: "api.reservoir.tools" },
      { protocol: "https", hostname: "raw.githubusercontent.com" },
      { protocol: "https", hostname: "blur.io" },
      { protocol: "https", hostname: "www.loot.exchange" },
      { protocol: "https", hostname: "gem.xyz" },
      { protocol: "https", hostname: "sudoswap.xyz" },
      { protocol: "https", hostname: "openseauserdata.com" },
      { protocol: "https", hostname: "alienswap.xyz" },
      { protocol: "https", hostname: "www.ens.vision" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "magically.gg" },
      { protocol: "https", hostname: "pro.opensea.io" },
    ],
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};

export default config;
