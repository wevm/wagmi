// We don't use Preconstruct anymore, but the Next.js plugin works great for
// development with our custom set up in packages' `tsup.config.ts`.
// https://github.com/preconstruct/preconstruct/tree/main/packages/next
const withPreconstruct = require('@preconstruct/next')

/** @type {import('next').NextConfig} */
module.exports = withPreconstruct({
  reactStrictMode: true,
})
