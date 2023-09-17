// `usePageContext` allows us to access `pageContext` in any React component.
// See https://vite-plugin-ssr.com/pageContext-anywhere
import React, { useContext } from 'react'

import type { PageContext } from './types'

const Context = React.createContext<PageContext>(
  undefined as unknown as PageContext,
)

type PageContextProviderProps = {
  pageContext: PageContext
  children: React.ReactNode
}

export function PageContextProvider(props: PageContextProviderProps) {
  const { pageContext, children } = props
  return <Context.Provider value={pageContext}>{children}</Context.Provider>
}

export function usePageContext() {
  const pageContext = useContext(Context)
  return pageContext
}
