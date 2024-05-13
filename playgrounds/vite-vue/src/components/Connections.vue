<script setup lang="ts">
import { useConnections } from '@wagmi/vue'

const connections = useConnections()
</script>

<template>
  <h2>Connections</h2>

  <div v-for="connection in connections" :key="connection.connector.id" type="button">
    <div>connector {{ connection.connector.name }}</div>
    <div>accounts: {{ JSON.stringify(connection.accounts) }}</div>
    <div>chainId: {{ connection.chainId }}</div>
  </div>
</template>
