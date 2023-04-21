import type { ContractFunctionConfig } from 'viem'

import { getClient } from '../../client'
import { watchBlockNumber } from '../network-status/watchBlockNumber'
import type { MulticallConfig, MulticallResult } from './multicall'
import { multicall } from './multicall'

export type WatchMulticallConfig<
  TContracts extends ContractFunctionConfig[] = ContractFunctionConfig[],
  TAllowFailure extends boolean = true,
> = MulticallConfig<TContracts, TAllowFailure> & {
  listenToBlock?: boolean
}
export type WatchMulticallCallback<
  TContracts extends ContractFunctionConfig[] = ContractFunctionConfig[],
  TAllowFailure extends boolean = true,
> = (results: MulticallResult<TContracts, TAllowFailure>) => void

export function watchMulticall<
  TContracts extends ContractFunctionConfig[],
  TAllowFailure extends boolean = true,
>(
  config: WatchMulticallConfig<TContracts, TAllowFailure>,
  callback: WatchMulticallCallback<TContracts, TAllowFailure>,
) {
  const client = getClient()

  const handleChange = async () => callback(await multicall(config))

  const unwatch = config.listenToBlock
    ? watchBlockNumber({ listen: true }, handleChange)
    : undefined
  const unsubscribe = client.subscribe(
    ({ publicClient }) => publicClient,
    handleChange,
  )

  return () => {
    unsubscribe()
    unwatch?.()
  }
}
