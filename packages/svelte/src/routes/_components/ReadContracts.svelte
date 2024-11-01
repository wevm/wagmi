<script lang="ts">
import { useReadContracts } from '$lib/hooks/useReadContracts.svelte.js'
import { wagmiContractConfig } from './contracts.js'

const { data } = $derived.by(
  useReadContracts(() => ({
    allowFailure: false,
    contracts: [
      {
        ...wagmiContractConfig,
        functionName: 'balanceOf',
        args: ['0x03A71968491d55603FFe1b11A9e23eF013f75bCF'],
      },
      {
        ...wagmiContractConfig,
        functionName: 'ownerOf',
        args: [69n],
      },
      {
        ...wagmiContractConfig,
        functionName: 'totalSupply',
      },
    ],
  })),
)

const [balance, ownerOf, totalSupply] = $derived(data || [])
</script>


<div>
    <h2>Read Contract</h2>
    <div>Balance: {balance?.toString()}</div>
    <div>Owner of Token 69: {ownerOf?.toString()}</div>
    <div>Total Supply: {totalSupply?.toString()}</div>
</div>