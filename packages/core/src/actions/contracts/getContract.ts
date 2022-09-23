import { Abi } from 'abitype'
import { Contract, ContractInterface, Signer, providers } from 'ethers'

export type GetContractArgs = {
  /** Contract address or ENS name */
  addressOrName: string
  /** Contract interface or ABI */
  contractInterface: ContractInterface | Abi | readonly unknown[]
  /** Signer or provider to attach to contract */
  signerOrProvider?: Signer | providers.Provider
}

export function getContract<TContract = Contract>({
  addressOrName,
  contractInterface,
  signerOrProvider,
}: GetContractArgs) {
  return <TContract>(
    (<unknown>(
      new Contract(
        addressOrName,
        <ContractInterface>(<unknown>contractInterface),
        signerOrProvider,
      )
    ))
  )
}
