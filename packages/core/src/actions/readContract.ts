import type { Abi, WatchBlockNumberReturnType } from 'viem'
import {
  type ReadContractParameters as viem_ReadContractParameters,
  type ReadContractReturnType as viem_ReadContractReturnType,
  readContract as viem_readContract,
  watchBlockNumber,
} from 'viem/actions'

import { type Config } from '../config.js'
import type { ChainIdParameter } from '../types/properties.js'
import type { GetBlockNumberError } from './getBlockNumber.js'

export type ReadContractParameters<
  config extends Config = Config,
  abi extends Abi | readonly unknown[] = Abi,
  functionName extends string = string,
> = viem_ReadContractParameters<abi, functionName> & ChainIdParameter<config>

export type ReadContractReturnType<
  abi extends Abi | readonly unknown[] = Abi,
  functionName extends string = string,
> = viem_ReadContractReturnType<abi, functionName>

export type ReadContractError = Error

/** https://wagmi.sh/core/actions/readContract */
export function readContract<
  config extends Config,
  const abi extends Abi | readonly unknown[],
  functionName extends string,
>(
  config: config,
  parameters: ReadContractParameters<config, abi, functionName>,
): Promise<ReadContractReturnType<abi, functionName>> {
  const { chainId } = parameters
  const client = config.getClient({ chainId })
  return viem_readContract(client, parameters)
}

///////////////////////////////////////////////////////////////////////////
// Watcher

export type WatchReadContractParameters<
  config extends Config = Config,
  abi extends Abi | readonly unknown[] = Abi,
  functionName extends string = string,
> = Omit<
  ReadContractParameters<config, abi, functionName>,
  'blockNumber' | 'blockTag'
> & {
  onData: (parameters: ReadContractReturnType<abi, functionName>) => void
  onError?: (error: ReadContractError | GetBlockNumberError) => void
  syncConnectedChain?: boolean
}

export type WatchReadContractReturnType = () => void

// TODO: wrap in viem's `observe` to avoid duplicate invocations.
/** https://wagmi.sh/core/actions/getBalance#watcher */
export function watchReadContract<
  config extends Config,
  const abi extends Abi | readonly unknown[],
  functionName extends string,
>(
  config: config,
  parameters: WatchReadContractParameters<config, abi, functionName>,
): WatchReadContractReturnType {
  const {
    chainId,
    onData,
    onError,
    syncConnectedChain = config._internal.syncConnectedChain,
    ...rest
  } = parameters

  const handler = async (blockNumber?: bigint | undefined) => {
    try {
      const balance = await readContract(config, {
        ...rest,
        blockNumber,
        chainId,
      } as unknown as ReadContractParameters<config, abi, functionName>)
      onData(balance)
    } catch (err: unknown) {
      onError?.(err as GetBlockNumberError)
    }
  }

  let unwatch: WatchBlockNumberReturnType | undefined
  const listener = (chainId: number | undefined) => {
    if (unwatch) unwatch()

    const client = config.getClient({ chainId })
    unwatch = watchBlockNumber(client, {
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
