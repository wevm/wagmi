---
name: wagmi-development
description: Creates Wagmi features across all layers - core actions, query options, framework bindings. Use when adding new actions, hooks, or working across packages/core, packages/react, packages/vue.
---

# Wagmi Development

Full-stack patterns for adding Wagmi features. This skill covers Viem-based actions only (not Wagmi config actions).

## Layer Overview

1. **Core Action** (`packages/core/src/actions/`) - Base functionality wrapping Viem
2. **Query Options** (`packages/core/src/query/`) - TanStack Query integration
3. **Framework Bindings** - React (`packages/react/src/hooks/`), Vue (`packages/vue/src/composables/`)

---

## 1. Core Action

### Structure

```ts
import {
  type MyActionErrorType as viem_MyActionErrorType,
  type MyActionParameters as viem_MyActionParameters,
  type MyActionReturnType as viem_MyActionReturnType,
  myAction as viem_myAction,
} from 'viem/actions'

import type { Config } from '../createConfig.js'
import type { ChainIdParameter, ConnectorParameter } from '../types/properties.js'
import type { Compute } from '../types/utils.js'
import { getAction } from '../utils/getAction.js'

export type MyActionParameters<config extends Config = Config> = Compute<
  ChainIdParameter<config> & viem_MyActionParameters
>

export type MyActionReturnType = viem_MyActionReturnType

export type MyActionErrorType = viem_MyActionErrorType

/** https://wagmi.sh/core/api/actions/myAction */
export async function myAction<config extends Config>(
  config: config,
  parameters: MyActionParameters<config>,
): Promise<MyActionReturnType> {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  const action = getAction(client, viem_myAction, 'myAction')
  return action(rest)
}
```

### Key Rules

- **Viem imports**: Prefix with `viem_` (e.g., `viem_getBalance`)
- **Client access**: 
  - Read-only: `config.getClient({ chainId })`
  - Wallet: `await getConnectorClient(config, { chainId, connector, account })`
  - Mixed: Use `getConnectorClient` for account, `getClient` for action (see `estimateGas.ts`)
- **Parameters**: Add `ChainIdParameter<config>` always. Add `ConnectorParameter` for wallet actions.
- **Type params**: Mirror Viem's type params for inference. Use `const` modifier for literal inference (abi, args).
- **Spread**: Omit wagmi-specific props (`chainId`, `connector`) when calling Viem action.

### Testing

**Runtime tests** (`action.test.ts`):
```ts
import { abi, address, config } from '@wagmi/test'
import { expect, test } from 'vitest'
import { myAction } from './myAction.js'

test('default', async () => {
  await expect(myAction(config, { /* required params */ })).resolves.toMatchInlineSnapshot(`...`)
})

test('parameters: chainId', async () => { /* test chainId param */ })

test('behavior: error case', async () => { /* test error handling */ })
```

**Type tests** (`action.test-d.ts`) - only if action has type inference:
```ts
import { config } from '@wagmi/test'
import { expectTypeOf, test } from 'vitest'
import { myAction } from './myAction.js'

test('default', async () => {
  const result = await myAction(config, { /* params */ })
  expectTypeOf(result).toEqualTypeOf<ExpectedType>()
})
```

**Type benchmarks** (`action.bench-d.ts`) - only if action has type inference:
```ts
import { attest } from '@ark/attest'
import { test } from 'vitest'
import type { MyActionParameters } from './myAction.js'

test('default', () => {
  type Result = MyActionParameters<typeof abi.erc20, 'balanceOf'>
  const res = {} as Result
  attest.instantiations([12345, 'instantiations'])
  attest(res.args).type.toString.snap(`readonly [account: \`0x\${string}\`]`)
})
```

**Wallet action tests**: Connect before, disconnect after:
```ts
test('default', async () => {
  await connect(config, { connector })
  await expect(myAction(config, { /* params */ })).resolves.toMatchInlineSnapshot(`...`)
  await disconnect(config, { connector })
})
```

---

## 2. Query Options

Query (read-only) or Mutation (wallet) options for TanStack Query.

### Query Structure

```ts
import {
  type MyActionErrorType,
  type MyActionParameters,
  type MyActionReturnType,
  myAction,
} from '../actions/myAction.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { QueryOptions, QueryParameter } from '../types/query.js'
import type { Compute, ExactPartial } from '../types/utils.js'
import { filterQueryOptions, structuralSharing } from './utils.js'

export type MyActionOptions<
  config extends Config,
  selectData = MyActionData,
> = Compute<ExactPartial<MyActionParameters<config>> & ScopeKeyParameter> &
  QueryParameter<MyActionQueryFnData, MyActionErrorType, selectData, MyActionQueryKey<config>>

export function myActionQueryOptions<
  config extends Config,
  selectData = MyActionData,
