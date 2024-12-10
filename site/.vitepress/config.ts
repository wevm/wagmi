import {
  defaultHoverInfoProcessor,
  transformerTwoslash,
} from '@shikijs/vitepress-twoslash'
import { presetAttributify, presetIcons, presetUno } from 'unocss'
import Unocss from 'unocss/vite'
import { defineConfig } from 'vitepress'

import { farcasterIcon } from './constants'
import { getSidebar } from './sidebar'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  cleanUrls: true,
  description: 'Reactivity for Ethereum apps',
  head: [
    [
      'meta',
      {
        name: 'keywords',
        content: 'react, ethereum, typescript, react, react hooks, open source',
      },
    ],
    ['link', { rel: 'icon', href: '/favicon.svg' }],
    ['meta', { name: 'theme-color', content: '#646cff' }],
    // Open Graph
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:image', content: 'https://wagmi.sh/og.png' }],
    ['meta', { property: 'og:url', content: 'https://wagmi.sh' }],
    // Twitter
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:creator', content: '@wevm_dev' }],
    ['meta', { name: 'twitter:image', content: 'https://wagmi.sh/og.png' }],
    ['meta', { name: 'twitter:site', content: 'wagmi.sh' }],
    // Fathom
    [
      'script',
      {
        src: 'https://cdn.usefathom.com/script.js',
        'data-site': 'QWAXSUPT',
        defer: '',
      },
    ],
  ],
  ignoreDeadLinks: false,
  lang: 'en-US',
  lastUpdated: true,
  markdown: {
    codeTransformers: [
      transformerTwoslash({
        processHoverInfo(info) {
          return (
            defaultHoverInfoProcessor(info)
              // Remove shiki_core namespace
              .replace(/_shikijs_core[\w_]*\./g, '')
          )
        },
      }),
    ],
    theme: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    },
  },
  themeConfig: {
    editLink: {
      pattern: 'https://github.com/wevm/wagmi/edit/main/site/:path',
      text: 'Suggest changes to this page',
    },
    footer: {
      message:
        'Released under the <a href="https://github.com/wevm/wagmi/blob/main/LICENSE">MIT License</a>.',
      copyright: 'Copyright © 2022-present Weth, LLC',
    },
    logo: {
      light: '/logo-light.svg',
      dark: '/logo-dark.svg',
      alt: 'wagmi logo',
    },
    nav: [
      { text: 'React', link: '/react/getting-started' },
      { text: 'Vue', link: '/vue/getting-started' },
      { text: 'Svelte', link: '/svelte/getting-started' },
      { text: 'Core', link: '/core/getting-started' },
      { text: 'CLI', link: '/cli/getting-started' },
      // { text: 'Examples', link: '/examples/connect-wallet' },
      {
        text: 'More',
        items: [
          {
            text: 'Discussions ',
            link: 'https://github.com/wevm/wagmi/discussions',
          },
          {
            text: 'Release Notes ',
            link: 'https://github.com/wevm/wagmi/releases',
          },
          {
            text: 'Contributing ',
            link: '/dev/contributing',
          },
        ],
      },
    ],
    outline: [2, 3],
    search: {
      provider: 'local',
      options: {
        _render(src, env, md) {
          const html = md.render(src, env)
          if (env.frontmatter?.search === false) return ''
          if (env.relativePath.startsWith('shared')) return ''
          return html
        },
      },
    },
    sidebar: getSidebar(),
    siteTitle: false,
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/wevm/wagmi',
      },
      { icon: 'bluesky', link: 'https://bsky.app/profile/wevm.dev' },
      { icon: 'x', link: 'https://twitter.com/wevm_dev' },
      { icon: { svg: farcasterIcon }, link: 'https://warpcast.com/wevm' },
      { icon: 'discord', link: 'https://discord.gg/9zHPXuBpqy' },
    ],
  },
  title: 'Wagmi',
  vite: {
    plugins: [
      Unocss({
        shortcuts: [
          [
            'btn',
            'px-4 py-1 rounded inline-flex justify-center gap-2 text-white leading-30px children:mya !no-underline cursor-pointer disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50',
          ],
        ],
        presets: [
          presetUno({
            dark: 'media',
          }),
          presetAttributify(),
          presetIcons({
            scale: 1.2,
          }),
        ],
      }),
    ],
  },
})
