<script setup>
const packageName = '@wagmi/core'
const actionName = 'getEnsName'
const typeName = 'GetEnsName'
</script>

# getEnsName

Action for fetching primary ENS name for address.

## Import

```ts
import { getEnsName } from '@wagmi/core'
```

## Usage

::: code-group
```ts [index.ts]
import { getEnsName } from '@wagmi/core'
import { config } from './config'

const ensName = getEnsName(config, {
  address: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Parameters

```ts
import { type GetEnsNameParameters } from '@wagmi/core'
```

### address

`Address`

Address to get the name for.

::: code-group
```ts [index.ts]
import { getEnsName } from '@wagmi/core'
import { config } from './config'

const ensName = await getEnsName(config, {
  address: '0xd2135CfB216b74109775236E36d4b433F1DF507B', // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

---

### blockNumber

`bigint | undefined`

Block number to get name at.

::: code-group
```ts [index.ts]
import { getEnsName } from '@wagmi/core'
import { config } from './config'

const ensName = getEnsName(config, {
  address: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
  blockNumber: 17829139n, // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### blockTag

`'latest' | 'earliest' | 'pending' | 'safe' | 'finalized' | undefined`

Block tag to get name at.

::: code-group
```ts [index.ts]
import { getEnsName } from '@wagmi/core'
import { config } from './config'

const ensName = getEnsName(config, {
  address: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
  blockTag: 'latest', // [!code focus]
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
import { getEnsName } from '@wagmi/core'
import { mainnet } from '@wagmi/core/chains'
import { config } from './config'

const ensName = await getEnsName(config, {
  address: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
  chainId: mainnet.id, // [!code focus]
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
import { getEnsName } from '@wagmi/core'
import { config } from './config'

const ensName = await getEnsName(config, {
  address: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
  universalResolverName: '0x74E20Bd2A1fE0cdbe45b9A1d89cb7e0a45b36376', // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Return Type

```ts
import { type GetEnsNameReturnType } from '@wagmi/core'
```

`string | null`

The primary ENS name for the address. Returns `null` if address does not have primary name assigned.

## Error

```ts
import { type GetEnsNameErrorType } from '@wagmi/core'
```

<!--@include: @shared/query-imports.md-->

## Viem

- [`getEnsName`](https://viem.sh/docs/ens/actions/getEnsName)
