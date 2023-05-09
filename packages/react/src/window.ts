// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck – ignore @coinbase/wallet-sdk window.ethereum.
import type { WindowProvider } from '@wagmi/connectors'

declare global {
  interface Window {
    ethereum?: WindowProvider
  }
}
