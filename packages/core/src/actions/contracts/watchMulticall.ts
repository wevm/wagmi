import type { ContractConfig } from 'viem'

import { getClient } from '../../client'
import { watchBlockNumber } from '../network-status/watchBlockNumber'
import type { MulticallConfig, MulticallResult } from './multicall'
import { multicall } from './multicall'

export type WatchMulticallConfig<
  TContracts extends ContractConfig[] = ContractConfig[],
  TAllowFailure extends boolean = true,
> = MulticallConfig<TContracts, TAllowFailure> & {
  listenToBlock?: boolean
}
export type WatchMulticallCallback<
  TContracts extends ContractConfig[] = ContractConfig[],
  TAllowFailure extends boolean = true,
> = (results: MulticallResult<TContracts, TAllowFailure>) => void

export function watchMulticall<
  TContracts extends ContractConfig[],
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
  const unsubscribe = client.subscribe(({ provider }) => provider, handleChange)

  return () => {
    unsubscribe()
    unwatch?.()
  }
}
