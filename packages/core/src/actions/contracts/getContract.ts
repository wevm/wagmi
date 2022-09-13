import { Abi, Address } from 'abitype'
import { Contract, ContractInterface, Signer, providers } from 'ethers'

export type GetContractArgs = {
  /** Contract address or ENS name */
  addressOrName: Address
  /** Contract interface or ABI */
  contractInterface: ContractInterface | Abi | readonly unknown[]
  /** Signer or provider to attach to contract */
  signerOrProvider?: Signer | providers.Provider | null
}

export function getContract<T = Contract>({
  addressOrName,
  contractInterface,
  signerOrProvider,
}: GetContractArgs) {
  return <T>(
    (<unknown>(
      new Contract(
        addressOrName,
        <ContractInterface>(<unknown>contractInterface),
        <Signer | providers.Provider | undefined>signerOrProvider,
      )
    ))
  )
}
