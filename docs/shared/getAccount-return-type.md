<!--
<script setup>
const TVariables = 'TVariables'
</script>
-->

### address

`Address | undefined`

- Connected address from connector.
- Defaults to first address in [addresses](#addresses).

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

Boolean variables derived from [status](#status).

### status

`'connecting' | 'reconnecting' | 'connected' | 'disconnected'`

- `'connecting'` attempting to establish connection.
- `'reconnecting'` attempting to re-establish connection to one or more connectors.
- `'connected'` at least one connector is connected.
- `'disconnected'` no connection to any connector.

::: tip
You can use `status` to narrow the return type. For example, when `status` is `'connected'`:

```ts twoslash
import { type GetAccountReturnType } from '@wagmi/core'
const account = {} as GetAccountReturnType
// ---cut---
if (account.status === 'connected') {
  account
  // ^?
}
```
:::