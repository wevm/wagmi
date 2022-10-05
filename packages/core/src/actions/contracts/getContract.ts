import { Abi } from 'abitype'
import { Contract, ContractInterface, Signer, providers } from 'ethers'

export type GetContractArgs = {
  /** Contract address */
  address: string
  /** Contract interface or ABI */
  abi: ContractInterface | Abi | readonly unknown[]
  /** Signer or provider to attach to contract */
  signerOrProvider?: Signer | providers.Provider
}

export function getContract<TContract = Contract>({
  address,
  abi,
  signerOrProvider,
}: GetContractArgs) {
  return <TContract>(
    (<unknown>(
      new Contract(address, <ContractInterface>(<unknown>abi), signerOrProvider)
    ))
  )
}
