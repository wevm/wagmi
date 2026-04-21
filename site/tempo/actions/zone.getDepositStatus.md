# `zone.getDepositStatus`

Gets deposit processing status for a Tempo block number.

This action expects the zone transport to already have an authorization token in storage. Use [`zone.signAuthorizationToken`](/tempo/actions/zone.signAuthorizationToken) first.

::: info Requires viem >=2.48.0
Zone actions and hooks require `viem >=2.48.0`.
:::

## Usage

::: code-group

```ts [example.ts]
import { createConfig } from 'wagmi'
import { KeyManager, webAuthn } from 'wagmi/tempo'
import { http as zoneHttp, zone } from 'viem/tempo/zones'

const zoneChain = zone(7)

const config = createConfig({
  connectors: [
    webAuthn({
      keyManager: KeyManager.localStorage(),
    }),
  ],
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

const result = await Actions.zone.getDepositStatus(config, {
  chainId: zoneChain.id,
  tempoBlockNumber: 42n,
})

console.log('Processed:', result.processed)
// @log: Processed: true
```

:::

## Return Type

```ts
type ReturnType = {
  deposits: readonly {
    amount: bigint
    depositHash: Hex
    kind: 'encrypted' | 'regular'
    memo: Hex | null
    recipient: Address | null
    sender: Address
    status: 'failed' | 'pending' | 'processed'
    token: Address
  }[]
  processed: boolean
  tempoBlockNumber: bigint
  zoneProcessedThrough: bigint
}
```

Deposit processing status for the requested Tempo block number.

## Parameters

### chainId (optional)

- **Type:** `number`

Zone chain ID to query. Useful when your Wagmi config supports more than one chain.

### tempoBlockNumber

- **Type:** `bigint`

Tempo block number to inspect for deposit processing.

## Viem

- [`zone.getDepositStatus`](https://viem.sh/tempo/actions/zone.getDepositStatus)
