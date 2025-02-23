## Create Chain

Import the `Chain` type from Viem and create a new object that is asserted `as const` and `satisfies` the type. You can also use the `defineChain` function from Viem.

::: code-group
```ts twoslash [as const satisfies Chain]
// @errors: 1360
import { type Chain } from 'viem'

export const mainnet = {} as const satisfies Chain
```
```ts twoslash [defineChain]
// @errors: 2345
import { defineChain } from 'viem'

export const mainnet = defineChain({})
```
:::

Now, add the missing required properties to the object until the error goes away.

::: code-group
```ts twoslash [as const satisfies Chain]
import { type Chain } from 'viem'

export const mainnet = {
  id: 1,
  name: 'Ethereum',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://eth.merkle.io'] },
  },
  blockExplorers: {
    default: { name: 'Etherscan', url: 'https://etherscan.io' },
  },
  contracts: {
    ensRegistry: {
      address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
    },
    ensUniversalResolver: {
      address: '0xE4Acdd618deED4e6d2f03b9bf62dc6118FC9A4da',
      blockCreated: 16773775,
    },
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 14353601,
    },
  },
} as const satisfies Chain
```
```ts twoslash [defineChain]
import { defineChain } from 'viem'

export const mainnet = defineChain({
  id: 1,
  name: 'Ethereum',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://eth.merkle.io'] },
  },
  blockExplorers: {
    default: { name: 'Etherscan', url: 'https://etherscan.io' },
  },
  contracts: {
    ensRegistry: {
      address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
    },
    ensUniversalResolver: {
      address: '0xE4Acdd618deED4e6d2f03b9bf62dc6118FC9A4da',
      blockCreated: 16773775,
    },
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 14353601,
    },
  },
})
```
:::

The more properties you add, the better the chain will be to use with Wagmi. Most of these attributes exist within the [`ethereum-lists/chains` repository](https://github.com/ethereum-lists/chains/tree/3fbd4eeac7ce116579634bd042b84e2b1d89886a/_data/chains).

- `id`: The chain ID for the network. This can be found by typing the network name into [ChainList](https://chainlist.org). Example: "Ethereum Mainnet" has a Chain ID of `1`.
- `name`: Human-readable name for the chain. Example: "Ethereum Mainnet"
- `nativeCurrency`: The native currency of the chain. Found from [`ethereum-lists/chains`](https://github.com/ethereum-lists/chains/blob/3fbd4eeac7ce116579634bd042b84e2b1d89886a/_data/chains/eip155-56.json#L20-L24).
- `rpcUrls`: At least one public, credible RPC URL. Found from [`ethereum-lists/chains`](https://github.com/ethereum-lists/chains/blob/3fbd4eeac7ce116579634bd042b84e2b1d89886a/_data/chains/eip155-56.json#L4-L18).
- `blockExplorers`: A set of block explorers for the chain. Found from [`ethereum-lists/chains`](https://github.com/ethereum-lists/chains/blob/3fbd4eeac7ce116579634bd042b84e2b1d89886a/_data/chains/eip155-56.json#L30-L36).
- `contracts`: A set of deployed contracts for the chain. If you are deploying one of the following contracts yourself, make sure it is verified.
  - `multicall3` is optional, but it's address is most likely `0xca11bde05977b3631167028862be2a173976ca11` – you can find the deployed block number on the block explorer. Check out [`mds1/multicall`](https://github.com/mds1/multicall#multicall3-contract-addresses) for more info.
  - `ensRegistry` is optional – not all Chains have a ENS Registry. See [ENS Deployments](https://docs.ens.domains/ens-deployments) for more info.
  - `ensUniversalResolver` is optional – not all Chains have a ENS Universal Resolver.
- `sourceId`: Source Chain ID (e.g. the L1 chain).
- `testnet`: Whether or not the chain is a testnet.