import * as React from 'react'
import { Button, Stack, Text } from 'degen'
import { useConnect } from 'wagmi'

import { useIsMounted } from '../../hooks'

export function WalletSelector() {
  const isMounted = useIsMounted()
  const { connectors, isConnecting, connect, error, pendingConnector } =
    useConnect()

  return (
    <Stack space="4">
      {connectors
        .filter((x) => isMounted && x.ready)
        .map((x) => (
          <Button
            width="full"
            variant="tertiary"
            center
            loading={isConnecting && x.id === pendingConnector?.id}
            disabled={isMounted ? !x.ready : false}
            key={x.id}
            onClick={() => connect(x)}
          >
            {x.name}
          </Button>
        ))}

      {error && <Text color="red">{error.message}</Text>}
    </Stack>
  )
}
