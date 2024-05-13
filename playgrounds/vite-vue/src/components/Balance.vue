<script setup lang="ts">
import { useAccount, useBalance } from '@wagmi/vue'

const { address } = useAccount()
const { data: balance } = useBalance({ address })
</script>

<template>
  <h2>Balance</h2>

  Balance: {{ balance?.formatted }}
</template>
