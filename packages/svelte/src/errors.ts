import { BaseError as CoreError } from '@wagmi/core'

import { getVersion } from './version.js'

export type BaseErrorType = BaseError & { name: 'WagmiError' }

export class BaseError extends CoreError {
  override name = 'WagmiError'
  override get docsBaseUrl() {
    return 'https://wagmi.sh/react'
  }
  override get version() {
    return getVersion()
  }
}

export type WagmiProviderNotFoundErrorType = WagmiProviderNotFoundError & {
  name: 'WagmiProviderNotFoundError'
}
export class WagmiProviderNotFoundError extends BaseError {
  override name = 'WagmiProviderNotFoundError'
  constructor() {
    super('`useConfig` must be used within `WagmiProvider`.', {
      docsPath: '/api/WagmiProvider',
    })
  }
}
