import * as React from 'react'

import { useConnect } from '../src'
import { useAccount } from '../src/hooks'

export const App = () => {
  const [{ connecting, connector, connectors, error }, connect] = useConnect()
  const [account, disconnect] = useAccount()

  return (
    <div>
      <div>
        {connectors.map((x) => (
          <button key={x.name} onClick={() => connect(x)}>
            {x.name}
            {connecting && x.name === connector?.name && '…'}
          </button>
        ))}
        {error && (error?.message ?? 'Failed to connect')}
      </div>

      {account && (
        <div>
          {account}
          <button onClick={() => disconnect()}>Disconnect</button>
        </div>
      )}
    </div>
  )
}
