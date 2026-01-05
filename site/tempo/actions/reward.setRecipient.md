# `reward.setRecipient`

Sets or changes the reward recipient for a token holder.

## Usage

::: code-group

```ts twoslash [example.ts]
// @filename: config.ts
// @errors: 2322
import type { Config } from 'wagmi'
import { tempoTestnet } from 'wagmi/chains'
export const config = {} as Config<readonly [typeof tempoTestnet]>
// @filename: example.ts
// ---cut---
import { Actions } from 'wagmi/tempo'
import { config } from './config'

const { holder, receipt, recipient } = await Actions.reward.setRecipientSync(config, {
  recipient: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbb',
  token: '0x20c0000000000000000000000000000000000000',
})

console.log('Holder:', holder)
// @log: Holder: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
console.log('Recipient:', recipient)
// @log: Recipient: 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbb
```

<<< @/snippets/core/config-tempo.ts{ts twoslash} [config.ts]

:::

### Opt Out of Rewards

Set `recipient` to the zero address to opt out from rewards distribution:

```ts twoslash
// @filename: config.ts
// @errors: 2322
import type { Config } from 'wagmi'
import { tempoTestnet } from 'wagmi/chains'
export const config = {} as Config<readonly [typeof tempoTestnet]>
// @filename: example.ts
// ---cut---
import { Actions } from 'wagmi/tempo'
import { config } from './config'

await Actions.reward.setRecipientSync(config, {
  recipient: '0x0000000000000000000000000000000000000000',
  token: '0x20c0000000000000000000000000000000000000',
})
```

### Delegate Rewards

Set `recipient` to another address to delegate your rewards to them:

```ts twoslash
// @filename: config.ts
// @errors: 2322
import type { Config } from 'wagmi'
import { tempoTestnet } from 'wagmi/chains'
export const config = {} as Config<readonly [typeof tempoTestnet]>
// @filename: example.ts
// ---cut---
import { Actions } from 'wagmi/tempo'
import { config } from './config'

await Actions.reward.setRecipientSync(config, {
  recipient: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
  token: '0x20c0000000000000000000000000000000000000',
})
```

### Asynchronous Usage

The example above uses a `*Sync` variant of the action, that will wait for the transaction to be included before returning.

If you are optimizing for performance, you should use the non-sync `reward.setRecipient` action and wait for inclusion manually:

```ts
import { Actions as viem_Actions } from 'viem/tempo'
import { Actions } from 'wagmi/tempo'
import { waitForTransactionReceipt } from 'wagmi/actions'

const hash = await Actions.reward.setRecipient(config, {
  recipient: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbb',
  token: '0x20c0000000000000000000000000000000000000',
})
const receipt = await waitForTransactionReceipt(config, { hash })

const { args: { holder, recipient } }
  = viem_Actions.reward.setRecipient.extractEvent(receipt.logs)
```

## Return Type

```ts
type ReturnType = {
  /** Token holder address who set their reward recipient */
  holder: Address
  /** Transaction receipt */
  receipt: TransactionReceipt
  /** Reward recipient address (zero address indicates opt-out) */
  recipient: Address
}
```

::: tip
Rewards are automatically distributed to the current recipient before changing. This happens during any balance-changing operation (transfers, mints, burns).
:::

## Parameters

### recipient

- **Type:** `Address`

The reward recipient address. Use zero address to opt out of rewards.

### token

- **Type:** `Address`

The TIP20 token address.

<!--@include: @shared/tempo-write-parameters.md-->

## Viem

- [`reward.setRecipient`](https://viem.sh/tempo/actions/reward.setRecipient)
