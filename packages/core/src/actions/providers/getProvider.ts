import { BaseProvider } from '@ethersproject/providers'

import { client } from '../../client'

export type GetProviderResult = BaseProvider

export function getProvider(): GetProviderResult {
  return client.provider
}
