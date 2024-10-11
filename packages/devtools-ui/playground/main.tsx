/* @refresh reload */
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query'
import {
  http,
  WagmiProvider,
  createConfig,
  createStorage,
  useAccount,
} from '@wagmi/solid'
import { mainnet, optimism, sepolia } from '@wagmi/solid/chains'
import { render } from 'solid-js/web'

import { WagmiDevtools } from '../../devtools/src/exports/solid.js'

import './index.css'

const config = createConfig({
  chains: [mainnet, sepolia, optimism],
  connectors: [],
  storage: createStorage({ storage: localStorage, key: 'devtools-ui' }),
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [optimism.id]: http(),
  },
})

const queryClient = new QueryClient()

render(
  () => (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
      <WagmiDevtools queryClient={queryClient} />
    </WagmiProvider>
  ),
  document.getElementById('root')!,
)

function App() {
  const account = useAccount()

  return (
    <div>
      account: {account.address}
      <br />
      chainId: {account.chainId}
      <br />
      status: {account.status}
      <div style={{ 'margin-top': '20rem' }}>foo bar baz</div>
    </div>
  )
}
