import * as React from 'react'
import { useNetwork } from 'wagmi'

export const NetworkSwitcher = () => {
  const { chains, switchNetwork } = useNetwork()

  return (
    <div>
      {switchNetwork &&
        chains.map((x) => (
          <button key={x.id} onClick={() => switchNetwork(x.id)}>
            Switch to {x.name}
          </button>
        ))}
    </div>
  )
}
