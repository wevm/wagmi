# `zone.useWaitForTempoBlock`

Hook for waiting for a zone to import a Tempo block.

This hook expects a zone authorization token to already exist in storage. Use [`zone.useSignAuthorizationToken`](/tempo/hooks/zone.useSignAuthorizationToken) first.

## Usage

::: code-group
```ts [example.ts]
import { Hooks } from 'wagmi/tempo'
import { zone } from 'viem/tempo/zones'

const zoneChain = zone(7)

const { data: zoneInfo } = Hooks.zone.useWaitForTempoBlock({
  chainId: zoneChain.id,
  tempoBlockNumber: 42n,
})

console.log('Imported Tempo block:', zoneInfo?.tempoBlockNumber)
// @log: Imported Tempo block: 42n
```
:::

## Return Type

See [TanStack Query query docs](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery) for more info hook return types.

### data

See [Wagmi Action `zone.waitForTempoBlock` Return Type](/tempo/actions/zone.waitForTempoBlock#return-type)

## Parameters

See [Wagmi Action `zone.waitForTempoBlock` Parameters](/tempo/actions/zone.waitForTempoBlock#parameters)

### query

See the [TanStack Query query docs](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery) for more info hook parameters.

## Action

- [`zone.waitForTempoBlock`](/tempo/actions/zone.waitForTempoBlock)
