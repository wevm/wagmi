import * as React from 'react'
import { useAccount } from 'wagmi'

import { useIsMounted } from '../hooks'

export const Account = () => {
  const isMounted = useIsMounted()
  const account = useAccount({ ens: true })

  return (
    <div>
      <div>
        {account.data?.ens?.name ?? account.data?.address}
        {account.data?.ens?.name ? ` (${account.data?.address})` : null}
      </div>

      {account.data?.ens?.avatar && (
        <img src={account.data.ens.avatar} style={{ height: 40, width: 40 }} />
      )}

      <div>
        {account.data?.address && (
          <button onClick={() => account.disconnect()}>Disconnect</button>
        )}
        {isMounted && account.data?.connector?.name && (
          <span>Connected to {account.data.connector.name}</span>
        )}
      </div>
    </div>
  )
}
