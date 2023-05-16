import { sidebar } from './sidebar'
import { createRequire } from 'module'
import { defineConfig } from 'vitepress'

const require = createRequire(import.meta.url)
const pkg = require('../../packages/react/package.json')

const title = 'wagmi'
const description =
  'A collection of React Hooks & VanillaJS Actions containing everything you need to start working with Ethereum.'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  cleanUrls: true,
  lang: 'en-US',

  title,
  titleTemplate: `:title · ${title}`,
  description,

  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/favicons/light.png' }],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        href: '/favicons/dark.png',
        media: '(prefers-color-scheme: dark)',
      },
    ],
    ['meta', { property: 'og:type', content: 'website' }],
    [
      'meta',
      {
        property: 'og:title',
        content: `${title} · React Hooks for Ethereum`,
      },
    ],
    [
      'meta',
      { property: 'og:image', content: 'https://wagmi.sh/og-image.png' },
    ],
    ['meta', { property: 'og:url', content: 'https://wagmi.sh' }],
    ['meta', { property: 'og:description', content: description }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:site', content: '@wagmi_sh' }],
    ['meta', { name: 'theme-color', content: '#1E1E20' }],
    [
      'script',
      {
        src: 'https://cdn.usefathom.com/script.js',
        ['data-site']: 'NIHVYSPA',
        defer: '',
      },
    ],
  ],

  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark',
    },
  },

  themeConfig: {
    algolia: {
      appId: 'TODO',
      apiKey: 'TODO',
      indexName: 'wagmi',
    },

    editLink: {
      pattern: 'https://github.com/wagmi-dev/wagmi/edit/main/site/:path',
      text: 'Edit this page on GitHub',
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present weth, LLC',
    },

    logo: { light: '/icon-light.png', dark: '/icon-dark.png' },

    nav: [
      { text: 'React', link: '/react/getting-started', activeMatch: '/react' },
      { text: 'Core', link: '/core/getting-started', activeMatch: '/core' },
      { text: 'CLI', link: '/cli/getting-started', activeMatch: '/cli' },
      {
        text: pkg.version,
        items: [
          {
            text: `Migrating to ${toPatchVersionRange(pkg.version)}`,
            link: `/docs/migration-guide.html#_${toPatchVersionRange(
              pkg.version,
            ).replace(/\./g, '-')}-breaking-changes`,
          },
          {
            text: 'Changelog',
            link: 'https://github.com/wagmi-dev/wagmi/blob/main/CHANGELOG.md',
          },
          {
            text: 'Contributing',
            link: 'https://github.com/wagmi-dev/wagmi/blob/main/.github/CONTRIBUTING.md',
          },
        ],
      },
    ],

    outline: [2, 3],

    sidebar,

    siteTitle: false,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/wagmi-dev/wagmi' },
    ],
  },

  vite: {
    server: {
      fs: {
        allow: ['../..'],
      },
    },
  },
})

function toPatchVersionRange(version: string) {
  const [major, minor] = version.split('.').slice(0, 2)
  return `${major}.${minor}.x`
}
