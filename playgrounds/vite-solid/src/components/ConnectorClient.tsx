import { useConnectorClient } from '@wagmi/solid'

export function ConnectorClient() {
  const connectorClient = useConnectorClient()
  return (
    <div>
      <h2>Connector Client</h2>
      client {connectorClient.data?.account?.address}{' '}
      {connectorClient.data?.chain?.id}
      {connectorClient.error?.message}
    </div>
  )
}
