<script lang="ts">
import { BaseError } from '@wagmi/svelte'
import { useSendTransaction } from '@wagmi/svelte'
import { useWaitForTransactionReceipt } from '@wagmi/svelte'
import { type Hex, parseEther } from 'viem'

const {
  data: hash,
  error,
  isPending,
  sendTransaction,
} = $derived.by(useSendTransaction())

async function submit(e: SubmitEvent) {
  e.preventDefault()
  const formData = new FormData(e.target as HTMLFormElement)
  const to = formData.get('address') as Hex
  const value = formData.get('value') as string
  sendTransaction({ to, value: parseEther(value) })
}

const { isLoading: isConfirming, isSuccess: isConfirmed } = $derived.by(
  useWaitForTransactionReceipt(() => ({
    hash,
  })),
)
</script>

<div>
	<h2>Send Transaction</h2>
	<form onsubmit={submit}>
		<input name="address" placeholder="Address" required />
		<input name="value" placeholder="Amount (ETH)" type="number" step="0.000000001" required />
		<button disabled={isPending} type="submit">
			{isPending ? 'Confirming...' : 'Send'}
		</button>
	</form>
	{#if hash}
		<div>Transaction Hash: {hash}</div>
	{/if}
	{#if isConfirming}
		Waiting for confirmation...
	{/if}
	{#if isConfirmed}
		Transaction confirmed.
	{/if}
	{#if error}
		<div>Error: {(error as BaseError).shortMessage || error.message}</div>
	{/if}
</div>
