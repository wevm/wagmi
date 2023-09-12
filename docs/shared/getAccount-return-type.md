<!--
<script setup>
const TVariables = 'TVariables'
</script>
-->

### address

`Address | undefined`

- Connected address from connector.
- Defaults to first address in [`addresses`](#addresses).

### addresses

`readonly Address[] | undefined`

Connected addresses from connector.

### chainId

`number | undefined`

Connected chain id from connector.

### connector

`Connector | undefined`

Connected connector.

### isConnecting / isReconnecting / isConnected / isDisconnected

`boolean`

Boolean variables derived from [`status`](#status).

### status

`'connecting' | 'reconnecting' | 'connected' | 'disconnected'`

- `'connecting'` attempting to establish connection.
- `'reconnecting'` attempting to re-establish connection to one or more connectors.
- `'connected'` at least one connector is connected.
- `'disconnected'` no connection to any connector.

::: tip
You can use `status` to narrow the return type. For example, when `status` is `'connected'` properties like `address` are guaranteed to be defined.

```ts twoslash
import { type GetAccountReturnType } from '@wagmi/core'
const account = {} as GetAccountReturnType
// ---cut---
if (account.status === 'connected') {
  account
  // ^?
}
```

Or when status is `'disconnected'` properties like `address` are guaranteed to be `undefined`:

```ts twoslash
import { type GetAccountReturnType } from '@wagmi/core'
const account = {} as GetAccountReturnType
// ---cut---
if (account.status === 'disconnected') {
  account
  // ^?
}
```
:::