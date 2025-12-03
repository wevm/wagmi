<script setup lang="ts">
import { useSendTransaction } from '@wagmi/vue'
import { type Hex, parseEther } from 'viem'

const sendTransaction = useSendTransaction()

function onSubmit(event: any) {
  const form = new FormData(event.target)
  const to = form.get('address')! as Hex
  const value = parseEther(form.get('value') as string)
  sendTransaction.mutate({ to, value })
}
</script>

<template>
  <h2>
    Send Transaction
  </h2>
  <form @submit.prevent="onSubmit">
    <input name="address" placeholder="Address" required />
    <input name="value" placeholder="Amount (ETH)" type="number" step="0.000000001" required />
    <button type="submit">
      Send
    </button>
  </form>
  <div v-if="sendTransaction.isPending">
    Sending...
  </div>
  <div v-if="sendTransaction.data">
    Hash: {{ sendTransaction.data }}
  </div>
  <div v-if="sendTransaction.error">
    Error: {{ sendTransaction.error.value?.message }}
  </div>
</template>
