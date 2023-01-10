import type { Component } from 'solid-js'
import { useAccount, useConnect } from 'wagmi-solid'

const App: Component = () => {
  const { connect } = useConnect()
  const acc = useAccount()

  return (
    <div>
      <button onClick={() => connect()}>connect to metamask</button>
      <p>{acc().address}</p>
    </div>
  )
}

export default App
