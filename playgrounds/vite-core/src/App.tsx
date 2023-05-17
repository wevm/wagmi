import {
  type GetBlockNumberReturnType,
  connect,
  disconnect,
  getAccount,
  getBlockNumber,
  watchAccount,
  watchBlockNumber,
} from '@wagmi/core'
import * as React from 'react'

import { config } from './wagmi'

function App() {
  return (
    <>
      <Account />
      <Connect />
      <BlockNumber />
    </>
  )
}

function Account() {
  const [account, setAccount] = React.useState(getAccount(config))

  React.useEffect(() => {
    watchAccount(config, {
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
        <button type='button' onClick={() => disconnect(config)}>
          Disconnect
        </button>
      )}
    </div>
  )
}

function Connect() {
  return (
    <div>
      <h2>Connect</h2>

      {config.connectors.map((connector) => (
        <button
          id={connector.uid}
          key={connector.uid}
          onClick={async () => await connect(config, { connector })}
          type='button'
        >
          {connector.name}
        </button>
      ))}
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
  }, [])

  return (
    <div>
      <h2>Block Number</h2>

      <div>Block Number (Default Chain): {blockNumber?.toString()}</div>
    </div>
  )
}

export default App
