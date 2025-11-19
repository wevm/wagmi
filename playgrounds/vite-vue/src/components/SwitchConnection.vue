<script setup lang="ts">
import { useConnection, useConnections, useSwitchConnection } from '@wagmi/vue'

const { connector: currentConnector } = useConnection()
const { error, status, switchConnection } = useSwitchConnection()
const connections = useConnections()
</script>

<template>
  <h2>Switch Connection</h2>

  <button v-for="connection in connections" :key="connection.id" :disabled="currentConnector?.uid === connection.connector.uid"
    type="button" @click="switchConnection({ connector: connection.connector })">
    {{ connection.connector.name }}
  </button>

  <div>
    {{ status }}
    {{ error }}
  </div>
</template>
