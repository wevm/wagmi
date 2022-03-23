import type { Provider } from '@ethersproject/providers'
import { Contract, ContractInterface, Signer } from 'ethers/lib/ethers'

export type GetContractArgs = {
  /** Contract address or ENS name */
  addressOrName: string
  /** Contract interface or ABI */
  contractInterface: ContractInterface
  /** Signer or provider to attach to contract */
  signerOrProvider?: Signer | Provider
}

export function getContract<T = Contract>({
  addressOrName,
  contractInterface,
  signerOrProvider,
}: GetContractArgs) {
  return <T>(
    (<unknown>new Contract(addressOrName, contractInterface, signerOrProvider))
  )
}
