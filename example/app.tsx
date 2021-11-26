import * as React from 'react'

import { useAccount, useConnect, useNetwork } from '../src'

export const App = () => {
  const [{ connecting, connector, connectors, error }, connect] = useConnect()
  const [account, disconnect] = useAccount()
  const [{ chainId, data, chains }, switchNetwork] = useNetwork()

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
            {data?.name ?? chainId}
            {chains.map((x) =>
              x.id === chainId ? null : (
                <button key={x.id} onClick={() => switchNetwork(x.id)}>
                  Switch to {x.name}
                </button>
              ),
            )}
          </div>
        </>
      )}
    </div>
  )
}
