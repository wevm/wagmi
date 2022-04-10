import { Contract as EthersContract } from 'ethers/lib/ethers'

import { getClient } from '../../client'
import { getProvider, getWebSocketProvider } from '../providers'
import { GetContractArgs, getContract } from './getContract'

type Config = {
  /** Chain id to use for provider */
  chainId?: number
  /** Receive only a single event */
  once?: boolean
}

export function watchContractEvent<
  Contract extends EthersContract = EthersContract,
>(
  /** Contract configuration */
  contractArgs: GetContractArgs,
  /** Event name to listen to */
  eventName: Parameters<Contract['on']>[0],
  callback: Parameters<Contract['on']>[1],
  { chainId, once }: Config = {},
) {
  let contract: Contract
  const watchEvent = async () => {
    if (contract) {
      contract?.off(eventName, callback)
    }

    contract = getContract<Contract>({
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
      equalityFn: (selected, previous) =>
        selected.provider === previous.provider &&
        selected.webSocketProvider === previous.webSocketProvider,
    },
  )

  return () => {
    contract?.off(eventName, callback)
    unsubscribe()
  }
}
