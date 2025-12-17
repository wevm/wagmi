import { BlockNumber } from './components/BlockNumber'
import { Connect } from './components/Connect'
import { Connection } from './components/Connection'
import { Connections } from './components/Connections'
import { ConnectorClient } from './components/ConnectorClient'
import { SwitchChain } from './components/SwitchChain'
import { SwitchConnection } from './components/SwitchConnection'

function App() {
  return (
    <>
      <Connection />
      <Connect />
      <SwitchConnection />
      <SwitchChain />
      {/* <SignMessage /> */}
      <Connections />
      <BlockNumber />
      {/* <Balance /> */}
      <ConnectorClient />
      {/* <SendTransaction /> */}
      {/* <ReadContract /> */}
      {/* <ReadContracts /> */}
      {/* <WriteContract /> */}
    </>
  )
}

export default App
