# `zone.waitForTempoBlock`

Waits for a zone to import a Tempo block.

This action expects the zone transport to already have an authorization token in storage. Use [`zone.signAuthorizationToken`](/tempo/actions/zone.signAuthorizationToken) first.

## Usage

::: code-group

```ts [example.ts]
import { createConfig } from 'wagmi'
import { webAuthn } from 'wagmi/tempo'
import { http as zoneHttp, zone } from 'viem/tempo/zones'

const zoneChain = zone(7)

const config = createConfig({
  connectors: [webAuthn()],
  chains: [zoneChain],
  multiInjectedProviderDiscovery: false,
  transports: {
    [zoneChain.id]: zoneHttp(),
  },
})

import { Actions } from 'wagmi/tempo'

await Actions.zone.signAuthorizationToken(config, {
  chainId: zoneChain.id,
})

const info = await Actions.zone.waitForTempoBlock(config, {
  chainId: zoneChain.id,
  tempoBlockNumber: 42n,
})

console.log('Imported Tempo block:', info.tempoBlockNumber)
// @log: Imported Tempo block: 42n
```

:::

## Return Type

```ts
type ReturnType = {
  chainId: number
  sequencer: Address
  tempoBlockNumber: bigint
  zoneId: number
  zoneTokens: readonly Address[]
}
```

Zone metadata after the requested Tempo block has been imported.

## Parameters

### tempoBlockNumber

- **Type:** `bigint`

Tempo block number to wait for.

### chainId (optional)

- **Type:** `number`

Zone chain ID to query. Useful when your Wagmi config supports more than one chain.

### pollingInterval (optional)

- **Type:** `number`
- **Default:** Client polling interval

Polling frequency in milliseconds.

### timeout (optional)

- **Type:** `number`
- **Default:** `60_000`

Timeout in milliseconds.

## Viem

- [`zone.waitForTempoBlock`](https://viem.sh/tempo/actions/zone.waitForTempoBlock)
