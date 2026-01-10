# Agent Guidelines

Agent guidance for query options

> **Communication Style**: Be brief, concise. Maximize information density, minimize tokens. Incomplete sentences acceptable when clear. Remove filler words. Prioritize clarity over grammar.

## Query Options Format

```ts
export function myActionQueryOptions<
  config extends Config,
  selectData = MyActionData
>(
  config: config,
  options: MyActionOptions<config, selectData> = {},
): MyActionQueryOptions<config, selectData> {
  return {
    ...options.query,
    enabled: Boolean(options.foo && (options.query?.enabled ?? true)),
    queryFn: async (context) => {
      const [, { scopeKey: _, ...parameters }] = context.queryKey
      if (!parameters.foo) throw new Error('foo is required')
      const result = await myAction(config, {
        foo: parameters.foo,
        ...parameters,
      })
      return result ?? null
    },
    queryKey: myActionQueryKey(options),
    structuralSharing, // include when action returns objects, nested values, or arrays
  }
}

export function myActionQueryKey<
  config extends Config,
  selectData = MyActionData
>(
  parameters: Compute<ExactPartial<MyActionParameters<config>> & ScopeKeyParameter> = {},
) {
  return ['myAction', filterQueryOptions(parameters)] as const
}

export type MyActionOptions<
  config extends Config,
  selectData = MyActionData,
> = Compute<ExactPartial<MyActionParameters<config>> & ScopeKeyParameter> &
  QueryParameter<
    MyActionQueryFnData,
    MyActionErrorType,
    selectData,
    MyActionQueryKey<config>
  >

export type MyActionQueryOptions<
  config extends Config,
  selectData = MyActionData
> = QueryOptions<
  MyActionQueryFnData,
  MyActionErrorType,
  selectData,
  MyActionQueryKey<config>
>

export type MyActionQueryFnData = Compute<MyActionReturnType>

export type MyActionData = MyActionQueryFnData

export type MyActionQueryKey<config extends Config> = ReturnType<
  typeof myActionQueryKey<config>
>
```

## Style Conventions

### `queryFn` Syntax

- Use arrow function property syntax: `queryFn: async (context) =>` (not method shorthand `async queryFn(context)`)
- Use `context` parameter, not destructuring: `async (context) =>` (not `async ({ queryKey }) =>`)
- Access `queryKey` via `context.queryKey`

### Destructuring `queryKey`

Use array destructuring with `parameters`, then access properties via `parameters.foo`:

```ts
// ✓ Correct
const [, { scopeKey: _, ...parameters }] = context.queryKey
if (!parameters.account) throw new Error('account is required')

// ✗ Avoid
const { account, scopeKey: _, ...parameters } = context.queryKey[1]
```

### Calling Actions

When calling actions, spread parameters first, then pass required parameters:

```ts
// ✓ Correct - spread, then explicit required param
return myAction(config, { ...parameters, foo: parameters.foo })

// ✗ Avoid - just passing parameters directly
return myAction(config, parameters)
```

### Accessing Skipped Properties

Properties filtered from the queryKey (e.g., `connector`, `abi`) should be accessed via `options.`:

```ts
queryFn: async (context) => {
  const [, { scopeKey: _, ...parameters }] = context.queryKey
  // ✓ Use rest.connector for properties not in queryKey
  const result = await myAction(config, { ...parameters, connector: options.connector })
  return result ?? null
}
```

## Type Parameter Nuances

### `const` Modifier

Use `const` for type parameters that need literal type inference (e.g., abi, args):

```ts
export function readContractQueryOptions<
  const abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'pure' | 'view'>,
  const args extends ContractFunctionArgs<abi, 'pure' | 'view', functionName>,
  config extends Config,
>
```

### `ExactPartial` vs `UnionExactPartial`

- **`ExactPartial`**: Use for simple cases with straightforward parameter types
- **`UnionExactPartial`**: Use for complex type inference or action parameter types with lots of unions (e.g., contract-related actions)

If unsure, check the underlying action's parameter types or ask.

### Default Parameter Value

- **Simple cases**: `options: MyActionOptions<config, selectData> = {}`
- **Complex generics** (e.g., contract actions with abi/args): `options: MyActionOptions<...> = {} as any`

## `structuralSharing`

Include `structuralSharing` from `./utils.js` when the action returns:
- Objects
- Nested values  
- Arrays

See `packages/react/src/hooks` for more examples.

## Special Query Key Handling

For `getConnectorClient`, include `connectorUid` separately in the query key:

```ts
return [
  'connectorClient',
  { ...filterQueryOptions(options), connectorUid: options.connector?.uid },
] as const
```
