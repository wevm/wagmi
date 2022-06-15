import * as React from 'react'
import { useAccount } from 'wagmi'

import { PreviewWrapper } from '../core'
import { Account, WalletSelector } from '../web3'

export function ConnectWallet() {
  const { address } = useAccount()

  if (address)
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
