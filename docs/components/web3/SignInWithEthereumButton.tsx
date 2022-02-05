import * as React from 'react'
import { Button, IconEth, Stack, Text } from 'degen'
import { SiweMessage } from 'siwe'
import { useSignMessage } from 'wagmi'

type Props = {
  address: string
  chainId: number
  onSuccess?(data: { address: string }): void
}

export const SignInWithEthereumButton = ({
  address,
  chainId,
  onSuccess,
}: Props) => {
  const [state, setState] = React.useState<{
    error?: Error
    loading?: boolean
  }>({})
  const [, signMessage] = useSignMessage()

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

      const signRes = await signMessage({ message: message.prepareMessage() })
      if (signRes.error) throw signRes.error

      const signature = signRes.data
      const verifyRes = await fetch('/api/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, signature }),
      })
      if (!verifyRes.ok) throw new Error('Error verifying message')

      setState((x) => ({ ...x, loading: false }))
      onSuccess && onSuccess({ address })
    } catch (error) {
      setState((x) => ({ ...x, error: error as Error, loading: false }))
    }
  }, [address, chainId, signMessage, onSuccess])

  return (
    <Stack space="4">
      <Button
        prefix={!state.loading && <IconEth />}
        width="full"
        loading={state.loading}
        disabled={state.loading}
        center
        onClick={handleSignIn}
      >
        {state.loading ? 'Check Wallet' : 'Sign-In with Ethereum'}
      </Button>

      {state.error && (
        <Text color="red">{state.error?.message ?? 'Failed to sign in'}</Text>
      )}
    </Stack>
  )
}
