import { TanStackDevtools } from '@tanstack/react-devtools'
import { type QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools as TanStackQueryDevtoolsPanel } from '@tanstack/react-query-devtools'
import {
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import * as React from 'react'
import { deserialize, type State, WagmiProvider } from 'wagmi'
import appCss from '../index.css?url'
import { getConfig, getWagmiStateSSR } from '../wagmi'

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    head: () => ({
      meta: [
        { charSet: 'utf-8' },
        { title: 'TanStack Start Example' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      links: [
        {
          rel: 'stylesheet',
          href: appCss,
        },
      ],
    }),
    notFoundComponent: () => <div>Not Found</div>,
    loader: () => getWagmiStateSSR(),
    shellComponent: RootDocument,
  },
)

function RootDocument({ children }: { children: React.ReactNode }) {
  const { queryClient } = Route.useRouteContext()
  const [config] = React.useState(() => getConfig())
  const wagmiState = Route.useLoaderData({ select: deserialize<State> })

  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <WagmiProvider config={config} initialState={wagmiState}>
          <QueryClientProvider client={queryClient}>
            {children}
            <TanStackDevtools
              config={{
                position: 'bottom-right',
              }}
              plugins={[
                {
                  name: 'Tanstack Router',
                  render: <TanStackRouterDevtoolsPanel />,
                },
                {
                  name: 'Tanstack Query',
                  render: <TanStackQueryDevtoolsPanel />,
                },
              ]}
            />
          </QueryClientProvider>
        </WagmiProvider>
        <Scripts />
      </body>
    </html>
  )
}
