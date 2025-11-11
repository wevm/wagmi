<script setup lang="ts">
import Balance from './components/Balance.vue'
import BlockNumber from './components/BlockNumber.vue'
import Client from './components/Client.vue'
import Connect from './components/Connect.vue'
import Connection from './components/Connection.vue'
import Connections from './components/Connections.vue'
import ConnectorClient from './components/ConnectorClient.vue'
import ReadContract from './components/ReadContract.vue'
import SendTransaction from './components/SendTransaction.vue'
import SwitchChain from './components/SwitchChain.vue'
import SwitchConnection from './components/SwitchConnection.vue'
import WriteContract from './components/WriteContract.vue'
</script>

<template>
  <Connection />
  <Balance />
  <Connect />
  <Connections />
  <SwitchConnection />
  <SwitchChain />
  <BlockNumber />
  <ReadContract />
  <SendTransaction />
  <WriteContract />
  <Client />
  <ConnectorClient />
</template>
