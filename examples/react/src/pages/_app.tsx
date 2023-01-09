import type { AppProps } from 'next/app'
import NextHead from 'next/head'
import { WagmiConfig, configureChains, createClient } from 'wagmi-react'
import { avalanche, goerli, mainnet, optimism } from 'wagmi-react/chains'
import { CoinbaseWalletConnector } from 'wagmi-react/connectors/coinbaseWallet'

import { InjectedConnector } from 'wagmi-react/connectors/injected'
import { LedgerConnector } from 'wagmi-react/connectors/ledger'
import { MetaMaskConnector } from 'wagmi-react/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi-react/connectors/walletConnect'

import { alchemyProvider } from 'wagmi-react/providers/alchemy'
import { infuraProvider } from 'wagmi-react/providers/infura'
import { publicProvider } from 'wagmi-react/providers/public'

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet, goerli, optimism, avalanche],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY! }),
    infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_API_KEY! }),
    publicProvider(),
  ],
  { targetQuorum: 1 },
)

const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({
      chains,
      options: {
        UNSTABLE_shimOnConnectSelectAccount: true,
      },
    }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'wagmi',
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    new LedgerConnector({
      chains,
    }),
    new InjectedConnector({
      chains,
      options: {
        name: (detectedName) =>
          `Injected (${
            typeof detectedName === 'string'
              ? detectedName
              : detectedName.join(', ')
          })`,
        shimDisconnect: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
})

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <NextHead>
        <title>wagmi</title>
      </NextHead>

      <WagmiConfig client={client}>
        <Component {...pageProps} />
      </WagmiConfig>
    </>
  )
}

export default App
