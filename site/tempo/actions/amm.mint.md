# `amm.mint`

Mints liquidity tokens by providing a token pair. [Learn more about the Fee AMM](https://docs.tempo.xyz/protocol/fees/spec-fee-amm)

## Usage

::: code-group

```ts twoslash [example.ts]
// @twoslash-cache: {"v":1,"hash":"8c8d9e3a10d7fc7ac97a66b8da388430eb2e46abfa5de1aeb9fd7c017dfd2448","data":"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"}
// @filename: config.ts
// @errors: 2322
import type { Config } from 'wagmi'
export const config = {} as Config
// @filename: example.ts
// ---cut---
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

<<< @/snippets/react/config-tempo.ts{ts} [config.ts]

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
