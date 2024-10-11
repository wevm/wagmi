import { createContext, useContext } from 'solid-js'
import type { Accessor, Setter } from 'solid-js'

export const ThemeContext = createContext<ThemeContext.Value>()

export declare namespace ThemeContext {
  type Value = {
    resolvedTheme: Accessor<Extract<Theme, 'dark' | 'light'>>
    theme: Accessor<Theme>
    setTheme: Setter<Theme>
  }

  type Theme = 'auto' | 'dark' | 'light'
}

export function useTheme() {
  const value = useContext(ThemeContext)
  if (!value)
    throw new Error('useTheme must be used within a ThemeContext.Provider')
  return value
}
