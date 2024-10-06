import { makePersisted } from '@solid-primitives/storage'
import { createMemo, createSignal } from 'solid-js'

import { useDevtoolsContext } from '../context.js'
import { usePrefersColorScheme } from './usePrefersColorScheme.js'

export function useTheme() {
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

  return { theme, resolvedTheme, setTheme }
}
