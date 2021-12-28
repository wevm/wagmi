import * as React from 'react'
import { ethers } from 'ethers'

import { useProvider, useWebSocketProvider } from '../providers'
import { Config as UseContractConfig, useContract } from './useContract'

type Config = {
  watch?: boolean
}

export const useContractEvent = <
  Contract extends ethers.Contract = ethers.Contract,
>(
  contractConfig: UseContractConfig,
  eventName: Parameters<Contract['on']>[0],
  listener: Parameters<Contract['on']>[1],
  { watch }: Config = { watch: true },
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
    const handler = (
      ...event: Array<
        Contract extends ethers.Contract ? Parameters<Contract['on']>[1] : any
      >
    ) => listenerRef.current(event)

    const _contract = <ethers.Contract>(<unknown>ethers.Contract)
    if (!watch) _contract.once(eventName, handler)
    else _contract.on(eventName, handler)
    return () => {
      _contract.off(eventName, handler)
      return
    }
  }, [contract, eventName])
  /* eslint-enable react-hooks/exhaustive-deps */
}
