<script setup lang="ts">
import { useAccount, useSwitchAccount } from '@wagmi/vue'

const { connector: currentConnector } = useAccount()
const { connectors, error, status, switchAccount } = useSwitchAccount()
</script>

<template>
  <h2>Switch Account</h2>

  <button v-for="connector in connectors" :key="connector.id" :disabled="currentConnector?.uid === connector.uid"
    type="button" @click="switchAccount({ connector })">
    {{ connector.name }}
  </button>

  <div>
    {{ status }}
    {{ error }}
  </div>
</template>
