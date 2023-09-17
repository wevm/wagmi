import type {
  /*
  // When using Client Routing https://vite-plugin-ssr.com/clientRouting
  PageContextBuiltInClientWithClientRouting as PageContextBuiltInClient
  /*/
  // When using Server Routing
  PageContextBuiltInClientWithServerRouting as PageContextBuiltInClient,
  PageContextBuiltInServer,
  //*/
} from 'vite-plugin-ssr/types'

type Page = (pageProps: PageProps) => React.ReactElement
type PageProps = Record<string, unknown>

export type PageContextCustom = {
  Page: Page
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
