import { hydrate } from 'react-dom'
import { RemixBrowser } from 'remix'

window.process = process

hydrate(<RemixBrowser />, document)
