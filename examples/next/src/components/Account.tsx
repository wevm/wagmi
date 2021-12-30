import * as React from 'react'
import { useAccount } from 'wagmi'

export const Account = () => {
  const [{ data: accountData }, disconnect] = useAccount({
    fetchBalance: true,
    fetchEns: true,
  })

  if (!accountData) return <div>No account connected</div>

  return (
    <>
      <div>
        <button onClick={() => disconnect()}>
          Disconnect from {accountData?.connector?.name}
        </button>
      </div>

      <div>
        {accountData?.ens?.name ?? accountData?.address}
        {accountData?.ens ? ` (${accountData?.address})` : null}
      </div>
      <div>
        {accountData?.balance?.formatted} {accountData?.balance?.symbol}{' '}
      </div>

      {accountData?.ens?.avatar ? (
        <img src={accountData.ens.avatar} style={{ height: 40, width: 40 }} />
      ) : (
        <div style={{ height: 40, width: 40 }} />
      )}
    </>
  )
}
