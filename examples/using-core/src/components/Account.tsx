import { disconnect, getAccount, watchAccount } from '@wagmi/core'
import * as React from 'react'

export const Account = () => {
  const [accountData, setAccountData] = React.useState(getAccount())
  React.useEffect(() => {
    const unwatch = watchAccount(setAccountData)
    return unwatch
  }, [])

  if (!accountData) return <div>No account connected</div>

  return (
    <div>
      <div>
        <button onClick={disconnect}>
          Disconnect from {accountData?.connector?.name}
        </button>
      </div>
      <div>{accountData?.address}</div>
      {/* <div>
        {accountData?.ens?.name ?? accountData?.address}
        {accountData?.ens ? ` (${accountData?.address})` : null}
      </div>
      {accountData?.ens?.avatar && (
        <img src={accountData.ens.avatar} style={{ height: 40, width: 40 }} />
      )} */}
    </div>
  )
}
