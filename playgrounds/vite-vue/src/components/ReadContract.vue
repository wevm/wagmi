<script setup lang="ts">
import { useReadContract } from '@wagmi/vue'
import { wagmiContractConfig } from '../contracts'

const { data: balance } = useReadContract({
  ...wagmiContractConfig,
  functionName: 'balanceOf',
  args: ['0x03A71968491d55603FFe1b11A9e23eF013f75bCF'],
})
</script>

<template>
  <h2>Read Contract</h2>

  <div>Balance: {{ balance?.toString() }}</div>
</template>
