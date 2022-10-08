import { GetContractArgs, GetContractResult, getContract } from '@wagmi/core'
import { Abi } from 'abitype'
import { ContractInterface } from 'ethers'

import * as React from 'react'

export type UseContractConfig<TAbi = unknown> = Partial<
  Pick<GetContractArgs<TAbi>, 'abi' | 'address'>
> & {
  /** Signer or provider to attach to contract */
  signerOrProvider?: GetContractArgs['signerOrProvider'] | null
}

export function useContract<
  TAbi extends Abi | readonly unknown[] | ContractInterface,
>({ address, abi, signerOrProvider }: UseContractConfig<TAbi>) {
  return React.useMemo<GetContractResult<TAbi> | null>(() => {
    if (!address || !abi) return null
    return getContract({
      address,
      abi,
      signerOrProvider:
        signerOrProvider === null ? undefined : signerOrProvider,
    })
  }, [address, abi, signerOrProvider])
}
