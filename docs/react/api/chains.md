<script setup>
import SearchChains from '../../components/SearchChains.vue'
</script>

# Chains

Viem `Chain` objects. More info at the [Viem docs](https://viem.sh/docs/clients/chains.html).

## Import

```ts
// 'wagmi/chains' entrypoint proxies all chains from 'viem/chains'
import { mainnet } from 'wagmi/chains'
```

## Available Chains

<SearchChains />

<!--@include: @shared/create-chain.md-->
