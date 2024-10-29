<script lang="ts">
import './index.css'
import WagmiProvider from '$lib/WagmiProvider.svelte'
import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query'
import { http, createConfig } from '@wagmi/core'
import { mainnet, optimism, sepolia } from '@wagmi/core/chains'
import type { Snippet } from 'svelte'

const config = createConfig({
  chains: [mainnet, sepolia, optimism],
  transports: {
    [mainnet.id]: http('https://rpc.ankr.com/eth'),
    [sepolia.id]: http(),
    [optimism.id]: http(),
  },
})

const { children }: { children: Snippet } = $props()

const queryClient = new QueryClient()
</script>

<WagmiProvider {config}>
	<QueryClientProvider client={queryClient}>
		{@render children()}
	</QueryClientProvider>
</WagmiProvider>
