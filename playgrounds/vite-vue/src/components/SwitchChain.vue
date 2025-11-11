<script setup lang="ts">
import { useChainId, useChains, useSwitchChain } from '@wagmi/vue'

const chainId = useChainId()
const { error, status, switchChain } = useSwitchChain()
const chains = useChains()
</script>

<template>
  <h2>Switch Chain</h2>

  <div>Chain ID: {{ chainId }}</div>

  <button v-for="chain in chains" :key="chain.id" :disabled="chain.id === chainId" type="button"
    @click="switchChain({ chainId: chain.id })">
    {{ chain.name }}
  </button>

  <div>
    {{ status }}
    {{ error }}
  </div>
</template>
