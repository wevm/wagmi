// Imports
import {
  Connector,
  InjectedConnector,
  chain,
  createWagmiClient,
  defaultChains,
} from 'wagmi-core'
import { WalletConnectConnector } from 'wagmi-core/connectors/walletConnect'
import { WalletLinkConnector } from 'wagmi-core/connectors/walletLink'
import { providers } from 'ethers'

// Get environment variables
const alchemy = process.env.NEXT_PUBLIC_ALCHEMY_ID as string
const etherscan = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY as string
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
    new InjectedConnector({ chains, options: { shimDisconnect: true } }),
    new WalletConnectConnector({
      chains,
      options: {
        infuraId,
        qrcode: true,
      },
    }),
    new WalletLinkConnector({
      chains,
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
      alchemy,
      etherscan,
      infuraId,
    },
  )
const webSocketProvider = ({ chainId }: ProviderConfig) =>
  isChainSupported(chainId)
    ? new providers.InfuraWebSocketProvider(chainId, infuraId)
    : undefined

export const wagmiClient = createWagmiClient({
  connectors,
  provider,
  webSocketProvider,
})
