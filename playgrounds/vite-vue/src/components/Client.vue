<script setup lang="ts">
import { useClient } from '@wagmi/vue'

const client = useClient()
</script>

<template>
  <h2>Client</h2>

  <details>
    <summary>View</summary>
    <pre>{{ client }}</pre>
  </details>
</template>
