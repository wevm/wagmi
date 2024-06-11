<script setup>
import * as allChains from 'viem/chains'
import { computed, ref } from 'vue'

const message = ref('')
const chains = Object.entries(allChains)
  .map(([key, value]) => ({ ...value, import: key }))
  .sort((a, b) => a.id - b.id)
const filteredChains = computed(() => {
  const filterMessage = message.value.toLowerCase().trim()
  return chains.filter(
    (chain) =>
      chain.id.toString().includes(filterMessage) ||
      chain.import.toLowerCase().includes(filterMessage) ||
      chain.name.toLowerCase().includes(filterMessage) ||
      chain.nativeCurrency.symbol.toLowerCase().includes(filterMessage),
  )
})
</script>

<template>
  <div relative flex="~ items-center" mb-4>
    <input class="Search" h-10 w-full aria-label="Search chains" placeholder="Search chains" v-model="message" />
    <span absolute right-4 font-500 op-50 text-xs>{{ filteredChains.length }} {{ filteredChains.length === 1 ?
      "Chain" :
      "Chains"
      }}</span>
  </div>

  <div class="Columns">
    <div v-for="chain of filteredChains" class="Item" h-30 flex="~ col items-center justify-center gap-1.5">
      <div mt-3 text-sm font-500 text-truncate max-w-50>{{ chain.name }}</div>
      <code text-xs>{{ chain.import }}</code>
      <div flex="~ gap-1" op-50 text-xs>
        <span>{{ chain.id }}</span> -
        <span>{{ chain.nativeCurrency.symbol }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.Columns {
  --grid-layout-gap: 0.5rem;
  --grid-column-count: 8;
  --grid-item--min-width: 200px;

  /** Calculated values. */
  --gap-count: calc(var(--grid-column-count) - 1);
  --total-gap-width: calc(var(--gap-count) * var(--grid-layout-gap));
  --grid-item--max-width: calc((100% - var(--total-gap-width)) / var(--grid-column-count));

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(max(var(--grid-item--min-width), var(--grid-item--max-width)), 1fr));
  grid-gap: var(--grid-layout-gap);
}

.Item {
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-bg-soft);
  border-radius: 8px;
}

.Search {
  background-color: var(--vp-c-bg-alt);
  border: 1px solid transparent;
  border-radius: 8px;
  outline: none;
  padding: 16px;
  font-size: 0.9rem;
  font-weight: 500;
}

.Search::placeholder {
  color: var(--vp-c-text-1);
}

.Search:hover,
.Search:focus {
  border-color: var(--vp-c-brand);
}
</style>
