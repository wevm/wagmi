# Config Options

Configuration options for Wagmi CLI.

## contracts

`ContractConfig[] | undefined`

Array of contracts to use when running [commands](/cli/api/commands). `abi` and `name` are required, all other properties are optional.

### address

`Address | Record<chainId, Address> | undefined`

Contract address or addresses. Accepts an object `{ [chainId]: address }` for targeting specific chains.

::: code-group
```ts {6,11-14} [wagmi.config.ts]
export default {
  out: 'src/generated.ts',
  contracts: [
    {
      abi: […],
      address: '0x…',
      name: 'MyCoolContract',
    },
    {
      abi: […],
      address: {
        1: '0xfoo…',
        5: '0xbar…',
      },
      name: 'MyCoolMultichainContract'
    }
  ],
}
```
:::

### abi

`Abi`

ABI for contract. Used by [plugins](/cli/api/plugins) to generate code base on properties.

::: code-group
```ts {5} [wagmi.config.ts]
export default {
  out: 'src/generated.ts',
  contracts: [
    {
      abi: […],
      name: 'MyCoolContract'
    },
  ],
}
```
:::

### name

`string`

Name of contract. Must be unique. Used by [plugins](/cli/api/plugins) to name generated code.

::: code-group
```ts {6} [wagmi.config.ts]
export default {
  out: 'src/generated.ts',
  contracts: [
    {
      abi: […],
      name: 'MyCoolContract'
    },
  ],
}
```
:::

## out

`string`

Path to output generated code. Must be unique per config. Use an [Array Config](/cli/config/configuring-cli#array-config) for multiple outputs.

::: code-group
```ts {2} [wagmi.config.ts]
export default {
  out: 'src/generated.ts',
  contracts: [
    {
      abi: […],
      name: 'MyCoolContract'
    },
  ],
}
```
:::

## plugins

`Plugin[] | undefined`

Plugins to use and their configuration.

Wagmi CLI has multiple [built-in plugins](/cli/api/plugins) that are used to manage ABIs, generate code, etc.

::: code-group
```ts {1,5-20} [wagmi.config.ts]
import { etherscan, react } from '@wagmi/cli/plugins'

export default {
  out: 'src/generated.js',
  plugins: [
    etherscan({
      apiKey: process.env.ETHERSCAN_API_KEY,
      chainId: 5,
      contracts: [
        {
          name: 'EnsRegistry',
          address: {
            1: '0x314159265dd8dbb310642f98f50c066173c1259b',
            5: '0x112234455c3a32fd11230c42e7bccd4a84e02010',
          },
        },
      ],
    }),
    react(),
  ],
}
```
:::
