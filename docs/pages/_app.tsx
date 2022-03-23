import * as React from 'react'
import { ThemeProvider } from 'degen'
import NextScript from 'next/script'
import type { AppProps } from 'next/app'

import '../styles/globals.css'
import 'nextra-theme-docs/style.css'

/* eslint-disable import/no-unresolved */
// https://github.com/import-js/eslint-plugin-import/issues/1868
import 'degen/styles'
/* eslint-enable import/no-unresolved */
import { Providers } from '../components/core'
import { encodeBase64 } from '../lib/encode'

const themeKey = 'theme'

const App = ({ Component, pageProps }: AppProps) => {
  const savedTheme =
    typeof window !== 'undefined'
      ? (localStorage.getItem(themeKey) as any)
      : undefined
  const defaultMode = ['dark', 'light'].includes(savedTheme)
    ? savedTheme
    : undefined

  const themeScriptSrc = `!function(){try{var d=document.documentElement;var e=localStorage.getItem(${themeKey});if(e){d.setAttribute('data-theme',e.trim())}else{d.setAttribute('data-theme','light');}}catch(t){}}();`

  // We MUST use next/script's `beforeInteractive` strategy to avoid flashing on load.
  // However, it only accepts the `src` prop, not `dangerouslySetInnerHTML` or `children`
  // But our script cannot be external because it changes at runtime based on React props
  // so we trick next/script by passing `src` as a base64 JS script
  const encodedScript = `data:text/javascript;base64,${encodeBase64(
    themeScriptSrc,
  )}`

  const getLayout =
    (Component as any).getLayout || ((page: React.ReactElement) => page)

  return (
    <>
      {/* Set theme directly or load from cookie to prevent flash */}
      <NextScript
        id="theme-script"
        src={encodedScript}
        strategy="beforeInteractive"
      />

      <Providers>
        <ThemeProvider defaultMode={defaultMode}>
          {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
      </Providers>
    </>
  )
}

export default App
