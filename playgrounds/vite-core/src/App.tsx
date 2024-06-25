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
import { useEffect, useReducer, useState } from 'react'

import { formatEther } from 'viem'
import { config } from './wagmi'

function App() {
  useEffect(() => {
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
  const [account, setAccount] = useState(getAccount(config))

  useEffect(() => {
    return watchAccount(config, {
      onChange(data) {
        setAccount(data)
      },
    })
  }, [])

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

function SwitchAccount() {
  const [, rerender] = useReducer((count) => count + 1, 0)

  useEffect(() => {
    return config.subscribe(
      ({ connections, current }) => ({ connections, current }),
      rerender,
    )
  }, [])

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
  const [account, setAccount] = useState(getAccount(config))

  useEffect(() => {
    return watchAccount(config, {
      onChange(data) {
        setAccount(data)
      },
    })
  }, [])

  /////////////////////////////////////////////////////////

  const [balance, setBalance] = useState<GetBalanceReturnType | undefined>()

  useEffect(() => {
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
  }, [account.address])

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
