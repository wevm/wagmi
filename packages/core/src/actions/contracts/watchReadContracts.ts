import { getClient } from '../../client'
import { watchBlockNumber } from '../network-status/watchBlockNumber'
import {
  ReadContractsConfig,
  ReadContractsResult,
  readContracts,
} from './readContracts'

export type WatchReadContractsConfig<T extends unknown[]> =
  ReadContractsConfig<T> & {
    listenToBlock?: boolean
  }
export type WatchReadContractsResult<T extends unknown[]> = (
  result: ReadContractsResult<T>,
) => void

export function watchReadContracts<T extends unknown[]>(
  config: WatchReadContractsConfig<T>,
  callback: WatchReadContractsResult<T>,
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
