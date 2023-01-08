// @refresh reload
import { Suspense } from 'solid-js'
import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from 'solid-start'
import {
  WagmiProvider,
  configureChains,
  createClient,
  goerli,
  mainnet,
  publicProvider,
} from 'wagmi-solid'

const { provider, webSocketProvider } = configureChains(
  [mainnet, goerli],
  [publicProvider()],
)

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
})

export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Title>wagmi</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
        <Suspense>
          <ErrorBoundary>
            <WagmiProvider client={client}>
              <Routes>
                <FileRoutes />
              </Routes>
            </WagmiProvider>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  )
}
