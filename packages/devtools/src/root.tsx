import { Devtools } from './components/devtools.js'
import { DevtoolsContext } from './context.js'
import type { DevtoolsComponentType } from './devtools.jsx'

const Root: DevtoolsComponentType = (props) => {
  return (
    <DevtoolsContext.Provider value={props}>
      <Devtools />
    </DevtoolsContext.Provider>
  )
}

export default Root
