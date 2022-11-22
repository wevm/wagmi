const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  unstable_contentDump: true,
  unstable_defaultShowCopyCode: true,
  unstable_flexsearch: {
    codeblocks: true,
  },
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
        source: '/docs/create-wagmi',
        destination: '/cli/create-wagmi',
        permanent: true,
      },
      {
        source: '/docs/:path*',
        destination: '/react/:path*',
        permanent: true,
      },
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
      {
        source: '/gitcoin',
        destination:
          'https://gitcoin.co/grants/4493/wagmi-react-hooks-library-for-ethereum',
        permanent: false,
      },
    ]
  },
  typescript: {
    // Disable type checking since eslint handles this
    ignoreBuildErrors: true,
  },
}

if (process.env.NODE_ENV === 'development') {
  // We don't use Preconstruct anymore, but the Next.js plugin works great for
  // development with our custom set up in packages' `tsup.config.ts`.
  // https://github.com/preconstruct/preconstruct/tree/main/packages/next
  const withPreconstruct = require('@preconstruct/next')
  module.exports = withPreconstruct(withNextra(config))
} else {
  const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
  })
  module.exports = withBundleAnalyzer(withNextra(config))
}
