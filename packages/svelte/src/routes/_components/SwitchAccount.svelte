<script lang="ts">
import { useAccount } from '$lib/hooks/useAccount.svelte.js'
import { useSwitchAccount } from '$lib/hooks/useSwitchAccount.svelte.js'

const account = $derived.by(useAccount())
const { connectors, switchAccount } = $derived.by(useSwitchAccount())
</script>

<h2>Switch Account</h2>

{#each connectors as connector}
	<button
		disabled={account.connector?.uid === connector.uid}
		onclick={() => switchAccount({ connector })}
		type="button"
	>
		{connector.name}
	</button>
{/each}
