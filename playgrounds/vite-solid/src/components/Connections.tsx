import { useConnections } from '@wagmi/solid'
import { stringify } from 'viem'

export function Connections() {
  const connections = useConnections(() => ({}))

  return (
    <div>
      <h2>Connections</h2>

      {connections().map((connection) => (
        <div>
          <div>connector {connection.connector.name}</div>
          <div>accounts: {stringify(connection.accounts)}</div>
          <div>chainId: {connection.chainId}</div>
        </div>
      ))}
    </div>
  )
}
