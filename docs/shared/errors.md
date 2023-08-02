<!--
<script setup>
const docsPath = 'react'
const packageName = 'wagmi'
</script>
-->

## BaseError

Error class extended by all errors.

```ts-vue
import { BaseError } from '{{packageName}}'
```

## Config

### ChainMismatchError

When the connector chain is not the same as the one specified. For example, you want to send a transaction using Chain X, but Chain Y is what the connector is connected to.

```ts-vue
import { ChainMismatchError } from '{{packageName}}'
```

### ChainNotConfiguredError

When a chain is not configured. You likely need to add the chain to <a :href="`/${docsPath}}/createConfig#chains`">`Config['chains']`</a>.

```ts-vue
import { ChainNotConfiguredError } from '{{packageName}}'
```

### ConnectorAlreadyConnectedError

When a connector is already connected.

```ts-vue
import { ConnectorAlreadyConnectedError } from '{{packageName}}'
```

### ConnectorNotFoundError

When a connector is not found or able to be used.

```ts-vue
import { ConnectorNotFoundError } from '{{packageName}}'
```

## Connector

### ProviderNotFoundError

When a connector's provider is not found or able to be used.

```ts-vue
import { ProviderNotFoundError } from '{{packageName}}'
```

### SwitchChainNotSupportedError

When switching chains is not supported by connectors.

```ts-vue
import { SwitchChainNotSupportedError } from '{{packageName}}'
```
