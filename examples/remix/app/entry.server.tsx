import { renderToString } from 'react-dom/server'
import { RemixServer } from 'remix'
import type { EntryContext } from 'remix'

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  const view = renderToString(
    <RemixServer context={remixContext} url={request.url} />,
  )

  responseHeaders.set('Content-Type', 'text/html')

  return new Response('<!DOCTYPE html>' + view, {
    status: responseStatusCode,
    headers: responseHeaders,
  })
}
