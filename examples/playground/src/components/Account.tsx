import * as React from 'react'
import { useAccount } from 'wagmi'

import { useIsMounted } from '../hooks'
import { Balance } from './Balance'
import { BlockNumber } from './BlockNumber'
import { ReadContract } from './ReadContract'
import { SendTransaction } from './SendTransaction'
import { SignMessage } from './SignMessage'

export const Account = () => {
  const isMounted = useIsMounted()
  const account = useAccount({ ens: { name: true } })

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

      <h4>Balance</h4>
      <Balance />

      <h4>Block Number</h4>
      <BlockNumber />

      <h4>Send Transaction</h4>
      <SendTransaction />

      <h4>Read Contract</h4>
      <ReadContract />

      <h4>Sign Message</h4>
      <SignMessage />
    </div>
  )
}
