<script setup lang="ts">
import { VPDocAsideSponsors } from 'vitepress/theme'
import { computed } from 'vue'
import { useSponsors } from '../composables/useSponsors'

const { data } = useSponsors()

const sponsors = computed(() => {
  return (
    data?.value
      ?.filter(
        (sponsor) => sponsor.type === 'platinum' || sponsor.type === 'gold',
      )
      .map((sponsor) => {
        return {
          size: sponsor.type === 'platinum' ? 'mini' : 'xmini',
          items: sponsor.items,
        }
      }) ?? []
  )
})
</script>

<template>
  <VPDocAsideSponsors v-if="data" :data="sponsors" />
</template>

