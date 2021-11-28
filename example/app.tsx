import * as React from 'react'

import { useAccount, useConnect, useNetwork } from '../src'

export const App = () => {
  const [{ connectors, error, loading }, connect] = useConnect()
  const [{ address, connector: activeConnector }, disconnect] = useAccount()
  const [{ chainId, data, chains }, switchNetwork] = useNetwork()

  return (
    <div>
      <div>
        {connectors.map((x) =>
          x.name === activeConnector?.name ? (
            <span key={x.name}>
              {x.name}
              {loading && '…'}
            </span>
          ) : (
            <button key={x.name} onClick={() => connect(x)}>
              {x.name}
            </button>
          ),
        )}

        {error && (error?.message ?? 'Failed to connect')}
      </div>

      <hr />

      {address && (
        <>
          <div>
            {address}
            <button onClick={() => disconnect()}>Disconnect</button>
          </div>

          <br />

          <div>
            <span>{data?.name ?? chainId}</span>
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
