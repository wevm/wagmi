import { createSignal, onCleanup, onMount } from 'solid-js'

export function usePrefersColorScheme() {
  const [colorScheme, setColorScheme] = createSignal<'light' | 'dark'>('dark')

  onMount(() => {
    const query = window.matchMedia('(prefers-color-scheme: dark)')
    setColorScheme(query.matches ? 'dark' : 'light')
    const listener = (e: MediaQueryListEvent) => {
      setColorScheme(e.matches ? 'dark' : 'light')
    }
    query.addEventListener('change', listener)
    onCleanup(() => query.removeEventListener('change', listener))
  })

  return colorScheme
}
