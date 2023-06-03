import { DefaultTheme, defineConfig } from 'vitepress'
import { withTwoslash } from 'vitepress-plugin-shiki-twoslash'

import reactPackage from '../../packages/react/package.json'

// https://vitepress.dev/reference/site-config
export default withTwoslash(
  defineConfig({
    cleanUrls: true,
    description: 'React Hooks for Ethereum',
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
          ['data-site']: 'QWAXSUPT',
          defer: '',
        },
      ],
    ],
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
        { text: 'CLI', link: '/cli' },
        { text: 'Examples', link: '/examples' },
        {
          text: reactPackage.version,
          items: [
            {
              text: `Migrating to ${toPatchVersionRange(reactPackage.version)}`,
              link: `/docs/migration-guide.html#_${toPatchVersionRange(
                reactPackage.version,
              ).replace(/\./g, '-')}-breaking-changes`,
            },
            {
              text: 'Release Notes ',
              link: 'https://github.com/wagmi-dev/wagmi/releases',
            },
            {
              text: 'Contributing ',
              link: 'https://github.com/wagmi-dev/wagmi/blob/main/.github/CONTRIBUTING.md',
            },
          ],
        },
      ],
      sidebar: getSidebar(),
      siteTitle: false,
      socialLinks: [
        { icon: 'twitter', link: 'https://twitter.com/wagmi_sh' },
        { icon: 'github', link: 'https://github.com/wagmi-dev/wagmi' },
      ],
    },
    title: 'wagmi',
    twoslash: {
      defaultCompilerOptions: {
        target: 99,
      },
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

function toPatchVersionRange(version: string) {
  const [major, minor] = version.split('.').slice(0, 2)
  return `${major}.${minor}.x`
}

function getSidebar() {
  return {
    '/react': [
      { text: 'Why Wagmi', link: '/react/why-wagmi' },
      { text: 'Getting Started', link: '/react/getting-started' },
      { text: 'TypeScript Support', link: '/react/typescript' },
      { text: 'Comparisons', link: '/react/comparison' },
      { text: 'Migration Guide', link: '/react/migration-guide' },
      {
        text: 'Guides',
        items: [
          {
            text: 'Connect Wallet',
            link: '/react/connect-wallet',
          },
        ],
      },
      {
        text: 'API',
        items: [
          { text: 'createConfig', link: '/react/createConfig' },
          { text: 'WagmiConfig', link: '/react/WagmiConfig' },
          { text: 'Actions', link: '/react/actions' },
          { text: 'Chains', link: '/react/chains' },
          {
            text: 'Connectors',
            collapsed: true,
            items: [
              {
                text: 'coinbaseWallet',
                link: '/react/connectors/coinbaseWallet',
              },
              { text: 'injected', link: '/react/connectors/injected' },
              {
                text: 'walletConnect',
                link: '/react/connectors/walletConnect',
              },
            ],
          },
          {
            text: 'Hooks',
            collapsed: true,
            items: [
              { text: 'useAccount', link: '/react/hooks/useAccount' },
              { text: 'useBalance', link: '/react/hooks/useBalance' },
              {
                text: 'useBlockNumber',
                link: '/react/hooks/useBlockNumber',
              },
              { text: 'useChainId', link: '/react/hooks/useChainId' },
              { text: 'useConfig', link: '/react/hooks/useConfig' },
              { text: 'useConnect', link: '/react/hooks/useConnect' },
              {
                text: 'useConnections',
                link: '/react/hooks/useConnections',
              },
              { text: 'useDisconnect', link: '/react/hooks/useDisconnect' },
              { text: 'useReconnect', link: '/react/hooks/useReconnect' },
              {
                text: 'useSwitchAccount',
                link: '/react/hooks/useSwitchAccount',
              },
            ],
          },
          { text: 'Errors', link: '/react/errors' },
        ],
      },
    ],
    '/core': [
      { text: 'Why Wagmi', link: '/core/why-wagmi' },
      { text: 'Getting Started', link: '/core/getting-started' },
      { text: 'TypeScript Support', link: '/core/typescript' },
      { text: 'Migration Guide', link: '/core/migration-guide' },
      {
        text: 'Guides',
        items: [
          {
            text: 'Framework Adapters',
            link: '/core/framework-adapter',
          },
        ],
      },
      {
        text: 'API',
        items: [
          { text: 'createConfig', link: '/core/createConfig' },
          { text: 'createConnector', link: '/core/createConnector' },
          { text: 'createQueryClient', link: '/core/createQueryClient' },
          { text: 'createStorage', link: '/core/createStorage' },
          {
            text: 'Actions',
            collapsed: true,
            items: [
              { text: 'connect', link: '/core/actions/connect' },
              { text: 'disconnect', link: '/core/actions/disconnect' },
              { text: 'getAccount', link: '/core/actions/getAccount' },
              { text: 'getBalance', link: '/core/actions/getBalance' },
              {
                text: 'getBlockNumber',
                link: '/core/actions/getBlockNumber',
              },
              { text: 'getChainId', link: '/core/actions/getChainId' },
              {
                text: 'getConnections',
                link: '/core/actions/getConnections',
              },
              { text: 'reconnect', link: '/react/hooks/reconnect' },
              {
                text: 'switchAccount',
                link: '/core/actions/switchAccount',
              },
            ],
          },
          { text: 'Chains', link: '/core/chains' },
          {
            text: 'Connectors',
            collapsed: true,
            link: '/core/connectors',
            items: [
              {
                text: 'coinbaseWallet',
                link: '/core/connectors/coinbaseWallet',
              },
              { text: 'injected', link: '/core/connectors/injected' },
              {
                text: 'walletConnect',
                link: '/core/connectors/walletConnect',
              },
            ],
          },
          { text: 'Errors', link: '/core/errors' },
          {
            text: 'Utilities',
            collapsed: true,
            items: [
              { text: 'deserialize', link: '/core/deserialize' },
              { text: 'normalizeChainId', link: '/core/normalizeChainId' },
              { text: 'serialize', link: '/core/serialize' },
            ],
          },
        ],
      },
    ],
  } satisfies DefaultTheme.Sidebar
}
