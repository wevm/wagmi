<script setup lang="ts">
import { BaseError, useWriteContract } from '@wagmi/vue'
import { parseAbi } from 'viem'

const writeContract = useWriteContract()

function submit(e: any) {
  const formData = new FormData(e.target as HTMLFormElement)
  const tokenId = formData.get('tokenId') as string
  writeContract.mutate({
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
    <button :disabled="writeContract.isPending.value">Mint</button>
  </form>
  <div v-if="writeContract.data">Transaction Hash: {{ writeContract.data }}</div>
  <div v-if="writeContract.error">Error: {{ (writeContract.error.value as BaseError)?.shortMessage || writeContract.error.value?.message }}</div>
</template>
