import { getClient } from '../../client'
import {
  MulticallArgs,
  MulticallConfig,
  MulticallResult,
  multicall,
} from './multicall'
import { watchBlockNumber } from '../network-status/watchBlockNumber'

export type WatchMulticallArgs = MulticallArgs
export type WatchMulticallConfig = MulticallConfig & {
  listenToBlock?: boolean
}
export type WatchMulticallResult = (result: MulticallResult) => void

export function watchMulticall(
  multicallArgs: MulticallArgs,
  config: WatchMulticallConfig = {},
  callback: WatchMulticallResult,
) {
  const client = getClient()

  const handleChange = async () =>
    callback(await multicall(multicallArgs, config))

  const unwatch = config.listenToBlock
    ? watchBlockNumber({ listen: true }, handleChange)
    : undefined
  const unsubscribe = client.subscribe(({ provider }) => provider, handleChange)

  return () => {
    unsubscribe()
    unwatch?.()
  }
}
