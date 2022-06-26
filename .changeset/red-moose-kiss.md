---
'wagmi': minor
---

**Breaking**: The following changes were made to the `useAccount` configuration:

## `onConnect` has been added

The `onConnect` callback is invoked when the account connects.

It provides the connected address & connector, as well as a `isReconnected` flag for if the user reconnected via `autoConnect`.

```tsx
const account = useAccount({
  onConnect({ address, connector, isReconnected }) {
    console.log('Connected')
  },
})
```

## `onDisconnect` has been added

The `onDisconnect` callback is invoked when the account disconnected.

```tsx
const account = useAccount({
  onDisconnect() {
    console.log('Disconnected')
  },
})
```

## `suspense` has been removed

The `useAccount` hook is a synchronous hook – so `suspense` never worked.

```diff
const account = useAccount({
-  suspense: true,
})
```

## `onError` has been removed

The `useAccount` hook never had any error definitions – so `onError` was never invoked.

```diff
const account = useAccount({
- onError(error) {
-   console.log('Error', error)
- },
})
```

## `onSettled` has been removed

The `useAccount` hook is a synchronous hook. `onSettled` was always invoked immediately.

```diff
const account = useAccount({
- onSettled(data) {
-   console.log('Settled', data)
- },
})
```

If you used `onSettled`, you can move the code beneath the `useAccount` hook:

```diff
const account = useAccount({
- onSettled(data) {
-   console.log('Address:', data.address)
- },
})
+ console.log('Address:', account.address)
```

## `onSuccess` has been removed

The `useAccount` hook is a synchronous hook. `onSuccess` was always invoked immediately.

```diff
const account = useAccount({
- onSuccess(data) {
-   console.log('Success', data)
- },
})
```

If you used `onSuccess`, you can move the code beneath the `useAccount` hook:

```diff
const account = useAccount({
- onSuccess(data) {
-   console.log('Address:', data.address)
- },
})
+ console.log('Address:', account.address)
```
