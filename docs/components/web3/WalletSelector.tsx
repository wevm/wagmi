import * as React from 'react'
import { Button, Stack, Text } from 'degen'
import { useConnect } from 'wagmi'

import { useIsMounted } from '../../hooks'

export const WalletSelector = () => {
  const isMounted = useIsMounted()
  const { connectors, isConnecting, connector, connect, error } = useConnect()

  return (
    <Stack space="4">
      {connectors
        .filter((x) => x.ready)
        .map((x) => (
          <Button
            width="full"
            variant="tertiary"
            center
            loading={isConnecting && x.name === connector?.name}
            disabled={isMounted ? !x.ready : false}
            key={x.id}
            onClick={() => connect(x)}
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
