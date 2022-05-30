import { getClient } from '../../client'
import {
  ReadContractsConfig,
  ReadContractsResult,
  readContracts,
} from './readContracts'
import { watchBlockNumber } from '../network-status/watchBlockNumber'

export type WatchReadContractsConfig = ReadContractsConfig & {
  listenToBlock?: boolean
}
export type WatchReadContractsResult = (result: ReadContractsResult) => void

export function watchReadContracts(
  config: WatchReadContractsConfig,
  callback: WatchReadContractsResult,
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
