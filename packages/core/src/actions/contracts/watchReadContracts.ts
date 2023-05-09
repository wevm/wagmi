import type { ContractFunctionConfig } from 'viem'

import { getConfig } from '../../config'
import { watchBlockNumber } from '../network-status/watchBlockNumber'
import type { ReadContractsConfig, ReadContractsResult } from './readContracts'
import { readContracts } from './readContracts'

export type WatchReadContractsConfig<
  TContracts extends ContractFunctionConfig[] = ContractFunctionConfig[],
  TAllowFailure extends boolean = true,
> = ReadContractsConfig<TContracts, TAllowFailure> & {
  listenToBlock?: boolean
}
export type WatchReadContractsCallback<
  TContracts extends ContractFunctionConfig[] = ContractFunctionConfig[],
  TAllowFailure extends boolean = true,
> = (results: ReadContractsResult<TContracts, TAllowFailure>) => void

export function watchReadContracts<
  TContracts extends ContractFunctionConfig[],
  TAllowFailure extends boolean = true,
>(
  args: WatchReadContractsConfig<TContracts, TAllowFailure>,
  callback: WatchReadContractsCallback<TContracts, TAllowFailure>,
) {
  const config = getConfig()

  const handleChange = async () => callback(await readContracts(args))

  const unwatch = args.listenToBlock
    ? watchBlockNumber({ listen: true }, handleChange)
    : undefined
  const unsubscribe = config.subscribe(
    ({ publicClient }) => publicClient,
    handleChange,
  )

  return () => {
    unsubscribe()
    unwatch?.()
  }
}
