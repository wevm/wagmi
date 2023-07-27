import ts from 'typescript'
import { presetAttributify, presetIcons, presetUno } from 'unocss'
import Unocss from 'unocss/vite'
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
        // { text: 'CLI', link: '/cli/getting-started' }, // TODO
        { text: 'Examples', link: '/examples' },
        {
          text: reactPackage.version,
          items: [
            {
              text: `Migrating to ${toPatchVersionRange(reactPackage.version)}`,
              link: `/react/migration-guide#_${toPatchVersionRange(
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
      outline: [2, 3],
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
        paths: {
          // Deps - twoslash sometimes has difficulty resolving deps so adding these here
          '@wagmi/chains': ['../node_modules/@wagmi/chains'], // TODO: Remove from here and package.json once viem "internalizes" `@wagmi/chains`
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

function toPatchVersionRange(version: string) {
  const [major, minor] = version.split('.').slice(0, 2)
  return `${major}.${minor}.x`
}

function getSidebar() {
  return {
    '/react': [
      {
        text: 'Introduction',
        items: [
          { text: 'Why Wagmi 🚧', link: '/react/why-wagmi' },
          { text: 'Getting Started', link: '/react/getting-started' },
          { text: 'TypeScript', link: '/react/typescript' },
          { text: 'Comparisons 🚧', link: '/react/comparison' },
        ],
      },
      {
        text: 'Guides',
        items: [
          {
            text: 'Connect Wallet 🚧',
            link: '/react/connect-wallet',
          },
          {
            text: 'TanStack Query 🚧',
            link: '/react/connect-wallet',
          },
          { text: 'Migration Guide 🚧', link: '/react/migration-guide' },
        ],
      },
      {
        text: 'API',
        items: [
          { text: 'createConfig 🚧', link: '/react/createConfig' },
          { text: 'WagmiConfig 🚧', link: '/react/WagmiConfig' },
          { text: 'Actions 🚧', link: '/react/actions' },
          {
            text: 'Connectors 🚧',
            collapsed: true,
            items: [
              {
                text: 'coinbaseWallet 🚧',
                link: '/react/connectors/coinbaseWallet',
              },
              { text: 'injected 🚧', link: '/react/connectors/injected' },
              {
                text: 'ledger 🚧',
                link: '/react/connectors/ledger',
              },
              {
                text: 'safe 🚧',
                link: '/react/connectors/safe',
              },
              {
                text: 'walletConnect 🚧',
                link: '/react/connectors/walletConnect',
              },
            ],
          },
          {
            text: 'Hooks 🚧',
            collapsed: true,
            items: [
              { text: 'useAccount', link: '/react/hooks/useAccount' },
              { text: 'useBalance 🚧', link: '/react/hooks/useBalance' },
              {
                text: 'useBlockNumber 🚧',
                link: '/react/hooks/useBlockNumber',
              },
              { text: 'useChainId 🚧', link: '/react/hooks/useChainId' },
              { text: 'useConfig 🚧', link: '/react/hooks/useConfig' },
              { text: 'useConnect', link: '/react/hooks/useConnect' },
              {
                text: 'useConnections 🚧',
                link: '/react/hooks/useConnections',
              },
              {
                text: 'useContractRead 🚧',
                link: '/react/hooks/useContractRead',
              },
              {
                text: 'useContractInfiniteReads 🚧',
                link: '/react/hooks/useContractInfiniteReads',
              },
              {
                text: 'useContractReads 🚧',
                link: '/react/hooks/useContractReads',
              },
              {
                text: 'useContractEvent 🚧',
                link: '/react/hooks/useContractEvent',
              },
              {
                text: 'useContractWrite 🚧',
                link: '/react/hooks/useContractWrite',
              },
              { text: 'useDisconnect', link: '/react/hooks/useDisconnect' },
              { text: 'useEnsAddress 🚧', link: '/react/hooks/useEnsAddress' },
              { text: 'useEnsAvatar 🚧', link: '/react/hooks/useEnsAvatar' },
              { text: 'useEnsName 🚧', link: '/react/hooks/useEnsName' },
              {
                text: 'useEnsResovler 🚧',
                link: '/react/hooks/useEnsResovler',
              },
              { text: 'useFeeData 🚧', link: '/react/hooks/useFeeData' },
              {
                text: 'usePrepareContractWrite 🚧',
                link: '/react/hooks/usePrepareContractWrite',
              },
              {
                text: 'usePrepareSendTransaction 🚧',
                link: '/react/hooks/usePrepareSendTransaction',
              },
              { text: 'useReconnect 🚧', link: '/react/hooks/useReconnect' },
              {
                text: 'useSendTransaction 🚧',
                link: '/react/hooks/useSendTransaction',
              },
              {
                text: 'useSignMessage 🚧',
                link: '/react/hooks/useSignMessage',
              },
              {
                text: 'useSignTypedData 🚧',
                link: '/react/hooks/useSignTypedData',
              },
              {
                text: 'useSwitchAccount 🚧',
                link: '/react/hooks/useSwitchAccount',
              },
              {
                text: 'useSwitchChain 🚧',
                link: '/react/hooks/useSwitchChain',
              },
              {
                text: 'useTransaction 🚧',
                link: '/react/hooks/useTransaction',
              },
              {
                text: 'useToken 🚧',
                link: '/react/hooks/useToken',
              },
              {
                text: 'useWaitForTransaction 🚧',
                link: '/react/hooks/useWaitForTransaction',
              },
              {
                text: 'useWalletClient 🚧',
                link: '/react/hooks/useWalletClient',
              },
              {
                text: 'useWatchPendingTransactions 🚧',
                link: '/react/hooks/useWatchPendingTransactions',
              },
            ],
          },
          { text: 'Errors 🚧', link: '/react/errors' },
        ],
      },
    ],
    '/core': [
      {
        text: 'Introduction',
        items: [
          { text: 'Why Wagmi 🚧', link: '/core/why-wagmi' },
          { text: 'Getting Started', link: '/core/getting-started' },
          { text: 'TypeScript', link: '/core/typescript' },
        ],
      },
      {
        text: 'Guides',
        items: [
          {
            text: 'Framework Adapters 🚧',
            link: '/core/framework-adapter',
          },
          { text: 'Migration Guide 🚧', link: '/core/migration-guide' },
        ],
      },
      {
        text: 'API',
        items: [
          { text: 'createConfig 🚧', link: '/core/createConfig' },
          { text: 'createConnector 🚧', link: '/core/createConnector' },
          { text: 'createStorage 🚧', link: '/core/createStorage' },
          {
            text: 'Actions 🚧',
            collapsed: true,
            items: [
              { text: 'connect', link: '/core/actions/connect' },
              { text: 'disconnect', link: '/core/actions/disconnect' },
              { text: 'getAccount', link: '/core/actions/getAccount' },
              { text: 'getBalance 🚧', link: '/core/actions/getBalance' },
              {
                text: 'getBlockNumber 🚧',
                link: '/core/actions/getBlockNumber',
              },
              { text: 'getChainId', link: '/core/actions/getChainId' },
              {
                text: 'getConnections',
                link: '/core/actions/getConnections',
              },
              {
                text: 'getConnectorClient 🚧',
                link: '/core/actions/getConnectorClient',
              },
              { text: 'getEnsAddress 🚧', link: '/core/actions/getEnsAddress' },
              { text: 'getEnsAvatar 🚧', link: '/core/actions/getEnsAvatar' },
              { text: 'getEnsName 🚧', link: '/core/actions/getEnsName' },
              {
                text: 'getEnsResolver 🚧',
                link: '/core/actions/getEnsResolver',
              },
              { text: 'getFeeData 🚧', link: '/core/actions/getFeeData' },
              { text: 'getToken 🚧', link: '/core/actions/getToken' },
              {
                text: 'prepareContractWrite 🚧',
                link: '/core/actions/prepareContractWrite',
              },
              {
                text: 'prepareSendTransaction 🚧',
                link: '/core/actions/prepareSendTransaction',
              },
              { text: 'reconnect', link: '/core/actions/reconnect' },
              { text: 'readContract 🚧', link: '/core/actions/readContract' },
              { text: 'readContracts 🚧', link: '/core/actions/readContracts' },
              {
                text: 'sendTransaction 🚧',
                link: '/core/actions/sendTransaction',
              },
              {
                text: 'signMessage 🚧',
                link: '/core/actions/signMessage',
              },
              {
                text: 'signTypedData 🚧',
                link: '/core/actions/signTypedData',
              },
              {
                text: 'switchAccount',
                link: '/core/actions/switchAccount',
              },
              {
                text: 'switchChain 🚧',
                link: '/core/actions/switchChain',
              },
              {
                text: 'waitForTransactionReceipt 🚧',
                link: '/core/actions/waitForTransactionReceipt',
              },
              { text: 'writeContract 🚧', link: '/core/actions/writeContract' },
            ],
          },
          {
            text: 'Connectors 🚧',
            collapsed: true,
            link: '/core/connectors',
            items: [
              {
                text: 'coinbaseWallet 🚧',
                link: '/core/connectors/coinbaseWallet',
              },
              { text: 'injected 🚧', link: '/core/connectors/injected' },
              {
                text: 'ledger 🚧',
                link: '/core/connectors/ledger',
              },
              {
                text: 'safe 🚧',
                link: '/core/connectors/safe',
              },
              {
                text: 'walletConnect 🚧',
                link: '/core/connectors/walletConnect',
              },
            ],
          },
          { text: 'Errors 🚧', link: '/core/errors' },
          {
            text: 'Utilities 🚧',
            collapsed: true,
            items: [
              { text: 'deserialize 🚧', link: '/core/deserialize' },
              { text: 'normalizeChainId 🚧', link: '/core/normalizeChainId' },
              { text: 'serialize 🚧', link: '/core/serialize' },
            ],
          },
        ],
      },
    ],
  } satisfies DefaultTheme.Sidebar
}
