---
'wagmi': minor
---

**Breaking**: The following changes were made to the `useAccount` return value:

### The `data` value is now `address` & `connector`

```diff
{
- data?: {
-   address: string
-   connector: Connector
- }
+ address?: string
+ connector?: Connector
}
```

### Global connection status values have been added

The following global connection status values have been added:

```diff
{
+ isConnecting: boolean
+ isReconnecting: boolean
+ isConnected: boolean
+ isDisconnected: boolean
+ status: 'connecting' | 'reconnecting' | 'connected' | 'disconnected'
}
```

The `useAccount` hook is now aware of any connection event in your application, so now you can use these connection status values to determine if your user is connected, disconnected or connecting to a wallet on a global scope.

### `error`, states & `refetch` values have been removed

Since the `useAccount` hook never dealt with asynchronous data, all of these values were
redundant & unused.

```diff
{
- error?: Error
- isIdle: boolean
- isLoading: boolean
- isFetching: boolean
- isSuccess: boolean
- isError: boolean
- isFetched: boolean
- isRefetching: boolean
- refetch: (options: {
-   throwOnError: boolean
-   cancelRefetch: boolean
- }) => Promise<{
-   address: string
-   connector: Connector
- }>
- status: 'idle' | 'error' | 'loading' | 'success'
}
```

### Summary of changes

Below is the whole diff of changes to the `useAccount` return value.

```diff
{
- data?: {
-   address: string
-   connector: Connector
- }
+ address?: string
+ connector?: Connector
- error?: Error
- isIdle: boolean
- isLoading: boolean
- isFetching: boolean
- isSuccess: boolean
- isError: boolean
- isFetched: boolean
- isRefetching: boolean
+ isConnecting: boolean
+ isReconnecting: boolean
+ isConnected: boolean
+ isDisconnected: boolean
- refetch: (options: {
-   throwOnError: boolean
-   cancelRefetch: boolean
- }) => Promise<{
-   address: string
-   connector: Connector
- }>
- status: 'idle' | 'error' | 'loading' | 'success'
+ status: 'connecting' | 'reconnecting' | 'connected' | 'disconnected'
}
```
