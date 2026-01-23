<script setup lang="ts">
import { useConnection, useConnections, useSwitchConnection } from '@wagmi/vue'

const { connector: currentConnector } = useConnection()
const switchConnection = useSwitchConnection()
const connections = useConnections()
</script>

<template>
  <h2>Switch Connection</h2>

  <button v-for="connection in connections" :key="connection.connector.id" :disabled="currentConnector?.uid === connection.connector.uid"
    type="button" @click="switchConnection.mutate({ connector: connection.connector })">
    {{ connection.connector.name }}
  </button>

  <div>
    {{ switchConnection.status }}
    {{ switchConnection.error }}
  </div>
</template>
