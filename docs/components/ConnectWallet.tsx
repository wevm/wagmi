import * as React from 'react'
import { useAccount } from 'wagmi'

import { PreviewWrapper } from './PreviewWrapper'
import { Account } from './Account'
import { WalletSelector } from './WalletSelector'

export const ConnectWallet = () => {
  const [{ data }] = useAccount()

  if (data)
    return (
      <PreviewWrapper>
        <Account />
      </PreviewWrapper>
    )

  return (
    <PreviewWrapper>
      <WalletSelector />
    </PreviewWrapper>
  )
}
