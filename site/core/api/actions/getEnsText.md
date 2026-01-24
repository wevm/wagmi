<script setup>
const packageName = '@wagmi/core'
const actionName = 'getEnsText'
const typeName = 'GetEnsText'
</script>

# getEnsText

Action for fetching a text record for a specified ENS name and key.

## Import

```ts
import { getEnsText } from '@wagmi/core'
```

## Usage

::: code-group
```ts [index.ts]
import { getEnsText } from '@wagmi/core'
import { normalize } from 'viem/ens'
import { config } from './config'

const ensText = getEnsText(config, {
  name: normalize('wevm.eth'),
  key: 'com.twitter',
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

::: warning
Since ENS names prohibit certain forbidden characters (e.g. underscore) and have other validation rules, you likely want to [normalize ENS names](https://docs.ens.domains/contract-api-reference/name-processing#normalising-names) with [UTS-46 normalization](https://unicode.org/reports/tr46) before passing them to `getEnsText`. You can use Viem's built-in [`normalize`](https://viem.sh/docs/ens/utilities/normalize) function for this.
:::

## Parameters

```ts
import { type GetEnsTextParameters } from '@wagmi/core'
```

---

### blockNumber

`bigint | undefined`

Block number to get the text at.

::: code-group
```ts [index.ts]
import { getEnsText } from '@wagmi/core'
import { normalize } from 'viem/ens'
import { config } from './config'

const ensText = getEnsText(config, {
  blockNumber: 17829139n, // [!code focus]
  name: normalize('wevm.eth'),
  key: 'com.twitter',
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### blockTag

`'latest' | 'earliest' | 'pending' | 'safe' | 'finalized' | undefined`

Block tag to get the text at.

::: code-group
```ts [index.ts]
import { getEnsText } from '@wagmi/core'
import { normalize } from 'viem/ens'
import { config } from './config'

const ensText = getEnsText(config, {
  blockTag: 'latest', // [!code focus]
  name: normalize('wevm.eth'),
  key: 'com.twitter',
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
import { getEnsText } from '@wagmi/core'
import { mainnet } from '@wagmi/core/chains'
import { normalize } from 'viem/ens'
import { config } from './config'

const ensText = await getEnsText(config, {
  chainId: mainnet.id, // [!code focus]
  name: normalize('wevm.eth'),
  key: 'com.twitter',
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### key

`string`

ENS key to get Text for.

::: code-group
```ts [index.ts]
import { getEnsText } from '@wagmi/core'
import { normalize } from 'viem/ens'
import { config } from './config'

const ensText = await getEnsText(config, {
  name: normalize('wevm.eth'),
  key: 'com.twitter', // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### name

`string`

Name to get the text for.

::: code-group
```ts [index.ts]
import { getEnsText } from '@wagmi/core'
import { normalize } from 'viem/ens'
import { config } from './config'

const ensText = await getEnsText(config, {
  name: normalize('wevm.eth'), // [!code focus]
  key: 'com.twitter',
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
import { getEnsText } from '@wagmi/core'
import { normalize } from 'viem/ens'
import { config } from './config'

const ensText = await getEnsText(config, {
  name: normalize('wevm.eth'),
  key: 'com.twitter',
  universalResolverAddress: '0x74E20Bd2A1fE0cdbe45b9A1d89cb7e0a45b36376', // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Return Type

```ts
import { type GetEnsTextReturnType } from '@wagmi/core'
```

`string | null`

The text record for ENS name.

Returns `null` if name does not have text assigned.

## Error

```ts
import { type getEnsTextError } from '@wagmi/core'
```

<!--@include: @shared/query-imports.md-->

## Viem

- [`getEnsText`](https://viem.sh/docs/ens/actions/getEnsText)
