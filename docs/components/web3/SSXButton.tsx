import { SSX } from '@spruceid/ssx'
import { Button, IconEth, Stack, Text } from 'degen'
import * as React from 'react'

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

  React.useEffect(() => {
    setState((x) => ({
      ...x,
      ssx: new SSX({
        providers: {
          server: {
            host: '/ssx-api',
          },
        },
      }),
    }))
  }, [])

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
