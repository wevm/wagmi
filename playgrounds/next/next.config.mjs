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

export default nextConfig
