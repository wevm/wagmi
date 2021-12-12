import * as React from 'react'

import { useAccount, useBlockNumber, useConnect, useNetwork } from '../src'

export const App = () => {
  const [{ connector, connectors, error, loading }, connect] = useConnect()
  const [
    { address, connector: activeConnector, data: accountData },
    disconnect,
  ] = useAccount()
  const [
    { chainId, data: networkData, error: switchNetworkError, chains },
    switchNetwork,
  ] = useNetwork()
  const [{ blockNumber, loading: blockNumberLoading }] = useBlockNumber({
    subscribe: true,
  })

  return (
    <div>
      <div>Block #{blockNumberLoading ? '…' : blockNumber}</div>

      <br />

      <div>
        {connectors.map((x) =>
          x.name === activeConnector?.name ? (
            <span key={x.name}>{x.name}</span>
          ) : (
            <button key={x.name} onClick={() => connect(x)}>
              {x.name}
              {loading && x.name === connector?.name && '…'}
            </button>
          ),
        )}

        {error && (error?.message ?? 'Failed to connect')}
      </div>

      <hr />

      {address && (
        <>
          <div>
            <span>{accountData?.ens ?? address}</span>
            {accountData?.avatar && (
              <img
                src={accountData?.avatar}
                style={{ height: 20, width: 20 }}
              />
            )}
            <button onClick={() => disconnect()}>Disconnect</button>
          </div>

          <br />

          <div>
            <span>
              {networkData?.name ?? chainId}{' '}
              {networkData?.unsupported && '(unsupported)'}
            </span>
            {switchNetwork &&
              chains.map((x) =>
                x.id === chainId ? null : (
                  <button key={x.id} onClick={() => switchNetwork(x.id)}>
                    Switch to {x.name}
                  </button>
                ),
              )}

            {switchNetworkError && switchNetworkError?.message}
          </div>
        </>
      )}
    </div>
  )
}
