/* @refresh reload */
import {
  WagmiProvider,
  configureChains,
  createClient,
  goerli,
  mainnet,
  publicProvider,
} from '@wagmi/solid'
import { render } from 'solid-js/web'

import App from './App'

const { provider, webSocketProvider } = configureChains(
  [mainnet, goerli],
  [publicProvider()],
)

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
})

render(
  () => (
    <WagmiProvider client={client}>
      <App />{' '}
    </WagmiProvider>
  ),
  document.getElementById('root') as HTMLElement,
)
