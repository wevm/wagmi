# Agent Guidelines

Agent guidance for this repository.

> **Communication Style**: Be brief, concise. Maximize information density, minimize tokens. Incomplete sentences acceptable when clear. Remove filler words. Prioritize clarity over grammar.

## Code Generation

### Wagmi Actions

When generating Wagmi actions (in `src/Actions/`), follow these guidelines.

An example of a generated action set can be found in `src/Actions/fee.ts`.

#### Source of Truth

- **All actions must be based on their corresponding Viem actions** from `import { Actions } from viem/tempo` (local path might be `../viem/src/tempo/actions`)
- Wagmi actions are wrappers around Viem actions that integrate with Wagmi's config and TanStack Query

#### Documentation Requirements

All actions **must include comprehensive JSDoc** with:

1. **Function description** - What the action does
2. **`@example` block** - Complete working example showing:
   - Required imports (`createConfig`, `http`, action imports)
   - Config setup with chains and transports
   - Action usage with realistic parameters
   - Expected return value handling (if applicable)
3. **`@param` tags** - For each parameter (config, parameters)
4. **`@returns` tag** - Description of the return value

Example:
```typescript
/**
 * Gets the user's default fee token.
 *
 * @example
 * ```ts
 * import { createConfig, http } from '@wagmi/core'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'wagmi/tempo'
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

```typescript
export function myAction<config extends Config>(
  config: config,
  parameters: myAction.Parameters<config>,
) {
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

```typescript
export async function myAction<config extends Config>(
  config: config,
  parameters: myAction.Parameters<config>,
): Promise<viem_Actions.myAction.ReturnValue> {
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

```typescript
export async function myActionSync<config extends Config>(
  config: config,
  parameters: myActionSync.Parameters<config>,
): Promise<viem_Actions.myActionSync.ReturnValue> {
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

```typescript
import { filterQueryOptions } from 'wagmi/query'
import type { QueryOptions, QueryParameter } from './utils.js'

export function myAction<config extends Config>(
  config: config,
  parameters: myAction.Parameters<config>,
): Promise<myAction.ReturnValue> { ... }

export namespace myAction {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    viem_Actions.myAction.Parameters

  export type ReturnValue = viem_Actions.myAction.ReturnValue

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
        Query.DefaultError,
        selectData,
        myAction.QueryKey<config>
      >

    export type ReturnValue<
      config extends Config,
      selectData = myAction.ReturnValue,
    > = QueryOptions<
      myAction.ReturnValue,
      Query.DefaultError,
      selectData,
      myAction.QueryKey<config>
    >
  }
}
```

##### Mutation-based Actions

All mutation-based actions must include the following components:

```typescript
export async function myAction<config extends Config>(
  config: config,
  parameters: myAction.Parameters<config>,
): Promise<viem_Actions.myAction.ReturnValue> { ... }

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

See `src/Actions/token.test.ts` for a comprehensive example of test patterns and structure.

##### Test Structure

Organize tests by action name with a default test case. Use namespace imports for cleaner code:

```typescript
import { connect } from '@wagmi/core'
import { describe, expect, test } from 'vitest'
import { accounts,  config, queryClient } from '../../test/config.js'
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

### Wagmi Hooks

When generating Wagmi hooks (in `src/Hooks/`), follow these guidelines.

An example of a generated hook set can be found in `src/Hooks/fee.ts`.

#### Source of Truth

- **All hooks must be based on their corresponding Wagmi actions** from `src/Actions/`
- Wagmi hooks are React hooks that wrap Wagmi actions with TanStack Query's `useQuery` and `useMutation`
- If the Wagmi action is unclear or missing, implement the Wagmi action first

#### Documentation Requirements

All hooks **must include comprehensive JSDoc** with:

1. **Function description** - What the hook does
2. **`@example` block** - Complete working example showing:
   - Required imports (hook imports)
   - React component usage
   - Hook usage with realistic parameters
   - Expected return value handling (if applicable)
3. **@param parameters** - Parameters description
4. **`@returns` tag** - Description of the return value

Example:
```typescript
/**
 * Hook for getting the user's default fee token.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
 *
 * function App() {
 *   const { data, isLoading } = Hooks.fee.useUserToken({
 *     account: '0x20c...0055',
 *   })
 *   if (isLoading) return <div>Loading...</div>
 *   return <div>Token: {data?.address}</div>
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Query result with token address and ID.
 */
```

#### Query Hooks

For read-only hooks that fetch data:

- Use `useQuery` from `wagmi/query`
- Use `useConfig` and `useChainId` from `wagmi`
- Call the corresponding action's `queryOptions` function
- All parameters should be optional. Use `ExactPartial` to make all query parameters optional
- Support optional `query` parameter for TanStack Query options
- Default `parameters` to `{}` only if all parameters are truly optional (no required non-reactive parameters like `token`, `role`, etc.)

```typescript
export function useMyAction<
  config extends Config = ResolvedRegister['config'],
  selectData = myAction.ReturnValue,
