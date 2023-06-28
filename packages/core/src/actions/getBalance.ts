import {
  type Address,
  BaseError,
  type BlockTag,
  RpcError,
  formatUnits,
} from 'viem'
import {
  getBalance as viem_getBalance,
  watchBlockNumber as viem_watchBlockNumber,
} from 'viem/actions'

import type { Config } from '../config.js'
import { type Unit } from '../types/unit.js'
import { type Evaluate, type Omit, type OneOf } from '../types/utils.js'
import { getUnit } from '../utils/getUnit.js'
import type {
  GetBlockNumberError,
  WatchBlockNumberReturnType,
} from './getBlockNumber.js'

export type GetBalanceParameters<config extends Config = Config> = Evaluate<
  {
    address: Address
    chainId?: config['chains'][number]['id'] | undefined
    token?: Address | undefined
    unit?: Unit | undefined
  } & OneOf<
    { blockNumber?: bigint | undefined } | { blockTag?: BlockTag | undefined }
  >
>

export type GetBalanceReturnType = {
  decimals: number
  formatted: string
  symbol: string
  value: import('viem').GetBalanceReturnType
}

export type GetBalanceError =
  | RpcError
  | BaseError
  // base
  | Error

/** https://wagmi.sh/core/actions/getBalance */
export async function getBalance<config extends Config>(
  config: config,
  parameters: GetBalanceParameters<config>,
): Promise<GetBalanceReturnType> {
  const {
    address,
    blockNumber,
    blockTag,
    chainId,
    token,
    unit = 'ether',
  } = parameters
  const client = config.getClient({ chainId })

  if (token) {
    // TODO
  }

  const value = await viem_getBalance(
    client,
    blockNumber ? { address, blockNumber } : { address, blockTag },
  )
  const chain = config.chains.find((x) => x.id === chainId) ?? client.chain!
  return {
    decimals: chain.nativeCurrency.decimals,
    formatted: formatUnits(value, getUnit(unit)),
    symbol: chain.nativeCurrency.symbol,
    value,
  }
}

///////////////////////////////////////////////////////////////////////////
// Watcher

export type WatchBalanceParameters<config extends Config = Config> = Evaluate<
  Omit<GetBalanceParameters<config>, 'blockNumber' | 'blockTag'> & {
    onBalance: (parameters: GetBalanceReturnType) => void
    onError?: (error: GetBalanceError | GetBlockNumberError) => void
    syncConnectedChain?: boolean
  }
>

export type WatchBalanceReturnType = () => void

// TODO: wrap in viem's `observe` to avoid duplicate invocations.
/** https://wagmi.sh/core/actions/getBalance#watcher */
export function watchBalance<config extends Config>(
  config: config,
  parameters: WatchBalanceParameters<config>,
): WatchBalanceReturnType {
  const {
    address,
    chainId,
    onBalance,
    onError,
    syncConnectedChain = config._internal.syncConnectedChain,
    token,
    unit,
  } = parameters

  const handler = async (blockNumber?: bigint | undefined) => {
    try {
      const balance = await getBalance(config, {
        address,
        blockNumber,
        chainId,
        token,
        unit,
      })
      onBalance(balance)
    } catch (err: unknown) {
      onError?.(err as GetBlockNumberError)
    }
  }

  let unwatch: WatchBlockNumberReturnType | undefined
  const listener = (chainId: number | undefined) => {
    if (unwatch) unwatch()

    const client = config.getClient({ chainId })
    unwatch = viem_watchBlockNumber(client, {
      onBlockNumber: handler,
      onError,
      poll: true,
    })
    return unwatch
  }

  // set up listener for block number changes
  const unlisten = listener(chainId)

  // set up subscriber for connected chain changes
  let unsubscribe: (() => void) | undefined
  if (syncConnectedChain && !chainId)
    config.subscribe(
      ({ chainId }) => chainId,
      async (chainId) => {
        await handler()
        return listener(chainId)
      },
    )

  return () => {
    unlisten?.()
    unsubscribe?.()
  }
}
