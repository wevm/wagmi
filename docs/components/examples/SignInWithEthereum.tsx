import { Box, Button, Skeleton, Stack } from 'degen'
import * as React from 'react'
import { mainnet, useAccount, useNetwork } from 'wagmi'

import { formatAddress } from '../../lib/address'
import { PreviewWrapper } from '../core'
import { Account, SiweButton, WalletSelector } from '../web3'

export function SignInWithEthereum() {
  const [address, setAddress] = React.useState<string>()
  const accountData = useAccount()
  const { chain: activeChain } = useNetwork()

  React.useEffect(() => {
    const handler = async () => {
      try {
        const res = await fetch('/api/me')
        const json = await res.json()
        setAddress(json.address)
      } catch (error) {
        console.log({ error })
      }
    }
    handler()

    window.addEventListener('focus', handler)
    return () => window.removeEventListener('focus', handler)
  }, [])

  const signedInContent = address ? (
    <Stack direction="horizontal" align="center" justify="center">
      <Box fontSize="large">Signed in as {formatAddress(address)}</Box>
      <Button
        size="small"
        variant="tertiary"
        onClick={async () => {
          await fetch('/api/logout')
          setAddress(undefined)
        }}
      >
        Sign Out
      </Button>
    </Stack>
  ) : null

  if (accountData.isConnected)
    return (
      <PreviewWrapper>
        <Stack space="6">
          <Account />

          {address ? (
            signedInContent
          ) : (
            <Skeleton width="full" radius="2xLarge">
              <SiweButton
                address={accountData.address as string}
                chainId={activeChain?.id ?? mainnet.id}
                onSuccess={({ address }) => setAddress(address)}
              />
            </Skeleton>
          )}
        </Stack>
      </PreviewWrapper>
    )

  return (
    <PreviewWrapper>
      <Stack space="6">
        <WalletSelector />
        {signedInContent}
      </Stack>
    </PreviewWrapper>
  )
}
