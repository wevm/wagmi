import type { Abi, ExtractAbiFunctionNames } from 'abitype'

import { getClient } from '../../client'
import { watchBlockNumber } from '../network-status/watchBlockNumber'
import type { ReadContractConfig, ReadContractResult } from './readContract'
import { readContract } from './readContract'

export type WatchReadContractConfig<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
> = ReadContractConfig<TAbi, TFunctionName> & {
  listenToBlock?: boolean
}
export type WatchReadContractCallback<
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends string,
> = (result: ReadContractResult<TAbi, TFunctionName>) => void

export function watchReadContract<
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends TAbi extends Abi
    ? ExtractAbiFunctionNames<TAbi, 'view' | 'pure'>
    : string,
>(
  config: WatchReadContractConfig<TAbi, TFunctionName>,
  callback: WatchReadContractCallback<TAbi, TFunctionName>,
) {
  const client = getClient()

  const handleChange = async () => callback(await readContract(config))

  const unwatch = config.listenToBlock
    ? watchBlockNumber({ listen: true }, handleChange)
    : undefined
  const unsubscribe = client.subscribe(({ provider }) => provider, handleChange)

  return () => {
    unsubscribe()
    unwatch?.()
  }
}
