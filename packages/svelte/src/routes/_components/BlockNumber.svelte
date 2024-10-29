<script>
import { useBlockNumber } from '$lib/hooks/useBlockNumber.svelte'
import { optimism } from 'viem/chains'

const defaultBlock = $derived.by(useBlockNumber(() => ({ watch: true })))
const accountBlock = $derived.by(useBlockNumber(() => ({ watch: true })))
const optimismBlock = $derived.by(
  useBlockNumber(() => ({ chainId: optimism.id, watch: true })),
)
</script>

<h2>Block Number</h2>

<div>Block Number (Default Chain): {defaultBlock.data?.toString()}</div>
<div>Block Number (Account Chain): {accountBlock.data?.toString()}</div>
<div>Block Number (Optimism): {optimismBlock.data?.toString()}</div>