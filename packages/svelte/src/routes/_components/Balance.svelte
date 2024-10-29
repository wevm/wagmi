<script lang="ts">
import { useAccount } from '$lib/hooks/useAccount.svelte.js'
import { useBalance } from '$lib/hooks/useBalance.svelte.js'
import { formatEther } from 'viem'
import { optimism } from 'viem/chains'

const { address } = $derived.by(useAccount())

const { data: default_ } = $derived.by(useBalance(() => ({ address })))
const { data: account_ } = $derived.by(useBalance(() => ({ address })))
const { data: optimism_ } = $derived.by(
  useBalance(() => ({
    address,
    chainId: optimism.id,
  })),
)
</script>

<div>
    <h2>Balance</h2>

    <div>
        Balance (Default Chain):
        {#if !!default_?.value}{formatEther(default_.value)}{/if}
    </div>
    <div>
        Balance (Account Chain):
        {#if !!account_?.value}{formatEther(account_.value)}{/if}
    </div>
    <div>
        Balance (Optimism Chain):
        {#if !!optimism_?.value}{formatEther(optimism_.value)}{/if}
    </div>
</div>