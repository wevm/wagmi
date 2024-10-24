<script lang="ts">
import WagmiProvider from '$lib/WagmiProvider.svelte'
import { http, createConfig } from '@wagmi/core'
import { mainnet, sepolia } from '@wagmi/core/chains'
import type { Snippet } from 'svelte'

const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})

const { children }: { children: Snippet } = $props()
</script>

<WagmiProvider {config}>
    {@render children()}
</WagmiProvider>