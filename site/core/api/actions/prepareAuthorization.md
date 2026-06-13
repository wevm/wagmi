<script setup>
const packageName = '@wagmi/core'
const actionName = 'prepareAuthorization'
const typeName = 'PrepareAuthorization'
</script>

# prepareAuthorization

Action that prepares an [EIP-7702 Authorization](https://eips.ethereum.org/EIPS/eip-7702) for signing. This Action will fill the required fields of the Authorization object if they are not provided (e.g. `nonce` and `chainId`).

With the prepared Authorization object, you can use [signAuthorization](/core/api/actions/signAuthorization) to sign over it.

[Read more.](https://github.com/ethereum/EIPs/blob/9ab44b9534a848a21946d2afe9591767cd1522af/EIPS/eip-7702.md)

## Import

```ts
import { prepareAuthorization } from '@wagmi/core'
```

## Usage

::: code-group
```ts [index.ts]
import { prepareAuthorization } from '@wagmi/core'
import { config } from './config'

const authorization = await prepareAuthorization(config, {
  contractAddress: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Parameters

```ts
import { type PrepareAuthorizationParameters } from '@wagmi/core'
```

### account

`Account | Address | undefined`

Account to use to prepare the Authorization object.

::: code-group
```ts [index.ts]
import { prepareAuthorization } from '@wagmi/core'
import { config } from './config'

const authorization = await prepareAuthorization(config, {
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266", /' [!code focus]
  contractAddress: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### contractAddress

`Address`

The target Contract to designate onto the Account.

::: code-group
```ts [index.ts]
import { prepareAuthorization } from '@wagmi/core'
import { config } from './config'

const authorization = await prepareAuthorization(config, {
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  contractAddress: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### chainId

`config['chains'][number]['id'] | undefined`

The Chain ID to scope the Authorization to. If set to zero (`0`), then the Authorization will be valid on all chains.

::: code-group
```ts [index.ts]
import { prepareAuthorization } from '@wagmi/core'
import { config } from './config'

const authorization = await prepareAuthorization(config, {
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  contractAddress: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  chainId: 1, // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### nonce

`number | undefined`

The nonce to scope the Authorization to.

::: code-group
```ts [index.ts]
import { prepareAuthorization } from '@wagmi/core'
import { config } from './config'

const authorization = await prepareAuthorization(config, {
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  contractAddress: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  nonce: 69, // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### executor

`'self' | undefined`

Whether the EIP-7702 Transaction will be executed by the Account that signed the Authorization.

If not specified, it will be assumed that the EIP-7702 Transaction will be executed by another Account (ie. a relayer Account).

::: code-group
```ts [index.ts]
import { prepareAuthorization } from '@wagmi/core'
import { config } from './config'

const authorization = await prepareAuthorization(config, {
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  contractAddress: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  executor: 'self', // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Return Type

```ts
import { type PrepareAuthorizationReturnType } from '@wagmi/core'
```

`Authorization`

A prepared & unsigned Authorization object.

## Error

```ts
import { type PrepareAuthorizationErrorType } from '@wagmi/core'
```

## Viem

- [`prepareAuthorization`](https://viem.sh/docs/eip7702/prepareAuthorization)
