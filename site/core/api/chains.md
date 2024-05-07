<script setup>
import SearchChains from '../../components/SearchChains.vue'
</script>

# Chains

## Import

Import via the `'@wagmi/core/chains'` entrypoint (proxies all chains from `'viem/chains'`).

```ts
import { mainnet } from '@wagmi/core/chains'
```

## Available Chains

<SearchChains />

<!--@include: @shared/create-chain.md-->
