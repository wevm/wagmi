<script setup>
import SearchChains from '../../components/SearchChains.vue'
</script>

# Chains

Viem `Chain` objects. More info at the [Viem docs](https://viem.sh/docs/chains/introduction).

## Import

Import via the `'@wagmi/vue/chains'` entrypoint (proxies all chains from `'viem/chains'`).

```ts
import { mainnet } from '@wagmi/vue/chains'
```

## Available Chains

<SearchChains />

<!--@include: @shared/create-chain.md-->
