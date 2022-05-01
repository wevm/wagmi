import { useMemo } from 'react'
import { providers } from 'ethers'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from 'remix'
import type { MetaFunction } from 'remix'

import { Provider, chain, createClient, defaultChains } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'

export function loader() {
  require('dotenv').config()
  return {
    alchemyId: process.env.REMIX_ALCHEMY_ID as string,
  }
}

export const meta: MetaFunction = () => {
  return { title: 'wagmi' }
}

const chains = defaultChains
const defaultChain = chain.mainnet

const isChainSupported = (chainId?: number) =>
  chains.some((x) => x.id === chainId)

export default function App() {
  const { alchemyId } = useLoaderData()

  const client = useMemo(
    () =>
      createClient({
        autoConnect: true,
        connectors({ chainId }) {
          const chain = chains.find((x) => x.id === chainId) ?? defaultChain
          const rpcUrl = chain.rpcUrls.alchemy
            ? `${chain.rpcUrls.alchemy}/${alchemyId}`
            : chain.rpcUrls.default
          return [
            new InjectedConnector({ chains }),
            new CoinbaseWalletConnector({
              chains,
              options: {
                appName: 'wagmi',
                chainId: chain.id,
                jsonRpcUrl: rpcUrl,
              },
            }),
            new WalletConnectConnector({
              chains,
              options: {
                qrcode: true,
                rpc: {
                  [chain.id]: rpcUrl,
                },
              },
            }),
          ]
        },
        provider({ chainId }) {
          return new providers.AlchemyProvider(
            isChainSupported(chainId) ? chainId : defaultChain.id,
            alchemyId,
          )
        },
        webSocketProvider({ chainId }) {
          return new providers.AlchemyWebSocketProvider(
            isChainSupported(chainId) ? chainId : defaultChain.id,
            alchemyId,
          )
        },
      }),
    [alchemyId],
  )

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <script> var global = global || window; </script>
      </head>
      <body>
        <Provider client={client}>
          <Outlet />
        </Provider>
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  )
}
