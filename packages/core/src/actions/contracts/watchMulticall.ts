import { Abi } from 'abitype'

import { getClient } from '../../client'
import { watchBlockNumber } from '../network-status/watchBlockNumber'
import { MulticallConfig, MulticallResult, multicall } from './multicall'

export type WatchMulticallConfig<TContracts extends unknown[]> =
  MulticallConfig<TContracts> & {
    listenToBlock?: boolean
  }
export type WatchMulticallCallback<TContracts extends unknown[]> = (
  result: MulticallResult<TContracts>,
) => void

export function watchMulticall<
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends string,
  TContracts extends { contractInterface: TAbi; functionName: TFunctionName }[],
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
