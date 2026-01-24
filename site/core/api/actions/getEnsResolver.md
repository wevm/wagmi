<script setup>
const packageName = '@wagmi/core'
const actionName = 'getEnsResolver'
const typeName = 'GetEnsResolver'
</script>

# getEnsResolver

Action for fetching ENS resolver for name.

## Import

```ts
import { getEnsResolver } from '@wagmi/core'
```

## Usage

::: code-group
```ts [index.ts]
import { getEnsResolver } from '@wagmi/core'
import { normalize } from 'viem/ens'
import { config } from './config'

const ensResolver = getEnsResolver(config, {
  name: normalize('wevm.eth'),
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

::: warning
Since ENS names prohibit certain forbidden characters (e.g. underscore) and have other validation rules, you likely want to [normalize ENS names](https://docs.ens.domains/contract-api-reference/name-processing#normalising-names) with [UTS-46 normalization](https://unicode.org/reports/tr46) before passing them to `getEnsResolver`. You can use Viem's built-in [`normalize`](https://viem.sh/docs/ens/utilities/normalize) function for this.
:::

## Parameters

```ts
import { type GetEnsResolverParameters } from '@wagmi/core'
```

---

### blockNumber

`bigint | undefined`

Block number to get resolver at.

::: code-group
```ts [index.ts]
import { getEnsResolver } from '@wagmi/core'
import { normalize } from 'viem/ens'
import { config } from './config'

const ensResolver = getEnsResolver(config, {
  blockNumber: 17829139n, // [!code focus]
  name: normalize('wevm.eth'),
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### blockTag

`'latest' | 'earliest' | 'pending' | 'safe' | 'finalized' | undefined`

Block tag to get resolver at.

::: code-group
```ts [index.ts]
import { getEnsResolver } from '@wagmi/core'
import { normalize } from 'viem/ens'
import { config } from './config'

const ensResolver = getEnsResolver(config, {
  blockTag: 'latest', // [!code focus]
  name: normalize('wevm.eth'),
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

---

### chainId

`config['chains'][number]['id'] | undefined`

ID of chain to use when fetching data.

::: code-group
```ts [index.ts]
import { getEnsResolver } from '@wagmi/core'
import { mainnet } from '@wagmi/core/chains'
import { normalize } from 'viem/ens'
import { config } from './config'

const ensResolver = await getEnsResolver(config, {
  chainId: mainnet.id, // [!code focus]
  name: normalize('wevm.eth'),
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### name

`string`

Name to get the resolver for.

::: code-group
```ts [index.ts]
import { getEnsResolver } from '@wagmi/core'
import { normalize } from 'viem/ens'
import { config } from './config'

const ensResolver = await getEnsResolver(config, {
  name: normalize('wevm.eth'), // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### universalResolverAddress

`Address | undefined`

- Address of ENS Universal Resolver Contract.
- Defaults to current chain's Universal Resolver Contract address.

::: code-group
```ts [index.ts]
import { getEnsResolver } from '@wagmi/core'
import { normalize } from 'viem/ens'
import { config } from './config'

const ensResolver = await getEnsResolver(config, {
  name: normalize('wevm.eth'),
  universalResolverAddress: '0x74E20Bd2A1fE0cdbe45b9A1d89cb7e0a45b36376', // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Return Type

```ts
import { type GetEnsResolverReturnType } from '@wagmi/core'
```

`Address`

The address of the resolver.

## Error

```ts
import { type getEnsResolverError } from '@wagmi/core'
```

<!--@include: @shared/query-imports.md-->

## Viem

- [`getEnsResolver`](https://viem.sh/docs/ens/actions/getEnsResolver)
