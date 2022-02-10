import { ThemeProvider } from 'degen'
import { providers } from 'ethers'
import Head from 'next/head'
import type { AppProps } from 'next/app'

import '../styles/globals.css'
import 'nextra-theme-docs/style.css'

/* eslint-disable import/no-unresolved */
// https://github.com/import-js/eslint-plugin-import/issues/1868
import 'degen/styles'
/* eslint-enable import/no-unresolved */

// Imports
import { Connector, Provider, chain, defaultChains } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { WalletLinkConnector } from 'wagmi/connectors/walletLink'

// Get environment variables
const alchemyId = process.env.NEXT_PUBLIC_ALCHEMY_ID as string
const etherscanApiKey = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY as string
const infuraId = process.env.NEXT_PUBLIC_INFURA_ID as string

// Pick chains
const chains = defaultChains
const defaultChain = chain.mainnet

// Set up connectors
type ConnectorsConfig = { chainId?: number }
const connectors = ({ chainId }: ConnectorsConfig) => {
  const rpcUrl =
    chains.find((x) => x.id === chainId)?.rpcUrls?.[0] ??
    defaultChain.rpcUrls[0]
  return [
    new InjectedConnector({
      chains,
      options: { shimDisconnect: true },
    }),
    new WalletConnectConnector({
      options: {
        infuraId,
        qrcode: true,
      },
    }),
    new WalletLinkConnector({
      options: {
        appName: 'wagmi',
        jsonRpcUrl: `${rpcUrl}/${infuraId}`,
      },
    }),
  ]
}

// Set up providers
type ProviderConfig = { chainId?: number; connector?: Connector }
const isChainSupported = (chainId?: number) =>
  chains.some((x) => x.id === chainId)

const provider = ({ chainId }: ProviderConfig) =>
  providers.getDefaultProvider(
    isChainSupported(chainId) ? chainId : defaultChain.id,
    {
      alchemy: alchemyId,
      etherscan: etherscanApiKey,
      infura: infuraId,
    },
  )
const webSocketProvider = ({ chainId }: ProviderConfig) =>
  isChainSupported(chainId)
    ? new providers.InfuraWebSocketProvider(chainId, infuraId)
    : undefined

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Provider
        autoConnect
        connectors={connectors}
        provider={provider}
        webSocketProvider={webSocketProvider}
      >
        <ThemeProvider
          defaultMode={
            typeof window !== 'undefined'
              ? (localStorage.getItem('theme') as any)
              : undefined
          }
        >
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>

      <Head>
        {/* Set theme directly to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(){try{var d=document.documentElement;var e=localStorage.getItem('theme');if(e){d.setAttribute('data-theme',e.trim())}else{d.setAttribute('data-theme','light');}}catch(t){}}();`,
          }}
          key="theme-script"
        />
      </Head>
    </>
  )
}

export default App
