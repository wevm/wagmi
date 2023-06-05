# switchAccount

Action for switching accounts with [connectors](/core/connectors).

## Import

```ts
import { switchAccount } from '@wagmi/core'
```

## Usage

::: code-group
```ts [index.ts]
import { switchAccount } from '@wagmi/core'
import { injected } from '@wagmi/connectors'
import { config } from './config'

const result = await switchAccount(
  config,
  { connector: injected() },
)
```
<<< snippets/core/config.ts[config.ts]
:::

## Parameters

```ts
import { type SwitchAccountParameters } from '@wagmi/core'
```

### connector

`Connector`

[Connector](/core/connectors) to switch to.

::: code-group
```ts [index.ts]
import { switchAccount } from '@wagmi/core'
import { injected } from '@wagmi/connectors'
import { config } from './config'

const result = await switchAccount(
  config,
  {
    connector: injected(), // [!code focus]
  },
)
```
<<< snippets/core/config.ts[config.ts]
:::

## Error

```ts
import { type SwitchAccountError } from '@wagmi/core'
```

## TanStack Query

```ts
import {
  type SwitchAccountMutationData,
  type SwitchAccountMutationVariables,
  type SwitchAccountMutationParameters,
  switchAccountMutationOptions,
} from '@wagmi/core'
```