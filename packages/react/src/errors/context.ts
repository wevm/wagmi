import { BaseError } from './base.js'

export type WagmiProviderNotFoundErrorType = WagmiProviderNotFoundError & {
  name: 'WagmiProviderNotFoundError'
}
export class WagmiProviderNotFoundError extends BaseError {
  override name = 'WagmiProviderNotFoundError'
  constructor() {
    super('`useConfig` must be used within `WagmiProvider`.', {
      docsPath: 'https://rc.wagmi.sh/react/api/WagmiProvider',
    })
  }
}
