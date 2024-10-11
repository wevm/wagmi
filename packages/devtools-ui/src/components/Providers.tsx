import { makePersisted } from '@solid-primitives/storage'
import { QueryClientProvider } from '@tanstack/solid-query'
import { WagmiProvider } from '@wagmi/solid'
import { type ParentProps, createMemo, createSignal } from 'solid-js'
import { createStore } from 'solid-js/store'

import { useDevtoolsContext } from '../contexts/devtools.js'
import { PreferencesContext } from '../contexts/preferences.js'
import { ThemeContext } from '../contexts/theme.js'
import { usePrefersColorScheme } from '../primitives/usePrefersColorScheme.js'

export function Providers(props: ParentProps) {
  const value = useDevtoolsContext()
  const storage = value.config.storage as unknown as Storage

  const [theme, setTheme] = makePersisted(
    createSignal<ThemeContext.Theme>('auto'),
    {
      name: 'devtools.theme',
      storage,
    },
  )
  const colorScheme = usePrefersColorScheme()
  const resolvedTheme = createMemo(() => {
    if (theme() !== 'auto')
      return theme() as Extract<ThemeContext.Theme, 'dark' | 'light'>
    return colorScheme()
  })

  const [preferences, setPreferences] = makePersisted(
    createStore<PreferencesContext.Preferences>({
      open: false,
      position: 'bottom',
    }),
    {
      name: 'devtools.preferences',
      storage,
    },
  )

  return (
    <WagmiProvider config={value.config}>
      <QueryClientProvider client={value.queryClient}>
        <ThemeContext.Provider value={{ resolvedTheme, theme, setTheme }}>
          <PreferencesContext.Provider value={{ preferences, setPreferences }}>
            {props.children}
          </PreferencesContext.Provider>
        </ThemeContext.Provider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
