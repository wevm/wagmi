<script lang="ts">
import { useChainId } from '@wagmi/svelte'
import { useSwitchChain } from '@wagmi/svelte'

const chainId = $derived.by(useChainId())
const { chains, switchChain, error } = $derived.by(useSwitchChain())
</script>

<h2>Switch Chain</h2>

{#each chains as chain}
	<button
		disabled={chainId === chain.id}
		onclick={() => switchChain({ chainId: chain.id })}
		type="button"
	>
		{chain.name}
	</button>
{/each}

{#if error}
	{error.message}
{/if}
