import * as React from 'react'
import { useAccount, useConnect } from 'wagmi'

import { useIsMounted } from '../hooks'

export const Connect = () => {
  const isMounted = useIsMounted()
  const { connector, isReconnecting } = useAccount()
  const { connect, connectors, isLoading, error, pendingConnector } =
    useConnect()
  const [ensureSupportedChain, setEnsureSupportedChain] = React.useState(false)

  return (
    <div>
      <label style={{ display: 'flex', marginBottom: 4 }}>
        <input
          type="checkbox"
          checked={ensureSupportedChain}
          onChange={(e) => setEnsureSupportedChain(e.currentTarget.checked)}
        />
        Switch to supported chain on connect
      </label>
      <div>
        {connectors.map((x) => (
          <button
            disabled={!x.ready || isReconnecting || connector?.id === x.id}
            key={x.name}
            onClick={() =>
              connect({
                connector: x,
                chainId: ensureSupportedChain
                  ? ({ walletChainId, chains }) =>
                      chains.find((chain) => chain.id === walletChainId)?.id ??
                      chains[0]?.id
                  : undefined,
              })
            }
          >
            {x.id === 'injected' ? (isMounted ? x.name : x.id) : x.name}
            {isMounted && !x.ready && ' (unsupported)'}
            {isLoading && x.id === pendingConnector?.id && '…'}
          </button>
        ))}
      </div>

      <div>{error && error.message}</div>
    </div>
  )
}
