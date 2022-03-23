import * as React from 'react'
import { GetContractArgs, getContract } from '@wagmi/core'

export type UseContractConfig = GetContractArgs

export const useContract = <Contract = any>({
  addressOrName,
  contractInterface,
  signerOrProvider,
}: UseContractConfig) => {
  return React.useMemo(() => {
    return getContract<Contract>({
      addressOrName,
      contractInterface,
      signerOrProvider,
    })
  }, [addressOrName, contractInterface, signerOrProvider])
}
