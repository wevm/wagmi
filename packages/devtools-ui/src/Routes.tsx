import { MemoryRouter, Route } from '@solidjs/router'

import { Connections } from './routes/Connections.jsx'
import { Contracts } from './routes/Contracts.jsx'
import { Settings } from './routes/Settings.jsx'
import { App } from './App.jsx'

function Routes() {
  return (
    <MemoryRouter root={App}>
      <Route path="/" component={Connections} />
      <Route path="/contracts" component={Contracts} />
      <Route path="/settings" component={Settings} />
    </MemoryRouter>
  )
}

export default Routes
