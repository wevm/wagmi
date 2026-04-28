# `policy.getData`

Gets the data for a transfer policy, including its type and admin address.

## Usage

::: code-group

```ts [example.ts]
import { Actions } from 'wagmi/tempo'
import { config } from './config'

const { admin, type } = await Actions.policy.getData(config, {
  policyId: 1n,
})

console.log('Policy admin:', admin)
// @log: Policy admin: 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbb
console.log('Policy type:', type)
// @log: Policy type: whitelist
```

<<< @/snippets/react/config-tempo.ts{ts} [config.ts]

:::

## Return Type

```ts
type ReturnType = {
  /** Address of the policy admin */
  admin: Address
  /** Type of policy */
  type: PolicyType
}
```

## Parameters

### policyId

- **Type:** `bigint`

ID of the policy to query.

## Viem

- [`policy.getData`](https://viem.sh/tempo/actions/policy.getData)
