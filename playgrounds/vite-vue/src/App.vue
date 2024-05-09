<script setup lang="ts">
import { useAccount, useBlockNumber, useChainId, useClient, useConnect, useDisconnect, useSwitchChain } from '@wagmi/vue'
import { ref } from 'vue';

const watchBlockNumber = ref(false)

const account = useAccount()
const blockNumber = useBlockNumber({ watch: watchBlockNumber })
const chainId = useChainId()
const client = useClient()
const connect = useConnect()
const disconnect = useDisconnect()
const switchChain = useSwitchChain()
</script>

<template>
  <div>
    <div>
      <h2>Switch Chain</h2>

      <div>Chain ID: {{ chainId }}</div>

      <button v-for="chain in switchChain.chains.value" :key="chain.id" :disabled="chain.id === chainId" type="button"
        @click="switchChain.switchChain({ chainId: chain.id })">
        {{ chain.name }}
      </button>

      {{ switchChain.error }}
    </div>

    <div>
      <h2>Account</h2>

      <div>
        account: {{ account.address }}
        <br />
        chainId: {{ account.chainId }}
        <br />
        status: {{ account.status }}
      </div>

      <button v-if="account.status !== 'disconnected'" type="button" @click="disconnect.disconnect()">
        Disconnect
      </button>
    </div>

    <div>
      <h2>Connect</h2>

      <button v-for="connector in connect.connectors" :key="connector.id" type="button"
        @click="connect.connect({ connector, chainId })">
        {{ connector.name }}
      </button>

      <div>{{ connect.status }}</div>
      <div>{{ connect.error }}</div>
    </div>

    <div>
      <h2>Block Number</h2>

      <div>{{ blockNumber.data.value }}</div>
      <button type="button" @click="watchBlockNumber = !watchBlockNumber">
        {{ watchBlockNumber ? 'Stop' : 'Start' }} watching
      </button>
    </div>

    <div>
      <h2>Client</h2>

      <pre>{{ JSON.stringify(client, null, 2) }}</pre>
    </div>
  </div>
</template>
