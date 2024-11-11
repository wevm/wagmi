<script>
import { useConnections } from '@wagmi/svelte'

const connections = $derived.by(useConnections())
</script>

<div>
	<h2>Connections</h2>

	{#each connections as connection (connection.connector.uid)}
		<div>
			<div>connector {connection.connector.name}</div>
			<div>accounts: {JSON.stringify(connection.accounts)}</div>
			<div>chainId: {connection.chainId}</div>
		</div>
	{/each}
</div>
