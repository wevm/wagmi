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
            link: '/react/tanstack-query',
          },
          {
            text: 'Ethers & Web3.js 🚧',
            link: '/react/ethers-web3',
          },
          {
            text: 'Testing 🚧',
            link: '/react/testing',
          },
          {
            text: 'Chain Properties 🚧',
            link: '/react/chain-properties',
          },
          {
            text: 'Viem Usage 🚧',
            link: '/react/viem',
          },
          {
            text: 'FAQ / Troubleshooting',
            link: '/react/faq',
          },
          { text: 'Migrate from v1 to v2 🚧', link: '/react/migration-guide' },
        ],
      },
      {
        text: 'API',
        items: [
          { text: 'createConfig', link: '/react/createConfig' },
          { text: 'createStorage', link: '/react/createStorage' },
          { text: 'WagmiProvider', link: '/react/WagmiProvider' },
          { text: 'Actions', link: '/react/actions' },
          { text: 'Chains', link: '/react/chains' },
          {
            text: 'Connectors 🚧',
            collapsed: true,
            link: '/react/connectors',
            items: [
              {
                text: 'coinbaseWallet',
                link: '/react/connectors/coinbaseWallet',
              },
              { text: 'injected', link: '/react/connectors/injected' },
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
          { text: 'Constants 🚧', link: '/react/constants' },
          {
            text: 'Hooks 🚧',
            collapsed: true,
            link: '/react/hooks',
            items: [
              { text: 'useAccount', link: '/react/hooks/useAccount' },
              {
                text: 'useAccountEffect 🚧',
                link: '/react/hooks/useAccountEffect',
              },
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
              {
                text: 'useConnectorClient 🚧',
                link: '/react/hooks/useConnectorClient',
              },
              {
                text: 'useContractInfiniteReads 🚧',
                link: '/react/hooks/useContractInfiniteReads',
              },
              {
                text: 'useContractRead 🚧',
                link: '/react/hooks/useContractRead',
              },
              {
                text: 'useContractReads 🚧',
                link: '/react/hooks/useContractReads',
              },
              {
                text: 'useContractSimulate 🚧',
                link: '/react/hooks/useContractSimulate',
              },
              {
                text: 'useContractWrite 🚧',
                link: '/react/hooks/useContractWrite',
              },
              { text: 'useDisconnect', link: '/react/hooks/useDisconnect' },
              { text: 'useEnsAddress', link: '/react/hooks/useEnsAddress' },
              { text: 'useEnsAvatar', link: '/react/hooks/useEnsAvatar' },
              { text: 'useEnsName', link: '/react/hooks/useEnsName' },
              {
                text: 'useEnsResolver',
                link: '/react/hooks/useEnsResolver',
              },
              {
                text: 'useEstimateFeesPerGas',
                link: '/react/hooks/useEstimateFeesPerGas',
              },
              {
                text: 'useEstimateGas 🚧',
                link: '/react/hooks/useEstimateGas',
              },
              { text: 'useReconnect', link: '/react/hooks/useReconnect' },
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
                text: 'useToken',
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
                text: 'useWatchBlockNumber 🚧',
                link: '/react/hooks/useWatchBlockNumber',
              },
              {
                text: 'useWatchContractEvent 🚧',
                link: '/react/hooks/useWatchContractEvent',
              },
              {
                text: 'useWatchPendingTransactions 🚧',
                link: '/react/hooks/useWatchPendingTransactions',
              },
            ],
          },
          { text: 'Errors', link: '/react/errors' },
          {
            text: 'Utilities',
            collapsed: true,
            items: [
              { text: 'deserialize', link: '/react/utilities/deserialize' },
              {
                text: 'normalizeChainId',
                link: '/react/utilities/normalizeChainId',
              },
              { text: 'serialize', link: '/react/utilities/serialize' },
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
        text: 'Guides',
        items: [
          {
            text: 'Framework Adapters 🚧',
            link: '/core/framework-adapter',
          },
          {
            text: 'Ethers & Web3.js 🚧',
            link: '/core/ethers-web3',
          },
          {
            text: 'Testing 🚧',
            link: '/core/testing',
          },
          {
            text: 'Chain Properties 🚧',
            link: '/core/chain-properties',
          },
          {
            text: 'Viem Usage 🚧',
            link: '/core/viem',
          },
          {
            text: 'FAQ / Troubleshooting',
            link: '/core/faq',
          },
          { text: 'Migrate from v1 to v2 🚧', link: '/core/migration-guide' },
        ],
      },
      {
        text: 'API',
        items: [
          { text: 'createConfig', link: '/core/createConfig' },
          { text: 'createConnector 🚧', link: '/core/createConnector' },
          { text: 'createStorage', link: '/core/createStorage' },
          {
            text: 'Actions 🚧',
            collapsed: true,
            link: '/core/actions',
            items: [
              { text: 'connect', link: '/core/actions/connect' },
              { text: 'disconnect', link: '/core/actions/disconnect' },
              {
                text: 'estimateFeesPerGas',
                link: '/core/actions/estimateFeesPerGas',
              },
              { text: 'estimateGas 🚧', link: '/core/actions/estimateGas' },
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
              {
                text: 'getConnectorClient',
                link: '/core/actions/getConnectorClient',
              },
              { text: 'getEnsAddress', link: '/core/actions/getEnsAddress' },
              { text: 'getEnsAvatar', link: '/core/actions/getEnsAvatar' },
              { text: 'getEnsName', link: '/core/actions/getEnsName' },
              {
                text: 'getEnsResolver',
                link: '/core/actions/getEnsResolver',
              },
              { text: 'getToken', link: '/core/actions/getToken' },
              {
                text: 'getTransaction',
                link: '/core/actions/getTransaction',
              },
              {
                text: 'multicall 🚧',
                link: '/core/actions/multicall',
              },
              { text: 'reconnect', link: '/core/actions/reconnect' },
              { text: 'readContract 🚧', link: '/core/actions/readContract' },
              { text: 'readContracts 🚧', link: '/core/actions/readContracts' },
              {
                text: 'sendTransaction',
                link: '/core/actions/sendTransaction',
              },
              {
                text: 'signMessage',
                link: '/core/actions/signMessage',
              },
              {
                text: 'signTypedData',
                link: '/core/actions/signTypedData',
              },
              {
                text: 'simulateContract 🚧',
                link: '/core/actions/simulateContract',
              },
              {
                text: 'switchAccount',
                link: '/core/actions/switchAccount',
              },
              {
                text: 'switchChain',
                link: '/core/actions/switchChain',
              },
              {
                text: 'waitForTransactionReceipt 🚧',
                link: '/core/actions/waitForTransactionReceipt',
              },
              {
                text: 'watchAccount',
                link: '/core/actions/watchAccount',
              },
              {
                text: 'watchBlockNumber 🚧',
                link: '/core/actions/watchBlockNumber',
              },
              {
                text: 'watchChainId',
                link: '/core/actions/watchChainId',
              },
              {
                text: 'watchConnections',
                link: '/core/actions/watchConnections',
              },
              {
                text: 'watchContractEvent 🚧',
                link: '/core/actions/watchContractEvent',
              },
              {
                text: 'watchPendingTransactions 🚧',
                link: '/core/actions/watchPendingTransactions',
              },
              { text: 'writeContract 🚧', link: '/core/actions/writeContract' },
            ],
          },
          { text: 'Chains', link: '/core/chains' },
          {
            text: 'Connectors 🚧',
            collapsed: true,
            link: '/core/connectors',
            items: [
              {
                text: 'coinbaseWallet',
                link: '/core/connectors/coinbaseWallet',
              },
              { text: 'injected', link: '/core/connectors/injected' },
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
          { text: 'Constants 🚧', link: '/react/constants' },
          { text: 'Errors', link: '/core/errors' },
          {
            text: 'Utilities',
            collapsed: true,
            items: [
              { text: 'deserialize', link: '/core/utilities/deserialize' },
              {
                text: 'normalizeChainId',
                link: '/core/utilities/normalizeChainId',
              },
              { text: 'serialize', link: '/core/utilities/serialize' },
            ],
          },
        ],
      },
    ],
    '/dev': [
      {
        text: 'Dev',
        items: [{ text: 'Contributing', link: '/dev/contributing' }],
      },
    ],
  } satisfies DefaultTheme.Sidebar
}
