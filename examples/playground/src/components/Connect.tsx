import * as React from 'react'
import { useConnect } from 'wagmi'

import { useIsMounted } from '../hooks'

export const Connect = () => {
  const isMounted = useIsMounted()
  const connect = useConnect()

  return (
    <div>
      <div>
        {connect.connectors.map((x) => (
          <button
            disabled={
              isMounted && (!x.ready || connect.activeConnector?.id === x.id)
            }
            key={x.name}
            onClick={() => connect.connect(x)}
          >
            {x.id === 'injected' ? (isMounted ? x.name : x.id) : x.name}
            {isMounted && !x.ready && ' (unsupported)'}
            {connect.status === 'connecting' &&
              x.id === connect.connector?.id &&
              '…'}
          </button>
        ))}
      </div>

      <div>
        {connect.error && (connect.error?.message ?? 'Failed to connect')}
      </div>
    </div>
  )
}
