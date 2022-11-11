import { SkipNavLink } from '@reach/skip-nav'
import {
  Head,
  Html,
  Main,
  default as NextDocument,
  NextScript,
} from 'next/document'

class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <SkipNavLink />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default Document
