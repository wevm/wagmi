import type {
  Abi,
  Chain,
  ContractEventName,
  Transport,
  WebSocketTransport,
} from 'viem'
import {
  type WatchContractEventParameters as viem_WatchContractEventParameters,
  type WatchContractEventReturnType as viem_WatchContractEventReturnType,
  watchContractEvent as viem_watchContractEvent,
} from 'viem/actions'

import type { Config } from '../createConfig.js'
import type { SelectChains } from '../types/chain.js'
import type {
  ChainIdParameter,
  SyncConnectedChainParameter,
} from '../types/properties.js'
import type { UnionEvaluate } from '../types/utils.js'
import { getAction } from '../utils/getAction.js'

export type WatchContractEventParameters<
  abi extends Abi | readonly unknown[] = Abi,
  eventName extends ContractEventName<abi> | undefined = ContractEventName<abi>,
  strict extends boolean | undefined = undefined,
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  ///
  chains extends readonly Chain[] = SelectChains<config, chainId>,
> = {
  [key in keyof chains]: UnionEvaluate<
    viem_WatchContractEventParameters<
      abi,
      eventName,
      strict,
      config['_internal']['transports'][chains[key]['id']] extends infer transport extends
        Transport
        ? Transport extends transport
          ? WebSocketTransport
          : transport
        : WebSocketTransport
    > &
      ChainIdParameter<config, chainId> &
      SyncConnectedChainParameter
  >
}[number]

export type WatchContractEventReturnType = viem_WatchContractEventReturnType

// TODO: wrap in viem's `observe` to avoid duplicate invocations.
/** https://wagmi.sh/core/api/actions/watchContractEvent */
export function watchContractEvent<
  config extends Config,
  chainId extends config['chains'][number]['id'],
  const abi extends Abi | readonly unknown[],
  eventName extends ContractEventName<abi> | undefined,
  strict extends boolean | undefined = undefined,
>(
  config: config,
  parameters: WatchContractEventParameters<
    abi,
    eventName,
    strict,
    config,
    chainId
  >,
) {
  const { syncConnectedChain = config._internal.syncConnectedChain, ...rest } =
    parameters

  let unwatch: WatchContractEventReturnType | undefined
  const listener = (chainId: number | undefined) => {
    if (unwatch) unwatch()

    const client = config.getClient({ chainId })
    const action = getAction(
      client,
      viem_watchContractEvent,
      'watchContractEvent',
    )
    unwatch = action(rest as unknown as viem_WatchContractEventParameters)
    return unwatch
  }

  // set up listener for transaction changes
  const unlisten = listener(parameters.chainId)

  // set up subscriber for connected chain changes
  let unsubscribe: (() => void) | undefined
  if (syncConnectedChain && !parameters.chainId)
    unsubscribe = config.subscribe(
      ({ chainId }) => chainId,
      async (chainId) => listener(chainId),
    )

  return () => {
    unlisten?.()
    unsubscribe?.()
  }
}
