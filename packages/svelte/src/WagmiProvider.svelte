<script lang="ts">
import { type ResolvedRegister, type State, hydrate } from '@wagmi/core'
import type { Snippet } from 'svelte'
import { setWagmiConfig } from './context.js'

type WagmiProviderProps = {
  children: Snippet
  config: ResolvedRegister['config']
  initialState?: State | undefined
  reconnectOnMount?: boolean | undefined
}

const {
  children,
  config,
  initialState,
  reconnectOnMount = true,
}: WagmiProviderProps = $props()

const { onMount } = hydrate(config, {
  initialState,
  reconnectOnMount,
})

setWagmiConfig(config)

if (!config._internal.ssr) onMount()

let active = $state(true)

$effect(() => {
  if (!active) return
  if (!config._internal.ssr) return

  onMount()

  return () => {
    active = false
  }
})
</script>

{@render children()}
