import ts from 'typescript'
import { presetAttributify, presetIcons, presetUno } from 'unocss'
import Unocss from 'unocss/vite'
import { defineConfig } from 'vitepress'
import { withTwoslash } from 'vitepress-plugin-shiki-twoslash'

import { getSidebar } from './sidebar'

// https://vitepress.dev/reference/site-config
export default withTwoslash(
  defineConfig({
    cleanUrls: true,
    description: 'Reactivity for Ethereum apps',
    head: [
      ['meta', { name: 'theme-color', content: '#729b1a' }],
      ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
      [
        'link',
        {
          rel: 'alternate icon',
          href: '/favicon.png',
          type: 'image/png',
          sizes: '48x48',
        },
      ],
      [
        'meta',
        {
          name: 'keywords',
          content: 'react, ethereum, typescript, react hooks',
        },
      ],
      ['meta', { property: 'og:url', content: 'https://wagmi.sh' }],
      ['meta', { property: 'og:image', content: 'https://wagmi.sh/og.png' }],
      ['meta', { name: 'twitter:image', content: 'https://wagmi.sh/og.png' }],
      ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
      [
        'script',
        {
          src: 'https://cdn.usefathom.com/script.js',
          'data-site': 'QWAXSUPT',
          defer: '',
        },
      ],
    ],
    ignoreDeadLinks: true, // TODO: Remove before v2 release
    lang: 'en-US',
    lastUpdated: true,
    markdown: {
      theme: {
        light: 'vitesse-light',
        dark: 'vitesse-dark',
      },
    },
    themeConfig: {
      algolia: {
        appId: '6DHD5JFQ7Z',
        apiKey: '28c37f5f9198a5d458dc4dae447980fa',
        indexName: 'wagmi',
      },
      editLink: {
        pattern: 'https://github.com/wagmi-dev/wagmi/edit/main/docs/:path',
        text: 'Suggest changes to this page',
      },
      footer: {
        message:
          'Released under the <a href="https://github.com/wagmi-dev/wagmi/blob/main/LICENSE">MIT License</a>.',
        copyright: 'Copyright © 2022-present weth, LLC  ',
      },
      logo: {
        light: '/logo-light.svg',
        dark: '/logo-dark.svg',
        alt: 'wagmi logo',
      },
      nav: [
        { text: 'React', link: '/react/getting-started' },
        { text: 'Core', link: '/core/getting-started' },
        { text: 'CLI', link: '/cli/getting-started' }, // TODO
        { text: 'Examples', link: '/examples' }, // TODO
        {
          text: 'Links',
          items: [
            {
              text: 'Discussions ',
              link: 'https://github.com/wagmi-dev/wagmi/discussions',
            },
            {
              text: 'Release Notes ',
              link: 'https://github.com/wagmi-dev/wagmi/releases',
            },
            {
              text: 'Contributing ',
              link: '/dev/contributing',
            },
          ],
        },
      ],
      outline: [2, 3],
      sidebar: getSidebar(),
      siteTitle: false,
      socialLinks: [
        { icon: 'twitter', link: 'https://twitter.com/wagmi_sh' },
        { icon: 'github', link: 'https://github.com/wagmi-dev/wagmi' },
      ],
    },
    title: 'Wagmi',
    twoslash: {
      defaultCompilerOptions: {
        paths: {
          // Deps - twoslash sometimes has difficulty resolving deps so adding these here
          '@tanstack/query-core': ['../node_modules/@tanstack/query-core'],
          '@tanstack/react-query': ['../node_modules/@tanstack/react-query'],
          abitype: ['../node_modules/abitype'],
          'abitype/*': ['../node_modules/abitype/*'],
          react: ['../node_modules/@types/react'],
          viem: ['../node_modules/viem'],
          'viem/*': ['../node_modules/viem/*'],

          // Source - reference source files so we don't need to build packages to get types (speeds things up)
          '@wagmi/connectors': ['../../packages/connectors/src'],
          '@wagmi/core': ['../../packages/core/src'],
          '@wagmi/core/*': ['../../packages/core/src/*'],
          wagmi: ['../../packages/react/src'],
          'wagmi/*': ['../../packages/react/src/*'],
        },
        strict: true,
        target: ts.ScriptTarget.ESNext,
      },
    },
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
        }) as unknown as Plugin,
      ],
    },
    vue: {
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.includes('-'),
        },
      },
    },
  }),
)
