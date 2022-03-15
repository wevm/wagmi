import * as React from 'react'
import { useAccount } from 'wagmi'

import { Balance } from './Balance'
import { BlockNumber } from './BlockNumber'
import { SendTransaction } from './SendTransaction'

export const Account = () => {
  const { data: accountData, disconnect } = useAccount({ ens: true })

  if (!accountData) return <div>No account connected</div>

  return (
    <div>
      <div>
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>

      <div>
        {accountData.ens?.name ?? accountData?.address}
        {accountData.ens?.name ? ` (${accountData?.address})` : null}
      </div>

      {accountData?.ens?.avatar && (
        <img src={accountData.ens.avatar} style={{ height: 40, width: 40 }} />
      )}

      <Balance />
      <BlockNumber />
      <SendTransaction />
    </div>
  )
}
