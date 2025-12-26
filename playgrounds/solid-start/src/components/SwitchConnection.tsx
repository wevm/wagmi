import {
  useConnection,
  useConnections,
  useSwitchConnection,
} from '@wagmi/solid'
import { For } from 'solid-js'

export function SwitchConnection() {
  const connection = useConnection()
  const { mutate: switchConnection } = useSwitchConnection()
  const connections = useConnections()

  return (
    <div>
      <h2>Switch Connection</h2>

      <For each={connections()}>
        {(conn) => (
          <button
            disabled={connection().connector?.uid === conn.connector.uid}
            onClick={() => switchConnection({ connector: conn.connector })}
            type="button"
          >
            {conn.connector.name}
          </button>
        )}
      </For>
    </div>
  )
}
