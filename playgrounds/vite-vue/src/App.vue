<script setup lang="ts">
import {
  useAccount,
  useBlockNumber,
  useChainId,
  useClient,
  useConnect,
  useConnections,
  useDisconnect,
  useSwitchAccount,
  useSwitchChain
} from '@wagmi/vue'
import { ref } from 'vue'

const watchBlockNumber = ref(false)

const account = useAccount()
const chainId = useChainId()
const blockNumber = useBlockNumber({ watch: watchBlockNumber })
const client = useClient()
const connect = useConnect()
const connections = useConnections()
const disconnect = useDisconnect()
const switchAccount = useSwitchAccount()
const switchChain = useSwitchChain()
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

      <button v-if="account.status.value !== 'disconnected'" type="button" @click="disconnect.disconnect()">
        Disconnect
      </button>
    </div>

    <div>
      <h2>Connect</h2>

      <button v-for="connector in connect.connectors" :key="connector.id" type="button"
        @click="connect.connect({ connector, chainId })">
        {{ connector.name }}
      </button>

      <div>
        {{ connect.status }}
        {{ connect.error }}
      </div>
    </div>

    <div>
      <h2>Connections</h2>

      <div v-for="connection in connections" :key="connection.connector.id" type="button">
        <div>connector {{ connection.connector.name }}</div>
        <div>accounts: {{ JSON.stringify(connection.accounts) }}</div>
        <div>chainId: {{ connection.chainId }}</div>
      </div>
    </div>

    <div>
      <h2>Switch Account</h2>

      <button v-for="connector in switchAccount.connectors.value" :key="connector.id"
        :disabled="account.connector.value?.uid === connector.uid" type="button"
        @click="switchAccount.switchAccount({ connector })">
        {{ connector.name }}
      </button>

      <div>
        {{ switchAccount.status }}
        {{ switchAccount.error }}
      </div>
    </div>

    <div>
      <h2>Switch Chain</h2>

      <div>Chain ID: {{ chainId }}</div>

      <button v-for="chain in switchChain.chains.value" :key="chain.id" :disabled="chain.id === chainId" type="button"
        @click="switchChain.switchChain({ chainId: chain.id })">
        {{ chain.name }}
      </button>

      <div>
        {{ switchChain.status }}
        {{ switchChain.error }}
      </div>
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

      <pre>{{ client }}</pre>
    </div>
  </div>
</template>
