import type { Abi } from 'abitype'

import { getClient } from '../../client'
import type { Contract } from '../../types/contracts'
import { watchBlockNumber } from '../network-status/watchBlockNumber'
import type { ReadContractsConfig, ReadContractsResult } from './readContracts'
import { readContracts } from './readContracts'

export type WatchReadContractsConfig<TContracts extends Contract[]> =
  ReadContractsConfig<TContracts> & {
    listenToBlock?: boolean
  }
export type WatchReadContractsCallback<TContracts extends Contract[]> = (
  results: ReadContractsResult<TContracts>,
) => void

export function watchReadContracts<
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends string,
  TContracts extends { abi: TAbi; functionName: TFunctionName }[],
>(
  config: WatchReadContractsConfig<TContracts>,
  callback: WatchReadContractsCallback<TContracts>,
) {
  const client = getClient()

  const handleChange = async () => callback(await readContracts(config))

  const unwatch = config.listenToBlock
    ? watchBlockNumber({ listen: true }, handleChange)
    : undefined
  const unsubscribe = client.subscribe(({ provider }) => provider, handleChange)

  return () => {
    unsubscribe()
    unwatch?.()
  }
}
