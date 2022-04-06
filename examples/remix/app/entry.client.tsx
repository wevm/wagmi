import { hydrate } from 'react-dom'
import { RemixBrowser } from 'remix'

import { Buffer } from 'buffer'

// polyfill Buffer for client
if (!window.Buffer) {
  window.Buffer = Buffer
}

hydrate(<RemixBrowser />, document)
