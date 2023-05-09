// We don't use Preconstruct anymore, but the Next.js plugin works great for
// development with our custom set up in packages' `tsup.config.ts`.
// https://github.com/preconstruct/preconstruct/tree/main/packages/next
const withPreconstruct = require('@preconstruct/next')

/** @type {import('next').NextConfig} */
module.exports = withPreconstruct({
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false }
    return config
  },
  async headers() {
    return [
      {
        source: '/manifest.json',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
        ],
      },
    ]
  },
})
