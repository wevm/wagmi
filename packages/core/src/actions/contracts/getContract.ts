import { Contract, ContractInterface, Signer, providers } from 'ethers'

export type GetContractArgs = {
  /** Contract address or ENS name */
  addressOrName: string
  /** Contract interface or ABI */
  contractInterface: ContractInterface
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
        contractInterface,
        <Signer | providers.Provider | undefined>signerOrProvider,
      )
    ))
  )
}
