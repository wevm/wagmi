<script setup>
const packageName = '@wagmi/core'
const actionName = 'getPermissions'
const typeName = 'getPermissions'
</script>

# getPermissions

Action getting the connected wallet's current permissions.

## Import

```ts
import { getPermissions } from '@wagmi/core'
```

## Usage

::: code-group
```ts [index.ts]
import { getPermissions } from '@wagmi/core'
import { config } from './config'

const permissions = await getPermissions(config)
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Parameters

```ts
import { type GetPermissionsParameters } from '@wagmi/core'
```

### chainId

`config['chains'][number]['id'] | undefined`

The ID of chain to get the wallet's permissions for.

::: code-group
```ts [index.ts]
import { getPermissions } from '@wagmi/core'
import { config } from './config'
import { optimism } from '@wagmi/core/chains'

const permissions = await getPermissions(config, {
  chainId: optimism.id, // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### connector

`Connector | undefined`

[Connector](/core/api/connectors) to get permissions for.

::: code-group
```ts [index.ts]
import { getPermissions } from '@wagmi/core'
import { config } from './config'
import { optimism } from '@wagmi/core/chains'

const { connector } = getAccount(config)
const permissions = await getPermissions(config, {
  connector, // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Return Type

```ts
import { type GetPermissionsReturnType } from '@wagmi/core'
```

[`WalletPermission[]`](https://viem.sh/docs/glossary/types#walletpermission)

The wallet permissions.

## Error

```ts
import { type GetPermissionsErrorType } from '@wagmi/core'
```

<!--@include: @shared/query-imports.md-->

## Viem

- [`getPermissions`](https://viem.sh/docs/actions/wallet/getPermissions.html)
