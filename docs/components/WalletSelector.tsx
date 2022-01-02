import * as React from 'react'
import { Button, Stack, Text } from 'degen'
import { useConnect } from 'wagmi'

import { useIsMounted } from '../hooks'

export const WalletSelector = () => {
  const isMounted = useIsMounted()
  const [
    {
      data: { connector, connectors },
      error,
      loading,
    },
    connect,
  ] = useConnect()

  return (
    <Stack space="4">
      {connectors.map((x) => (
        <Button
          width="full"
          variant="tertiary"
          center
          loading={loading && x.name === connector?.name}
          disabled={isMounted ? !x.ready : false}
          key={x.id}
          onClick={() => connect(x)}
        >
          {isMounted ? x.name : x.id === 'injected' ? x.id : x.name}
          {isMounted ? !x.ready && ' (unsupported)' : ''}
        </Button>
      ))}

      {error && (
        <Text color="red">{error?.message ?? 'Failed to connect'}</Text>
      )}
    </Stack>
  )
}
