# `amm.mint`

Mints liquidity tokens by providing a token pair. [Learn more about the Fee AMM](https://docs.tempo.xyz/protocol/fees/spec-fee-amm)

## Usage

::: code-group

```ts twoslash [example.ts]
// @filename: config.ts
// @errors: 2322
import type { Config } from 'wagmi'
import { tempoTestnet } from 'wagmi/chains'
export const config = {} as Config<readonly [typeof tempoTestnet]>
// ---cut---
// @filename: example.ts
import { Actions } from 'wagmi/tempo'
import { parseUnits } from 'viem'
import { config } from './config'

const { liquidity, receipt } = await Actions.amm.mintSync(config, {
  to: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbb',
  userTokenAddress: '0x20c0000000000000000000000000000000000000',
  validatorTokenAddress: '0x20c0000000000000000000000000000000000001',
  validatorTokenAmount: parseUnits('100', 6),
})

console.log('Liquidity minted:', liquidity)
// @log: Liquidity minted: 100000000n
```

<<< @/snippets/core/config-tempo.ts{ts twoslash} [config.ts]

:::

### Asynchronous Usage

The example above uses a `*Sync` variant of the action, that will wait for the transaction to be included before returning.

If you are optimizing for performance, you should use the non-sync `amm.mint` action and wait for inclusion manually:

```ts
import { Actions as viem_Actions } from 'viem/tempo'
import { Actions } from 'wagmi/tempo'
import { waitForTransactionReceipt } from 'wagmi/actions'
import { parseUnits } from 'viem'

const hash = await Actions.amm.mint(config, {
  to: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbb',
  userTokenAddress: '0x20c0000000000000000000000000000000000000',
  validatorTokenAddress: '0x20c0000000000000000000000000000000000001',
  validatorTokenAmount: parseUnits('100', 6),
})
const receipt = await waitForTransactionReceipt(config, { hash })

const { args: { liquidity } } 
  = viem_Actions.amm.mint.extractEvent(receipt.logs)
```

## Return Type

```ts
type ReturnType = {
  /** Amount of user tokens provided */
  amountUserToken: bigint
  /** Amount of validator tokens provided */
  amountValidatorToken: bigint
  /** Amount of liquidity tokens minted */
  liquidity: bigint
  /** Transaction receipt */
  receipt: TransactionReceipt
  /** Address that initiated the mint */
  sender: Address
  /** Address of the user token */
  userToken: Address
  /** Address of the validator token */
  validatorToken: Address
}
```

## Parameters

### to

- **Type:** `Address`

Address to mint the liquidity tokens to.

### userTokenAddress

- **Type:** `Address | bigint`

User token address.

### validatorTokenAddress

- **Type:** `Address | bigint`

Validator token address.

### validatorTokenAmount

- **Type:** `bigint`

Amount of validator tokens to provide.

<!--@include: @shared/tempo-write-parameters.md-->

## Viem

- [`amm.mint`](https://viem.sh/tempo/actions/amm.mint)
