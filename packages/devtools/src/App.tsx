import type { Component } from 'solid-js'

import { useDevtoolsContext } from './context.js'

const App: Component = () => {
  const value = useDevtoolsContext()
  return (
    <div>
      {value.framework} devtools {value.version}
    </div>
  )
}

export default App
