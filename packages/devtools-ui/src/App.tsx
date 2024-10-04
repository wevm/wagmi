/** @jsxImportSource solid-js */
import { QueryClientProvider } from '@tanstack/solid-query'
import { WagmiProvider } from '@wagmi/solid'

import { ConnectionsPanel } from './components/ConnectionsPanel.jsx'
import { useDevtoolsContext } from './context.js'

function App() {
  const value = useDevtoolsContext()
  return (
    <WagmiProvider config={value.config}>
      <QueryClientProvider client={value.queryClient}>
        <div style={{ border: '1px solid gray' }}>
          {value.framework} devtools {value.version}
          <ConnectionsPanel />
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App
