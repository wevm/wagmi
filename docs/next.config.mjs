import nextra from 'nextra'
import withPreconstruct from '@preconstruct/next'

const withNextra = nextra({
  defaultShowCopyCode: true,
  flexsearch: {
    codeblocks: false,
  },
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  staticImage: true,
})

/** @type {import('next').NextConfig} */
const config = {
  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US',
  },
  reactStrictMode: true,
  redirects() {
    return [
      // Redirects for old docs
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
        source: '/guides/:path*',
        destination: '/examples/:path*',
        permanent: true,
      },
      // Redirect paths to first page in section
      {
        source: '/react',
        destination: '/react/getting-started',
        permanent: true,
      },
      {
        source: '/core',
        destination: '/core/getting-started',
        permanent: true,
      },
      {
        source: '/examples',
        destination: '/examples/connect-wallet',
        statusCode: 302,
      },
      // External redirects
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

// We don't use Preconstruct anymore, but the Next.js plugin works great for
// development with our custom set up in packages' `tsup.config.ts`.
// https://github.com/preconstruct/preconstruct/tree/main/packages/next
export default process.env.NODE_ENV === 'development'
  ? withPreconstruct(withNextra(config))
  : withNextra(config)
