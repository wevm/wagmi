/* @refresh reload */
import {
  WagmiConfig,
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
    <WagmiConfig client={client}>
      <App />{' '}
    </WagmiConfig>
  ),
  document.getElementById('root') as HTMLElement,
)
