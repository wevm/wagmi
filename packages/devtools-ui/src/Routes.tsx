import { MemoryRouter, Route } from '@solidjs/router'

import { App } from './App.jsx'
import { Connections } from './routes/Connections.jsx'
import { Settings } from './routes/Settings.jsx'

// TODO: Allow users to create custom routes for their own panels
function Routes() {
  return (
    <MemoryRouter root={App}>
      <Route path="/" component={Connections} />
      <Route path="/settings" component={Settings} />
    </MemoryRouter>
  )
}

export default Routes
