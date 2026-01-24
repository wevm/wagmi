<script setup>
const packageName = '@wagmi/core'
const actionName = 'requestPermissions'
const typeName = 'RequestPermissions'
</script>

# requestPermissions

Action for requesting permissions for a wallet.

## Import

```ts
import { requestPermissions } from '@wagmi/core'
```

## Usage

::: code-group
```ts [index.ts]
import { requestPermissions } from '@wagmi/core'
import { config } from './config'

const permissions = await requestPermissions(config,  {
  eth_accounts: {}
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Parameters

```ts
import { type RequestPermissionsParameters } from '@wagmi/core'
```

### connector

`Connector | undefined`

[Connector](/core/api/connectors) to request permissions from.

::: code-group
```ts [index.ts]
import { getAccount, requestPermissions } from '@wagmi/core'
import { config } from './config'

const { connector } = getAccount(config)
const permissions = await requestPermissions(config, {
  connector, // [!code focus]
  eth_accounts: {}
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Return Type

```ts
import { type RequestPermissionsReturnType } from '@wagmi/core'
```

[`WalletPermission[]`](https://viem.sh/docs/glossary/types#walletpermission)

The wallet permissions.

## Error

```ts
import { type RequestPermissionsErrorType } from '@wagmi/core'
```

<!--@include: @shared/mutation-imports.md-->

## Viem

- [`requestPermissions`](https://viem.sh/docs/actions/wallet/requestPermissions.html)

