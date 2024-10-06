import { createContext, useContext } from 'solid-js'
import type { Accessor, Setter } from 'solid-js'

export type Theme = 'auto' | 'dark' | 'light'

export const ThemeContext = createContext<{
  resolvedTheme: Accessor<Extract<Theme, 'dark' | 'light'>>
  theme: Accessor<Theme>
  setTheme: Setter<Theme>
}>({
  resolvedTheme: () => 'dark' as const,
  theme: () => 'auto' as const,
  setTheme: () => { },
})

export function useTheme() {
  const value = useContext(ThemeContext)
  if (!value)
    throw new Error('useTheme must be used within a ThemeContext.Provider')
  return value
}
