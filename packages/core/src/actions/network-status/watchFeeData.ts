import { client } from '../../client'
import {
  FetchFeeDataArgs,
  FetchFeeDataResult,
  fetchFeeData,
} from './fetchFeeData'
import { watchBlockNumber } from './watchBlockNumber'

export type WatchFeeDataArgs = FetchFeeDataArgs & {
  /** Watch for changes to block number */
  listenToBlock?: boolean
}
export type WatchFeeDataCallback = (feeData: FetchFeeDataResult) => void

export function watchFeeData(
  args: WatchFeeDataArgs,
  callback: WatchFeeDataCallback,
) {
  const handleChange = async () => callback(await fetchFeeData(args))

  const unwatch = args.listenToBlock
    ? watchBlockNumber({ listen: true }, handleChange)
    : undefined
  const unsubscribe = client.subscribe(({ provider }) => provider, handleChange)

  return () => {
    unsubscribe()
    unwatch?.()
  }
}
