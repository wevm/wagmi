<script setup lang="ts">
import { useConnection, useDisconnect } from '@wagmi/vue'

const { address, chainId, status } = useConnection()
const { disconnect } = useDisconnect()
</script>

<template>
  <h2>Connection</h2>

  <div>
    address: {{ address }}
    <br />
    chainId: {{ chainId }}
    <br />
    status: {{ status }}
  </div>

  <button v-if="status !== 'disconnected'" type="button" @click="disconnect()">
    Disconnect
  </button>
</template>
