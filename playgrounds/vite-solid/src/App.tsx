import { BlockNumber } from './components/BlockNumber'
import { Connect } from './components/Connect'
import { Connection } from './components/Connection'
import { Connections } from './components/Connections'

function App() {
  return (
    <>
      <Connection />
      <Connect />
      <Connections />
      <BlockNumber />
    </>
  )
}

export default App
