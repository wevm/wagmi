import type { NextConfig } from 'next'

const nextConfig = {
  experimental: {
    externalDir: true,
  },
  // TODO: Remove and switch to turbopack once Next supports extensionAliases
  // https://github.com/vercel/next.js/issues/82945
  webpack(config) {
    config.resolve.extensionAlias = {
      '.js': ['.js', '.ts'],
    }
    return config
  },
} satisfies NextConfig

export default nextConfig
