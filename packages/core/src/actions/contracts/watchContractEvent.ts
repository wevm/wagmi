import { Contract } from 'ethers/lib/ethers'
import shallow from 'zustand/shallow'

import { getClient } from '../../client'
import { getProvider, getWebSocketProvider } from '../providers'
import { GetContractArgs, getContract } from './getContract'

type Config = {
  /** Chain id to use for provider */
  chainId?: number
  /** Receive only a single event */
  once?: boolean
}

export function watchContractEvent<TContract extends Contract = Contract>(
  /** Contract configuration */
  contractArgs: GetContractArgs,
  /** Event name to listen to */
  eventName: Parameters<TContract['on']>[0],
  callback: Parameters<TContract['on']>[1],
  { chainId, once }: Config = {},
) {
  let contract: TContract
  const watchEvent = async () => {
    if (contract) {
      contract?.off(eventName, callback)
    }

    contract = getContract<TContract>({
      signerOrProvider:
        getWebSocketProvider({ chainId }) || getProvider({ chainId }),
      ...contractArgs,
    })

    if (once) contract.once(eventName, callback)
    else contract.on(eventName, callback)
  }

  watchEvent()
  const client = getClient()
  const unsubscribe = client.subscribe(
    ({ provider, webSocketProvider }) => ({
      provider,
      webSocketProvider,
    }),
    watchEvent,
    {
      equalityFn: shallow,
    },
  )

  return () => {
    contract?.off(eventName, callback)
    unsubscribe()
  }
}