>(parameters: useMyAction.Parameters<config, selectData> = {}) {
  const config = useConfig(parameters)
  const chainId = useChainId({ config })
  const options = myAction.queryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  } as never)
  return useQuery(options)
}
```

#### Mutation Hooks

For state-changing hooks, both variants must be implemented:

**1. Standard Variant**

```typescript
export function useMyAction<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useMyAction.Parameters<config, context> = {},
): useMyAction.ReturnType<config, context> {
  const { mutation = {} } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return myAction(config, variables)
    },
    mutationKey: ['myAction'],
  })
}
```

**2. Sync Variant (`use*Sync`)**

```typescript
export function useMyActionSync<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useMyActionSync.Parameters<config, context> = {},
): useMyActionSync.ReturnType<config, context> {
  const { mutation = {} } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return myActionSync(config, variables)
    },
    mutationKey: ['myActionSync'],
  })
}
```

#### Watch Hooks

For event watching hooks:

- Call the corresponding action's watch function inside `useEffect`
- All parameters should be optional using `ExactPartial`
- Include an `enabled` parameter (defaults to `true`) to control whether the watcher is active
- Check if the callback is defined before setting up the watcher
- Return the unwatch function from the `useEffect` for cleanup

All watch hooks must include comprehensive JSDoc with:
1. **Function description** - What events the hook watches for
2. **`@example` block** - Complete working example showing hook usage in a React component
3. **`@param` tag** - Parameters description

```typescript
/**
 * Hook for watching TIP20 token mint events.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
 *
 * function App() {
 *   Hooks.token.useWatchMint({
 *     onMint(args) {
 *       console.log('Mint:', args)
 *     },
 *   })
 *   return <div>Watching for mints...</div>
 * }
 * ```
 *
 * @param parameters - Parameters.
 */
export function useWatchMyEvent<
  config extends Config = ResolvedRegister['config'],
>(parameters: useWatchMyEvent.Parameters<config> = {}) {
  const { enabled = true, onMyEvent, ...rest } = parameters

  const config = useConfig({ config: parameters.config })
  const configChainId = useChainId({ config })
  const chainId = parameters.chainId ?? configChainId

  useEffect(() => {
    if (!enabled) return
    if (!onMyEvent) return
    return Actions.watchMyEvent(config, {
      ...rest,
      chainId,
      onMyEvent,
    })
  }, [config, enabled, onMyEvent, rest])
}

export declare namespace useWatchMyEvent {
  type Parameters<config extends Config = Config> = UnionCompute<
    ExactPartial<Actions.watchMyEvent.Parameters<config>> &
      ConfigParameter<config> & { enabled?: boolean | undefined }
  >
}
```

#### Namespace Properties

##### Query Hooks

All query hooks must include the following components:

```typescript
export function useMyAction<
  config extends Config = ResolvedRegister['config'],
  selectData = myAction.ReturnValue,
>(parameters: useMyAction.Parameters<config, selectData> = {}) { ... }

export declare namespace useMyAction {
  export type Parameters<
    config extends Config = ResolvedRegister['config'],
    selectData = myAction.ReturnValue,
  > = ConfigParameter<config> &
    QueryParameter<
      myAction.ReturnValue,
      DefaultError,
      selectData,
      myAction.QueryKey<config>
    > &
    ExactPartial<
      Omit<myAction.queryOptions.Parameters<config, selectData>, 'query'>
    >

  export type ReturnValue<selectData = myAction.ReturnValue> =
    UseQueryReturnType<selectData, Error>
}
```

**Note:** Use `ExactPartial<T>` to make all query parameters optional. This ensures that reactive parameters can be undefined initially and populated later for proper reactivity.


##### Watch Hooks

All watch hooks must include the following components:

```typescript
export function useWatchMyEvent<
  config extends Config = ResolvedRegister['config'],
>(parameters: useWatchMyEvent.Parameters<config> = {}) { ... }

export declare namespace useWatchMyEvent {
  type Parameters<config extends Config = Config> = UnionCompute<
    ExactPartial<Actions.watchMyEvent.Parameters<config>> &
      ConfigParameter<config> & { enabled?: boolean | undefined }
  >
}
```

**Note:** Watch hooks don't have a return value - they set up event listeners in a `useEffect` and automatically clean up when the component unmounts or dependencies change.

##### Mutation Hooks

All mutation hooks must include the following components:

```typescript
export function useMyAction<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useMyAction.Parameters<config, context> = {},
): useMyAction.ReturnType<config, context> { ... }

export declare namespace useMyAction {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          myAction.ReturnValue,
          myAction.ErrorType,
          myAction.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    myAction.ReturnValue,
    myAction.ErrorType,
    myAction.Parameters<config>,
    context
  >
}

