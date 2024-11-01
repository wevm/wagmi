<script lang="ts">
import { useChainId } from '$lib/hooks/useChainId.svelte.js'
import { useConnect } from '$lib/hooks/useConnect.svelte.js'

const chainId = $derived.by(useChainId())
const { connectors, connect, status, error } = $derived.by(useConnect())
</script>

<div>
	<h2>Connect</h2>
	{#each connectors as connector (connector.uid)}
		<button onclick={() => connect({ connector, chainId })} type="button">
			{connector.name}
		</button>
	{/each}
	<div>{status}</div>
	<div>{error?.message}</div>
</div>
