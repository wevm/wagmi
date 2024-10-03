import type { Component } from 'solid-js'

import { ConnectionsPanel } from './components/ConnectionsPanel.jsx'
import { useDevtoolsContext } from './context.js'

const App: Component = () => {
  const value = useDevtoolsContext()
  return (
    <div>
      {value.framework} devtools {value.version}
      <ConnectionsPanel />
    </div>
  )
}

export default App
