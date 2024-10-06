import { ConnectionsPanel } from './components/ConnectionsPanel.jsx'
import { Providers } from './components/Providers.jsx'
import { useTheme } from './primitives/useTheme.js'

// TODO:
// - Contracts panel
// - Add your own panel

function App() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <Providers>
      <div
        data-theme={resolvedTheme()}
        class="antialiased border bg-background-100 border-gray-200 font-sans text-gray-900"
      >
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
    </Providers>
  )
}

export default App
