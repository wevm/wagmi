// biome-ignore lint/performance/noBarrelFile: entrypoint module
export {
  type InjectedParameters,
  injected,
  type MockParameters,
  mock,
} from '@wagmi/core'

export {
  type CoinbaseWalletParameters,
  coinbaseWallet,
} from '../coinbaseWallet.js'

export { type MetaMaskParameters, metaMask } from '../metaMask.js'

export { type SafeParameters, safe } from '../safe.js'

export {
  type WalletConnectParameters,
  walletConnect,
} from '../walletConnect.js'

export { version } from '../version.js'
