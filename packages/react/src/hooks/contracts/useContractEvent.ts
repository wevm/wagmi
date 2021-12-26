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
  type: Parameters<Contract['on']>[0],
  listener: Parameters<Contract['on']>[1],
  { watch }: Config = {},
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
    if (!watch) _contract.once(type, handler)
    else _contract.on(type, handler)
    return () => {
      _contract.off(type, handler)
      return
    }
  }, [contract, type])
  /* eslint-enable react-hooks/exhaustive-deps */
}
