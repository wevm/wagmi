import * as React from 'react'
import { Box, Button, Text, Textarea } from 'degen'
import { verifyMessage } from 'ethers/lib/utils'
import { useAccount, useSignMessage } from 'wagmi'

import { PreviewWrapper } from '../core'
import { Account, WalletSelector } from '../web3'

export const SignMessage = () => {
  const previousMessage = React.useRef<string>()
  const [{ data: accountData }] = useAccount()
  const [message, setMessage] = React.useState('')
  const [{ data, error, loading }, signMessage] = useSignMessage()

  const recoveredAddress = React.useMemo(() => {
    if (!data || !previousMessage.current) return undefined
    return verifyMessage(previousMessage.current, data)
  }, [data, previousMessage])

  if (accountData)
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
            previousMessage.current = message
            signMessage({ message })
          }}
        >
          <Textarea
            label="Enter a message to sign"
            placeholder="The quick brown fox…"
            onChange={(event) => setMessage(event.target.value)}
          />
          <Button
            width="full"
            center
            disabled={loading || !message.length}
            loading={loading}
          >
            {loading ? 'Check Wallet' : 'Sign Message'}
          </Button>

          {data && (
            <Box>
              <Box>Recovered Address: {recoveredAddress}</Box>
              <Box style={{ wordBreak: 'break-all' }}>Signature: {data}</Box>
            </Box>
          )}
          {error && (
            <Text color="red">{error?.message ?? 'Error signing message'}</Text>
          )}
        </Box>
      </PreviewWrapper>
    )

  return (
    <PreviewWrapper>
      <WalletSelector />
    </PreviewWrapper>
  )
}
