# `amm.burn`

Burns liquidity tokens and receives the underlying token pair. [Learn more about the Fee AMM](https://docs.tempo.xyz/protocol/fees/spec-fee-amm)

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

const { amountUserToken, amountValidatorToken, receipt } =
  await Actions.amm.burnSync(config, {
    liquidity: parseUnits('10.5', 18),
    to: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbb',
    userToken: '0x20c0000000000000000000000000000000000000',
    validatorToken: '0x20c0000000000000000000000000000000000001',
  })

console.log('Received user tokens:', amountUserToken)
// @log: Received user tokens: 5250000000000000000n
console.log('Received validator tokens:', amountValidatorToken)
// @log: Received validator tokens: 5250000000000000000n
```
<<< @/snippets/core/config-tempo.ts{ts twoslash} [config.ts]
:::

### Asynchronous Usage

The example above uses a `*Sync` variant of the action, that will wait for the transaction to be included before returning.

If you are optimizing for performance, you should use the non-sync `amm.burn` action and wait for inclusion manually:

```ts
import { Actions as viem_Actions } from 'viem/tempo'
import { Actions } from 'wagmi/tempo'
import { waitForTransactionReceipt } from 'wagmi/actions'
import { parseUnits } from 'viem'

const hash = await Actions.amm.burn(config, {
  liquidity: parseUnits('10.5', 18),
  to: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbb',
  userToken: '0x20c0000000000000000000000000000000000000',
  validatorToken: '0x20c0000000000000000000000000000000000001',
})
const receipt = await waitForTransactionReceipt(config, { hash })

const { args: { amountUserToken, amountValidatorToken } } 
  = viem_Actions.amm.burn.extractEvent(receipt.logs)
```

## Return Type

```ts
type ReturnType = {
  /** Amount of user tokens received */
  amountUserToken: bigint
  /** Amount of validator tokens received */
  amountValidatorToken: bigint
  /** Amount of liquidity tokens burned */
  liquidity: bigint
  /** Transaction receipt */
  receipt: TransactionReceipt
  /** Address that initiated the burn */
  sender: Address
  /** Address that received the underlying tokens */
  to: Address
  /** Address of the user token */
  userToken: Address
  /** Address of the validator token */
  validatorToken: Address
}
```

## Parameters

### liquidity

- **Type:** `bigint`

Amount of LP tokens to burn.

### to

- **Type:** `Address`

Address to send tokens to.

### userToken

- **Type:** `Address | bigint`

Address or ID of the user token.

### validatorToken

- **Type:** `Address | bigint`

Address or ID of the validator token.

<!--@include: @shared/tempo-write-parameters.md-->

## Viem

- [`amm.burn`](https://viem.sh/tempo/actions/amm.burn)
