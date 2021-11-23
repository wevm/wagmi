import * as React from 'react'

import { useConnect } from '../src'
import { useAccount } from '../src/hooks'

export const App = () => {
  const [{ connecting, connector, connectors, error }, connect] = useConnect()
  const account = useAccount()

  if (account)
    return (
      <>
        {account}
        <button onClick={() => console.log(account)}>Disconnect</button>
      </>
    )

  return (
    <div>
      {connectors.map((x) => (
        <button key={x.name} onClick={() => connect(x)}>
          {x.name}
          {connecting && x.name === connector?.name && '…'}
        </button>
      ))}
      {error && 'Failed to connect'}
    </div>
  )
}
