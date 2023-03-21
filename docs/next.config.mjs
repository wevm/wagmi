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
    locales: ['en-US','zh-CN'],
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
        source: '/cli',
        destination: '/cli/getting-started',
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
          'https://grant-explorer.gitcoin.co/#/round/1/0xe575282b376e3c9886779a841a2510f1dd8c2ce4/0x50f3dbb23d121a397941e827ce2f10a0aea7f5cf311de6e3abcfe3847c56c405-0xe575282b376e3c9886779a841a2510f1dd8c2ce4',
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
