<script lang="ts">
import { useChainId } from '@wagmi/svelte'
import { useConnect } from '@wagmi/svelte'

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
