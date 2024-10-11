import { createContext, useContext } from 'solid-js'
import type { SetStoreFunction } from 'solid-js/store'

export const PreferencesContext = createContext<PreferencesContext.Value>()

export declare namespace PreferencesContext {
  type Value = {
    preferences: Preferences
    setPreferences: SetStoreFunction<Preferences>
  }

  type Preferences = {
    open: boolean
    position: 'top' | 'bottom' | 'left' | 'right'
  }
}

export function usePreferences() {
  const value = useContext(PreferencesContext)
  if (!value)
    throw new Error(
      'usePreferences must be used within a PreferencesContext.Provider',
    )
  return value
}
