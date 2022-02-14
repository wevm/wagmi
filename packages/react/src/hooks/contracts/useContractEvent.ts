import * as React from 'react'
import { ethers } from 'ethers'

import { useProvider, useWebSocketProvider } from '../providers'
import { Config as UseContractConfig, useContract } from './useContract'

type Config = {
  /** Receive only a single event */
  once?: boolean
}

export const useContractEvent = <
  Contract extends ethers.Contract = ethers.Contract,
>(
  /** Contract configuration */
  contractConfig: UseContractConfig,
  /** Event name to listen to */
  eventName: Parameters<Contract['on']>[0],
  /** Callback function when event is called */
  listener: Parameters<Contract['on']>[1],
  { once }: Config = {},
) => {
  const provider = useProvider()
  const webSocketProvider = useWebSocketProvider()
  const contract = useContract<Contract>({
    signerOrProvider: webSocketProvider ?? provider,
    ...contractConfig,
  })
  const listenerRef = React.useRef(listener)
  listenerRef.current = listener

  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    const handler = (...event: Array<Parameters<Contract['on']>[1]>) =>
      listenerRef.current(event)

    const contract_ = <ethers.Contract>(<unknown>contract)
    if (once) contract_.once(eventName, handler)
    else contract_.on(eventName, handler)

    return () => {
      contract_.off(eventName, handler)
    }
  }, [contract, eventName])
  /* eslint-enable react-hooks/exhaustive-deps */
}
