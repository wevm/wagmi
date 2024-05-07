<script setup>
const packageName = '@wagmi/core'
const actionName = 'getEnsAddress'
const typeName = 'GetEnsAddress'
</script>

# getEnsAddress

Action for fetching ENS address for name.

## Import

```ts
import { getEnsAddress } from '@wagmi/core'
```

## Usage

::: code-group
```ts [index.ts]
import { getEnsAddress } from '@wagmi/core'
import { normalize } from 'viem/ens'
import { config } from './config'

const ensAddress = getEnsAddress(config, {
  name: normalize('wevm.eth'),
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

::: warning
Since ENS names prohibit certain forbidden characters (e.g. underscore) and have other validation rules, you likely want to [normalize ENS names](https://docs.ens.domains/contract-api-reference/name-processing#normalising-names) with [UTS-46 normalization](https://unicode.org/reports/tr46) before passing them to `getEnsAddress`. You can use Viem's built-in [`normalize`](https://viem.sh/docs/ens/utilities/normalize) function for this.
:::

## Parameters

```ts
import { type GetEnsAddressParameters } from '@wagmi/core'
```

---

### blockNumber

`bigint | undefined`

Block number to get ENS address at.

::: code-group
```ts [index.ts]
import { getEnsAddress } from '@wagmi/core'
import { normalize } from 'viem/ens'
import { config } from './config'

const ensAddress = getEnsAddress(config, {
  blockNumber: 17829139n, // [!code focus]
  name: normalize('wevm.eth'),
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### blockTag

`'latest' | 'earliest' | 'pending' | 'safe' | 'finalized' | undefined`

Block tag to get ENS address at.

::: code-group
```ts [index.ts]
import { getEnsAddress } from '@wagmi/core'
import { normalize } from 'viem/ens'
import { config } from './config'

const ensAddress = getEnsAddress(config, {
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
import { getEnsAddress } from '@wagmi/core'
import { mainnet } from '@wagmi/core/chains'
import { normalize } from 'viem/ens'
import { config } from './config'

const ensAddress = await getEnsAddress(config, {
  chainId: mainnet.id, // [!code focus]
  name: normalize('wevm.eth'),
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### coinType

`number | undefined`

The [ENSIP-9](https://docs.ens.domains/ens-improvement-proposals/ensip-9-multichain-address-resolution) coin type to fetch the address for.

::: code-group
```ts [index.ts]
import { getEnsAddress } from '@wagmi/core'
import { normalize } from 'viem/ens'
import { config } from './config'

const ensAddress = await getEnsAddress(config, {
  coinType: 60, // [!code focus]
  name: normalize('wevm.eth'),
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### name

`string`

Name to get the address for.

::: code-group
```ts [index.ts]
import { getEnsAddress } from '@wagmi/core'
import { normalize } from 'viem/ens'
import { config } from './config'

const ensAddress = await getEnsAddress(config, {
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
import { getEnsAddress } from '@wagmi/core'
import { normalize } from 'viem/ens'
import { config } from './config'

const ensAddress = await getEnsAddress(config, {
  name: normalize('wevm.eth'),
  universalResolverAddress: '0x74E20Bd2A1fE0cdbe45b9A1d89cb7e0a45b36376', // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Return Type

```ts
import { type GetEnsAddressReturnType } from '@wagmi/core'
```

`string`

ENS address.

## Error

```ts
import { type GetEnsAddressErrorType } from '@wagmi/core'
```

<!--@include: @shared/query-imports.md-->

## Viem

- [`getEnsAddress`](https://viem.sh/docs/ens/actions/getEnsAddress.html)
