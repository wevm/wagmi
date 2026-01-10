import { QueryClient, QueryClientProvider } from '@tanstack/solid-query'
import { cookieToInitialState, WagmiProvider } from '@wagmi/solid'
import { getRequestEvent, isServer } from 'solid-js/web'

import { Balance } from '~/components/Balance'
import { BlockNumber } from '~/components/BlockNumber'
import { Connect } from '~/components/Connect'
import { Connection } from '~/components/Connection'
import { Connections } from '~/components/Connections'
import { ConnectorClient } from '~/components/ConnectorClient'
import { SwitchChain } from '~/components/SwitchChain'
import { SwitchConnection } from '~/components/SwitchConnection'
import { config } from './wagmi'

function getInitialState() {
  if (!isServer) return undefined
  const event = getRequestEvent()
  const cookie = event?.request.headers.get('cookie')
  return cookieToInitialState(config, cookie)
}

export default function App() {
  const initialState = getInitialState()
  const queryClient = new QueryClient()

  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        <Connection />
        <Connect />
        <SwitchConnection />
        <SwitchChain />
        {/* <SignMessage /> */}
        <Connections />
        <BlockNumber />
        <Balance />
        <ConnectorClient />
        {/* <SendTransaction /> */}
        {/* <ReadContract /> */}
        {/* <ReadContracts /> */}
        {/* <WriteContract /> */}
      </QueryClientProvider>
    </WagmiProvider>
  )
}
