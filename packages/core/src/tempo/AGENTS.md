# Agent Guidelines

Agent guidance for `@wagmi/core/tempo`.

> **Communication Style**: Be brief, concise. Maximize information density, minimize tokens. Incomplete sentences acceptable when clear. Remove filler words. Prioritize clarity over grammar.

## Code Generation

### Wagmi Actions

When generating Wagmi actions (in `Actions/`), follow these guidelines.

An example of a generated action set can be found in `Actions/fee.ts`.

#### Source of Truth

- **All actions must be based on their corresponding Viem actions** from `import { Actions } from viem/tempo` (local path might be `../viem/src/tempo/actions` or you can clone `gh repo clone wevm/viem`)
- Wagmi actions are wrappers around Viem actions that integrate with Wagmi's config and TanStack Query

#### Documentation Requirements

All actions **must include comprehensive TSDoc** with:

1. **Function description** - What the action does
2. **`@example` block** - Complete working example showing:
   - Required imports (`createConfig`, `http`, action imports)
   - Config setup with chains and transports
   - Action usage with realistic parameters
   - Expected return value handling (if applicable)
3. **`@param` tags** - For each parameter (config, parameters)
4. **`@returns` tag** - Description of the return value

Example:
```ts
/**
 * Gets the user's default fee token.
 *
 * @example
 * ```ts
 * import { createConfig, http } from '@wagmi/core'
 * import { tempo } from '@wagmi/core/chains'
 * import { Actions } from '@wagmi/core/tempo'
 *
 * const config = createConfig({
 *   chains: [tempo],
 *   transports: {
 *     [tempo.id]: http(),
 *   },
 * })
 *
 * const token = await Actions.fee.getUserToken(config, {
 *   account: '0x...',
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The user's fee token address.
 */
```

#### Action Types

##### Query-based Actions (Read-Only)

For read-only actions that fetch data:

- Return the result from the corresponding Viem action
- Parameters include `ChainIdParameter<config>` and the Viem action's parameters
- Must include query utilities for TanStack Query integration

```ts
export function myAction<config extends Config>(
  config: config,
  parameters: myAction.Parameters<config>,
): Promise<myAction.ReturnValue<config>> {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  return viem_Actions.myAction(client, rest)
}
```

##### Mutation-based Actions (Write)

For state-changing actions, both variants must be implemented:

**1. Standard Variant**

- Uses `getConnectorClient` to get the wallet client
- Returns the result from the corresponding Viem action
- Does not wait for transaction confirmation

```ts
export async function myAction<config extends Config>(
  config: config,
  parameters: myAction.Parameters<config>,
): Promise<myAction.ReturnValue> {
  const { account, chainId, connector } = parameters
  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })
  return viem_Actions.myAction(
    client,
    parameters as viem_Actions.myAction.Parameters,
  )
}
```

**2. Sync Variant (`*Sync`)**

- Named with `Sync` suffix (e.g., `setUserTokenSync`)
- Uses `getConnectorClient` to get the wallet client
- Waits for transaction inclusion on a block before returning a response
- Returns both the receipt and extracted event data

```ts
export async function myActionSync<config extends Config>(
  config: config,
  parameters: myActionSync.Parameters<config>,
): Promise<myActionSync.ReturnValue> {
  const { account, chainId, connector } = parameters
  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })
  return viem_Actions.myActionSync(
    client,
    parameters as viem_Actions.myActionSync.Parameters,
  )
}
```

#### Namespace Properties

##### Query-based Actions

All query-based actions must include the following components:

- Include `enabled` logic to disable the query when required reactive parameters (e.g. addresses) are undefined
- The `enabled` conditional must check ALL required reactive parameters (e.g., `account && spender` for allowance checks)
- If there isn't an `ErrorType` for the Viem Action, use `import { BaseError } from 'viem'`

```ts
import { filterQueryOptions } from '../../query/utils.js'
import type { QueryOptions, QueryParameter } from './utils.js'

export function myAction<config extends Config>(
  config: config,
  parameters: myAction.Parameters<config>,
): Promise<myAction.ReturnValue> { ... }

export namespace myAction {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    viem_Actions.myAction.Parameters

  export type ReturnValue = viem_Actions.myAction.ReturnValue

