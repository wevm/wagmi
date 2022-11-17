import type { GetContractArgs, GetContractResult } from '@wagmi/core'
import { getContract } from '@wagmi/core'
import type { Abi } from 'abitype'

import * as React from 'react'

export type UseContractConfig<TAbi extends Abi | readonly unknown[] = Abi> =
  Partial<Pick<GetContractArgs<TAbi>, 'abi' | 'address'>> & {
    /** Signer or provider to attach to contract */
    signerOrProvider?: GetContractArgs['signerOrProvider'] | null
  }

export function useContract<TAbi extends Abi | readonly unknown[]>({
  address,
  abi,
  signerOrProvider,
}: UseContractConfig<TAbi> = {}) {
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
