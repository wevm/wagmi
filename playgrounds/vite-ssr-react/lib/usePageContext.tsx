// `usePageContext` allows us to access `pageContext` in any React component.
// See https://vike.dev/pageContext-anywhere
import { IncomingHttpHeaders } from 'http'
import React, { useContext } from 'react'
import type {
  PageContextBuiltInClientWithServerRouting as PageContextBuiltInClient,
  PageContextBuiltInServer,
} from 'vike/types'

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

type Page = (pageProps: PageProps) => React.ReactElement
type PageProps = Record<string, unknown>

export type PageContextCustom = {
  Page: Page
  headers?: IncomingHttpHeaders | undefined
  pageProps?: PageProps | undefined
  urlPathname: string
  exports: {
    documentProps?:
      | {
          title?: string | undefined
          description?: string | undefined
        }
      | undefined
  }
}

export type PageContextServer = PageContextBuiltInServer<Page> &
  PageContextCustom
export type PageContextClient = PageContextBuiltInClient<Page> &
  PageContextCustom

export type PageContext = PageContextClient | PageContextServer
