import { useMemo } from 'react'
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

import {
  WagmiConfig,
  configureChains,
  createClient,
  defaultChains,
} from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

export function loader() {
  require('dotenv').config()
  return {
    alchemyId: process.env.REMIX_ALCHEMY_ID as string,
  }
}

export const meta: MetaFunction = () => {
  return { title: 'wagmi' }
}

export default function App() {
  const { alchemyId } = useLoaderData()

  const client = useMemo(() => {
    const { chains, provider, webSocketProvider } = configureChains(
      defaultChains,
      [alchemyProvider({ alchemyId })],
    )

    return createClient({
      autoConnect: true,
      connectors: [
        new MetaMaskConnector({ chains }),
        new InjectedConnector({ chains }),
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
      ],
      provider,
      webSocketProvider,
    })
  }, [alchemyId])

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
        <WagmiConfig client={client}>
          <Outlet />
        </WagmiConfig>
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  )
}
