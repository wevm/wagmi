import { GetContractArgs, getContract } from '@wagmi/core'
import { Contract } from 'ethers'

import * as React from 'react'

export type UseContractConfig = Partial<
  Pick<GetContractArgs, 'abi' | 'address'>
> & {
  /** Signer or provider to attach to contract */
  signerOrProvider?: GetContractArgs['signerOrProvider'] | null
}

export function useContract<TContract = Contract>({
  address,
  abi,
  signerOrProvider,
}: UseContractConfig) {
  return React.useMemo<TContract | null>(() => {
    if (!address || !abi) return null
    return getContract<TContract>({
      address,
      abi,
      signerOrProvider:
        signerOrProvider === null ? undefined : signerOrProvider,
    })
  }, [address, abi, signerOrProvider])
}
