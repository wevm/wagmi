import Modal from '@walletconnect/qrcode-modal'
import React from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'

import { useIsMounted } from '../hooks'
import { useWalletConnectV2 } from '../hooks/useWalletConnectV2'

export function Connect() {
  const isMounted = useIsMounted()
  const { connector, isConnected } = useAccount()
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect()
  const { disconnect } = useDisconnect()
  const { uri, setUri } = useWalletConnectV2()

  React.useEffect(() => {
    if (isConnected) {
      Modal.close()
      return
    }
    if (uri) {
      Modal.open(uri.replace('irn', 'iridium'), () => {
        console.log('EVENT: v2 modal closed')
      })
      setUri('')
    }
  }, [uri, isConnected, setUri])

  return (
    <div>
      <div>
        {isConnected && (
          <button onClick={() => disconnect()}>
            Disconnect from {connector?.name}
          </button>
        )}

        {connectors
          .filter((x) => isMounted && x.ready && x.id !== connector?.id)
          .map((x) => (
            <button key={x.id} onClick={() => connect({ connector: x })}>
              {x.name}
              {isLoading && x.id === pendingConnector?.id && ' (connecting)'}
            </button>
          ))}
      </div>

      {error && <div>{error.message}</div>}
    </div>
  )
}
