<script lang="ts">
import { useSignMessage } from '@wagmi/svelte'
import type { SignableMessage } from 'viem'

const { data, signMessage } = $derived.by(useSignMessage())

function handleSubmit(event: SubmitEvent) {
  event.preventDefault()
  const formData = new FormData(event.target as HTMLFormElement)
  signMessage({ message: formData.get('message') as SignableMessage })
}
</script>

<h2>Sign Message</h2>

<form onsubmit={handleSubmit}>
	<input name="message" />
	<button type="submit">Sign Message</button>
</form>

{#if data}
	{data}
{/if}
