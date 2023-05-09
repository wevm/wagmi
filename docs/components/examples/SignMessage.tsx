import { Box, Button, Text, Textarea } from 'degen'
import * as React from 'react'
import { recoverMessageAddress } from 'viem'
import type { Address } from 'wagmi'
import { useAccount, useSignMessage } from 'wagmi'

import { PreviewWrapper } from '../core'
import { Account, WalletSelector } from '../web3'

export function SignMessage() {
  const [recoveredAddress, setRecoveredAddress] = React.useState<Address>()

  const { isConnected } = useAccount()
  const {
    data: signMessageData,
    variables,
    error,
    isLoading,
    signMessage,
  } = useSignMessage()

  React.useEffect(() => {
    ;(async () => {
      if (variables?.message && signMessageData) {
        const recoveredAddress = await recoverMessageAddress({
          message: variables?.message,
          signature: signMessageData,
        })
        setRecoveredAddress(recoveredAddress)
      }
    })()
  }, [signMessageData, variables?.message])

  if (isConnected)
    return (
      <PreviewWrapper>
        <Account />
        <Box
          as="form"
          display="flex"
          flexDirection="column"
          gap="4"
          marginTop="8"
          onSubmit={(event) => {
            event.preventDefault()
            const formData = new FormData(event.target as HTMLFormElement)
            const message = formData.get('message') as string
            signMessage({ message })
          }}
        >
          <Textarea
            name="message"
            label="Enter a message to sign"
            placeholder="The quick brown fox…"
            required
          />

          <Button width="full" center disabled={isLoading} loading={isLoading}>
            {isLoading ? 'Check Wallet' : 'Sign Message'}
          </Button>

          {signMessageData && (
            <Box color="textSecondary">
              <Box>Recovered Address: {recoveredAddress}</Box>
              <Box style={{ wordBreak: 'break-all' }}>
                Signature: {signMessageData}
              </Box>
            </Box>
          )}

          {error && <Text color="red">{error.message}</Text>}
        </Box>
      </PreviewWrapper>
    )

  return (
    <PreviewWrapper>
      <WalletSelector />
    </PreviewWrapper>
  )
}
