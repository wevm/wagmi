# Nuxt

[Nuxt Module](https://nuxt.com/docs/guide/concepts/modules) for Wagmi. Adds all [Composables](/vue/api/composables) as [auto-imports](https://nuxt.com/docs/guide/concepts/auto-imports).

## Usage

::: code-group
```ts twoslash [nuxt.config.ts]
// @twoslash-cache: {"v":1,"hash":"a2f343760fd46f812e97826b5b6d3f1fdddb4ec07dbbf76cb4790a6383711285","data":"N4Igdg9gJgpgziAXAbVAFwJ4AcZJACwgDcYAnEAGhDRgA808AKAQwBsBLZuASgAIBjCGDhpesAGbswMAHIBXegGEhkgOaJeAERiTp8pSvaqAOmHYBbLBFKiJU2QrTKwayiBHMbSAJxVWMMFU0fCQARgA2KjRPVRgGRBA7PUdnVz97JAAGKn58T2Z+GnJEbwBfCnRsXATCEnIouniQFg4uPiSHAxcjRiksOTQNAEkwfqdDVQAefXHu1QpeVKMAGWYMMgBZOOYAPm5h0YGlqZnjhePV9dIt6J3TCysbMR17U4m3Dy9EcIBmPwCgiFEBEojE4ngOm85m4ONIkAAmHJ5UgFIphACs5UqODwtTIbho9CYWFIEBwNgwfHM0Dk/jgAH4NIwRKQpKpeAAfXjiNhwGCc3gzDY0/yTZhgDALAAKnjQnFYYolOwWPNYfJ2AuQzLQrMCAqFIpgk2FUFpMAA8lg5UI4NLZfLjYbLdbhMrubyYBquXIwB0oNx6QtGMBTLww7xkLQNCy2QBdDTijAAblMpQFPr9AdjArAtNY6d9L2k/uQ2e9hd0MCgbigEH4CASJrNcF4nn5M14jQCcHYNt4AHd8OxcgJxZ36AEoLx2GgW4JSPzxD7Cr2wGwZxhW77W1Ap5O6S2pDRVCiXXAAHSmUwAUQK+F41NN/mnLZgM/wZFbvBjesYg+H978GOC7iJ+aAQF+WAFAA1swsQLNYvAAEb8swvBQcEvDgV+kj+NwCxoWgchYM+/bvlhH4PoarYtpIpAiN+OpsluU7BPyZJnjRX58oI24QEhABWMCFAhpBbtOYCwvyj5mtyy4upeYAdkx8BYRBC5wBArAkJ2d7TjQ5gSRR0mGi2ngopucg9nqkCwLwC4AI5yOwC7ocwmG9GAvAAAa2TAAD6Ml0t5fDiqxH5eWRrD5ih9nwFpJBTuIpKGSSEBCYUPlwKQ/CaC53nTuIPkAH4FeuXAvrwVlVueBJwQ2yDIOAEA0G4TZ0q2rl0MJAxVt+MBOQEcpsKwm6acZvDWLAYnsIeljWNEYBoOevAAGIuSICxsVRT6qX6Rm+Y4568Wo56zmVrmsBAzCwFAK0ACoRQsQWqeIEAZkZ23eS9cAAPTeaYUAucJ4GkJubbjj1NBQAR25sZuV03UZbBYHkKFykB+ZTWQtWxhQTV0Mwlj+G43lkwJcCmD9GjIKGvC/b9vAAKrWeyUH8LBsS8Gu5gwHTADkAACub0BTv3MLQvZwPzFB0wzvAAEowKw7nsDp2EYO9YlpRlojZblLkC8Vv0/eL/bxbz54UzLcuM1KpJEOwQN6hxq6U15EZCyLaBi6oEAQKo/gALTimwGAY9LCzAFVzAaPzAAaoTwj8AAs6LhAA7PzvClHjtu8CMUnPLoM6rnTS5gCuQi8IwfDAKUpixqYZPeSAsZ4+40RfAAHCn/yBMESAZ6CpCxE0P0whkiB/CAuT5IU+KIPCuc5NA1QgA8C28NHkIpBMOfcilvD897v0nUY/NXtItCPLYOjMLSd+VlCajBnT1Oe4L/ZweY7C/UQcgYC/W9vzPOYBSjcDcLzaISBQBdmEKuPAs4QClFKEAA"}
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: ['@wagmi/vue/nuxt'],
})
```
```vue [index.vue]
<script setup lang="ts">
// No need to import `useConnection`! // [!code focus]
const connection = useConnection() // [!code focus]
</script>

<template>
  Address: {{ connection.address }}
</template>
```
<<< @/snippets/vue/config.ts[config.ts]
:::

