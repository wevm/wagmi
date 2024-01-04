// See https://vike.dev/data-fetching
import ReactDOMServer from 'react-dom/server'
import { dangerouslySkipEscape, escapeInject } from 'vike/server'

import { type PageContextServer } from '../lib/usePageContext'
import { App } from './App'

export async function render(pageContext: PageContextServer) {
  const { Page, pageProps } = pageContext

  // This render() hook only supports SSR, see https://vike.dev/render-modes for how to modify render() to support SPA
  if (!Page)
    throw new Error('My render() hook expects pageContext.Page to be defined')

  const pageHtml = ReactDOMServer.renderToString(
    <App pageContext={pageContext}>
      <Page {...pageProps} />
    </App>,
  )

  // See https://vike.dev/head
  const { documentProps } = pageContext.exports
  const title = documentProps?.title ?? 'vite-ssr-react'

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${title}</title>
      </head>
      <body>
        <div id="react-root">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`

  return {
    documentHtml,
    pageContext: {
      // We can add some `pageContext` here, which is useful if we want to do page redirection https://vike.dev/page-redirection
    },
  }
}

export const passToClient = ['pageProps', 'urlPathname']
