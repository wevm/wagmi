import type { Abi } from 'abitype'

import { getClient } from '../../client'
import type { Contract } from '../../types/contracts'
import { watchBlockNumber } from '../network-status/watchBlockNumber'
import type { MulticallConfig, MulticallResult } from './multicall'
import { multicall } from './multicall'

export type WatchMulticallConfig<TContracts extends Contract[]> =
  MulticallConfig<TContracts> & {
    listenToBlock?: boolean
  }
export type WatchMulticallCallback<TContracts extends Contract[]> = (
  results: MulticallResult<TContracts>,
) => void

export function watchMulticall<
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends string,
  TContracts extends { abi: TAbi; functionName: TFunctionName }[],
>(
  config: WatchMulticallConfig<TContracts>,
  callback: WatchMulticallCallback<TContracts>,
) {
  const client = getClient()

  const handleChange = async () => callback(await multicall(config))

  const unwatch = config.listenToBlock
    ? watchBlockNumber({ listen: true }, handleChange)
    : undefined
  const unsubscribe = client.subscribe(({ provider }) => provider, handleChange)

  return () => {
    unsubscribe()
    unwatch?.()
  }
}
