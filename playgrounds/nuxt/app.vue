<script setup lang="ts">
import { config } from './wagmi'

const { data: blockNumber } = useBlockNumber({ config })
</script>

<template>
  <div>
    <div>{{ blockNumber }}</div>
  </div>
</template>
