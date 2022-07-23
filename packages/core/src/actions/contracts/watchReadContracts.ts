import { getClient } from '../../client'
import { watchBlockNumber } from '../network-status/watchBlockNumber'
import {
  ReadContractsConfig,
  ReadContractsResult,
  readContracts,
} from './readContracts'

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
