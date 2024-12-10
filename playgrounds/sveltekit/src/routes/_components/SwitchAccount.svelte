<script lang="ts">
import { useAccount } from '@wagmi/svelte'
import { useSwitchAccount } from '@wagmi/svelte'

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
