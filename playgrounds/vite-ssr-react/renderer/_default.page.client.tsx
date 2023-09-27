import { hydrateRoot } from 'react-dom/client'

import { type PageContextClient } from '../lib/usePageContext'
import { App } from './App'

// This render() hook only supports SSR, see https://vike.dev/render-modes for how to modify render() to support SPA
export async function render(pageContext: PageContextClient) {
  const { Page, pageProps } = pageContext

  if (!Page)
    throw new Error(
      'Client-side render() hook expects pageContext.Page to be defined',
    )

  const root = document.getElementById('react-root')
  if (!root) throw new Error('DOM element #react-root not found')

  hydrateRoot(
    root,
    <App pageContext={pageContext}>
      <Page {...pageProps} />
    </App>,
  )
}

/* To enable Client-side Routing:
export const clientRouting = true
// !! WARNING !! Before doing so, read https://vike.dev/clientRouting */
