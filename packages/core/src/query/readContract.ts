import { type QueryOptions } from '@tanstack/query-core'
import { type Abi } from 'viem'

import {
  type ReadContractError,
  type ReadContractParameters,
  type ReadContractReturnType,
  readContract,
} from '../actions/readContract.js'
import type { Config } from '../config.js'
import type { PartialBy } from '../types/utils.js'
import type { ScopeKeyParameter } from './types.js'

export type ReadContractOptions<
  config extends Config,
  abi extends Abi | readonly unknown[],
  functionName extends string,
> = PartialBy<
  // `PartialBy` preserves type inference
  ReadContractParameters<config, abi, functionName>,
  keyof ReadContractParameters
> &
  ScopeKeyParameter

export function readContractQueryOptions<
  config extends Config,
  const abi extends Abi | readonly unknown[],
  functionName extends string,
>(
  config: Config,
  options: ReadContractOptions<config, abi, functionName> = {} as any,
) {
  return {
    async queryFn({ queryKey }) {
      const { abi, address, ...parameters } = queryKey[1]
      if (!abi) throw new Error('abi is required')
      if (!address) throw new Error('address is required')
      return (await readContract(config, {
        abi,
        address,
        ...parameters,
      } as ReadContractParameters)) as ReadContractData<abi, functionName>
    },
    queryKey: readContractQueryKey(options),
  } as const satisfies QueryOptions<
    ReadContractQueryFnData<abi, functionName>,
    ReadContractError,
    ReadContractData<abi, functionName>,
    ReadContractQueryKey<config, abi, functionName>
  >
}

export type ReadContractQueryFnData<
  abi extends Abi | readonly unknown[],
  functionName extends string,
> = ReadContractReturnType<abi, functionName>

export type ReadContractData<
  abi extends Abi | readonly unknown[],
  functionName extends string,
> = ReadContractQueryFnData<abi, functionName>

export function readContractQueryKey<
  config extends Config,
  const abi extends Abi | readonly unknown[],
  functionName extends string,
>(options: ReadContractOptions<config, abi, functionName> = {} as any) {
  return ['readContract', options] as const
}

export type ReadContractQueryKey<
  config extends Config,
  abi extends Abi | readonly unknown[],
  functionName extends string,
> = ReturnType<typeof readContractQueryKey<config, abi, functionName>>
