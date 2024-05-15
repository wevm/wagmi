<script setup lang="ts">
import { useConnectorClient } from '@wagmi/vue'

const connectorClient = useConnectorClient()
</script>

<template>
  <h2>Connector Client</h2>

  <details>
    <summary>View</summary>
    <pre>{{ connectorClient }}</pre>
  </details>
</template>
