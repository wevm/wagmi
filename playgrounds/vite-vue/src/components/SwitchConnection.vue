<script setup lang="ts">
import { useConnection, useSwitchConnection } from '@wagmi/vue'

const { connector: currentConnector } = useConnection()
const { connectors, error, status, switchConnection } = useSwitchConnection()
</script>

<template>
  <h2>Switch Connection</h2>

  <button v-for="connector in connectors" :key="connector.id" :disabled="currentConnector?.uid === connector.uid"
    type="button" @click="switchConnection({ connector })">
    {{ connector.name }}
  </button>

  <div>
    {{ status }}
    {{ error }}
  </div>
</template>
