<script setup lang="ts">
import { useChainId, useConnect, useConnectors } from '@wagmi/vue'

const chainId = useChainId()
const { connect, error, status } = useConnect()
const connectors = useConnectors()
</script>

<template>
  <h2>Connect</h2>

  <button v-for="connector in connectors" :key="connector.id" type="button" @click="connect({ connector, chainId })">
    {{ connector.name }}
  </button>

  <div>
    {{ status }}
    {{ error?.message }}
  </div>
</template>
