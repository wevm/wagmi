import * as React from 'react'
import { useAccount } from 'wagmi'

import { Balance } from './Balance'
import { BlockNumber } from './BlockNumber'
import { NetworkSwitcher } from './NetworkSwitcher'
import { ReadContract } from './ReadContract'
import { SendTransaction } from './SendTransaction'

export const Account = () => {
  const { data: accountData, disconnect } = useAccount({ ens: true })

  if (!accountData) return <div>No account connected</div>

  return (
    <div>
      <div>
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>

      <h4>Account Data</h4>
      <div>
        {accountData.ens?.name ?? accountData?.address}
        {accountData.ens?.name ? ` (${accountData?.address})` : null}
      </div>

      {accountData?.ens?.avatar && (
        <img src={accountData.ens.avatar} style={{ height: 40, width: 40 }} />
      )}

      <h4>Balance</h4>
      <Balance />

      <h4>Block Number</h4>
      <BlockNumber />

      <h4>Send Transaction</h4>
      <SendTransaction />

      <h4>Read Contract</h4>
      <ReadContract />

      <h4>Switch Network</h4>
      <NetworkSwitcher />
    </div>
  )
}
