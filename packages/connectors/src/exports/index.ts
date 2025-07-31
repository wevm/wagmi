// biome-ignore lint/performance/noBarrelFile: entrypoint module
export {
  type InjectedParameters,
  injected,
  type MockParameters,
  mock,
} from '@wagmi/core'

export { type BaseAccountParameters, baseAccount } from '../baseAccount.js'

export {
  type CoinbaseWalletParameters,
  coinbaseWallet,
} from '../coinbaseWallet.js'

export { type MetaMaskParameters, metaMask } from '../metaMask.js'

export { type SafeParameters, safe } from '../safe.js'
export { version } from '../version.js'
export {
  type WalletConnectParameters,
  walletConnect,
} from '../walletConnect.js'
