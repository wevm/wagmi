import { getClient } from '../../client'
import { watchBlockNumber } from '../network-status/watchBlockNumber'
import { MulticallConfig, MulticallResult, multicall } from './multicall'

export type WatchMulticallConfig<T extends unknown[]> = MulticallConfig<T> & {
  listenToBlock?: boolean
}
export type WatchMulticallResult<T extends unknown[]> = (
  result: MulticallResult<T>,
) => void

export function watchMulticall<T extends unknown[]>(
  config: WatchMulticallConfig<T>,
  callback: WatchMulticallResult<T>,
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
