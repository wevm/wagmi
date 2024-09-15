# Chain Properties

Some chains support additional properties related to blocks and transactions. This is powered by Viem's [formatters](https://viem.sh/docs/clients/chains.html#formatters) and [serializers](https://viem.sh/docs/clients/chains.html#serializers). For example, Celo, ZkSync, OP Stack chains support all additional properties. In order to use these properties in a type-safe way, there are a few things you should be aware of.

## Narrowing Parameters

When you pass your `config` to an action, you are ready to access chain-specific properties! For example, Celo's `feeCurrency` is available.

::: code-group
```ts [index.ts]
import { parseEther } from 'viem'
import { simulateContract } from '@wagmi/core'
import { config } from './config'

const result = await simulateContract(config, {
  to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
  value: parseEther('0.01'),
  feeCurrency: '0x…', // [!code focus]
})
```
<<< @/snippets/core/config-chain-properties.ts[config.ts]
:::

This is great, but if you have multiple chains that support additional properties, your autocomplete could be overwhelmed with all of them. By setting the `chainId` property to a specific value (e.g. `celo.id`), you can narrow parameters to a single chain.

::: code-group
```ts [index.ts]
import { parseEther } from 'viem'
import { simulateContract } from '@wagmi/core'
import { celo } from 'wagmi/chains'

const result = await simulateContract({
  to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
  value: parseEther('0.01'),
  chainId: celo.id, // [!code focus]
  feeCurrency: '0x…', // [!code focus]
  // ^? (property) feeCurrency?: `0x${string}` | undefined // [!code focus]
})
```
<<< @/snippets/core/config-chain-properties.ts[config.ts]
:::

## Narrowing Return Types

Return types can also have chain-specific properties attached to them. There are a couple approaches for extracting these properties.

### `chainId` Parameter

Not only can you use the `chainId` parameter to [narrow parameters](#narrowing-parameters), you can also use it to narrow the return type.

::: code-group
```ts [index.tsx]
import { waitForTransactionReceipt } from '@wagmi/core'
import { zkSync } from '@wagmi/core/chains'

const result = await waitForTransactionReceipt({
  chainId: zkSync.id,
  hash: '0x16854fcdd0219cacf5aec5e4eb2154dac9e406578a1510a6fc48bd0b67e69ea9',
})

result.logs
//     ^? (property) logs: ZkSyncLog[] | undefined
```
<<< @/snippets/core/config-chain-properties.ts[config.ts]
:::

### `chainId` Data Property

Wagmi internally will set a `chainId` property on return types that you can use to narrow results. The `chainId` is determined from the `chainId` parameter or global state (e.g. connector). You can use this property to help TypeScript narrow the type.

::: code-group
```ts [index.tsx]
import { waitForTransactionReceipt } from '@wagmi/core'
import { zkSync } from '@wagmi/core/chains'

const result = await waitForTransactionReceipt({
  hash: '0x16854fcdd0219cacf5aec5e4eb2154dac9e406578a1510a6fc48bd0b67e69ea9',
})

if (result.chainId === zkSync.id) {
  result.logs
  //     ^? (property) logs: ZkSyncLog[] | undefined
}
```
<<< @/snippets/core/config-chain-properties.ts[config.ts]
:::

## Troubleshooting

If chain properties aren't working, make sure [TypeScript](/core/guides/faq#type-inference-doesn-t-work) is configured correctly. Not all chains have additional properties, to check which ones do, see the [Viem repo](https://github.com/wevm/viem/tree/main/src/chains) (chains that have a top-level directory under [`src/chains`](https://github.com/wevm/viem/tree/main/src/chains) support additional properties).

