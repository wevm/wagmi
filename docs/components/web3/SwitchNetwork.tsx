import { Button } from 'degen'
import * as React from 'react'
import { chain, useNetwork, useSwitchNetwork } from 'wagmi'

export function SwitchNetwork() {
  const { chain: activeChain } = useNetwork()
  const { switchNetwork } = useSwitchNetwork()

  if (!activeChain) return null
  return (
    <Button
      onClick={() =>
        activeChain.id === chain.mainnet.id
          ? switchNetwork?.(chain.goerli.id)
          : switchNetwork?.(chain.mainnet.id)
      }
      variant="transparent"
      size="small"
      width="full"
    >
      Connect to{' '}
      {activeChain?.id === chain.mainnet.id ? 'Testnet (Goerli)' : 'Mainnet'}
    </Button>
  )
}
