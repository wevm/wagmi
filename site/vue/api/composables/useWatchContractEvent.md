# useWatchContractEvent

Composable that watches and returns emitted contract event logs.

## Import

```ts
import { useWatchContractEvent } from '@wagmi/vue'
```

## Usage

::: code-group
```ts [index.vue]
<script setup lang="ts">
import { useWatchContractEvent } from '@wagmi/vue'
import { abi } from './abi'

useWatchContractEvent({
  address: '0x6b175474e89094c44da98b954eedeac495271d0f',
  abi,
  eventName: 'Transfer',
  onLogs(logs) {
    console.log('New logs!', logs)
  },
})
</script>
```
<<< @/snippets/abi-event.ts[abi.ts]
<<< @/snippets/vue/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseWatchContractEventParameters } from '@wagmi/vue'
```

### abi

`Abi`

The contract's ABI. Check out the [TypeScript docs](/vue/typescript#const-assert-abis-typed-data) for how to set up ABIs for maximum type inference and safety.

### address

`Address | undefined`

The contract's address.

### args

`object | readonly unknown[] | undefined`

- Arguments to pass when calling the contract.
- Inferred from [`abi`](#abi) and [`eventName`](#eventname).

### batch

`boolean | undefined`

- Whether or not the events should be batched on each invocation.
- Defaults to `true`.

### chainId

`config['chains'][number]['id'] | undefined`

ID of chain to use when fetching data.

### config

`Config | undefined`

[`Config`](/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](/react/api/WagmiProvider).

### eventName

`string`

- Event to listen for the contract.
- Inferred from [`abi`](#abi).

### onError

`((error: Error) => void) | undefined`

Error thrown from getting the block number.

### onLogs

`(logs: Log[], prevLogs: Log[] | undefined) => void`

Callback for when logs changes.

### poll

`boolean | undefined`

- Whether or not to use a polling mechanism to check for new blocks instead of a WebSocket subscription.
- Defaults to `false` for WebSocket Clients, and `true` for non-WebSocket Clients.

### pollingInterval

`number | undefined`

- Polling frequency (in milliseconds).
- Defaults to the [Config's `pollingInterval` config](/core/api/createConfig#pollinginterval).

### strict

`boolean | undefined`

- Defaults to `false`.

### syncConnectedChain

`boolean | undefined`

- Set up subscriber for connected chain changes.
- Defaults to [`Config['syncConnectedChain']`](/core/api/createConfig#syncconnectedchain).

## Return Type

```ts
import { type UseWatchContractEventReturnType } from '@wagmi/vue'
```

Hook returns `void`

## Action

- [`watchContractEvent`](/core/api/actions/watchContractEvent)