  export type ErrorType = viem_Actions.myAction.ErrorType

  export function queryKey<config extends Config>(
    parameters: Parameters<config>,
  ) {
    return ['myAction', filterQueryOptions(parameters)] as const
  }

  export type QueryKey<config extends Config> = ReturnType<
    typeof queryKey<config>
  >

  export function queryOptions<config extends Config, selectData = ReturnValue>(
    config: Config,
    parameters: queryOptions.Parameters<config, selectData>,
  ): queryOptions.ReturnValue<config, selectData> {
    const { query, ...rest } = parameters
    return {
      ...query,
      enabled: Boolean(rest.account && (query?.enabled ?? true)),
      queryKey: queryKey(rest),
      async queryFn(context) {
        const [, parameters] = context.queryKey
        return await myAction(config, parameters)
      },
    }
  }

  export declare namespace queryOptions {
    export type Parameters<
      config extends Config,
      selectData = myAction.ReturnValue,
    > = myAction.Parameters<config> &
      QueryParameter<
        myAction.ReturnValue,
        myAction.ErrorType,
        selectData,
        myAction.QueryKey<config>
      >

    export type ReturnValue<
      config extends Config,
      selectData = myAction.ReturnValue,
    > = QueryOptions<
      myAction.ReturnValue,
      myAction.ErrorType,
      selectData,
      myAction.QueryKey<config>
    >
  }
}
```

##### Mutation-based Actions

All mutation-based actions must include the following components:

- If there isn't an `ErrorType` for the Viem Action, use `import { BaseError } from 'viem'`

```ts
export async function myAction<config extends Config>(
  config: config,
  parameters: myAction.Parameters<config>,
): Promise<myAction.ReturnValue> { ... }

export declare namespace myAction {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    Omit<viem_Actions.myAction.Parameters<undefined, Account>, 'chain'>

  export type ReturnValue = viem_Actions.myAction.ReturnValue

  export type ErrorType = viem_Actions.myAction.ErrorType
}

export declare namespace myActionSync {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    Omit<viem_Actions.myActionSync.Parameters<undefined, Account>, 'chain'>

  export type ReturnValue = viem_Actions.myActionSync.ReturnValue

  export type ErrorType = viem_Actions.myActionSync.ErrorType
}
```

#### Testing

Tests should be co-located with actions in `*action-name*.test.ts` files.

**Important**: Wagmi action tests should follow the same test flows as the corresponding Viem action tests in `src/tempo/actions/`. This includes:
- Setting up the same initial state (creating tokens, granting roles, minting tokens, etc.)
- Testing the same behaviors and edge cases
- Using the same test data and assertions where applicable

The main difference is that Wagmi tests use `config` instead of `client`, and mutation actions don't require explicit `account` parameters since they use the connector's account.

See `Actions/token.test.ts` for a comprehensive example of test patterns and structure.

##### Test Structure

Organize tests by action name with a default test case. Use namespace imports for cleaner code:

```ts
import { connect } from '@wagmi/core'
import { accounts,  config, queryClient } from '@wagmi/test/tempo'
import { describe, expect, test } from 'vitest'
import * as myNamespace from './myNamespace.js'

const account = accounts[0]

// Query-based actions
describe('myAction', () => {
  test('default', async () => {
    const result = await myNamespace.myAction(config, {
      // ...
    })
    expect(result).toMatchInlineSnapshot(`...`)
  })

  describe('queryOptions', () => {
    test('default', async () => {
      const options = myNamespace.myAction.queryOptions(config, {
        // ...
      })
      expect(await queryClient.fetchQuery(options)).toMatchInlineSnapshot(`...`)
    })
  })
})

// Mutation-based actions
describe('myAction', () => {
  test('default', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })
    
    // Include any necessary setup from the corresponding viem test
    // e.g., create tokens, grant roles, mint tokens, etc.
    
    const hash = await myNamespace.myAction(config, {
      // ... (no account parameter needed)
    })
    expect(hash).toBeDefined()
  })
})

describe('myActionSync', () => {
  test('default', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })
    
    // Include any necessary setup from the corresponding viem test
    
    const result = await myNamespace.myActionSync(config, {
      // ... (no account parameter needed)
    })
    expect(result).toBeDefined()
  })
})
```
