<script lang="ts">
import { useAccount } from '$lib/hooks/useAccount.svelte.js'
import { useDisconnect } from '$lib/hooks/useDisconnect.svelte.js'

const account = $derived.by(useAccount())
const { disconnect } = $derived.by(useDisconnect())
// const { data: ensName } = $derived.by(useEnsName({
//   address: account.address,
// }))
</script>

  <div>
    <h2>Account</h2>

    <div>
      account: {account.address}
      <!-- {ensName} -->
      <br />
      chainId: {account.chainId}
      <br />
      status: {account.status}
    </div>

    {#if account.status !== 'disconnected'}
      <button type="button" onclick={() => disconnect()}>
        Disconnect
      </button>
    {/if}
  </div>