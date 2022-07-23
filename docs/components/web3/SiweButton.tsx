import { Button, IconEth, Stack, Text } from 'degen'
import * as React from 'react'
import { SiweMessage } from 'siwe'
import { useSignMessage } from 'wagmi'

type Props = {
  address: string
  chainId: number
  onSuccess?(data: { address: string }): void
}

export function SiweButton({ address, chainId, onSuccess }: Props) {
  const { signMessageAsync } = useSignMessage()
  const [state, setState] = React.useState<{
    error?: Error
    loading?: boolean
    nonce?: string
  }>({})

  React.useEffect(() => {
    async function fetchNonce() {
      try {
        const nonceRes = await fetch('/api/nonce')
        const nonce = await nonceRes.text()
        setState((x) => ({ ...x, nonce }))
      } catch (error) {
        setState((x) => ({ ...x, error: error as Error }))
      }
    }

    fetchNonce()
  }, [])

  const handleSignIn = React.useCallback(async () => {
    try {
      setState((x) => ({ ...x, error: undefined, loading: true }))
      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: 'Sign in with Ethereum to the app.',
        uri: window.location.origin,
        version: '1',
        chainId,
        nonce: state.nonce,
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
  }, [address, chainId, state.nonce, signMessageAsync, onSuccess])

  return (
    <Stack space="4">
      <Button
        center
        disabled={!state.nonce || state.loading}
        loading={!state.nonce || state.loading}
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
