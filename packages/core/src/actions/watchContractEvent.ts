import type { Abi, ContractEventName } from 'viem'
import {
  type WatchContractEventParameters as viem_WatchContractEventParameters,
  type WatchContractEventReturnType as viem_WatchContractEventReturnType,
  watchContractEvent as viem_watchContractEvent,
} from 'viem/actions'
import type { Config } from '../createConfig.js'
import type {
  ChainIdParameter,
  SyncConnectedChainParameter,
} from '../types/properties.js'

export type WatchContractEventParameters<
  abi extends Abi | readonly unknown[] = Abi,
  eventName extends ContractEventName<abi> = ContractEventName<abi>,
  strict extends boolean | undefined = undefined,
  config extends Config = Config,
> = viem_WatchContractEventParameters<abi, eventName, strict> &
  ChainIdParameter<config> &
  SyncConnectedChainParameter

export type WatchContractEventReturnType = viem_WatchContractEventReturnType

// TODO: wrap in viem's `observe` to avoid duplicate invocations.
/** https://alpha.wagmi.sh/core/actions/watchContractEvent */
export function watchContractEvent<
  config extends Config,
  const abi extends Abi | readonly unknown[],
  eventName extends ContractEventName<abi>,
  strict extends boolean | undefined = undefined,
>(
  config: config,
  parameters: WatchContractEventParameters<abi, eventName, strict, config>,
) {
  const { syncConnectedChain = config._internal.syncConnectedChain, ...rest } =
    parameters

  let unwatch: WatchContractEventReturnType | undefined
  const listener = (chainId: number | undefined) => {
    if (unwatch) unwatch()

    const client = config.getClient({ chainId })
    unwatch = viem_watchContractEvent(client, rest)
    return unwatch
  }

  // set up listener for transaction changes
  const unlisten = listener(parameters.chainId)

  // set up subscriber for connected chain changes
  let unsubscribe: (() => void) | undefined
  if (syncConnectedChain && !parameters.chainId)
    unsubscribe = config.subscribe(
      ({ chainId }) => chainId,
      async (chainId) => {
        return listener(chainId)
      },
    )

  return () => {
    unlisten?.()
    unsubscribe?.()
  }
}
