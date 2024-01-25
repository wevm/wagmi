<script setup>
import SearchChains from '../../components/SearchChains.vue'
</script>

# Chains

Viem `Chain` objects. More info at the [Viem docs](https://viem.sh/docs/chains/introduction).

## Import

Import via the `'wagmi/chains'` entrypoint (proxies all chains from `'viem/chains'`).

```ts
import { mainnet } from 'wagmi/chains'
```

## Available Chains

<SearchChains />

<!--@include: @shared/create-chain.md-->
