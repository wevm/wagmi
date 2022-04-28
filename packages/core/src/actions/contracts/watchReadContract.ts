import { getClient } from '../../client'
import {
  ReadContractArgs,
  ReadContractConfig,
  ReadContractResult,
  readContract,
} from './readContract'
import { watchBlockNumber } from '../network-status/watchBlockNumber'

export type WatchReadContractArgs = ReadContractArgs
export type WatchReadContractConfig = ReadContractConfig & {
  listenToBlock?: boolean
}
export type WatchReadContractResult = (result: ReadContractResult) => void

export function watchReadContract(
  contractConfig: WatchReadContractArgs,
  functionName: string,
  config: WatchReadContractConfig = {},
  callback: WatchReadContractResult,
) {
  const client = getClient()

  const handleChange = async () =>
    callback(await readContract(contractConfig, functionName, config))

  const unwatch = config.listenToBlock
    ? watchBlockNumber({ listen: true }, handleChange)
    : undefined
  const unsubscribe = client.subscribe(({ provider }) => provider, handleChange)

  return () => {
    unsubscribe()
    unwatch?.()
  }
}
