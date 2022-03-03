import {
  disconnect,
  fetchEnsAvatar,
  fetchEnsName,
  getAccount,
  watchAccount,
  watchEnsAvatar,
  watchEnsName,
} from '@wagmi/core'
import * as React from 'react'

import BlockNumber from './BlockNumber'
import FeeData from './FeeData'

export const Account = () => {
  const [accountData, setAccountData] = React.useState(getAccount())
  React.useEffect(() => {
    const unwatch = watchAccount(setAccountData)
    return unwatch
  }, [])

  const [ensName, setEnsName] = React.useState<string | null>('')
  React.useEffect(() => {
    ;(async () => {
      if (accountData.address) {
        const ensName = await fetchEnsName({ address: accountData.address })
        setEnsName(ensName)
      }
    })()

    if (accountData.address) {
      const unwatch = watchEnsName({ address: accountData.address }, setEnsName)
      return unwatch
    }
  }, [accountData.address])

  const [ensAvatar, setEnsAvatar] = React.useState<string | null>('')
  React.useEffect(() => {
    ;(async () => {
      if (ensName) {
        const ensAvatar = await fetchEnsAvatar({
          addressOrName: ensName,
        })
        setEnsAvatar(ensAvatar)
      }
    })()

    if (ensName) {
      const unwatch = watchEnsAvatar(
        {
          addressOrName: ensName,
        },
        setEnsAvatar,
      )
      return unwatch
    }
  }, [ensName])

  if (!accountData) return <div>No account connected</div>

  return (
    <div>
      <div>
        <button onClick={disconnect}>
          Disconnect from {accountData?.connector?.name}
        </button>
      </div>
      <div>{accountData?.address}</div>
      <div>
        {ensName ?? accountData?.address}
        {ensName ? ` (${accountData?.address})` : null}
      </div>
      {ensAvatar && <img src={ensAvatar} style={{ height: 40, width: 40 }} />}
      <BlockNumber />
      <FeeData />
    </div>
  )
}
