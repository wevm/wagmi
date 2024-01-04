<script setup>
const packageName = '@wagmi/core'
const actionName = 'signMessage'
const typeName = 'signMessage'
</script>

# signMessage

Action for signing messages.

## Import

```ts
import { signMessage } from '@wagmi/core'
```

## Usage

::: code-group
```ts [index.ts]
import { signMessage } from '@wagmi/core'
import { config } from './config'

await signMessage(config, { message: 'hello world' })
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Parameters

```ts
import { type SignMessageParameters } from '@wagmi/core'
```

### account

`Address | Account | undefined`

Account to use when signing message. Throws if account is not found on [`connector`](#connector).

::: code-group
```ts [index.ts]
import { signMessage } from '@wagmi/core'
import { config } from './config'

const result = await signMessage(config, {
  account: '0xd2135CfB216b74109775236E36d4b433F1DF507B', // [!code focus]
  message: 'hello world',
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### connector

`Connector | undefined`

[Connector](/core/api/connectors) to sign message with.

::: code-group
```ts [index.ts]
import { getAccount, signMessage } from '@wagmi/core'
import { config } from './config'

const { connector } = getAccount(config)
const result = await signMessage(config, {
  connector, // [!code focus]
  message: 'hello world',
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### message

`string | { raw: Hex | ByteArray }`

Message to sign.

::: code-group
```ts [index.ts]
import { signMessage } from '@wagmi/core'
import { config } from './config'

const result = await signMessage(config, {
  message: 'hello world', // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

::: tip
By default, viem signs the UTF-8 representation of the message. To sign the data representation of the message, you can use the `raw` attribute.

```ts
import { signMessage } from '@wagmi/core'
import { config } from './config'

const result = await signMessage(config, {
  message: { raw: '0x68656c6c6f20776f726c64' }, // [!code focus]
})
```
:::

## Return Type

```ts
import { type SignMessageReturnType } from '@wagmi/core'
```

[`Hex`](https://viem.sh/docs/glossary/types.html#hex)

The signed message.

## Error

```ts
import { type SignMessageErrorType } from '@wagmi/core'
```

<!--@include: @shared/mutation-imports.md-->

## Viem

- [`signMessage`](https://viem.sh/docs/actions/wallet/signMessage.html)
