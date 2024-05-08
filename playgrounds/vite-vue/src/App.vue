<script setup lang="ts">
  import { useAccount, useConnect, useDisconnect } from '@wagmi/vue'

  const account = useAccount()
  const connect = useConnect()
  const disconnect = useDisconnect()
</script>

<template>
  <div>
    <div>
      <h2>Account</h2>

      <div>
        account: {{ account.address }}
        <br />
        chainId: {{ account.chainId }}
        <br />
        status: {{ account.status }}
      </div>

      <button
        v-if="account.status !== 'disconnected'"
        type="button"
        @click="disconnect.disconnect()"
      >
        Disconnect
      </button>
    </div>

    <div>
      <h2>Connect</h2>

      <button
        v-for="connector in connect.connectors"
        :key="connector.id"
        type="button"
        @click="connect.connect({ connector })"
      >
        {{ connector.name }}
      </button>

      <div>{{ connect.status }}</div>
      <div>{{ connect.error }}</div>
    </div>
  </div>
</template>

