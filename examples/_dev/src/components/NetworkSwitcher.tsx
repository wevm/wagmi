import * as React from 'react'
import { useNetwork } from 'wagmi'

export const NetworkSwitcher = () => {
  const network = useNetwork()

  return (
    <div>
      {network.activeChain && <div>Using {network.activeChain.name}</div>}

      {network.chains.map((x) => (
        <button
          disabled={!network.switchNetwork || x.id === network.activeChain?.id}
          key={x.id}
          onClick={() => network.switchNetwork?.(x.id)}
        >
          Switch to {x.name}
          {network.status === 'loading' &&
            x.id === network.pendingChainId &&
            '…'}
        </button>
      ))}

      <div>
        {network.error && (network.error?.message ?? 'Failed to switch')}
      </div>
    </div>
  )
}
