import type { Abi, Address } from 'abitype'

export type Contract = {
  abi: Abi
  address?: Address | Record<number, Address>
  content: string
  name: string
}
