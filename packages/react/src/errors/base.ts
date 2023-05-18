import { BaseError as CoreError } from '@wagmi/core'

import { getVersion } from '../utils/getVersion.js'

export class BaseError extends CoreError {
  override name = 'WagmiError'
  override docsBaseUrl = 'https://wagmi.sh/react'
  override version = getVersion()
}