>(
  config: config,
  options: MyActionOptions<config, selectData> = {},
): MyActionQueryOptions<config, selectData> {
  return {
    ...options.query,
    enabled: Boolean(options.requiredParam && (options.query?.enabled ?? true)),
    queryFn: async (context) => {
      const [, { scopeKey: _, ...parameters }] = context.queryKey
      if (!parameters.requiredParam) throw new Error('requiredParam is required')
      const result = await myAction(config, {
        ...(parameters as MyActionParameters),
        requiredParam: parameters.requiredParam,
      })
      return result ?? null
    },
    queryKey: myActionQueryKey(options),
    structuralSharing, // include when returning complex objects/arrays
  }
}

export type MyActionQueryFnData = Compute<MyActionReturnType>
export type MyActionData = MyActionQueryFnData

export function myActionQueryKey<config extends Config>(
  options: Compute<ExactPartial<MyActionParameters<config>> & ScopeKeyParameter> = {},
) {
  return ['myAction', filterQueryOptions(options)] as const
}

export type MyActionQueryKey<config extends Config> = ReturnType<typeof myActionQueryKey<config>>

export type MyActionQueryOptions<
  config extends Config,
  selectData = MyActionData,
> = QueryOptions<MyActionQueryFnData, MyActionErrorType, selectData, MyActionQueryKey<config>>
```

### Mutation Structure

```ts
import type { MutationOptions, MutationParameter } from '../types/query.js'

export type MyActionOptions<config extends Config, context = unknown> = MutationParameter<
  MyActionData,
  MyActionErrorType,
  MyActionVariables<config>,
  context
>

export function myActionMutationOptions<config extends Config, context>(
  config: config,
  options: MyActionOptions<config, context> = {},
): MyActionMutationOptions<config> {
  return {
    ...options.mutation,
    mutationFn: async (variables) => {
      return myAction(config, variables)
    },
    mutationKey: ['myAction'],
  }
}

export type MyActionMutationOptions<config extends Config> = MutationOptions<
  MyActionData,
  MyActionErrorType,
  MyActionVariables<config>
>
```

### Key Rules

- **ExactPartial vs UnionExactPartial**: Use `ExactPartial` for simple types, `UnionExactPartial` for complex unions (contract actions)
- **enabled**: Based on required params being truthy
- **structuralSharing**: Include when action returns objects/arrays
- **filterQueryOptions**: Filters common non-serializable props. Skip props like `onReplaced` manually in query key.
- **Query key**: Always `['actionName', filterQueryOptions(options)]`

### Testing

```ts
import { config } from '@wagmi/test'
import { expect, test } from 'vitest'
import { myActionQueryOptions } from './myAction.js'

test('default', () => {
  expect(myActionQueryOptions(config, {})).toMatchInlineSnapshot(`
    {
      "enabled": false,
      "queryFn": [Function],
      "queryKey": ["myAction", {}],
    }
  `)
})

test('enabled', () => {
  expect(myActionQueryOptions(config, { requiredParam: 'value' }).enabled).toBe(true)
})

test('queryFn: calls query fn', async () => {
  const options = myActionQueryOptions(config, { requiredParam: 'value' })
  const result = await options.queryFn({ queryKey: options.queryKey } as any)
  expect(result).toMatchInlineSnapshot(`...`)
})
```

---

## 3. Framework Bindings

### React Query Hook

```ts
'use client'
import type { Config, MyActionErrorType, ResolvedRegister } from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import {
  type MyActionData,
  type MyActionOptions,
  myActionQueryOptions,
} from '@wagmi/core/query'
import type { ConfigParameter } from '../types/properties.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseMyActionParameters<
  config extends Config = Config,
  selectData = MyActionData,
> = Compute<MyActionOptions<config, selectData> & ConfigParameter<config>>

export type UseMyActionReturnType<selectData = MyActionData> =
  UseQueryReturnType<selectData, MyActionErrorType>

/** https://wagmi.sh/react/api/hooks/useMyAction */
export function useMyAction<
  config extends Config = ResolvedRegister['config'],
  selectData = MyActionData,
>(
  parameters: UseMyActionParameters<config, selectData> = {},
): UseMyActionReturnType<selectData> {
  const config = useConfig(parameters)
  const chainId = useChainId({ config })
  const options = myActionQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
    query: parameters.query,
  })
  return useQuery(options)
}
```

### React Mutation Hook

```ts
'use client'
import { useMutation } from '@tanstack/react-query'
import type { Config, ResolvedRegister, MyActionErrorType } from '@wagmi/core'
import {
  type MyActionData,
  type MyActionMutate,
  type MyActionMutateAsync,
  type MyActionOptions,
  type MyActionVariables,
  myActionMutationOptions,
} from '@wagmi/core/query'
import type { ConfigParameter } from '../types/properties.js'
import type { UseMutationReturnType } from '../utils/query.js'
import { useConfig } from './useConfig.js'

export type UseMyActionParameters<config extends Config = Config, context = unknown> =
  MyActionOptions<config, context> & ConfigParameter<config>

export type UseMyActionReturnType<config extends Config = Config, context = unknown> =
  UseMutationReturnType<
    MyActionData,
    MyActionErrorType,
    MyActionVariables<config>,
    context,
    MyActionMutate<config, context>,
    MyActionMutateAsync<config, context>
  >

