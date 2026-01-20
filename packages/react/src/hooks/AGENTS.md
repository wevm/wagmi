# Agent Guidelines

Agent guidance for React hooks

> **Communication Style**: Be brief, concise. Maximize information density, minimize tokens. Incomplete sentences acceptable when clear. Remove filler words. Prioritize clarity over grammar.

## Query Hook Format

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
  })
  return useQuery(options)
}
```

## Key Patterns

### `'use client'` Directive

All hooks must start with `'use client'` directive.

### `useConfig` and `useChainId`

Query hooks always call these to get config from React context and current chain:

```ts
const config = useConfig(parameters)
const chainId = useChainId({ config })
```

### `ResolvedRegister['config']`

Use `ResolvedRegister['config']` as default for `config` in the **function signature only** (not in type definitions). This allows type inference when config is injected via React context:

```ts
// Type definition uses Config
export type UseMyActionParameters<
  config extends Config = Config,
  selectData = MyActionData,
> = ...

// Function uses ResolvedRegister['config']
export function useMyAction<
  config extends Config = ResolvedRegister['config'],
  selectData = MyActionData,
>(...) { ... }
```

### `enabled` and `structuralSharing`

Do NOT set `enabled` or `structuralSharing` in hooks. These are handled by `queryOptions` from `@wagmi/core/query`.

### Doc Comment

Use a simple link to the docs:

```ts
/** https://wagmi.sh/react/api/hooks/useMyAction */
```

## Type Parameter Nuances

### `Compute` vs `UnionCompute`

- **`Compute`**: Use for simple hooks with straightforward parameter types
- **`UnionCompute`**: Use for complex type inference (e.g., contract-related hooks)
- **Neither**: Some hooks with very complex inference may not support either

### `const` Modifier

Use `const` for type parameters that need literal type inference (e.g., abi, args):

```ts
export function useReadContract<
  const abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'pure' | 'view'>,
  const args extends ContractFunctionArgs<abi, 'pure' | 'view', functionName>,
  config extends Config = ResolvedRegister['config'],
  selectData = ReadContractData<abi, functionName, args>,
>
```

### Default Parameter Value

- **Simple cases**: `parameters: UseMyActionParameters<config, selectData> = {}`
- **Complex generics**: `parameters: UseMyActionParameters<...> = {} as any`
