<!--
<script setup>
const TData = 'TData'
const TError = 'TError'
const TPageParam = number
const hideQueryOptions = []
const includeInfiniteQueryOptions = false
</script>
-->

<br />

---

### query

TanStack Query parameters. See the [TanStack Query query docs](https://tanstack.com/query/v5/docs/react/reference/useQuery) for more info.

#### enabled

`boolean | undefined`

- Set this to `false` to disable this query from automatically running.
- Can be used for [Dependent Queries](https://tanstack.com/query/v5/docs/react/guides/dependent-queries).


<div v-if="!hideQueryOptions?.includes('gcTime')">

#### gcTime

`number | Infinity | undefined`

- Defaults to `5 * 60 * 1000` (5 minutes) or `Infinity` during SSR
- The time in milliseconds that unused/inactive cache data remains in memory. When a query's cache becomes unused or inactive, that cache data will be garbage collected after this duration. When different garbage collection times are specified, the longest one will be used.
- If set to `Infinity`, will disable garbage collection

</div>

#### initialData

`{{TData}} | (() => {{TData}}) | undefined`

- If set, this value will be used as the initial data for the query cache (as long as the query hasn't been created or cached yet)
- If set to a function, the function will be called **once** during the shared/root query initialization, and be expected to synchronously return the initialData
- Initial data is considered stale by default unless a `staleTime` has been set.
- `initialData` **is persisted** to the cache

#### initialDataUpdatedAt

`number | ((() => number | undefined)) | undefined`

If set, this value will be used as the time (in milliseconds) of when the `initialData` itself was last updated.

<div v-if="includeInfiniteQueryOptions">

#### initialPageParam

`{{TPageParam}}`

The initial page parameter to be passed to the query function.

#### getPreviousPageParam

This function can be set to automatically get the previous cursor for infinite queries.
The result will also be used to determine the value of `hasPreviousPage`.

`(firstPage: {{TData}}, allPages: {{TData}}[], firstPageParam: {{TPageParam}}, allPageParams: {{TPageParam}}[]) => {{TPageParam}} | undefined | null`

#### getNextPageParam

This function can be set to automatically get the previous cursor for infinite queries.
The result will also be used to determine the value of `hasPreviousPage`.

`(lastPage: {{TData}}, allPages: {{TData}}[], lastPageParam: {{TPageParam}}, allPageParams: {{TPageParam}}[]) => {{TPageParam}} | undefined | null`

</div>

#### meta

`Record<string, unknown> | undefined`

If set, stores additional information on the query cache entry that can be used as needed. It will be accessible wherever the `query` is available, and is also part of the `QueryFunctionContext` provided to the `queryFn`.

#### networkMode

`online' | 'always' | 'offlineFirst' | undefined`

- Defaults to `'online'`
- see [Network Mode](https://tanstack.com/query/v5/docs/react/guides/network-mode) for more information.

#### notifyOnChangeProps

`string[] | 'all' | (() => string[] | 'all') | undefined`

- If set, the component will only re-render if any of the listed properties change.
- If set to `['data', 'error']` for example, the component will only re-render when the `data` or `error` properties change.
- If set to `'all'`, the component will opt-out of smart tracking and re-render whenever a query is updated.
- If set to a function, the function will be executed to compute the list of properties.
- By default, access to properties will be tracked, and the component will only re-render when one of the tracked properties change.

#### placeholderData

`{{TData}} | ((previousValue: {{TData}} | undefined; previousQuery: Query | undefined) => {{TData}}) | undefined`

- If set, this value will be used as the placeholder data for this particular query observer while the query is still in the `pending` state.
- `placeholderData` is **not persisted** to the cache
- If you provide a function for `placeholderData`, as a first argument you will receive previously watched query data if available, and the second argument will be the complete previousQuery instance.

#### queryClient

`QueryClient | undefined`

Use this to use a custom `QueryClient`. Otherwise, the one from the nearest context will be used.

#### refetchInterval

`number | false | ((data: {{TData}} | undefined, query: Query) => number | false | undefined) | undefined`

- If set to a number, all queries will continuously refetch at this frequency in milliseconds
- If set to a function, the function will be executed with the latest data and query to compute a frequency

#### refetchIntervalInBackground

`boolean | undefined`

If set to `true`, queries that are set to continuously refetch with a `refetchInterval` will continue to refetch while their tab/window is in the background

#### refetchOnMount

`boolean | 'always' | ((query: Query) => boolean | 'always') | undefined`

- Defaults to `true`
- If set to `true`, the query will refetch on mount if the data is stale.
- If set to `false`, the query will not refetch on mount.
- If set to `'always'`, the query will always refetch on mount.
- If set to a function, the function will be executed with the query to compute the value

#### refetchOnReconnect

`boolean | 'always' | ((query: Query) => boolean | 'always') | undefined`

- Defaults to `true`
- If set to `true`, the query will refetch on reconnect if the data is stale.
- If set to `false`, the query will not refetch on reconnect.
- If set to `'always'`, the query will always refetch on reconnect.
- If set to a function, the function will be executed with the query to compute the value

#### refetchOnWindowFocus

`boolean | 'always' | ((query: Query) => boolean | 'always') | undefined`

- Defaults to `true`
- If set to `true`, the query will refetch on window focus if the data is stale.
- If set to `false`, the query will not refetch on window focus.
- If set to `'always'`, the query will always refetch on window focus.
- If set to a function, the function will be executed with the query to compute the value

#### retry

`boolean | number | ((failureCount: number, error: {{TError}}) => boolean) | undefined`

- If `false`, failed queries will not retry by default.
- If `true`, failed queries will retry infinitely.
- If set to a `number`, e.g. `3`, failed queries will retry until the failed query count meets that number.
- Defaults to `3` on the client and `0` on the server

#### retryDelay

`number | ((retryAttempt: number, error: {{TError}}) => number) | undefined`

- This function receives a `retryAttempt` integer and the actual Error and returns the delay to apply before the next attempt in milliseconds.
- A function like `attempt => Math.min(attempt > 1 ? 2 ** attempt * 1000 : 1000, 30 * 1000)` applies exponential backoff.
- A function like `attempt => attempt * 1000` applies linear backoff.

#### retryOnMount

`boolean | undefined`

If set to `false`, the query will not be retried on mount if it contains an error. Defaults to `true`.

#### select

`((data: {{TData}}) => unknown) | undefined`

This option can be used to transform or select a part of the data returned by the query function. It affects the returned `data` value, but does not affect what gets stored in the query cache.

<div v-if="!hideQueryOptions?.includes('staleTime')">

#### staleTime

`number | Infinity | undefined`

- Defaults to `0`
- The time in milliseconds after data is considered stale. This value only applies to the hook it is defined on.
- If set to `Infinity`, the data will never be considered stale

</div>

#### structuralSharing

`boolean | (((oldData: {{TData}} | undefined, newData: {{TData}}) => {{TData}})) | undefined`

- Defaults to `true`
- If set to `false`, structural sharing between query results will be disabled.
- If set to a function, the old and new data values will be passed through this function, which should combine them into resolved data for the query. This way, you can retain references from the old data to improve performance even when that data contains non-serializable values.
