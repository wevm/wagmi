<!--
<script setup>
const TData = 'TData'
const TError = 'TError'
const includeInfiniteQueryResult = false
</script>
-->

<br />

---

[TanStack Query query docs](https://tanstack.com/query/v5/docs/react/reference/useQuery)

### data

`{{TData}}`

- The last successfully resolved data for the query.
- Defaults to `undefined`.

### dataUpdatedAt

`number`

The timestamp for when the query most recently returned the `status` as `'success'`.

### error

`null | {{TError}}`

- The error object for the query, if an error was thrown.
- Defaults to `null`

### errorUpdatedAt

`number`

The timestamp for when the query most recently returned the `status` as `'error'`.

### errorUpdateCount

`number`

The sum of all errors.

### failureCount

`number`

- The failure count for the query.
- Incremented every time the query fails.
- Reset to `0` when the query succeeds.

### failureReason

`null | {{TError}}`

- The failure reason for the query retry.
- Reset to `null` when the query succeeds.

<div v-if="includeInfiniteQueryOptions">

### fetchNextPage

`(options?: FetchNextPageOptions) => Promise<InfiniteQueryObserverResult<{{TData}}, {{TError}}>>`

This function allows you to fetch the next "page" of results.

### fetchPreviousPage

`(options?: FetchPreviousPageOptions) => Promise<InfiniteQueryObserverResult<TData, TError>>`

This function allows you to fetch the previous "page" of results.

### hasNextPage

`boolean`

This will be `true` if there is a next page to be fetched (known via the `getNextPageParam` option).

### hasPreviousPage

`boolean`

This will be `true` if there is a previous page to be fetched (known via the `getPreviousPageParam` option).

### isFetchingNextPage

`boolean`

Will be `true` while fetching the next page with `fetchNextPage`.

### isFetchingPreviousPage

`boolean`

Will be `true` while fetching the previous page with `fetchPreviousPage`.

</div>

### fetchStatus

`'fetching' | 'idle' | 'paused'`

- `fetching` Is `true` whenever the queryFn is executing, which includes initial `pending` as well as background refetches.
- `paused` The query wanted to fetch, but has been `paused`.
- `idle` The query is not fetching.
- See [Network Mode](https://tanstack.com/query/v5/docs/react/guides/network-mode) for more information.

### isError / isPending / isSuccess

`boolean`

Boolean variables derived from [`status`](#status).

### isFetched

`boolean`

Will be `true` if the query has been fetched.

### isFetchedAfterMount

`boolean`

- Will be `true` if the query has been fetched after the component mounted.
- This property can be used to not show any previously cached data.

### isFetching / isPaused

`boolean`

Boolean variables derived from [`fetchStatus`](#fetchstatus).

### isLoading

`boolean`

- Is `true` whenever the first fetch for a query is in-flight
- Is the same as `isFetching && isPending`

### isLoadingError

`boolean`

Will be `true` if the query failed while fetching for the first time.

### isPlaceholderData

`boolean`

Will be `true` if the data shown is the placeholder data.

### isRefetchError

`boolean`

Will be `true` if the query failed while refetching.

### isRefetching

`boolean`

- Is `true` whenever a background refetch is in-flight, which _does not_ include initial `'pending'`.
- Is the same as `isFetching && !isPending`

### isStale

`boolean`

Will be `true` if the data in the cache is invalidated or if the data is older than the given `staleTime`.

### refetch

`(options: { cancelRefetch?: boolean | undefined; throwOnError?: boolean | undefined }) => Promise<UseQueryResult<{{TData}}, {{TError}}>>`

- A function to manually refetch the query.
- `throwOnError`
  - When set to `true`, an error will be thrown if the query fails.
  - When set to `false`, an error will be logged if the query fails.
- `cancelRefetch`
  - When set to `true`, a currently running request will be cancelled before a new request is made.
  - When set to `false`, no refetch will be made if there is already a request running.
  - Defaults to `true`

### status

`'error' | 'pending' | 'success'`

- `pending` if there's no cached data and no query attempt was finished yet.
- `error` if the query attempt resulted in an error. The corresponding `error` property has the error received from the attempted fetch
- `success` if the query has received a response with no errors and is ready to display its data. The corresponding `data` property on the query is the data received from the successful fetch or if the query's `enabled` property is set to `false` and has not been fetched yet `data` is the first `initialData` supplied to the query on initialization.
