const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.js',
  unstable_stork: false,
  unstable_contentDump: true,
  unstable_staticImage: true,
})

/** @type {import('next').NextConfig} */
const config = {
  // i18n: {
  //   locales: ['en-US'],
  //   defaultLocale: 'en-US',
  // },
  reactStrictMode: true,
}

module.exports = withNextra(config)
