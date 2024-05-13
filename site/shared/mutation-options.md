<!--
<script setup>
const mutate = 'mutationFn'
const TData = 'TData'
const TError = 'TError'
const TVariables = 'TVariables'
</script>
-->

<br />

---

### mutation

TanStack Query parameters. See the [TanStack Query mutation docs](https://tanstack.com/query/v5/docs/react/reference/useMutation) for more info.

::: info Wagmi does not support passing all TanStack Query parameters
TanStack Query parameters, like `mutationFn` and `mutationKey`, are used internally to make Wagmi work and you cannot override them. Check out the [source](https://github.com/wevm/wagmi/blob/main/packages/react/src/utils/query.ts#L30) to see what parameters are not supported. All parameters listed below are supported.
:::

#### gcTime

`number | Infinity | undefined`

- The time in milliseconds that unused/inactive cache data remains in memory. When a mutation's cache becomes unused or inactive, that cache data will be garbage collected after this duration. When different cache times are specified, the longest one will be used.
- If set to `Infinity`, will disable garbage collection

#### meta

`Record<string, unknown> | undefined`

If set, stores additional information on the mutation cache entry that can be used as needed. It will be accessible wherever [`{{mutate}}`](#mutate) is available (e.g. [`onError`](#onerror), [`onSuccess`](#onsuccess) functions).

#### networkMode

`'online' | 'always' | 'offlineFirst' | undefined`

- defaults to `'online'`
- see [Network Mode](https://tanstack.com/query/v5/docs/react/guides/network-mode) for more information.

#### onError

`((error: {{TError}}, variables: {{TVariables}}, context?: context | undefined) => Promise<unknown> | unknown) | undefined`

This function will fire if the mutation encounters an error and will be passed the error.

#### onMutate

`((variables: {{TVariables}}) => Promise<context | void> | context | void) | undefined`

- This function will fire before the mutation function is fired and is passed the same variables the mutation function would receive
- Useful to perform optimistic updates to a resource in hopes that the mutation succeeds
- The value returned from this function will be passed to both the `onError` and `onSettled` functions in the event of a mutation failure and can be useful for rolling back optimistic updates.

#### onSuccess

`((data: {{TData}}, variables: {{TVariables}}, context?: context | undefined) => Promise<unknown> | unknown) | undefined`

This function will fire when the mutation is successful and will be passed the mutation's result.

#### onSettled

`((data: {{TData}}, error: {{TError}}, variables: {{TVariables}}, context?: context | undefined) => Promise<unknown> | unknown) | undefined`

This function will fire when the mutation is either successfully fetched or encounters an error and be passed either the data or error

#### queryClient

`QueryClient`

Use this to use a custom `QueryClient`. Otherwise, the one from the nearest context will be used.

#### retry

`boolean | number | ((failureCount: number, error: {{TError}}) => boolean) | undefined`

- Defaults to `0`.
- If `false`, failed mutations will not retry.
- If `true`, failed mutations will retry infinitely.
- If set to an `number`, e.g. `3`, failed mutations will retry until the failed mutations count meets that number.

#### retryDelay

`number | ((retryAttempt: number, error: {{TError}}) => number) | undefined`

- This function receives a `retryAttempt` integer and the actual Error and returns the delay to apply before the next attempt in milliseconds.
- A function like `attempt => Math.min(attempt > 1 ? 2 ** attempt * 1000 : 1000, 30 * 1000)` applies exponential backoff.
- A function like `attempt => attempt * 1000` applies linear backoff.
