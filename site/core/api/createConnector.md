# createConnector

Creates new [`CreateConnectorFn`](#parameters).

## Import

```ts
import { createConnector } from '@wagmi/core'
```

## Usage

```ts
import { createConnector } from '@wagmi/core'

export type InjectedParameters = {}

export function injected(parameters: InjectedParameters = {}) {
  return createConnector((config) => ({
    // ...
  }))
}
```

## Parameters

```ts
import { type CreateConnectorFn } from '@wagmi/core'
```

Read [Creating Connectors](/dev/creating-connectors) for more info on the `CreateConnectorFn` type.

The connector setup function receives a config object with Wagmi internals such as `chains`, `emitter`, `providers`, and `storage`.

### providers

`readonly EIP6963ProviderDetail[]`

Discovered [EIP-6963](https://eips.ethereum.org/EIPS/eip-6963) providers matching the connector's `rdns`. Empty if `multiInjectedProviderDiscovery` is disabled or no matching providers are discovered.
