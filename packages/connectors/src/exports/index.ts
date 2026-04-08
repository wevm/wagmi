/** biome-ignore-all lint/performance/noBarrelFile: entrypoint module */
import { tempoWallet as accounts_tempoWallet } from 'accounts/wagmi'

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
export { type PortoParameters, porto } from '../porto.js'
export { type SafeParameters, safe } from '../safe.js'
export type TempoWalletParameters = NonNullable<
  Parameters<typeof accounts_tempoWallet>[0]
>
export const tempoWallet = accounts_tempoWallet
export { version } from '../version.js'
export {
  type WalletConnectParameters,
  walletConnect,
} from '../walletConnect.js'
