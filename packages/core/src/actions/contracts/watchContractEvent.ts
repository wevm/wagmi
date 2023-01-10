import type {
  Abi,
  AbiEvent,
  AbiParametersToPrimitiveTypes,
  Address,
  ExtractAbiEvent,
  ExtractAbiEventNames,
  Narrow,
} from 'abitype'
import { shallow } from 'zustand/shallow'

import { getClient } from '../../client'
import { getProvider, getWebSocketProvider } from '../providers'
import { getContract } from './getContract'

export type WatchContractEventConfig<
  TAbi extends Abi | readonly unknown[] = Abi,
  TEventName extends string = string,
> = {
  /** Contract ABI */
  abi: Narrow<TAbi> // infer `TAbi` type for inline usage
  /** Contract address */
  address: Address
  /** Chain id to use for provider */
  chainId?: number
  /** Function to invoke on the contract */
  eventName: GetEventName<TAbi, TEventName>
  /** Receive only a single event */
  once?: boolean
}

export type WatchContractEventCallback<
  TAbi extends Abi | readonly unknown[] = Abi,
  TEventName extends string = string,
> = GetListener<TAbi, TEventName>

export function watchContractEvent<
  TAbi extends Abi | readonly unknown[],
  TEventName extends string,
>(
  {
    address,
    abi,
    chainId,
    eventName,
    once,
  }: WatchContractEventConfig<TAbi, TEventName>,
  callback: WatchContractEventCallback<TAbi, TEventName>,
) {
  const handler = (...event: readonly unknown[]) =>
    (callback as (...args: readonly unknown[]) => void)(...event)

  let contract: ReturnType<typeof getContract>
  const watchEvent = async () => {
    if (contract) contract?.off(eventName, handler)

    const signerOrProvider =
      getWebSocketProvider({ chainId }) || getProvider({ chainId })
    contract = getContract({
      address,
      abi: abi as Abi, // TODO: Remove cast and still support `Narrow<TAbi>`
      signerOrProvider,
    })

    if (once) contract.once(eventName, handler)
    else contract.on(eventName, handler)
  }

  watchEvent()
  const client = getClient()
  const unsubscribe = client.subscribe(
    ({ provider, webSocketProvider }) => ({
      provider,
      webSocketProvider,
    }),
    watchEvent,
    { equalityFn: shallow },
  )

  return () => {
    contract?.off(eventName, handler)
    unsubscribe()
  }
}

type GetEventName<
  TAbi extends Abi | readonly unknown[] = Abi,
  TEventName extends string = string,
> = TAbi extends Abi
  ? ExtractAbiEventNames<TAbi> extends infer AbiEventNames
    ?
        | AbiEventNames
        | (TEventName extends AbiEventNames ? TEventName : never)
        | (Abi extends TAbi ? string : never)
    : never
  : TEventName

type GetListener<
  TAbi extends Abi | readonly unknown[],
  TEventName extends string,
  TAbiEvent extends AbiEvent = TAbi extends Abi
    ? ExtractAbiEvent<TAbi, TEventName>
    : AbiEvent,
  TArgs = AbiParametersToPrimitiveTypes<TAbiEvent['inputs']>,
  FailedToParseArgs =
    | ([TArgs] extends [never] ? true : false)
    | (readonly unknown[] extends TArgs ? true : false),
> = true extends FailedToParseArgs
  ? (...args: readonly unknown[]) => void
  : (
      ...args: TArgs extends readonly unknown[] ? TArgs : readonly unknown[]
    ) => void
