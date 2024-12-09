<script lang="ts">
import { useWaitForTransactionReceipt } from '@wagmi/svelte'
import { useWriteContract } from '@wagmi/svelte'
import { parseAbi } from 'viem'

const {
  data: hash,
  error,
  isPending,
  writeContract,
} = $derived.by(useWriteContract())

async function submit(e: SubmitEvent) {
  e.preventDefault()
  const formData = new FormData(e.target as HTMLFormElement)
  const tokenId = formData.get('tokenId') as string
  writeContract({
    address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
    abi: parseAbi(['function mint(uint256 tokenId)']),
    functionName: 'mint',
    args: [BigInt(tokenId)],
  })
}

const { isLoading: isConfirming, isSuccess: isConfirmed } = $derived.by(
  useWaitForTransactionReceipt(() => ({
    hash,
  })),
)
</script>

<h2>Write Contract</h2>
<form onsubmit={submit}>
	<input name="tokenId" placeholder="Token ID" required />
	<button disabled={isPending} type="submit">
		{#if isPending}
			Confirming...
		{:else}
			Mint
		{/if}
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
	<div>Error: {error.shortMessage || error.message}</div>
{/if}
