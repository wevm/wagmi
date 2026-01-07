import type { DefaultTheme } from 'vitepress'

export function getSidebar() {
  return {
    '/react': [
      {
        text: 'Introduction',
        items: [
          { text: 'Why Wagmi', link: '/react/why' },
          { text: 'Installation', link: '/react/installation' },
          { text: 'Getting Started', link: '/react/getting-started' },
          { text: 'TypeScript', link: '/react/typescript' },
          { text: 'Comparisons', link: '/react/comparisons' },
        ],
      },
      {
        text: 'Guides',
        items: [
          {
            text: 'TanStack Query',
            link: '/react/guides/tanstack-query',
          },
          {
            text: 'Viem',
            link: '/react/guides/viem',
          },
          {
            text: 'Error Handling',
            link: '/react/guides/error-handling',
          },
          {
            text: 'Ethers.js Adapters',
            link: '/react/guides/ethers',
          },
          // {
          //   text: 'Testing',
          //   link: '/react/guides/testing',
          // },
          {
            text: 'Chain Properties',
            link: '/react/guides/chain-properties',
          },
          {
            text: 'SSR',
            link: '/react/guides/ssr',
          },
          {
            text: 'Connect Wallet',
            link: '/react/guides/connect-wallet',
          },
          {
            text: 'Send Transaction',
            link: '/react/guides/send-transaction',
          },
          {
            text: 'Read from Contract',
            link: '/react/guides/read-from-contract',
          },
          {
            text: 'Write to Contract',
            link: '/react/guides/write-to-contract',
          },
          {
            text: 'FAQ / Troubleshooting',
            link: '/react/guides/faq',
          },
          {
            text: 'Migrate from v2 to v3',
            link: '/react/guides/migrate-from-v2-to-v3',
          },
          {
            text: 'Migrate from v1 to v2',
            link: '/react/guides/migrate-from-v1-to-v2',
          },
        ],
      },
      {
        text: 'Configuration',
        items: [
          { text: 'createConfig', link: '/react/api/createConfig' },
          { text: 'createStorage', link: '/react/api/createStorage' },
          { text: 'Chains', link: '/react/api/chains' },
          {
            text: 'Connectors',
            collapsed: true,
            link: '/react/api/connectors',
            items: [
              {
                text: 'baseAccount',
                link: '/react/api/connectors/baseAccount',
              },
              {
                text: 'gemini',
                link: '/react/api/connectors/gemini',
              },
              { text: 'injected', link: '/react/api/connectors/injected' },
              {
                text: 'metaMask',
                link: '/react/api/connectors/metaMask',
              },
              {
                text: 'mock',
                link: '/react/api/connectors/mock',
              },
              {
                text: 'porto',
                link: '/react/api/connectors/porto',
              },
              {
                text: 'safe',
                link: '/react/api/connectors/safe',
              },
              {
                text: 'walletConnect',
                link: '/react/api/connectors/walletConnect',
              },
            ],
          },
          {
            text: 'Transports',
            collapsed: true,
            link: '/react/api/transports',
            items: [
              {
                text: 'custom (EIP-1193)',
                link: '/react/api/transports/custom',
              },
              {
                text: 'fallback',
                link: '/react/api/transports/fallback',
              },
              {
                text: 'http',
                link: '/react/api/transports/http',
              },
              {
                text: 'unstable_connector',
                link: '/react/api/transports/unstable_connector',
              },
              {
                text: 'webSocket',
                link: '/react/api/transports/webSocket',
              },
            ],
          },
          { text: 'WagmiProvider', link: '/react/api/WagmiProvider' },
        ],
      },
      {
        text: 'Hooks',
        link: '/react/api/hooks',
        items: [
          { text: 'useBalance', link: '/react/api/hooks/useBalance' },
          {
            text: 'useBlockNumber',
            link: '/react/api/hooks/useBlockNumber',
          },
          {
            text: 'useBlock',
            link: '/react/api/hooks/useBlock',
          },
          {
            text: 'useBlockTransactionCount',
            link: '/react/api/hooks/useBlockTransactionCount',
          },
          {
            text: 'useBytecode',
            link: '/react/api/hooks/useBytecode',
          },
          { text: 'useCall', link: '/react/api/hooks/useCall' },
          {
            text: 'useCallsStatus',
            link: '/react/api/hooks/useCallsStatus',
          },
          {
            text: 'useCapabilities',
            link: '/react/api/hooks/useCapabilities',
          },
          { text: 'useChainId', link: '/react/api/hooks/useChainId' },
          { text: 'useChains', link: '/react/api/hooks/useChains' },
          { text: 'useClient', link: '/react/api/hooks/useClient' },
          { text: 'useConfig', link: '/react/api/hooks/useConfig' },
          { text: 'useConnect', link: '/react/api/hooks/useConnect' },
          { text: 'useConnection', link: '/react/api/hooks/useConnection' },
          {
            text: 'useConnectionEffect',
            link: '/react/api/hooks/useConnectionEffect',
          },
          {
            text: 'useConnections',
            link: '/react/api/hooks/useConnections',
          },
          {
            text: 'useConnectorClient',
            link: '/react/api/hooks/useConnectorClient',
          },
          {
            text: 'useConnectors',
            link: '/react/api/hooks/useConnectors',
          },
          {
            text: 'useDeployContract',
            link: '/react/api/hooks/useDeployContract',
          },
          { text: 'useDisconnect', link: '/react/api/hooks/useDisconnect' },
          { text: 'useEnsAddress', link: '/react/api/hooks/useEnsAddress' },
          { text: 'useEnsAvatar', link: '/react/api/hooks/useEnsAvatar' },
          { text: 'useEnsName', link: '/react/api/hooks/useEnsName' },
          {
            text: 'useEnsResolver',
            link: '/react/api/hooks/useEnsResolver',
          },
          {
            text: 'useEnsText',
            link: '/react/api/hooks/useEnsText',
          },
          {
            text: 'useFeeHistory',
            link: '/react/api/hooks/useFeeHistory',
          },
          {
            text: 'useProof',
            link: '/react/api/hooks/useProof',
          },
          {
            text: 'usePublicClient',
            link: '/react/api/hooks/usePublicClient',
          },
          {
            text: 'useEstimateFeesPerGas',
            link: '/react/api/hooks/useEstimateFeesPerGas',
          },
          {
            text: 'useEstimateGas',
            link: '/react/api/hooks/useEstimateGas',
          },
          {
            text: 'useEstimateMaxPriorityFeePerGas',
            link: '/react/api/hooks/useEstimateMaxPriorityFeePerGas',
          },
          {
            text: 'useGasPrice',
            link: '/react/api/hooks/useGasPrice',
          },
          {
            text: 'useInfiniteReadContracts',
            link: '/react/api/hooks/useInfiniteReadContracts',
          },
          {
            text: 'usePrepareTransactionRequest',
            link: '/react/api/hooks/usePrepareTransactionRequest',
          },
          {
            text: 'useReadContract',
            link: '/react/api/hooks/useReadContract',
          },
          {
            text: 'useReadContracts',
            link: '/react/api/hooks/useReadContracts',
          },
          { text: 'useReconnect', link: '/react/api/hooks/useReconnect' },
          {
            text: 'useSendCalls',
            link: '/react/api/hooks/useSendCalls',
          },
          {
            text: 'useSendCallsSync',
            link: '/react/api/hooks/useSendCallsSync',
          },
          {
            text: 'useSendTransaction',
            link: '/react/api/hooks/useSendTransaction',
          },
          {
            text: 'useSendTransactionSync',
            link: '/react/api/hooks/useSendTransactionSync',
          },
          {
            text: 'useShowCallsStatus',
            link: '/react/api/hooks/useShowCallsStatus',
          },
          {
            text: 'useSignMessage',
            link: '/react/api/hooks/useSignMessage',
          },
          {
            text: 'useSignTypedData',
            link: '/react/api/hooks/useSignTypedData',
          },
          {
            text: 'useSimulateContract',
            link: '/react/api/hooks/useSimulateContract',
          },
          {
            text: 'useStorageAt',
            link: '/react/api/hooks/useStorageAt',
          },
          {
            text: 'useSwitchChain',
            link: '/react/api/hooks/useSwitchChain',
          },
          {
            text: 'useSwitchConnection',
            link: '/react/api/hooks/useSwitchConnection',
          },
          {
            text: 'useTransaction',
            link: '/react/api/hooks/useTransaction',
          },
          {
            text: 'useTransactionConfirmations',
            link: '/react/api/hooks/useTransactionConfirmations',
          },
          {
            text: 'useTransactionCount',
            link: '/react/api/hooks/useTransactionCount',
          },
          {
            text: 'useTransactionReceipt',
            link: '/react/api/hooks/useTransactionReceipt',
          },
          {
            text: 'useWaitForCallsStatus',
            link: '/react/api/hooks/useWaitForCallsStatus',
          },
          {
            text: 'useWaitForTransactionReceipt',
            link: '/react/api/hooks/useWaitForTransactionReceipt',
          },
          {
            text: 'useVerifyMessage',
            link: '/react/api/hooks/useVerifyMessage',
          },
          {
            text: 'useVerifyTypedData',
            link: '/react/api/hooks/useVerifyTypedData',
          },
          {
            text: 'useWalletClient',
            link: '/react/api/hooks/useWalletClient',
          },
          {
            text: 'useWatchAsset',
            link: '/react/api/hooks/useWatchAsset',
          },
          {
            text: 'useWatchBlocks',
            link: '/react/api/hooks/useWatchBlocks',
          },
          {
            text: 'useWatchBlockNumber',
            link: '/react/api/hooks/useWatchBlockNumber',
          },
          {
            text: 'useWatchContractEvent',
            link: '/react/api/hooks/useWatchContractEvent',
          },
          {
            text: 'useWatchPendingTransactions',
            link: '/react/api/hooks/useWatchPendingTransactions',
          },
          {
            text: 'useWriteContract',
            link: '/react/api/hooks/useWriteContract',
          },
        ],
      },
      {
        text: 'Miscellaneous',
        items: [
          { text: 'Actions', link: '/react/api/actions' },
          { text: 'Errors', link: '/react/api/errors' },
          {
            text: 'Utilities',
            collapsed: true,
            items: [
              {
                text: 'cookieToInitialState',
                link: '/react/api/utilities/cookieToInitialState',
              },
              { text: 'deserialize', link: '/react/api/utilities/deserialize' },
              { text: 'serialize', link: '/react/api/utilities/serialize' },
            ],
          },
        ],
      },
    ],
    '/vue': [
      {
        text: 'Introduction',
        items: [
          { text: 'Why Wagmi', link: '/vue/why' },
          { text: 'Installation', link: '/vue/installation' },
          { text: 'Getting Started', link: '/vue/getting-started' },
          { text: 'TypeScript', link: '/vue/typescript' },
        ],
      },
      {
        text: 'Guides',
        items: [
          {
            text: 'TanStack Query',
            link: '/vue/guides/tanstack-query',
          },
          {
            text: 'Viem',
            link: '/vue/guides/viem',
          },
          {
            text: 'Error Handling',
            link: '/vue/guides/error-handling',
          },
          {
            text: 'Chain Properties',
            link: '/vue/guides/chain-properties',
          },
          {
            text: 'SSR',
            link: '/vue/guides/ssr',
          },
          {
            text: 'Connect Wallet',
            link: '/vue/guides/connect-wallet',
          },
          {
            text: 'Send Transaction',
            link: '/vue/guides/send-transaction',
          },
          {
            text: 'Read from Contract',
            link: '/vue/guides/read-from-contract',
          },
          {
            text: 'Write to Contract',
            link: '/vue/guides/write-to-contract',
          },
          {
            text: 'FAQ / Troubleshooting',
            link: '/vue/guides/faq',
          },
        ],
      },
      {
        text: 'Configuration',
        items: [
          { text: 'createConfig', link: '/vue/api/createConfig' },
          { text: 'createStorage', link: '/vue/api/createStorage' },
          { text: 'Chains', link: '/vue/api/chains' },
          {
            text: 'Connectors',
            collapsed: true,
            link: '/vue/api/connectors',
            items: [
              {
                text: 'baseAccount',
                link: '/vue/api/connectors/baseAccount',
              },
              {
                text: 'gemini',
                link: '/vue/api/connectors/gemini',
              },
              { text: 'injected', link: '/vue/api/connectors/injected' },
              {
                text: 'metaMask',
                link: '/vue/api/connectors/metaMask',
              },
              {
                text: 'mock',
                link: '/vue/api/connectors/mock',
              },
              {
                text: 'porto',
                link: '/vue/api/connectors/porto',
              },
              {
                text: 'safe',
                link: '/vue/api/connectors/safe',
              },
              {
                text: 'walletConnect',
                link: '/vue/api/connectors/walletConnect',
              },
            ],
          },
          {
            text: 'Transports',
            collapsed: true,
            link: '/vue/api/transports',
            items: [
              {
                text: 'custom (EIP-1193)',
                link: '/vue/api/transports/custom',
              },
              {
                text: 'fallback',
                link: '/vue/api/transports/fallback',
              },
              {
                text: 'http',
                link: '/vue/api/transports/http',
              },
              {
                text: 'unstable_connector',
                link: '/vue/api/transports/unstable_connector',
              },
              {
                text: 'webSocket',
                link: '/vue/api/transports/webSocket',
              },
            ],
          },
          { text: 'WagmiPlugin', link: '/vue/api/WagmiPlugin' },
          { text: 'Nuxt', link: '/vue/api/Nuxt' },
        ],
      },
      {
        text: 'Composables',
        link: '/vue/api/composables',
        items: [
          {
            text: 'useBalance',
            link: '/vue/api/composables/useBalance',
          },
          {
            text: 'useBlockNumber',
            link: '/vue/api/composables/useBlockNumber',
          },
          {
            text: 'useBytecode',
            link: '/vue/api/composables/useBytecode',
          },
          { text: 'useChainId', link: '/vue/api/composables/useChainId' },
          { text: 'useChains', link: '/vue/api/composables/useChains' },
          { text: 'useClient', link: '/vue/api/composables/useClient' },
          { text: 'useConfig', link: '/vue/api/composables/useConfig' },
          { text: 'useConnect', link: '/vue/api/composables/useConnect' },
          { text: 'useConnection', link: '/vue/api/composables/useConnection' },
          {
            text: 'useConnectionEffect',
            link: '/vue/api/composables/useConnectionEffect',
          },
          {
            text: 'useConnections',
            link: '/vue/api/composables/useConnections',
          },
          {
            text: 'useConnectorClient',
            link: '/vue/api/composables/useConnectorClient',
          },
          {
            text: 'useConnectors',
            link: '/vue/api/composables/useConnectors',
          },
          {
            text: 'useDisconnect',
            link: '/vue/api/composables/useDisconnect',
          },
          {
            text: 'useEnsAddress',
            link: '/vue/api/composables/useEnsAddress',
          },
          {
            text: 'useEnsAvatar',
            link: '/vue/api/composables/useEnsAvatar',
          },
          {
            text: 'useEstimateGas',
            link: '/vue/api/composables/useEstimateGas',
          },
          {
            text: 'useReadContract',
            link: '/vue/api/composables/useReadContract',
          },
          {
            text: 'useReconnect',
            link: '/vue/api/composables/useReconnect',
          },
          {
            text: 'useSendTransaction',
            link: '/vue/api/composables/useSendTransaction',
          },
          {
            text: 'useSignMessage',
            link: '/vue/api/composables/useSignMessage',
          },
          {
            text: 'useSignTypedData',
            link: '/vue/api/composables/useSignTypedData',
          },
          {
            text: 'useSimulateContract',
            link: '/vue/api/composables/useSimulateContract',
          },
          {
            text: 'useSwitchChain',
            link: '/vue/api/composables/useSwitchChain',
          },
          {
            text: 'useSwitchConnection',
            link: '/vue/api/composables/useSwitchConnection',
          },
          {
            text: 'useTransaction',
            link: '/vue/api/composables/useTransaction',
          },
          {
            text: 'useTransactionReceipt',
            link: '/vue/api/composables/useTransactionReceipt',
          },
          {
            text: 'useWaitForTransactionReceipt',
            link: '/vue/api/composables/useWaitForTransactionReceipt',
          },
          {
            text: 'useWatchBlockNumber',
            link: '/vue/api/composables/useWatchBlockNumber',
          },
          {
            text: 'useWatchContractEvent',
            link: '/vue/api/composables/useWatchContractEvent',
          },
          {
            text: 'useWriteContract',
            link: '/vue/api/composables/useWriteContract',
          },
        ],
      },
      {
        text: 'Miscellaneous',
        items: [
          { text: 'Actions', link: '/vue/api/actions' },
          { text: 'Errors', link: '/vue/api/errors' },
          {
            text: 'Utilities',
            collapsed: true,
            items: [
              {
                text: 'deserialize',
                link: '/vue/api/utilities/deserialize',
              },
              { text: 'serialize', link: '/vue/api/utilities/serialize' },
            ],
          },
        ],
      },
    ],
    '/core': [
      {
        text: 'Introduction',
        items: [
          { text: 'Why Wagmi', link: '/core/why' },
          { text: 'Installation', link: '/core/installation' },
          { text: 'Getting Started', link: '/core/getting-started' },
          { text: 'TypeScript', link: '/core/typescript' },
        ],
      },
      {
        text: 'Guides',
        items: [
          {
            text: 'Viem',
            link: '/core/guides/viem',
          },
          {
            text: 'Framework Adapters',
            link: '/core/guides/framework-adapters',
          },
          {
            text: 'Error Handling',
            link: '/core/guides/error-handling',
          },
          {
            text: 'Ethers.js Adapters',
            link: '/core/guides/ethers',
          },
          // {
          //   text: 'Testing',
          //   link: '/core/guides/testing',
          // },
          {
            text: 'Chain Properties',
            link: '/core/guides/chain-properties',
          },
          {
            text: 'FAQ / Troubleshooting',
            link: '/core/guides/faq',
          },
          {
            text: 'Migrate from v2 to v3',
            link: '/core/guides/migrate-from-v2-to-v3',
          },
          {
            text: 'Migrate from v1 to v2',
            link: '/core/guides/migrate-from-v1-to-v2',
          },
        ],
      },
      {
        text: 'Configuration',
        items: [
          { text: 'createConfig', link: '/core/api/createConfig' },
          { text: 'createConnector', link: '/core/api/createConnector' },
          { text: 'createStorage', link: '/core/api/createStorage' },
          { text: 'Chains', link: '/core/api/chains' },
          {
            text: 'Connectors',
            collapsed: true,
            link: '/core/api/connectors',
            items: [
              {
                text: 'baseAccount',
                link: '/core/api/connectors/baseAccount',
              },
              {
                text: 'gemini',
                link: '/core/api/connectors/gemini',
              },
              { text: 'injected', link: '/core/api/connectors/injected' },
              {
                text: 'metaMask',
                link: '/core/api/connectors/metaMask',
              },
              {
                text: 'mock',
                link: '/core/api/connectors/mock',
              },
              {
                text: 'porto',
                link: '/core/api/connectors/porto',
              },
              {
                text: 'safe',
                link: '/core/api/connectors/safe',
              },
              {
                text: 'walletConnect',
                link: '/core/api/connectors/walletConnect',
              },
            ],
          },
          {
            text: 'Transports',
            collapsed: true,
            link: '/core/api/transports',
            items: [
              {
                text: 'custom (EIP-1193)',
                link: '/core/api/transports/custom',
              },
              {
                text: 'fallback',
                link: '/core/api/transports/fallback',
              },
              {
                text: 'http',
                link: '/core/api/transports/http',
              },
              {
                text: 'unstable_connector',
                link: '/core/api/transports/unstable_connector',
              },
              {
                text: 'webSocket',
                link: '/core/api/transports/webSocket',
              },
            ],
          },
        ],
      },
      {
        text: 'Actions',
        link: '/core/api/actions',
        items: [
          {
            text: 'call',
            link: '/core/api/actions/call',
          },
          { text: 'connect', link: '/core/api/actions/connect' },
          { text: 'deployContract', link: '/core/api/actions/deployContract' },
          { text: 'disconnect', link: '/core/api/actions/disconnect' },
          {
            text: 'estimateFeesPerGas',
            link: '/core/api/actions/estimateFeesPerGas',
          },
          { text: 'estimateGas', link: '/core/api/actions/estimateGas' },
          {
            text: 'estimateMaxPriorityFeePerGas',
            link: '/core/api/actions/estimateMaxPriorityFeePerGas',
          },
          { text: 'getBalance', link: '/core/api/actions/getBalance' },
          {
            text: 'getBlock',
            link: '/core/api/actions/getBlock',
          },
          {
            text: 'getBlockNumber',
            link: '/core/api/actions/getBlockNumber',
          },
          {
            text: 'getBlockTransactionCount',
            link: '/core/api/actions/getBlockTransactionCount',
          },
          {
            text: 'getBytecode',
            link: '/core/api/actions/getBytecode',
          },
          {
            text: 'getCallsStatus',
            link: '/core/api/actions/getCallsStatus',
          },
          {
            text: 'getCapabilities',
            link: '/core/api/actions/getCapabilities',
          },
          { text: 'getChainId', link: '/core/api/actions/getChainId' },
          { text: 'getChains', link: '/core/api/actions/getChains' },
          {
            text: 'getClient',
            link: '/core/api/actions/getClient',
          },
          { text: 'getConnection', link: '/core/api/actions/getConnection' },
          {
            text: 'getConnections',
            link: '/core/api/actions/getConnections',
          },
          {
            text: 'getConnectorClient',
            link: '/core/api/actions/getConnectorClient',
          },
          {
            text: 'getConnectors',
            link: '/core/api/actions/getConnectors',
          },
          {
            text: 'getEnsAddress',
            link: '/core/api/actions/getEnsAddress',
          },
          { text: 'getEnsAvatar', link: '/core/api/actions/getEnsAvatar' },
          { text: 'getEnsName', link: '/core/api/actions/getEnsName' },
          {
            text: 'getEnsResolver',
            link: '/core/api/actions/getEnsResolver',
          },
          {
            text: 'getEnsText',
            link: '/core/api/actions/getEnsText',
          },
          {
            text: 'getFeeHistory',
            link: '/core/api/actions/getFeeHistory',
          },
          {
            text: 'getGasPrice',
            link: '/core/api/actions/getGasPrice',
          },
          {
            text: 'getProof',
            link: '/core/api/actions/getProof',
          },
          {
            text: 'getPublicClient',
            link: '/core/api/actions/getPublicClient',
          },
          {
            text: 'getStorageAt',
            link: '/core/api/actions/getStorageAt',
          },
          {
            text: 'getTransaction',
            link: '/core/api/actions/getTransaction',
          },
          {
            text: 'getTransactionConfirmations',
            link: '/core/api/actions/getTransactionConfirmations',
          },
          {
            text: 'getTransactionCount',
            link: '/core/api/actions/getTransactionCount',
          },
          {
            text: 'getTransactionReceipt',
            link: '/core/api/actions/getTransactionReceipt',
          },
          {
            text: 'getWalletClient',
            link: '/core/api/actions/getWalletClient',
          },
          {
            text: 'multicall',
            link: '/core/api/actions/multicall',
          },
          {
            text: 'prepareTransactionRequest',
            link: '/core/api/actions/prepareTransactionRequest',
          },
          { text: 'reconnect', link: '/core/api/actions/reconnect' },
          {
            text: 'readContract',
            link: '/core/api/actions/readContract',
          },
          {
            text: 'readContracts',
            link: '/core/api/actions/readContracts',
          },
          {
            text: 'sendCalls',
            link: '/core/api/actions/sendCalls',
          },
          {
            text: 'sendCallsSync',
            link: '/core/api/actions/sendCallsSync',
          },
          {
            text: 'sendTransaction',
            link: '/core/api/actions/sendTransaction',
          },
          {
            text: 'sendTransactionSync',
            link: '/core/api/actions/sendTransactionSync',
          },
          {
            text: 'showCallsStatus',
            link: '/core/api/actions/showCallsStatus',
          },
          {
            text: 'signMessage',
            link: '/core/api/actions/signMessage',
          },
          {
            text: 'signTypedData',
            link: '/core/api/actions/signTypedData',
          },
          {
            text: 'simulateContract',
            link: '/core/api/actions/simulateContract',
          },
          {
            text: 'switchChain',
            link: '/core/api/actions/switchChain',
          },
          {
            text: 'switchConnection',
            link: '/core/api/actions/switchConnection',
          },
          {
            text: 'verifyMessage',
            link: '/core/api/actions/verifyMessage',
          },
          {
            text: 'verifyTypedData',
            link: '/core/api/actions/verifyTypedData',
          },
          {
            text: 'waitForCallsStatus',
            link: '/core/api/actions/waitForCallsStatus',
          },
          {
            text: 'waitForTransactionReceipt',
            link: '/core/api/actions/waitForTransactionReceipt',
          },
          {
            text: 'watchAsset',
            link: '/core/api/actions/watchAsset',
          },
          {
            text: 'watchBlocks',
            link: '/core/api/actions/watchBlocks',
          },
          {
            text: 'watchBlockNumber',
            link: '/core/api/actions/watchBlockNumber',
          },
          {
            text: 'watchChainId',
            link: '/core/api/actions/watchChainId',
          },
          {
            text: 'watchClient',
            link: '/core/api/actions/watchClient',
          },
          {
            text: 'watchConnection',
            link: '/core/api/actions/watchConnection',
          },
          {
            text: 'watchConnections',
            link: '/core/api/actions/watchConnections',
          },
          {
            text: 'watchConnectors',
            link: '/core/api/actions/watchConnectors',
          },
          {
            text: 'watchContractEvent',
            link: '/core/api/actions/watchContractEvent',
          },
          {
            text: 'watchPendingTransactions',
            link: '/core/api/actions/watchPendingTransactions',
          },
          {
            text: 'watchPublicClient',
            link: '/core/api/actions/watchPublicClient',
          },
          {
            text: 'writeContract',
            link: '/core/api/actions/writeContract',
          },
        ],
      },
      {
        text: 'Miscellaneous',
        items: [
          { text: 'Errors', link: '/core/api/errors' },
          {
            text: 'Utilities',
            collapsed: true,
            items: [
              {
                text: 'cookieToInitialState',
                link: '/core/api/utilities/cookieToInitialState',
              },
              { text: 'deserialize', link: '/core/api/utilities/deserialize' },
              { text: 'serialize', link: '/core/api/utilities/serialize' },
            ],
          },
        ],
      },
    ],
    '/cli': [
      {
        text: 'Introduction',
        items: [
          { text: 'Why Wagmi CLI', link: '/cli/why' },
          { text: 'Installation', link: '/cli/installation' },
          { text: 'Getting Started', link: '/cli/getting-started' },
        ],
      },
      {
        text: 'Guides',
        items: [
          {
            text: 'Migrate from v1 to v2',
            link: '/cli/guides/migrate-from-v1-to-v2',
          },
        ],
      },
      {
        text: 'Config File',
        items: [
          {
            text: 'Configuring CLI',
            link: '/cli/config/configuring-cli',
          },
          { text: 'Config Options', link: '/cli/config/options' },
        ],
      },
      {
        text: 'Commands',
        link: '/cli/api/commands',
        items: [
          {
            text: 'generate',
            link: '/cli/api/commands/generate',
          },
          {
            text: 'init',
            link: '/cli/api/commands/init',
          },
        ],
      },
      {
        text: 'Plugins',
        link: '/cli/api/plugins',
        items: [
          { text: 'actions', link: '/cli/api/plugins/actions' },
          { text: 'blockExplorer', link: '/cli/api/plugins/blockExplorer' },
          { text: 'etherscan', link: '/cli/api/plugins/etherscan' },
          { text: 'fetch', link: '/cli/api/plugins/fetch' },
          { text: 'foundry', link: '/cli/api/plugins/foundry' },
          { text: 'hardhat', link: '/cli/api/plugins/hardhat' },
          { text: 'react', link: '/cli/api/plugins/react' },
          { text: 'sourcify', link: '/cli/api/plugins/sourcify' },
        ],
      },
      {
        text: 'create-wagmi',
        link: '/cli/create-wagmi',
      },
    ],
    '/dev': [
      {
        text: 'Dev',
        items: [
          { text: 'Contributing', link: '/dev/contributing' },
          { text: 'Creating Connectors', link: '/dev/creating-connectors' },
        ],
      },
    ],
    '/examples': [
      {
        text: 'React',
        items: [
          { text: 'Connect Wallet', link: '/examples/connect-wallet' },
          { text: 'Send Transaction', link: '/examples/send-transaction' },
          { text: 'Write Contract', link: '/examples/contract-write' },
          {
            text: 'Write Contract (Dynamic Args)',
            link: '/examples/contract-write-dynamic',
          },
          { text: 'Sign Message', link: '/examples/sign-message' },
          {
            text: 'Sign In With Ethereum',
            link: '/examples/sign-in-with-ethereum',
          },
        ],
      },
    ],
    '/tempo': [
      {
        text: 'Tempo',
        items: [
          { text: 'Getting Started', link: '/tempo/getting-started' },
          { text: 'Chains', link: '/tempo/chains' },
          { text: 'Tempo Docs & Guides', link: 'https://docs.tempo.xyz' },
        ],
      },
      {
        text: 'Hooks',
        link: '/tempo/hooks/',
        items: [
          {
            text: 'AMM',
            collapsed: true,
            items: [
              { text: 'useBurn', link: '/tempo/hooks/amm.useBurn' },
              {
                text: 'useLiquidityBalance',
                link: '/tempo/hooks/amm.useLiquidityBalance',
              },
              { text: 'useMint', link: '/tempo/hooks/amm.useMint' },
              { text: 'usePool', link: '/tempo/hooks/amm.usePool' },
              {
                text: 'useRebalanceSwap',
                link: '/tempo/hooks/amm.useRebalanceSwap',
              },
              { text: 'useWatchBurn', link: '/tempo/hooks/amm.useWatchBurn' },
              {
                text: 'useWatchFeeSwap',
                link: '/tempo/hooks/amm.useWatchFeeSwap',
              },
              { text: 'useWatchMint', link: '/tempo/hooks/amm.useWatchMint' },
              {
                text: 'useWatchRebalanceSwap',
                link: '/tempo/hooks/amm.useWatchRebalanceSwap',
              },
            ],
          },
          {
            text: 'DEX',
            collapsed: true,
            items: [
              { text: 'useBalance', link: '/tempo/hooks/dex.useBalance' },
              { text: 'useBuy', link: '/tempo/hooks/dex.useBuy' },
              { text: 'useBuyQuote', link: '/tempo/hooks/dex.useBuyQuote' },
              { text: 'useCancel', link: '/tempo/hooks/dex.useCancel' },
              { text: 'useCreatePair', link: '/tempo/hooks/dex.useCreatePair' },
              { text: 'useOrder', link: '/tempo/hooks/dex.useOrder' },
              { text: 'usePlace', link: '/tempo/hooks/dex.usePlace' },
              { text: 'usePlaceFlip', link: '/tempo/hooks/dex.usePlaceFlip' },
              { text: 'useSell', link: '/tempo/hooks/dex.useSell' },
              { text: 'useSellQuote', link: '/tempo/hooks/dex.useSellQuote' },
              { text: 'useTickLevel', link: '/tempo/hooks/dex.useTickLevel' },
              {
                text: 'useWatchFlipOrderPlaced',
                link: '/tempo/hooks/dex.useWatchFlipOrderPlaced',
              },
              {
                text: 'useWatchOrderCancelled',
                link: '/tempo/hooks/dex.useWatchOrderCancelled',
              },
              {
                text: 'useWatchOrderFilled',
                link: '/tempo/hooks/dex.useWatchOrderFilled',
              },
              {
                text: 'useWatchOrderPlaced',
                link: '/tempo/hooks/dex.useWatchOrderPlaced',
              },
              { text: 'useWithdraw', link: '/tempo/hooks/dex.useWithdraw' },
            ],
          },
          {
            text: 'Faucet',
            collapsed: true,
            items: [{ text: 'useFund', link: '/tempo/hooks/faucet.useFund' }],
          },
          {
            text: 'Fee',
            collapsed: true,
            items: [
              {
                text: 'useSetUserToken',
                link: '/tempo/hooks/fee.useSetUserToken',
              },
              { text: 'useUserToken', link: '/tempo/hooks/fee.useUserToken' },
              {
                text: 'useWatchSetUserToken',
                link: '/tempo/hooks/fee.useWatchSetUserToken',
              },
            ],
          },
          {
            text: 'Nonce',
            collapsed: true,
            items: [
              { text: 'useNonce', link: '/tempo/hooks/nonce.useNonce' },
              {
                text: 'useNonceKeyCount',
                link: '/tempo/hooks/nonce.useNonceKeyCount',
              },
              {
                text: 'useWatchActiveKeyCountChanged',
                link: '/tempo/hooks/nonce.useWatchActiveKeyCountChanged',
              },
              {
                text: 'useWatchNonceIncremented',
                link: '/tempo/hooks/nonce.useWatchNonceIncremented',
              },
            ],
          },
          {
            text: 'Policy',
            collapsed: true,
            items: [
              { text: 'useCreate', link: '/tempo/hooks/policy.useCreate' },
              { text: 'useData', link: '/tempo/hooks/policy.useData' },
              {
                text: 'useIsAuthorized',
                link: '/tempo/hooks/policy.useIsAuthorized',
              },
              {
                text: 'useModifyBlacklist',
                link: '/tempo/hooks/policy.useModifyBlacklist',
              },
              {
                text: 'useModifyWhitelist',
                link: '/tempo/hooks/policy.useModifyWhitelist',
              },
              { text: 'useSetAdmin', link: '/tempo/hooks/policy.useSetAdmin' },
              {
                text: 'useWatchAdminUpdated',
                link: '/tempo/hooks/policy.useWatchAdminUpdated',
              },
              {
                text: 'useWatchBlacklistUpdated',
                link: '/tempo/hooks/policy.useWatchBlacklistUpdated',
              },
              {
                text: 'useWatchCreate',
                link: '/tempo/hooks/policy.useWatchCreate',
              },
              {
                text: 'useWatchWhitelistUpdated',
                link: '/tempo/hooks/policy.useWatchWhitelistUpdated',
              },
            ],
          },
          {
            text: 'Reward',
            collapsed: true,
            items: [
              { text: 'useClaim', link: '/tempo/hooks/reward.useClaim' },
              {
                text: 'useSetRecipient',
                link: '/tempo/hooks/reward.useSetRecipient',
              },
              { text: 'useStart', link: '/tempo/hooks/reward.useStart' },
              {
                text: 'useUserRewardInfo',
                link: '/tempo/hooks/reward.useUserRewardInfo',
              },
              {
                text: 'useWatchRewardRecipientSet',
                link: '/tempo/hooks/reward.useWatchRewardRecipientSet',
              },
              {
                text: 'useWatchRewardScheduled',
                link: '/tempo/hooks/reward.useWatchRewardScheduled',
              },
            ],
          },
          {
            text: 'Token',
            collapsed: true,
            items: [
              { text: 'useApprove', link: '/tempo/hooks/token.useApprove' },
              { text: 'useBurn', link: '/tempo/hooks/token.useBurn' },
              {
                text: 'useBurnBlocked',
                link: '/tempo/hooks/token.useBurnBlocked',
              },
              {
                text: 'useChangeTransferPolicy',
                link: '/tempo/hooks/token.useChangeTransferPolicy',
              },
              { text: 'useCreate', link: '/tempo/hooks/token.useCreate' },
              {
                text: 'useGetAllowance',
                link: '/tempo/hooks/token.useGetAllowance',
              },
              {
                text: 'useGetBalance',
                link: '/tempo/hooks/token.useGetBalance',
              },
              {
                text: 'useGetMetadata',
                link: '/tempo/hooks/token.useGetMetadata',
              },
              {
                text: 'useGrantRoles',
                link: '/tempo/hooks/token.useGrantRoles',
              },
              { text: 'useHasRole', link: '/tempo/hooks/token.useHasRole' },
              { text: 'useMint', link: '/tempo/hooks/token.useMint' },
              { text: 'usePause', link: '/tempo/hooks/token.usePause' },
              {
                text: 'useRenounceRoles',
                link: '/tempo/hooks/token.useRenounceRoles',
              },
              {
                text: 'useRevokeRoles',
                link: '/tempo/hooks/token.useRevokeRoles',
              },
              {
                text: 'useSetRoleAdmin',
                link: '/tempo/hooks/token.useSetRoleAdmin',
              },
              {
                text: 'useSetSupplyCap',
                link: '/tempo/hooks/token.useSetSupplyCap',
              },
              { text: 'useTransfer', link: '/tempo/hooks/token.useTransfer' },
              { text: 'useUnpause', link: '/tempo/hooks/token.useUnpause' },
              {
                text: 'useWatchAdminRole',
                link: '/tempo/hooks/token.useWatchAdminRole',
              },
              {
                text: 'useWatchApprove',
                link: '/tempo/hooks/token.useWatchApprove',
              },
              { text: 'useWatchBurn', link: '/tempo/hooks/token.useWatchBurn' },
              {
                text: 'useWatchCreate',
                link: '/tempo/hooks/token.useWatchCreate',
              },
              { text: 'useWatchMint', link: '/tempo/hooks/token.useWatchMint' },
              { text: 'useWatchRole', link: '/tempo/hooks/token.useWatchRole' },
              {
                text: 'useWatchTransfer',
                link: '/tempo/hooks/token.useWatchTransfer',
              },
            ],
          },
        ],
      },
      {
        text: 'Actions',
        link: '/tempo/actions/',
        items: [
          {
            text: 'AMM',
            collapsed: true,
            items: [
              { text: 'burn', link: '/tempo/actions/amm.burn' },
              {
                text: 'getLiquidityBalance',
                link: '/tempo/actions/amm.getLiquidityBalance',
              },
              { text: 'getPool', link: '/tempo/actions/amm.getPool' },
              { text: 'mint', link: '/tempo/actions/amm.mint' },
              {
                text: 'rebalanceSwap',
                link: '/tempo/actions/amm.rebalanceSwap',
              },
              { text: 'watchBurn', link: '/tempo/actions/amm.watchBurn' },
              { text: 'watchFeeSwap', link: '/tempo/actions/amm.watchFeeSwap' },
              { text: 'watchMint', link: '/tempo/actions/amm.watchMint' },
              {
                text: 'watchRebalanceSwap',
                link: '/tempo/actions/amm.watchRebalanceSwap',
              },
            ],
          },
          {
            text: 'DEX',
            collapsed: true,
            items: [
              { text: 'buy', link: '/tempo/actions/dex.buy' },
              { text: 'cancel', link: '/tempo/actions/dex.cancel' },
              { text: 'createPair', link: '/tempo/actions/dex.createPair' },
              { text: 'getBalance', link: '/tempo/actions/dex.getBalance' },
              { text: 'getBuyQuote', link: '/tempo/actions/dex.getBuyQuote' },
              { text: 'getOrder', link: '/tempo/actions/dex.getOrder' },
              { text: 'getSellQuote', link: '/tempo/actions/dex.getSellQuote' },
              { text: 'getTickLevel', link: '/tempo/actions/dex.getTickLevel' },
              { text: 'place', link: '/tempo/actions/dex.place' },
              { text: 'placeFlip', link: '/tempo/actions/dex.placeFlip' },
              { text: 'sell', link: '/tempo/actions/dex.sell' },
              {
                text: 'watchFlipOrderPlaced',
                link: '/tempo/actions/dex.watchFlipOrderPlaced',
              },
              {
                text: 'watchOrderCancelled',
                link: '/tempo/actions/dex.watchOrderCancelled',
              },
              {
                text: 'watchOrderFilled',
                link: '/tempo/actions/dex.watchOrderFilled',
              },
              {
                text: 'watchOrderPlaced',
                link: '/tempo/actions/dex.watchOrderPlaced',
              },
              { text: 'withdraw', link: '/tempo/actions/dex.withdraw' },
            ],
          },
          {
            text: 'Faucet',
            collapsed: true,
            items: [{ text: 'fund', link: '/tempo/actions/faucet.fund' }],
          },
          {
            text: 'Fee',
            collapsed: true,
            items: [
              { text: 'getUserToken', link: '/tempo/actions/fee.getUserToken' },
              { text: 'setUserToken', link: '/tempo/actions/fee.setUserToken' },
              {
                text: 'watchSetUserToken',
                link: '/tempo/actions/fee.watchSetUserToken',
              },
            ],
          },
          {
            text: 'Nonce',
            collapsed: true,
            items: [
              { text: 'getNonce', link: '/tempo/actions/nonce.getNonce' },
              {
                text: 'getNonceKeyCount',
                link: '/tempo/actions/nonce.getNonceKeyCount',
              },
              {
                text: 'watchActiveKeyCountChanged',
                link: '/tempo/actions/nonce.watchActiveKeyCountChanged',
              },
              {
                text: 'watchNonceIncremented',
                link: '/tempo/actions/nonce.watchNonceIncremented',
              },
            ],
          },
          {
            text: 'Policy',
            collapsed: true,
            items: [
              { text: 'create', link: '/tempo/actions/policy.create' },
              { text: 'getData', link: '/tempo/actions/policy.getData' },
              {
                text: 'isAuthorized',
                link: '/tempo/actions/policy.isAuthorized',
              },
              {
                text: 'modifyBlacklist',
                link: '/tempo/actions/policy.modifyBlacklist',
              },
              {
                text: 'modifyWhitelist',
                link: '/tempo/actions/policy.modifyWhitelist',
              },
              { text: 'setAdmin', link: '/tempo/actions/policy.setAdmin' },
              {
                text: 'watchAdminUpdated',
                link: '/tempo/actions/policy.watchAdminUpdated',
              },
              {
                text: 'watchBlacklistUpdated',
                link: '/tempo/actions/policy.watchBlacklistUpdated',
              },
              {
                text: 'watchCreate',
                link: '/tempo/actions/policy.watchCreate',
              },
              {
                text: 'watchWhitelistUpdated',
                link: '/tempo/actions/policy.watchWhitelistUpdated',
              },
            ],
          },
          {
            text: 'Reward',
            collapsed: true,
            items: [
              { text: 'claim', link: '/tempo/actions/reward.claim' },
              {
                text: 'getUserRewardInfo',
                link: '/tempo/actions/reward.getUserRewardInfo',
              },
              {
                text: 'setRecipient',
                link: '/tempo/actions/reward.setRecipient',
              },
              { text: 'start', link: '/tempo/actions/reward.start' },
              {
                text: 'watchRewardRecipientSet',
                link: '/tempo/actions/reward.watchRewardRecipientSet',
              },
              {
                text: 'watchRewardScheduled',
                link: '/tempo/actions/reward.watchRewardScheduled',
              },
            ],
          },
          {
            text: 'Token',
            collapsed: true,
            items: [
              { text: 'approve', link: '/tempo/actions/token.approve' },
              { text: 'burn', link: '/tempo/actions/token.burn' },
              { text: 'burnBlocked', link: '/tempo/actions/token.burnBlocked' },
              {
                text: 'changeTransferPolicy',
                link: '/tempo/actions/token.changeTransferPolicy',
              },
              { text: 'create', link: '/tempo/actions/token.create' },
              {
                text: 'getAllowance',
                link: '/tempo/actions/token.getAllowance',
              },
              { text: 'getBalance', link: '/tempo/actions/token.getBalance' },
              { text: 'getMetadata', link: '/tempo/actions/token.getMetadata' },
              { text: 'grantRoles', link: '/tempo/actions/token.grantRoles' },
              { text: 'hasRole', link: '/tempo/actions/token.hasRole' },
              { text: 'mint', link: '/tempo/actions/token.mint' },
              { text: 'pause', link: '/tempo/actions/token.pause' },
              {
                text: 'renounceRoles',
                link: '/tempo/actions/token.renounceRoles',
              },
              { text: 'revokeRoles', link: '/tempo/actions/token.revokeRoles' },
              {
                text: 'setRoleAdmin',
                link: '/tempo/actions/token.setRoleAdmin',
              },
              {
                text: 'setSupplyCap',
                link: '/tempo/actions/token.setSupplyCap',
              },
              { text: 'transfer', link: '/tempo/actions/token.transfer' },
              { text: 'unpause', link: '/tempo/actions/token.unpause' },
              {
                text: 'watchAdminRole',
                link: '/tempo/actions/token.watchAdminRole',
              },
              {
                text: 'watchApprove',
                link: '/tempo/actions/token.watchApprove',
              },
              { text: 'watchBurn', link: '/tempo/actions/token.watchBurn' },
              { text: 'watchCreate', link: '/tempo/actions/token.watchCreate' },
              { text: 'watchMint', link: '/tempo/actions/token.watchMint' },
              { text: 'watchRole', link: '/tempo/actions/token.watchRole' },
              {
                text: 'watchTransfer',
                link: '/tempo/actions/token.watchTransfer',
              },
            ],
          },
        ],
      },
      {
        text: 'Connectors',
        link: '/tempo/connectors/',
        items: [
          {
            text: 'dangerous_secp256k1',
            link: '/tempo/connectors/dangerous_secp256k1',
          },
          { text: 'webAuthn', link: '/tempo/connectors/webAuthn' },
        ],
      },
      {
        text: 'Key Managers',
        link: '/tempo/keyManagers/',
        items: [
          { text: 'http', link: '/tempo/keyManagers/http' },
          { text: 'localStorage', link: '/tempo/keyManagers/localStorage' },
        ],
      },
    ],
  } satisfies DefaultTheme.Sidebar
}
