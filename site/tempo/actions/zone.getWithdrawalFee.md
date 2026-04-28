# `zone.getWithdrawalFee`

Gets the withdrawal fee for a given gas limit.

::: info Requires viem >=2.48.0
Zone actions and hooks require `viem >=2.48.0`.
:::

## Usage

::: code-group

```ts [example.ts]
import { createConfig } from 'wagmi'
import { http as zoneHttp, zone } from 'viem/tempo/zones'

const zoneChain = zone(7)

const config = createConfig({
  chains: [zoneChain],
  multiInjectedProviderDiscovery: false,
  transports: {
    [zoneChain.id]: zoneHttp(),
  },
})

import { Actions } from 'wagmi/tempo'

const result = await Actions.zone.getWithdrawalFee(config, {
  chainId: zoneChain.id,
  gas: 21_000n,
})

console.log('Fee:', result)
// @log: Fee: 22000n
```

:::

## Return Type

`bigint`

The withdrawal fee for the provided gas limit.

## Parameters

### chainId (optional)

- **Type:** `number`

Zone chain ID to query. Useful when your Wagmi config supports more than one chain.

### gas (optional)

- **Type:** `bigint`

Gas limit reserved for the withdrawal callback on the parent chain.

## Viem

- [`zone.getWithdrawalFee`](https://viem.sh/tempo/actions/zone.getWithdrawalFee)
