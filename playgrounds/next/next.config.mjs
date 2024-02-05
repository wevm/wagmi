import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    externalDir: true,
  },
  webpack(config) {
    config.resolve.extensionAlias = {
      '.js': ['.js', '.ts'],
    }
    return config
  },
}

export default withBundleAnalyzer(nextConfig)
