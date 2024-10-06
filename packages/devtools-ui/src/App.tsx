import { createMemo, createSignal, type ParentProps } from 'solid-js'
import { QueryClientProvider } from '@tanstack/solid-query'
import { WagmiProvider } from '@wagmi/solid'
import { A } from '@solidjs/router'

import { useDevtoolsContext } from './contexts/devtools.js'
import { makePersisted } from '@solid-primitives/storage'
import { usePrefersColorScheme } from './primitives/usePrefersColorScheme.js'
import { ThemeContext, type Theme } from './contexts/theme.js'

export function App(props: App.Props) {
  const value = useDevtoolsContext()

  const [theme, setTheme] = makePersisted(createSignal<Theme>('auto'), {
    name: 'devtools.theme',
    storage: value.config.storage as unknown as Storage,
  })
  const colorScheme = usePrefersColorScheme()
  const resolvedTheme = createMemo(() => {
    if (theme() !== 'auto') return theme() as Extract<Theme, 'dark' | 'light'>
    return colorScheme()
  })

  return (
    <WagmiProvider config={value.config}>
      <QueryClientProvider client={value.queryClient}>
        <ThemeContext.Provider value={{ resolvedTheme, theme, setTheme }}>
          <div
            data-theme={resolvedTheme()}
            class="antialiased border bg-background-100 border-gray-200 font-sans text-gray-900"
          >
            <nav>
              <A href="/">Connections</A>
              <A href="/contracts">Contracts</A>
              <A href="/settings">Settings</A>
            </nav>

            {props.children}
          </div>
        </ThemeContext.Provider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export declare namespace App {
  type Props = ParentProps
}
