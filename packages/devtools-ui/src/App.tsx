import { A } from '@solidjs/router'
import { QueryClientProvider } from '@tanstack/solid-query'
import { WagmiProvider } from '@wagmi/solid'
import { type ParentProps, createMemo, createSignal } from 'solid-js'

import { Icon } from '@iconify-icon/solid'
import { makePersisted } from '@solid-primitives/storage'
import { useDevtoolsContext } from './contexts/devtools.js'
import { type Theme, ThemeContext } from './contexts/theme.js'
import { usePrefersColorScheme } from './primitives/usePrefersColorScheme.js'

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
            class="antialiased font-sans text-gray-900"
          >
            <aside
              classList={{
                'border bg-background-100 border-gray-200': true,
              }}
            >
              <nav class="bg-background-200 border-b border-gray-200 font-medium px-3 py-1 flex gap-3 text-sm w-full">
                <A href="/" class="flex items-center gap-1">
                  <Icon icon="lucide:link-2" />
                  <span>Connections</span>
                </A>
                <A href="/settings" class="flex items-center gap-1">
                  <Icon icon="lucide:settings-2" />
                  <span>Settings</span>
                </A>
              </nav>

              {props.children}
            </aside>
          </div>
        </ThemeContext.Provider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export declare namespace App {
  type Props = ParentProps
}