export declare namespace useMyActionSync {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          myActionSync.ReturnValue,
          myActionSync.ErrorType,
          myActionSync.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    myActionSync.ReturnValue,
    myActionSync.ErrorType,
    myActionSync.Parameters<config>,
    context
  >
}
```

#### Testing

Tests should be co-located with hooks in `myNamespace.test.ts` files.

**Important**: Wagmi hook tests should follow the same test flows as the corresponding Wagmi action tests in `src/Actions/`. This includes:
- Setting up the same initial state (creating tokens, granting roles, minting tokens, etc.)
- Testing the same behaviors and edge cases
- Using the same test data and assertions where applicable

The main difference is that hooks use React rendering patterns with `renderHook`, and mutation hooks don't require explicit `account` parameters in `mutateAsync` calls since they use the connector's account.

See `src/Hooks/fee.test.ts` for a comprehensive example of test patterns and structure.

##### Test Structure

Organize tests by hook name with a default test case. Use namespace imports for cleaner code when importing hooks:

```typescript
import { type Address } from 'viem'
import { describe, expect, test, vi } from 'vitest'
import { useConnect } from 'wagmi'
import { accounts, config, renderHook } from '../../test/config.js'
import * as myNamespace from './myNamespace.js'

// Query hooks
describe('useMyAction', () => {
  test('default', async () => {
    const { result } = await renderHook(() =>
      myNamespace.useMyAction({ account: account.address }),
    )

    await vi.waitFor(() => expect(result.current.isSuccess).toBeTruthy())

    expect(result.current.data).toBeDefined()
    // Additional assertions...
  })

  test('reactivity: account parameter', async () => {
    const { result, rerender } = await renderHook(
      (props) =>
        myNamespace.useMyAction({ account: props?.account }),
      { initialProps: { account: undefined as Address | undefined } },
    )

    await vi.waitFor(() => result.current.fetchStatus === 'fetching')

    // Should be disabled when account is undefined
    expect(result.current.data).toBeUndefined()
    expect(result.current.isPending).toBe(true)
    // expect(result.current.isEnabled).toBe(false) // TODO: Disabled until @tanstack/react-query bumped to latest

    // Set account
    rerender({ account: account.address })

    await vi.waitFor(() => expect(result.current.isSuccess).toBeTruthy())

    // Should now be enabled and have data
    expect(result.current.isEnabled).toBe(true)
    expect(result.current.data).toBeDefined()
    // Additional assertions...
  })
})

// Mutation hooks
describe('useMyAction', () => {
  test('default', async () => {
    const { result } = await renderHook(() => ({
      connect: useConnect(),
      myAction: myNamespace.useMyAction(),
    }))

    await result.current.connect.mutateAsync({
      connector: config.connectors[0]!,
    })

    // Include any necessary setup from the corresponding Wagmi action test
    // e.g., create tokens, grant roles, etc. using the action's mutateAsync

    const hash = await result.current.myAction.mutateAsync({
      // ... mutation parameters (no account parameter needed)
    })
    expect(hash).toBeDefined()

    await vi.waitFor(() =>
      expect(result.current.myAction.isSuccess).toBeTruthy(),
    )
  })
})

describe('useMyActionSync', () => {
  test('default', async () => {
    const { result } = await renderHook(() => ({
      connect: useConnect(),
      myAction: myNamespace.useMyActionSync(),
    }))

    await result.current.connect.mutateAsync({
      connector: config.connectors[0]!,
    })

    // Include any necessary setup from the corresponding Wagmi action test

    const data = await result.current.myAction.mutateAsync({
      // ... mutation parameters (no account parameter needed)
    })
    expect(data).toBeDefined()

    await vi.waitFor(() =>
      expect(result.current.myAction.isSuccess).toBeTruthy(),
    )
  })
})

// Watch hooks
describe('useWatchMyEvent', () => {
  test('default', async () => {
    const { result: connectResult } = await renderHook(() => ({
      connect: useConnect(),
      createSync: myNamespace.useCreateSync(),
      // ... any other setup hooks needed
    }))

    await connectResult.current.connect.mutateAsync({
      connector: config.connectors[0]!,
    })

    // Include any necessary setup (e.g., create token, grant roles)

    const events: any[] = []
    await renderHook(() =>
      myNamespace.useWatchMyEvent({
        // ... parameters
        onMyEvent(args) {
          events.push(args)
        },
      }),
    )

    // Trigger the event by calling a sync action
    // e.g., await connectResult.current.myActionSync.mutateAsync({ ... })

    await vi.waitUntil(() => events.length >= 1)

    expect(events.length).toBeGreaterThanOrEqual(1)
    expect(events[0]?.someField).toBe(expectedValue)
  })
})
```

