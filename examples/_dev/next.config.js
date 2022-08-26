const withPreconstruct = require('@preconstruct/next')

/** @type {import('next').NextConfig} */
module.exports = withPreconstruct({
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
})
