import { makePersisted } from '@solid-primitives/storage'
import { QueryClientProvider } from '@tanstack/solid-query'
import { WagmiProvider } from '@wagmi/solid'
import { createMemo, createSignal } from 'solid-js'

import { ConnectionsPanel } from './components/ConnectionsPanel.jsx'
import { useDevtoolsContext } from './context.js'
import { usePrefersColorScheme } from './primitives/usePrefersColorScheme.js'

// TODO:
// - Contracts panel
// - Add your own panel

function App() {
  const value = useDevtoolsContext()

  const [theme, setTheme] = makePersisted(
    createSignal<'auto' | 'dark' | 'light'>('auto'),
    {
      name: 'devtools.theme',
      storage: value.config.storage as unknown as Storage,
    },
  )
  const colorScheme = usePrefersColorScheme()
  const resolvedTheme = createMemo(() => {
    if (theme() !== 'auto') return theme()
    return colorScheme()
  })

  return (
    <WagmiProvider config={value.config}>
      <QueryClientProvider client={value.queryClient}>
        <div data-theme={resolvedTheme()} class="border dark:border-green-500">
          <ConnectionsPanel />

          <div>
            <button type="button" onClick={() => setTheme('dark')}>
              dark
            </button>
            <button type="button" onClick={() => setTheme('auto')}>
              auto
            </button>
            <button type="button" onClick={() => setTheme('light')}>
              light
            </button>
          </div>
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App
