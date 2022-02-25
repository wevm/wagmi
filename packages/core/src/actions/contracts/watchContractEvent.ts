import { ethers } from 'ethers'

import { wagmiClient } from '../../client'
import { GetContractArgs, getContract } from './getContract'

type Config = {
  /** Receive only a single event */
  once?: boolean
}

export function watchContractEvent<
  Contract extends ethers.Contract = ethers.Contract,
>(
  /** Contract configuration */
  contractArgs: GetContractArgs,
  /** Event name to listen to */
  eventName: Parameters<Contract['on']>[0],
  callback: Parameters<Contract['on']>[1],
  { once }: Config = {},
) {
  let contract: Contract
  const watchEvent = async () => {
    if (contract) {
      contract?.off(eventName, callback)
    }

    contract = getContract<Contract>({
      signerOrProvider: wagmiClient.webSocketProvider || wagmiClient.provider,
      ...contractArgs,
    })

    if (once) contract.once(eventName, callback)
    else contract.on(eventName, callback)
  }

  watchEvent()
  const unsubscribe = wagmiClient.subscribe(
    ({ provider, webSocketProvider }) => [provider, webSocketProvider],
    watchEvent,
  )

  return () => {
    contract?.off(eventName, callback)
    unsubscribe()
  }
}
