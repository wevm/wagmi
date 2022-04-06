import * as React from 'react'
import { Button, IconEth, Stack, Text } from 'degen'
import { SiweMessage } from 'siwe'
import { useSignMessage } from 'wagmi'

type Props = {
  address: string
  chainId: number
  onSuccess?(data: { address: string }): void
}

export function SiweButton({ address, chainId, onSuccess }: Props) {
  const [state, setState] = React.useState<{
    error?: Error
    loading?: boolean
  }>({})
  const { signMessageAsync } = useSignMessage()

  const handleSignIn = React.useCallback(async () => {
    try {
      setState((x) => ({ ...x, error: undefined, loading: true }))
      const nonceRes = await fetch('/api/nonce')
      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: 'Sign in with Ethereum to the app.',
        uri: window.location.origin,
        version: '1',
        chainId,
        nonce: await nonceRes.text(),
      })

      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      })
      const verifyRes = await fetch('/api/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, signature }),
      })
      if (!verifyRes.ok) throw new Error('Error verifying message')

      setState((x) => ({ ...x, loading: false }))
      onSuccess?.({ address })
    } catch (error) {
      setState((x) => ({ ...x, error: error as Error, loading: false }))
    }
  }, [address, chainId, signMessageAsync, onSuccess])

  return (
    <Stack space="4">
      <Button
        center
        disabled={state.loading}
        loading={state.loading}
        prefix={!state.loading && <IconEth />}
        width="full"
        onClick={handleSignIn}
      >
        {state.loading ? 'Check Wallet' : 'Sign-In with Ethereum'}
      </Button>

      {state.error && <Text color="red">{state.error.message}</Text>}
    </Stack>
  )
}
