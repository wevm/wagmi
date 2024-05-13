<script setup lang="ts">
import Account from './components/Account.vue';
import BlockNumber from './components/BlockNumber.vue';
import Client from './components/Client.vue';
import Connect from './components/Connect.vue';
import ConnectorClient from './components/ConnectorClient.vue';
import Connections from './components/Connections.vue';
import SendTransaction from './components/SendTransaction.vue'
import SwitchAccount from './components/SwitchAccount.vue';
import SwitchChain from './components/SwitchChain.vue';
</script>

<template>
  <div>
    <Account />
    <Connect />
    <Connections />
    <SwitchAccount />
    <SwitchChain />
    <BlockNumber />
    <SendTransaction />
    <Client />
    <ConnectorClient />
  </div>
</template>
