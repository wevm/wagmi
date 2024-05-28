import { fallback as viem_fallback } from 'viem'

import type { Transport } from '../createConfig.js'

export function fallback(
  transports: Transport[],
  config?: Parameters<typeof viem_fallback>[1],
) {
  return viem_fallback(transports, config)
}
