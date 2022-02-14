import * as React from 'react'
import { Button, Stack, Text } from 'degen'
import { Connector, ConnectorData, useConnect } from 'wagmi'

import { useIsMounted } from '../../hooks'

type Props = {
  onError?(error: Error): void
  onSuccess?(data: ConnectorData): void
}

export const WalletSelector = ({ onError, onSuccess }: Props) => {
  const isMounted = useIsMounted()
  const [
    {
      data: { connector, connectors },
      error,
      loading,
    },
    connect,
  ] = useConnect()

  const handleConnect = React.useCallback(
    async (connector: Connector) => {
      const { data, error } = await connect(connector)
      if (error) onError?.(error)
      if (data) onSuccess?.(data)
    },
    [connect, onError, onSuccess],
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
            loading={loading && x.name === connector?.name}
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
