import type { AppProps } from 'next/app'
import { ThemeProvider } from 'degen'
import { providers } from 'ethers'
import Head from 'next/head'
import {
  InjectedConnector,
  Provider,
  WalletConnectConnector,
  WalletLinkConnector,
  chain,
  defaultChains,
} from 'wagmi'

import 'nextra-theme-docs/style.css'
import '../styles/globals.css'

/* eslint-disable import/no-unresolved */
// https://github.com/import-js/eslint-plugin-import/issues/1868
import 'degen/styles'
/* eslint-enable import/no-unresolved */

const infuraId = process.env.NEXT_PUBLIC_INFURA_ID as string
const chains = defaultChains

type Config = { chainId?: number }
const connectors = ({ chainId }: Config) => {
  const rpcUrl =
    chains.find((x) => x.id === chainId)?.rpcUrls?.[0] ??
    chain.mainnet.rpcUrls[0]
  return [
    new InjectedConnector({ chains }),
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
const provider = ({ chainId }: Config) =>
  new providers.InfuraProvider(chainId, infuraId)
const webSocketProvider = ({ chainId }: Config) =>
  new providers.InfuraWebSocketProvider(chainId, infuraId)

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Provider
        autoConnect
        connectorStorageKey="wagmi.wallet"
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
