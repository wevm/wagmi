# Agent Guidelines

Agent guidance for `wagmi/tempo` Hooks.

> **Communication Style**: Be brief, concise. Maximize information density, minimize tokens. Incomplete sentences acceptable when clear. Remove filler words. Prioritize clarity over grammar.

## Wagmi Hooks

When generating Wagmi hooks (in `hooks/`), follow these guidelines.

An example of a generated hook set can be found in `hooks/fee.ts`.

### Source of Truth

- **All hooks must be based on their corresponding Wagmi actions** from `@wagmi/core/tempo` (`packages/core/src/tempo/`)
- Wagmi hooks are React hooks that wrap Wagmi actions with TanStack Query's `useQuery` and `useMutation`
- If the Wagmi action is unclear or missing, implement the Wagmi action first

### Documentation Requirements

All hooks **must include comprehensive TSDoc** with:

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

### Query Hooks

For read-only hooks that fetch data:

- Use `useQuery` from `../../utils/query.js`
- Use `useConfig` and `useChainId` from `../../hooks/(useChainId|useConfig).js`
- Call the corresponding action's `queryOptions` function
- All parameters should be optional. Use `ExactPartial` to make all query parameters optional
- Support optional `query` parameter for TanStack Query options
- Default `parameters` to `{}` only if all parameters are truly optional (no required non-reactive parameters like `token`, `role`, etc.)

```typescript
export function useMyAction<
  config extends Config = ResolvedRegister['config'],
  selectData = myAction.ReturnValue,
>(parameters: useMyAction.Parameters<config, selectData> = {}): useMyAction.ReturnValue<config, selectData> {
  const config = useConfig(parameters)
  const chainId = useChainId({ config })
  const options = myAction.queryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  } as never)
  return useQuery(options)
}
```

### Mutation Hooks

For state-changing hooks, both variants must be implemented:

**1. Standard Variant**

```typescript
export function useMyAction<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useMyAction.Parameters<config, context> = {},
): useMyAction.ReturnValue<config, context> {
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
): useMyActionSync.ReturnValue<config, context> {
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

### Watch Hooks

For event watching hooks:

- Call the corresponding action's watch function inside `useEffect`
- All parameters should be optional using `ExactPartial`
- Include an `enabled` parameter (defaults to `true`) to control whether the watcher is active
- Check if all required properties (like the callback) are defined before setting up the watcher
- Include all optional properties for `rest` in the dependency array (e.g. `rest.foo`, `rest.bar`, `rest.baz`)
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
  }, [config, enabled, onMyEvent, rest.foo, rest.bar, rest.baz])
}

export declare namespace useWatchMyEvent {
  type Parameters<config extends Config = Config> = UnionCompute<
    ExactPartial<Actions.watchMyEvent.Parameters<config>> &
      ConfigParameter<config> & { enabled?: boolean | undefined }
  >
}
```

### Namespace Properties

#### Query Hooks

All query hooks must include the following components:

```typescript
export function useMyAction<
  config extends Config = ResolvedRegister['config'],
  selectData = myAction.ReturnValue,
>(parameters: useMyAction.Parameters<config, selectData> = {}): useMyAction.ReturnValue<selectData> { ... }

export declare namespace useMyAction {
  export type Parameters<
    config extends Config = ResolvedRegister['config'],
    selectData = myAction.ReturnValue,
  > = ConfigParameter<config> &
    QueryParameter<
      myAction.ReturnValue,
      myAction.ErrorType,
      selectData,
      myAction.QueryKey<config>
    > &
    ExactPartial<myAction.Parameters<config>>

  export type ReturnValue<selectData = myAction.ReturnValue> =
    UseQueryReturnType<selectData, Error>
}
```

**Note:** Use `ExactPartial<T>` to make all query parameters optional. This ensures that reactive parameters can be undefined initially and populated later for proper reactivity.

#### Watch Hooks

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

#### Mutation Hooks

All mutation hooks must include the following components:

```typescript
export function useMyAction<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useMyAction.Parameters<config, context> = {},
): useMyAction.ReturnValue<config, context> { ... }

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

  type ReturnValue<
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

  type ReturnValue<
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

### Testing

Tests should be co-located with hooks in `myNamespace.test.ts` files.

**Important**: Wagmi hook tests should follow the same test flows as the corresponding Wagmi action tests in `@wagmi/core/tempo`. This includes:
- Setting up the same initial state (creating tokens, granting roles, minting tokens, etc.)
- Testing the same behaviors and edge cases
- Using the same test data and assertions where applicable

The main difference is that hooks use React rendering patterns with `renderHook`, and mutation hooks don't require explicit `account` parameters in `mutateAsync` calls since they use the connector's account.

See `hooks/fee.test.ts` for a comprehensive example of test patterns and structure.

#### Test Structure

Organize tests by hook name with a default test case. Use namespace imports for cleaner code when importing hooks:

```typescript
import { type Address } from 'viem'
import { describe, expect, test, vi } from 'vitest'
import { useConnect } from 'wagmi'
import { accounts, config, renderHook } from '@wagmi/test/tempo'
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
