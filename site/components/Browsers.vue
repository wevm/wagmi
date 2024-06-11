<script setup>
const browsers = ['chrome', 'edge', 'firefox', 'opera', 'safari']
</script>

<template>
  <div flex my-6 gap-1.5>
    <img v-for="browser of browsers" h-16 :src="`/browsers/${browser}.png`" :alt="browser" />
  </div>
</template>