/** https://wagmi.sh/react/api/hooks/useMyAction */
export function useMyAction<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: UseMyActionParameters<config, context> = {},
): UseMyActionReturnType<config, context> {
  const config = useConfig(parameters)
  const options = myActionMutationOptions(config, parameters)
  const mutation = useMutation(options)
  type Return = UseMyActionReturnType<config, context>
  return {
    ...mutation,
    mutate: mutation.mutate as Return['mutate'],
    mutateAsync: mutation.mutateAsync as Return['mutateAsync'],
  }
}
```

### Vue Composable (Query)

```ts
import type { Config, MyActionErrorType, ResolvedRegister } from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import {
  type MyActionData,
  type MyActionOptions,
  myActionQueryOptions,
} from '@wagmi/core/query'
import { computed } from 'vue'
import type { ConfigParameter } from '../types/properties.js'
import type { DeepMaybeRef } from '../types/ref.js'
import { deepUnref } from '../utils/cloneDeep.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseMyActionParameters<
  config extends Config = Config,
  selectData = MyActionData,
> = Compute<DeepMaybeRef<MyActionOptions<config, selectData> & ConfigParameter<config>>>

export type UseMyActionReturnType<selectData = MyActionData> =
  UseQueryReturnType<selectData, MyActionErrorType>

/** https://wagmi.sh/vue/api/composables/useMyAction */
export function useMyAction<
  config extends Config = ResolvedRegister['config'],
  selectData = MyActionData,
>(
  parameters: UseMyActionParameters<config, selectData> = {},
): UseMyActionReturnType<selectData> {
  const params = computed(() => deepUnref(parameters))
  const config = useConfig(params)
  const chainId = useChainId({ config })
  const options = computed(() =>
    myActionQueryOptions(config as any, {
      ...params.value,
      chainId: params.value.chainId ?? chainId.value,
      query: params.value.query,
    }),
  )
  return useQuery(options as any) as any
}
```

### Framework Rules

| Rule | React | Vue |
|------|-------|-----|
| Top directive | `'use client'` | None |
| Parameters wrapper | `Compute<...>` | `Compute<DeepMaybeRef<...>>` |
| Reactivity | Direct | `computed()` + `deepUnref()` |
| Doc URL | `wagmi.sh/react/api/hooks/` | `wagmi.sh/vue/api/composables/` |

**Shared rules:**
- `ResolvedRegister['config']`: Use in function signature only, not type defs
- No `enabled`/`structuralSharing` in hooks: Handled by queryOptions

### Testing

**Query hook test-d.ts**:
```ts
import { abi } from '@wagmi/test'
import { expectTypeOf, test } from 'vitest'
import { useMyAction } from './useMyAction.js'

test('select data', () => {
  const result = useMyAction({
    /* params */
    query: {
      select(data) {
        expectTypeOf(data).toEqualTypeOf<ExpectedDataType>()
        return data
      },
    },
  })
  expectTypeOf(result.data).toEqualTypeOf<ExpectedDataType>()
})
```

**Mutation hook test-d.ts**:
```ts
import { expectTypeOf, test } from 'vitest'
import { useMyAction } from './useMyAction.js'

test('context', () => {
  const { mutate } = useMyAction({
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toMatchTypeOf<{ /* expected shape */ }>()
        return { foo: 'bar' }
      },
      onError(error, variables, context) { /* test types */ },
      onSuccess(data, variables, context) { /* test types */ },
      onSettled(data, error, variables, context) { /* test types */ },
    },
  })

  mutate({ /* params */ }, {
    onSuccess(data, variables, context) { /* test inference */ },
  })
})
```

---

## Exports

Add to `exports/index.ts` in respective package:

```ts
// packages/core/src/exports/index.ts
export {
  type MyActionParameters,
  type MyActionReturnType,
  type MyActionErrorType,
  myAction,
} from '../actions/myAction.js'

// packages/core/src/exports/query.ts
export {
  type MyActionData,
  type MyActionOptions,
  type MyActionQueryFnData,
  type MyActionQueryKey,
  type MyActionQueryOptions,
  myActionQueryKey,
  myActionQueryOptions,
} from '../query/myAction.js'

// packages/react/src/exports/index.ts
export {
  type UseMyActionParameters,
  type UseMyActionReturnType,
  useMyAction,
} from '../hooks/useMyAction.js'
```

---

## Verification

```bash
# Format
pnpm format

# Type check (all or filtered)
pnpm check:types
pnpm --filter @wagmi/core check:types
pnpm --filter wagmi check:types

# Test (all or filtered)
pnpm test
pnpm test --project core
pnpm test --project react

# Update test snapshots
pnpm vitest -u

# Type benchmarks
pnpm bench:types

# Viem version mismatch in test snapshots
pnpm version:update:viem

# Build (all or filtered)
pnpm run clean && pnpm build
pnpm --filter @wagmi/core build
```
