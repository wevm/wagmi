import type { Abi, ResolvedConfig } from 'abitype'

export type Contract = {
  abi: Abi
  address: ResolvedConfig['AddressType']
  name: string
  chainId?: number
}
