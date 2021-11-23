import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { Provider } from '../src'
import { App } from './app'

ReactDOM.render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)
