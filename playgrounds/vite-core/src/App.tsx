import {
  type GetBalanceReturnType,
  type GetBlockNumberReturnType,
  connect,
  disconnect,
  getAccount,
  getBalance,
  getBlockNumber,
  reconnect,
  switchAccount,
  watchAccount,
  watchBlockNumber,
} from '@wagmi/core'
import * as React from 'react'

import { config } from './wagmi'

function App() {
  React.useEffect(() => {
    reconnect(config)
  }, [])

  return (
    <>
      <Account />
      <Connect />
      <SwitchAccount />
      <Balance />
      <BlockNumber />
    </>
  )
}

function Account() {
  const [account, setAccount] = React.useState(getAccount(config))

  React.useEffect(() => {
    return watchAccount(config, {
      onChange(data) {
        setAccount(data)
      },
    })
  }, [setAccount])

  return (
    <div>
      <h2>Account</h2>

      <div>
        account: {account.address}
        <br />
        chainId: {account.chainId}
        <br />
        status: {account.status}
      </div>

      {account.status === 'connected' && (
        <button type="button" onClick={() => disconnect(config)}>
          Disconnect
        </button>
      )}
    </div>
  )
}

function Connect() {
  const [, rerender] = React.useReducer((count) => count + 1, 0)

  React.useEffect(() => {
    return config.subscribe(({ connections }) => connections, rerender)
  }, [rerender])

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

function SwitchAccount() {
  const [, rerender] = React.useReducer((count) => count + 1, 0)

  React.useEffect(() => {
    return config.subscribe(
      ({ connections, current }) => ({ connections, current }),
      rerender,
    )
  }, [rerender])

  return (
    <div>
      <h2>SwitchAccount</h2>

      {config.connectors
        .filter((connector) => config.state.connections.has(connector.uid))
        .map((connector) => (
          <button
            disabled={config.state.current === connector.uid}
            id={connector.uid}
            key={connector.uid}
            onClick={async () => await switchAccount(config, { connector })}
            type="button"
          >
            {connector.name}
          </button>
        ))}
    </div>
  )
}

function Balance() {
  const [account, setAccount] = React.useState(getAccount(config))

  React.useEffect(() => {
    return watchAccount(config, {
      onChange(data) {
        setAccount(data)
      },
    })
  }, [setAccount])

  /////////////////////////////////////////////////////////

  const [balance, setBalance] = React.useState<
    GetBalanceReturnType | undefined
  >()

  React.useEffect(() => {
    if (!account.address) return
    return watchBlockNumber(config, {
      async onBlockNumber() {
        try {
          const balance = await getBalance(config, {
            address: account.address!,
          })
          setBalance(balance)
        } catch (error) {
          console.error('Error fetching balance', error)
        }
      },
    })
  }, [account.address, setBalance])

  return (
    <div>
      <h2>Balance</h2>

      <div>Balance: {balance?.formatted}</div>
    </div>
  )
}

function BlockNumber() {
  const [blockNumber, setBlockNumber] = React.useState<
    GetBlockNumberReturnType | undefined
  >()

  React.useEffect(() => {
    ;(async () => {
      setBlockNumber(await getBlockNumber(config))

      watchBlockNumber(config, { onBlockNumber: setBlockNumber })
    })()
  }, [setBlockNumber])

  return (
    <div>
      <h2>Block Number</h2>

      <div>Block Number (Default Chain): {blockNumber?.toString()}</div>
    </div>
  )
}

export default App
