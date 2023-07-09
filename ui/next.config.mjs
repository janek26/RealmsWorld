/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    turbo: {
      rules: {
        "*.svgr": ["@svgr/webpack"],
      },
    },
  },
  images: {
    dangerouslyAllowSVG: true,
    domains: ['i.seadn.io', 'api.reservoir.tools', 'raw.githubusercontent.com', 'blur.io', 'www.loot.exchange', 'gem.xyz', 'sudoswap.xyz', 'openseauserdata.com', 'alienswap.xyz', 'www.ens.vision', 'lh3.googleusercontent.com', 'magically.gg', 'pro.opensea.io'],
  },
  webpack(config, { isServer }) {

    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        dns: false,
        tls: false,
        net: false,
      }
    }

    config.module = {
      ...config.module,
      exprContextCritical: false,
    }

    config.module.rules.push({
      test: /\.svg$/i,
      //issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })
    config.externals.push("pino-pretty", "lokijs", "encoding");
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config
  },
}

export default nextConfig