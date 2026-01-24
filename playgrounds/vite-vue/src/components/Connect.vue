<script setup lang="ts">
import { useChainId, useConnect, useConnectors } from '@wagmi/vue'

const chainId = useChainId()
const connect = useConnect()
const connectors = useConnectors()
</script>

<template>
  <h2>Connect</h2>

  <button v-for="connector in connectors" :key="connector.id" type="button" @click="connect.mutate({ connector, chainId })">
    {{ connector.name }}
  </button>

  <div>
    {{ connect.status.value }}
    {{ connect.error?.value?.message }}
  </div>
</template>
