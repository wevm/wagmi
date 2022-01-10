import * as React from 'react'
import { useAccount } from 'wagmi'

export const Account = () => {
  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true,
  })

  if (!accountData) return <div>No account connected</div>

  return (
    <div>
      <div>
        <button onClick={() => disconnect()}>
          Disconnect from {accountData?.connector?.name}
        </button>
      </div>

      <div>
        {accountData?.ens?.name ?? accountData?.address}
        {accountData?.ens ? ` (${accountData?.address})` : null}
      </div>

      {accountData?.ens?.avatar && (
        <img src={accountData.ens.avatar} style={{ height: 40, width: 40 }} />
      )}
    </div>
  )
}
