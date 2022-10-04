import { GetContractArgs, getContract } from '@wagmi/core'
import { Contract } from 'ethers'

import * as React from 'react'

export type UseContractConfig = {
  addressOrName?: GetContractArgs['addressOrName']
  contractInterface?: GetContractArgs['contractInterface']
  signerOrProvider?: GetContractArgs['signerOrProvider'] | null
}

export function useContract<TContract = Contract>({
  addressOrName,
  contractInterface,
  signerOrProvider,
}: UseContractConfig) {
  return React.useMemo<TContract | null>(() => {
    if (!addressOrName || !contractInterface) return null
    return getContract<TContract>({
      addressOrName,
      contractInterface,
      signerOrProvider:
        signerOrProvider === null ? undefined : signerOrProvider,
    })
  }, [addressOrName, contractInterface, signerOrProvider])
}
