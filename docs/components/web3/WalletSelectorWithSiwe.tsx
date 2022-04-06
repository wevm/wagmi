import * as React from 'react'
import { Button, Stack, Text } from 'degen'
import { Connector, useConnect } from 'wagmi'
import { SiweMessage } from 'siwe'

import { useIsMounted } from '../../hooks'

export function WalletSelectorWithSiwe() {
  const isMounted = useIsMounted()
  const [state, setState] = React.useState<{ loading?: boolean }>({})
  const { connectAsync, connectors, error, isConnecting, pendingConnector } =
    useConnect()
  const resolvedLoading = isConnecting || state.loading

  const handleConnect = React.useCallback(
    async (connector: Connector) => {
      try {
        setState((x) => ({ ...x, loading: true }))
        const res = await connectAsync(connector)

        const nonceRes = await fetch('/api/nonce')
        const message = new SiweMessage({
          domain: window.location.host,
          address: res.account,
          statement: 'Sign in with Ethereum to the app.',
          uri: window.location.origin,
          version: '1',
          chainId: res.chain?.id,
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
      } finally {
        setState((x) => ({ ...x, loading: false }))
      }
    },
    [connectAsync],
  )

  return (
    <Stack space="4">
      {connectors
        .filter((x) => x.ready)
        .map((x) => (
          <Button
            width="full"
            variant="tertiary"
            center
            loading={resolvedLoading && x.id === pendingConnector?.id}
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
