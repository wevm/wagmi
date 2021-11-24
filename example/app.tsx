import * as React from 'react'

import { useConnect } from '../src'
import { useAccount, useNetwork } from '../src/hooks'

export const App = () => {
  const [{ connecting, connector, connectors, error }, connect] = useConnect()
  const [account, disconnect] = useAccount()
  const [network, switchNetwork] = useNetwork()

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
        <>
          <div>
            {account}
            <button onClick={() => disconnect()}>Disconnect</button>
          </div>
          <div>
            {network}
            <button onClick={() => switchNetwork('0x4')}>Switch Network</button>
          </div>
        </>
      )}
    </div>
  )
}
