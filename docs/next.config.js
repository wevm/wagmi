const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.js',
  unstable_contentDump: true,
  unstable_flexsearch: true,
  unstable_staticImage: true,
})

/** @type {import('next').NextConfig} */
const config = {
  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US',
  },
  reactStrictMode: true,
  redirects: () => {
    return [
      {
        source: '/examples',
        destination: '/examples/connect-wallet',
        statusCode: 302,
      },
      {
        source: '/guides/:path*',
        destination: '/examples/:path*',
        permanent: true,
      },
    ]
  },
  typescript: {
    // Disable type checking since eslint handles this
    ignoreBuildErrors: true,
  },
}

if (process.env.NODE_ENV === 'development') {
  const withPreconstruct = require('@preconstruct/next')
  module.exports = withPreconstruct(withNextra(config))
} else {
  const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
  })
  module.exports = withBundleAnalyzer(withNextra(config))
}
