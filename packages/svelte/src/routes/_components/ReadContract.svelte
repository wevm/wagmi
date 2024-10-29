<script lang="ts">
import { useReadContract } from '$lib/hooks/useReadContract.svelte.js'
import { wagmiContractConfig } from './contracts.js'

const { data: balance, isLoading } = $derived.by(
  useReadContract(() => ({
    ...wagmiContractConfig,
    functionName: 'balanceOf',
    args: ['0x03A71968491d55603FFe1b11A9e23eF013f75bCF'] as const,
  })),
)
</script>

<div>
	<h2>Read Contract</h2>
	<div>Balance: {balance?.toString()} (isLoading: {isLoading})</div>
</div>
