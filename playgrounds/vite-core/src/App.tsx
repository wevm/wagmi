import { connect, disconnect, getAccount, watchAccount } from '@wagmi/core'
import * as React from 'react'

import { config } from './wagmi'

function App() {
  return (
    <>
      <Account />
      <Connect />
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

      <button type='button' onClick={() => disconnect(config)}>
        Disconnect
      </button>
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

export default App
