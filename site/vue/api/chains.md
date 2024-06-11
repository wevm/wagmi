<script setup>
import packageJson from '../../../package.json'
import SearchChains from '../../components/SearchChains.vue'

const viemVersion = packageJson.devDependencies.viem
</script>

# Chains

Viem `Chain` objects. More info at the [Viem docs](https://viem.sh/docs/chains/introduction).

## Import

Import via the `'@wagmi/vue/chains'` entrypoint (proxies all chains from `'viem/chains'`).

```ts
import { mainnet } from '@wagmi/vue/chains'
```

## Available Chains

Chain definitions as of `viem@{{viemVersion}}`. For `viem@latest`, visit the [Viem repo](https://github.com/wevm/viem/blob/main/src/chains/index.ts).

<SearchChains />

<!--@include: @shared/create-chain.md-->
