# `KeyManager.http`

Manages public key registrations remotely on a server.

## Usage

```ts [wagmi.config.ts]
import { createConfig, http } from 'wagmi'
import { tempoTestnet } from 'wagmi/chains'
import { KeyManager, webAuthn } from 'wagmi/tempo' // [!code focus]

export const config = createConfig({
  connectors: [webAuthn({
    keyManager: KeyManager.http('/keys'), // [!code focus]
  })],
  chains: [tempoTestnet],
  multiInjectedProviderDiscovery: false,
  transports: {
    [tempoTestnet.id]: http(),
  },
})
```

::: tip
In order for the above code snippet to work, you need to have a server running at the provided URL. Below
is an example using a [Cloudflare Worker](https://developers.cloudflare.com/workers) (but can work with any server runtime).

[See more](https://docs.tempo.xyz/sdk/typescript/server/handler.keyManager)

```ts 
import { env } from 'cloudflare:workers'
import { Handler, Kv } from 'tempo.ts/server'

export default {
  fetch(request) {
    return Handler.keyManager({
      kv: Kv.cloudflare(env.KEY_STORE),
      path: '/keys',
    }).fetch(request)
  },
} satisfies ExportedHandler<Env>
```
:::

## Parameters

### url 

- **Type:** `string`

URL to the key manager server.

### options

#### options.fetch

- **Type:** `typeof globalThis.fetch`
- **Default:** `globalThis.fetch`

Fetch function to use for the key manager server.
