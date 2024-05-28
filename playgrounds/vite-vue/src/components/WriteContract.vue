<script setup lang="ts">
import { BaseError, useWriteContract } from '@wagmi/vue'
import { parseAbi } from 'viem'

const { data: hash, error, isPending, writeContract } = useWriteContract()

function submit(e: any) {
  const formData = new FormData(e.target as HTMLFormElement)
  const tokenId = formData.get('tokenId') as string
  writeContract({
    address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
    abi: parseAbi(['function mint(uint256 tokenId)']),
    functionName: 'mint',
    args: [BigInt(tokenId)],
  })
}
</script>

<template>
  <h2>Write Contract</h2>

  <form @submit.prevent="submit">
    <input name="tokenId" placeholder="Token ID" required />
    <button :disabled="isPending">Mint</button>
  </form>
  <div v-if="hash">Transaction Hash: {{ hash }}</div>
  <div v-if="error">Error: {{ (error as BaseError).shortMessage || error.message }}</div>
</template>
