import { getClient } from '../../client'
import {
  ReadContractsArgs,
  ReadContractsConfig,
  ReadContractsResult,
  readContracts,
} from './readContracts'
import { watchBlockNumber } from '../network-status/watchBlockNumber'

export type WatchReadContractsArgs = ReadContractsArgs
export type WatchReadContractsConfig = ReadContractsConfig & {
  listenToBlock?: boolean
}
export type WatchReadContractsResult = (result: ReadContractsResult) => void

export function watchReadContracts(
  readContractsArgs: ReadContractsArgs,
  config: WatchReadContractsConfig = {},
  callback: WatchReadContractsResult,
) {
  const client = getClient()

  const handleChange = async () =>
    callback(await readContracts(readContractsArgs, config))

  const unwatch = config.listenToBlock
    ? watchBlockNumber({ listen: true }, handleChange)
    : undefined
  const unsubscribe = client.subscribe(({ provider }) => provider, handleChange)

  return () => {
    unsubscribe()
    unwatch?.()
  }
}
