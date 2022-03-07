import * as React from 'react'
import { Button, Stack, Text } from 'degen'
import { Connector, ConnectorData, useConnect } from 'wagmi'
import { SiweMessage } from 'siwe'

import { useIsMounted } from '../../hooks'

type Props = {
  onError?(error: Error): void
  onSuccess?(data: ConnectorData): void
}

export const WalletSelectorWithSiwe = ({ onError, onSuccess }: Props) => {
  const isMounted = useIsMounted()
  const [state, setState] = React.useState<{ loading?: boolean }>({})
  const [
    {
      data: { connector, connectors },
      error,
      loading,
    },
    connect,
  ] = useConnect()
  const resolvedLoading = loading || state.loading

  const handleConnect = React.useCallback(
    async (connector: Connector) => {
      try {
        setState((x) => ({ ...x, loading: true }))
        const res = await connect(connector)
        if (!res.data) throw res.error ?? new Error('Something went wrong')

        const nonceRes = await fetch('/api/nonce')
        const message = new SiweMessage({
          domain: window.location.host,
          address: res.data.account,
          statement: 'Sign in with Ethereum to the app.',
          uri: window.location.origin,
          version: '1',
          chainId: res.data.chain?.id,
          nonce: await nonceRes.text(),
        })

        const signer = await connector.getSigner()
        const signature = await signer.signMessage(message.prepareMessage())

        const verifyRes = await fetch('/api/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message, signature }),
        })
        if (!verifyRes.ok) throw new Error('Error verifying message')

        onSuccess?.(res.data)
      } catch (error) {
        onError?.(error as Error)
      } finally {
        setState((x) => ({ ...x, loading: false }))
      }
    },
    [connect, onError, onSuccess],
  )

  return (
    <Stack space="4">
      {connectors.map((x) => (
        <Button
          width="full"
          variant="tertiary"
          center
          loading={resolvedLoading && x.name === connector?.name}
          disabled={isMounted ? !x.ready : false}
          key={x.id}
          onClick={() => handleConnect(x)}
        >
          {isMounted ? x.name : x.id === 'injected' ? x.id : x.name}
        </Button>
      ))}

      {error && (
        <Text color="red">{error?.message ?? 'Failed to connect'}</Text>
      )}
    </Stack>
  )
}
