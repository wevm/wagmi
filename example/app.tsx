import * as React from 'react'

import { useConnect } from '../src'
import { useAccount } from '../src/hooks'

export const App = () => {
  const [{ connecting, connector, connectors, error }, connect] = useConnect()
  const [account, disconnect] = useAccount()

  return (
    <div>
      {connectors.map((x) => (
        <button key={x.name} onClick={() => connect(x)}>
          {x.name}
          {connecting && x.name === connector?.name && '…'}
        </button>
      ))}
      {account}
      <button onClick={() => disconnect()}>Disconnect</button>
      {error && (error?.message ?? 'Failed to connect')}
    </div>
  )
}
