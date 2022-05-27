import { getClient } from '../../client'
import { Chain } from '../../types'

export type GetChainsResult = {
  chains: Chain[]
}

export function getChains(): GetChainsResult {
  const { chains } = getClient()
  return { chains }
}
