import { BaseProvider } from '@ethersproject/providers'

import { wagmiClient } from '../../client'

export type GetProviderResult = BaseProvider

export function getProvider(): GetProviderResult {
  return wagmiClient.provider
}
