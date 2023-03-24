import { SSX } from '@spruceid/ssx'
import { Button, IconEth, Stack, Text } from 'degen'
import * as React from 'react'
import { useSigner } from 'wagmi'

type Props = {
  address: string
  chainId: number
  onSuccess?(data: { address: string }): void
}

export function SSXButton({ onSuccess }: Props) {
  const [state, setState] = React.useState<{
    error?: Error
    loading?: boolean
    nonce?: string
    ssx?: SSX
  }>({})

  const { data: signer } = useSigner()

  React.useEffect(() => {
    setState((x) => ({
      ...x,
      ssx: new SSX({
        providers: {
          web3: {
            driver: signer?.provider,
          },
          server: {
            host: '/api',
          },
        },
      }),
    }))
  }, [signer])

  const handleSignIn = React.useCallback(async () => {
    try {
      setState((x) => ({ ...x, error: undefined, loading: true }))
      if (state.ssx) {
        const { address } = await state.ssx.signIn()
        setState((x) => ({ ...x, loading: false }))
        onSuccess?.({ address })
      } else {
        throw new Error('SSX is not initialized.')
      }
    } catch (error) {
      setState((x) => ({ ...x, error: error as Error, loading: false }))
    }
  }, [state.ssx, onSuccess])

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
        {state.loading ? 'Check Wallet' : 'Sign-In with SSX'}
      </Button>

      {state.error && <Text color="red">{state.error.message}</Text>}
    </Stack>
  )
}
