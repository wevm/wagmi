<script setup lang="ts">
import { useAccount, useDisconnect } from '@wagmi/vue'

const { address, chainId, status } = useAccount()
const { disconnect } = useDisconnect()
</script>

<template>
  <h2>Account</h2>

  <div>
    account: {{ address }}
    <br />
    chainId: {{ chainId }}
    <br />
    status: {{ status }}
  </div>

  <button v-if="status !== 'disconnected'" type="button" @click="disconnect()">
    Disconnect
  </button>
</template>
