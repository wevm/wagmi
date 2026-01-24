<script setup lang="ts">
import { useBalance, useConnection } from '@wagmi/vue'
import { formatEther } from 'viem'

const { address } = useConnection()
const { data: balance } = useBalance({ address })
</script>

<template>
  <h2>Balance</h2>

  Balance: {{ formatEther(balance?.value ?? 0n) }}
</template>
