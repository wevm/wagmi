<script setup>
const packageName = '@wagmi/core'
const actionName = 'signAuthorization'
const typeName = 'SignAuthorization'
</script>

# signAuthorization

Action that signs an [EIP-7702 Authorization](https://eips.ethereum.org/EIPS/eip-7702). The signed Authorization can be used in Transaction APIs like [sendTransaction](/core/api/actions/sendTransaction) and [writeContract](/core/api/actions/writeContract) to inject the authorized Contract bytecode(s) into an Account at the time of execution.

[Read more.](https://github.com/ethereum/EIPs/blob/9ab44b9534a848a21946d2afe9591767cd1522af/EIPS/eip-7702.md)

## Import

```ts
import { signAuthorization } from '@wagmi/core'
```

## Usage

::: code-group
```ts [index.ts]
import { privateKeyToAccount } from 'viem/accounts'
import { signAuthorization } from '@wagmi/core'
import { config } from './config'

const authorization = await signAuthorization(config, {
  account: privateKeyToAccount('0x...'),
  contractAddress: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Parameters

```ts
import { type SignAuthorizationParameters } from '@wagmi/core'
```

### account

`Account`

Account to use to authorize injection of the Contract (authorization) onto the Account.

::: code-group
```ts [index.ts]
import { privateKeyToAccount } from 'viem/accounts'
import { signAuthorization } from '@wagmi/core'
import { config } from './config'

const authorization = await signAuthorization(config, {
  account: privateKeyToAccount('0x...'), // [!code focus]
  contractAddress: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### chainId

`config['chains'][number]['id'] | undefined`

The Chain ID to scope the Authorization to.

::: code-group
```ts [index.ts]
import { privateKeyToAccount } from 'viem/accounts'
import { signAuthorization } from '@wagmi/core'
import { config } from './config'

const authorization = await signAuthorization(config, {
  account: privateKeyToAccount('0x...'),
  contractAddress: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  chainId: 1, // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### contractAddress

`Address`

The target Contract to inject onto the Account.

::: code-group
```ts [index.ts]
import { privateKeyToAccount } from 'viem/accounts'
import { signAuthorization } from '@wagmi/core'
import { config } from './config'

const authorization = await signAuthorization(config, {
  account: privateKeyToAccount('0x...'),
  contractAddress: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### delegate

`true | Address | Account | undefined`

Whether the EIP-7702 Transaction will be executed by another Account.

If not specified, it will be assumed that the EIP-7702 Transaction will be executed by the Account that signed the Authorization.

::: code-group
```ts [index.ts]
import { privateKeyToAccount } from 'viem/accounts'
import { signAuthorization } from '@wagmi/core'
import { config } from './config'

const authorization = await signAuthorization(config, {
  account: privateKeyToAccount('0x...'),
  contractAddress: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  delegate: true, // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### nonce

`Address | undefined`

The nonce to scope the Authorization to.

::: code-group
```ts [index.ts]
import { privateKeyToAccount } from 'viem/accounts'
import { signAuthorization } from '@wagmi/core'
import { config } from './config'

const authorization = await signAuthorization(config, {
  account: privateKeyToAccount('0x...'),
  contractAddress: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  nonce: 69, // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### connector

`Connector | undefined`

Connector to use to sign the Authorization.

::: code-group
```ts [index.ts]
import { privateKeyToAccount } from 'viem/accounts'
import { getConnections, signAuthorization } from '@wagmi/core'
import { config } from './config'

const connections = getConnections(config)
const authorization = await signAuthorization(config, {
  account: privateKeyToAccount('0x...'),
  contractAddress: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  connector: connections[0]?.connector, // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Return Type

```ts
import { type SignAuthorizationReturnType } from '@wagmi/core'
```

`SignedAuthorization`

A signed Authorization object.

## Error

```ts
import { type SignAuthorizationErrorType } from '@wagmi/core'
```

<!--@include: @shared/mutation-imports.md-->

## Viem

- [`signAuthorization`](https://viem.sh/docs/actions/wallet/signAuthorization)
