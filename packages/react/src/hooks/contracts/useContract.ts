import { GetContractArgs, getContract } from '@wagmi/core'
import { Contract } from 'ethers'

import * as React from 'react'

export type UseContractConfig = Omit<
  GetContractArgs,
  'addressOrName' | 'signerOrProvider'
> & {
  addressOrName?: GetContractArgs['addressOrName']
  signerOrProvider?: GetContractArgs['signerOrProvider'] | null
}

export function useContract<TContract = Contract>({
  addressOrName,
  contractInterface,
  signerOrProvider,
}: UseContractConfig) {
  return React.useMemo<TContract | null>(() => {
    if (!addressOrName) return null
    return getContract<TContract>({
      addressOrName,
      contractInterface,
      signerOrProvider:
        signerOrProvider === null ? undefined : signerOrProvider,
    })
  }, [addressOrName, contractInterface, signerOrProvider])
}
