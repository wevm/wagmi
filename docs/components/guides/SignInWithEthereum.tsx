import * as React from 'react'
import { Box, Button, Skeleton, Stack } from 'degen'
import { chain, useAccount, useNetwork } from 'wagmi'

import { PreviewWrapper } from '../core'
import { Account, SignInWithEthereumButton, WalletSelector } from '../web3'
import { formatAddress } from '../../lib/address'

export const SignInWithEthereum = () => {
  const [state, setState] = React.useState<{
    address?: string
    loading?: boolean
  }>({})
  const [{ data: accountData }] = useAccount()
  const [{ data: networkData }] = useNetwork()

  React.useEffect(() => {
    const handler = async () => {
      try {
        const res = await fetch('/api/me')
        const json = await res.json()
        setState((x) => ({ ...x, address: json.address }))
      } finally {
        setState((x) => ({ ...x, loading: false }))
      }
    }
    ;(async () => await handler())()

    window.addEventListener('focus', handler)
    return () => window.removeEventListener('focus', handler)
  }, [])

  const signedInContent = state.address ? (
    <Stack direction="horizontal" align="center" justify="center">
      <Box fontSize="large">Signed in as {formatAddress(state.address)}</Box>
      <Button
        size="small"
        variant="tertiary"
        onClick={async () => {
          await fetch('/api/logout')
          setState({})
        }}
      >
        Sign Out
      </Button>
    </Stack>
  ) : null

  if (accountData)
    return (
      <PreviewWrapper>
        <Stack space="6">
          <Account />

          {state.address ? (
            signedInContent
          ) : (
            <Skeleton loading={state.loading} width="full" radius="2xLarge">
              <SignInWithEthereumButton
                address={accountData.address}
                chainId={networkData.chain?.id ?? chain.mainnet.id}
                onSuccess={({ address }) =>
                  setState((x) => ({ ...x, address }))
                }
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
