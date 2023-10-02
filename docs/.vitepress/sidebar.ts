import { DefaultTheme } from 'vitepress'

export function getSidebar() {
  return {
    '/react': [
      {
        text: 'Introduction',
        items: [
          { text: 'Why Wagmi 🚧', link: '/react/why-wagmi' },
          { text: 'Installation', link: '/react/installation' },
          { text: 'Getting Started', link: '/react/getting-started' },
          { text: 'TypeScript', link: '/react/typescript' },
          { text: 'Comparisons 🚧', link: '/react/comparisons' },
        ],
      },
      {
        text: 'Guides 🚧',
        items: [
          {
            text: 'Connect Wallet 🚧',
            link: '/react/guides/connect-wallet',
          },
          {
            text: 'TanStack Query 🚧',
            link: '/react/guides/tanstack-query',
          },
          {
            text: 'Ethers & Web3.js 🚧',
            link: '/react/guides/ethers-web3',
          },
          {
            text: 'Testing 🚧',
            link: '/react/guides/testing',
          },
          {
            text: 'Chain Properties 🚧',
            link: '/react/guides/chain-properties',
          },
          {
            text: 'Viem Usage 🚧',
            link: '/react/guides/viem',
          },
          {
            text: 'FAQ / Troubleshooting',
            link: '/react/guides/faq',
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
                text: 'coinbaseWallet',
                link: '/react/api/connectors/coinbaseWallet',
              },
              { text: 'injected', link: '/react/api/connectors/injected' },
              {
                text: 'ledger',
                link: '/react/api/connectors/ledger',
              },
              {
                text: 'mock',
                link: '/core/api/connectors/mock',
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
          { text: 'WagmiProvider', link: '/react/api/WagmiProvider' },
        ],
      },
      {
        text: 'Hooks',
        link: '/react/api/hooks',
        items: [
          { text: 'useAccount', link: '/react/api/hooks/useAccount' },
          {
            text: 'useAccountEffect',
            link: '/react/api/hooks/useAccountEffect',
          },
          { text: 'useBalance', link: '/react/api/hooks/useBalance' },
          {
            text: 'useBlockNumber',
            link: '/react/api/hooks/useBlockNumber',
          },
          {
            text: 'useBlock',
            link: '/react/api/hooks/useBlock',
          },
          { text: 'useChainId', link: '/react/api/hooks/useChainId' },
          { text: 'useClient', link: '/react/api/hooks/useClient' },
          { text: 'useConfig', link: '/react/api/hooks/useConfig' },
          { text: 'useConnect', link: '/react/api/hooks/useConnect' },
          {
            text: 'useConnections',
            link: '/react/api/hooks/useConnections',
          },
          {
            text: 'useConnectorClient 🚧',
            link: '/react/api/hooks/useConnectorClient',
          },
          {
            text: 'useConnectors',
            link: '/react/api/hooks/useConnectors',
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
            text: 'useInfiniteContractReads 🚧',
            link: '/react/api/hooks/useInfiniteContractReads',
          },
          {
            text: 'useReadContract',
            link: '/react/api/hooks/useReadContract',
          },
          {
            text: 'useReadContracts 🚧',
            link: '/react/api/hooks/useReadContracts',
          },
          { text: 'useReconnect', link: '/react/api/hooks/useReconnect' },
          {
            text: 'useSendTransaction',
            link: '/react/api/hooks/useSendTransaction',
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
            text: 'useSwitchAccount',
            link: '/react/api/hooks/useSwitchAccount',
          },
          {
            text: 'useSwitchChain',
            link: '/react/api/hooks/useSwitchChain',
          },
          {
            text: 'useTransaction 🚧',
            link: '/react/api/hooks/useTransaction',
          },
          {
            text: 'useToken',
            link: '/react/api/hooks/useToken',
          },
          {
            text: 'useWaitForTransactionReceipt 🚧',
            link: '/react/api/hooks/useWaitForTransactionReceipt',
          },
          {
            text: 'useWalletClient 🚧',
            link: '/react/api/hooks/useWalletClient',
          },
          {
            text: 'useWatchBlocks 🚧',
            link: '/react/api/hooks/useWatchBlocks',
          },
          {
            text: 'useWatchBlockNumber 🚧',
            link: '/react/api/hooks/useWatchBlockNumber',
          },
          {
            text: 'useWatchContractEvent 🚧',
            link: '/react/api/hooks/useWatchContractEvent',
          },
          {
            text: 'useWatchPendingTransactions 🚧',
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
              { text: 'deserialize', link: '/react/api/utilities/deserialize' },
              {
                text: 'normalizeChainId',
                link: '/react/api/utilities/normalizeChainId',
              },
              { text: 'serialize', link: '/react/api/utilities/serialize' },
            ],
          },
        ],
      },
    ],
    '/core': [
      {
        text: 'Introduction',
        items: [
          { text: 'Why Wagmi 🚧', link: '/core/why-wagmi' },
          { text: 'Installation', link: '/core/installation' },
          { text: 'Getting Started', link: '/core/getting-started' },
          { text: 'TypeScript', link: '/core/typescript' },
        ],
      },
      {
        text: 'Guides 🚧',
        items: [
          {
            text: 'Framework Adapters 🚧',
            link: '/core/guides/framework-adapter',
          },
          {
            text: 'Ethers & Web3.js 🚧',
            link: '/core/guides/ethers-web3',
          },
          {
            text: 'Testing 🚧',
            link: '/core/guides/testing',
          },
          {
            text: 'Chain Properties 🚧',
            link: '/core/guides/chain-properties',
          },
          {
            text: 'Viem Usage 🚧',
            link: '/core/guides/viem',
          },
          {
            text: 'FAQ / Troubleshooting',
            link: '/core/guides/faq',
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
          { text: 'createConnector 🚧', link: '/core/api/createConnector' },
          { text: 'createStorage', link: '/core/api/createStorage' },
          { text: 'Chains', link: '/core/api/chains' },
          {
            text: 'Connectors',
            collapsed: true,
            link: '/core/api/connectors',
            items: [
              {
                text: 'coinbaseWallet',
                link: '/core/api/connectors/coinbaseWallet',
              },
              { text: 'injected', link: '/core/api/connectors/injected' },
              {
                text: 'ledger',
                link: '/core/api/connectors/ledger',
              },
              {
                text: 'mock',
                link: '/core/api/connectors/mock',
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
        ],
      },
      {
        text: 'Actions',
        link: '/core/api/actions',
        items: [
          { text: 'connect', link: '/core/api/actions/connect' },
          { text: 'disconnect', link: '/core/api/actions/disconnect' },
          {
            text: 'estimateFeesPerGas',
            link: '/core/api/actions/estimateFeesPerGas',
          },
          { text: 'estimateGas', link: '/core/api/actions/estimateGas' },
          { text: 'getAccount', link: '/core/api/actions/getAccount' },
          { text: 'getBalance', link: '/core/api/actions/getBalance' },
          {
            text: 'getBlock 🚧',
            link: '/core/api/actions/getBlock',
          },
          {
            text: 'getBlockNumber',
            link: '/core/api/actions/getBlockNumber',
          },
          { text: 'getChainId', link: '/core/api/actions/getChainId' },
          {
            text: 'getClient',
            link: '/core/api/actions/getClient',
          },
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
            text: 'getPublicClient',
            link: '/core/api/actions/getPublicClient',
          },
          { text: 'getToken', link: '/core/api/actions/getToken' },
          {
            text: 'getTransaction',
            link: '/core/api/actions/getTransaction',
          },
          {
            text: 'getWalletClient',
            link: '/core/api/actions/getWalletClient',
          },
          {
            text: 'multicall 🚧',
            link: '/core/api/actions/multicall',
          },
          { text: 'reconnect', link: '/core/api/actions/reconnect' },
          {
            text: 'readContract',
            link: '/core/api/actions/readContract',
          },
          {
            text: 'readContracts 🚧',
            link: '/core/api/actions/readContracts',
          },
          {
            text: 'sendTransaction',
            link: '/core/api/actions/sendTransaction',
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
            text: 'switchAccount',
            link: '/core/api/actions/switchAccount',
          },
          {
            text: 'switchChain',
            link: '/core/api/actions/switchChain',
          },
          {
            text: 'waitForTransactionReceipt 🚧',
            link: '/core/api/actions/waitForTransactionReceipt',
          },
          {
            text: 'watchAccount',
            link: '/core/api/actions/watchAccount',
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
            text: 'watchConnections',
            link: '/core/api/actions/watchConnections',
          },
          {
            text: 'watchConnectors',
            link: '/core/api/actions/watchConnectors',
          },
          {
            text: 'watchContractEvent 🚧',
            link: '/core/api/actions/watchContractEvent',
          },
          {
            text: 'watchPendingTransactions 🚧',
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
              { text: 'deserialize', link: '/core/api/utilities/deserialize' },
              {
                text: 'normalizeChainId',
                link: '/core/api/utilities/normalizeChainId',
              },
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
          { text: 'Installation', link: '/cli/installation' },
          { text: 'Getting Started 🚧', link: '/cli/getting-started' },
          {
            text: 'create-wagmi',
            link: '/cli/create-wagmi',
          },
        ],
      },
      {
        text: 'Config 🚧',
        items: [
          {
            text: 'Configuring CLI 🚧',
            link: '/cli/config/configuring-cli',
          },
          { text: 'Config Options 🚧', link: '/cli/config/options' },
        ],
      },
      {
        text: 'Commands 🚧',
        link: '/cli/commands',
        items: [
          {
            text: 'init 🚧',
            link: '/cli/commands/init',
          },
          {
            text: 'generate 🚧',
            link: '/cli/commands/generate',
          },
        ],
      },
      {
        text: 'Plugins 🚧',
        link: '/cli/plugins',
        items: [
          { text: 'blockExplorer 🚧', link: '/cli/plugins/blockExplorer' },
          { text: 'etherscan 🚧', link: '/cli/plugins/etherscan' },
          { text: 'fetch 🚧', link: '/cli/plugins/fetch' },
          { text: 'foundry 🚧', link: '/cli/plugins/foundry' },
          { text: 'hardhat 🚧', link: '/cli/plugins/hardhat' },
          { text: 'react 🚧', link: '/cli/plugins/react' },
          { text: 'sourcify 🚧', link: '/cli/plugins/sourcify' },
        ],
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
  } satisfies DefaultTheme.Sidebar
}
