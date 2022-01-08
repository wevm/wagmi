import * as React from 'react'
import { Contract, ContractInterface, Signer } from 'ethers'
import { Provider } from '@ethersproject/providers'

export type Config = {
  /** Contract address or ENS name */
  addressOrName: string
  /** Contract interface or ABI */
  contractInterface: ContractInterface
  /** Signer or provider to attach to contract */
  signerOrProvider?: Signer | Provider
}

const getContract = <T = Contract>({
  addressOrName,
  contractInterface,
  signerOrProvider,
}: Config) =>
  <T>(<unknown>new Contract(addressOrName, contractInterface, signerOrProvider))

export const useContract = <Contract = any>({
  addressOrName,
  contractInterface,
  signerOrProvider,
}: Config) => {
  return React.useMemo(() => {
    return getContract<Contract>({
      addressOrName,
      contractInterface,
      signerOrProvider,
    })
  }, [addressOrName, contractInterface, signerOrProvider])
}
