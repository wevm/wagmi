import {
  connect,
  disconnect,
  type GetBalanceReturnType,
  type GetBlockNumberReturnType,
  getBalance,
  getBlockNumber,
  getConnection,
  reconnect,
  switchConnection,
  watchBlockNumber,
  watchConnection,
} from '@wagmi/core'
import { useEffect, useReducer, useState } from 'react'

import { formatEther } from 'viem'
import { config } from './wagmi'

function App() {
  useEffect(() => {
    reconnect(config)
  }, [])

  return (
    <>
      <Connection />
      <Connect />
      <SwitchConnection />
      <Balance />
      <BlockNumber />
    </>
  )
}

function Connection() {
  const [connection, setConnection] = useState(getConnection(config))

  useEffect(() => {
    return watchConnection(config, {
      onChange(data) {
        setConnection(data)
      },
    })
  }, [])

  return (
    <div>
      <h2>Connection</h2>

      <div>
        address: {connection.address}
        <br />
        chainId: {connection.chainId}
        <br />
        status: {connection.status}
      </div>

      {connection.status === 'connected' && (
        <button type="button" onClick={() => disconnect(config)}>
          Disconnect
        </button>
      )}
    </div>
  )
}

function Connect() {
  const [, rerender] = useReducer((count) => count + 1, 0)

  useEffect(() => {
    return config.subscribe(({ connections }) => connections, rerender)
  }, [])

  return (
    <div>
      <h2>Connect</h2>

      {config.connectors.map((connector) => (
        <button
          disabled={config.state.connections.has(connector.uid)}
          id={connector.uid}
          key={connector.uid}
          onClick={async () => await connect(config, { connector })}
          type="button"
        >
          {connector.name}
        </button>
      ))}
    </div>
  )
}

function SwitchConnection() {
  const [, rerender] = useReducer((count) => count + 1, 0)

  useEffect(() => {
    return config.subscribe(
      ({ connections, current }) => ({ connections, current }),
      rerender,
    )
  }, [])

  return (
    <div>
      <h2>Switch Connection</h2>

      {config.connectors
        .filter((connector) => config.state.connections.has(connector.uid))
        .map((connector) => (
          <button
            disabled={config.state.current === connector.uid}
            id={connector.uid}
            key={connector.uid}
            onClick={async () => await switchConnection(config, { connector })}
            type="button"
          >
            {connector.name}
          </button>
        ))}
    </div>
  )
}

function Balance() {
  const [connection, setConnection] = useState(getConnection(config))

  useEffect(() => {
    return watchConnection(config, {
      onChange(data) {
        setConnection(data)
      },
    })
  }, [])

  /////////////////////////////////////////////////////////

  const [balance, setBalance] = useState<GetBalanceReturnType | undefined>()

  useEffect(() => {
    if (!connection.address) return
    return watchBlockNumber(config, {
      async onBlockNumber() {
        try {
          const balance = await getBalance(config, {
            address: connection.address!,
          })
          setBalance(balance)
        } catch (error) {
          // biome-ignore lint/suspicious/noConsole: logging
          console.error('Error fetching balance', error)
        }
      },
    })
  }, [connection.address])

  return (
    <div>
      <h2>Balance</h2>

      <div>Balance: {!!balance?.value && formatEther(balance.value)}</div>
    </div>
  )
}

function BlockNumber() {
  const [blockNumber, setBlockNumber] = useState<
    GetBlockNumberReturnType | undefined
  >()

  useEffect(() => {
    ;(async () => {
      setBlockNumber(await getBlockNumber(config))

      watchBlockNumber(config, { onBlockNumber: setBlockNumber })
    })()
  }, [])

  return (
    <div>
      <h2>Block Number</h2>

      <div>Block Number (Default Chain): {blockNumber?.toString()}</div>
    </div>
  )
}

export default App
