import type { Address } from 'viem'

export function sliceAddress(address: Address | undefined) {
  if (!address) return null
  return `${address.slice(0, 4)}...${address.slice(-4)}`
}
