- Start Date: 04/02/2022
- RFC PR:

# Summary

This RFC proposes the amendment of the hooks API within `wagmi` to include **finite & deterministic states**, as well as enabling the ability to **cache** appropriate hooks & data within the library.

This proposal heavily integrates with [`react-query`](https://react-query.tanstack.com/) internally whilst still providing a minimal API surface at the face of `wagmi`.

# Basic example

## Example 1 (finite states)

A very high-level example of the proposal could use the `useSignMessage` hook for signing a message with the connected account.

Currently, the API looks as such:

```tsx
import { useSignMessage } from 'wagmi'

const App = () => {
  const [{ data, error, loading }, signMessage] = useSignMessage({
    message: 'gm wagmi frens',
  })

  if (!data)
    return (
      <button disabled={loading} onClick={async () => await signMessage()}>
        Sign message
      </button>
    )

  return (
    <div>
      {data && <div>Signature: {data}</div>}
      {error && <div>Error signing message</div>}
    </div>
  )
}
```

This proposal adds a set of states (`isIdle`, `isLoading`, `isSuccess` & `isError`) that represents a finite state machine (only one flag can be truthy at the one time), which makes the following render code easier to read & follow:

```tsx
import { useSignMessage } from 'wagmi'

const App = () => {
  const [{ data, error, isIdle, isLoading, isSuccess, isError }, signMessage] = useSignMessage({
    message: 'gm wagmi frens',
  })

  return (
    <div>
      {isIdle && (
        <button disabled={loading} onClick={async () => await signMessage()}>
          Sign message
        </button>
      )}
      {isLoading && <div>Signing...</div>}
      {isSuccess && <div>Signature: {data}</div>}
      {isError && <div>Error signing message</div>}
    </div>
  )
}
```

## Example 2 (caching)

Some hooks in this library could be cacheable, such as `useAccount`, `useBalance`, `useNetwork`, etc. 

There are no examples for caching, as it will be performed under-the-hood. 

However, users' should be able to do either of the following:

- change the cache expiry (time the data remains in the cache, cached results are shown to the user straight away),

```tsx
const [...] = useAccount({ cacheTime: 60000 });
```

- change the stale expiry (time when the data is considered stale, and then should perform a background refresh),

```tsx
const [...] = useAccount({ staleTime: 10000 });
```

- disable the cache completely.

```tsx
const [...] = useAccount({ cacheTime: 0 });
```

# Motivation

The motivation of this RFC can be seen in the below discussion:

https://github.com/tmm/wagmi/discussions/85

TLDR; 

- Non-deterministic & implicit states can lead to "impossible" states, which can cause UX bugs quite easily,
- No idle state & implicit states lead to a confusing DX,
- Most dapps experience a "flash of loading wallet/resolving ens" experience.

# Detailed design

Below are some (opinionated) notes that we should consider:

## A note on hook categorization

For the purpose of clarity, I think we should introduce the terminology of "read hooks" and "action hooks" or something similar.

This will allow the consumer to know which hooks will invoke on mount (read hooks), and the ones whos actions won't be invoked on mount (action hooks).

## A note on hook naming

I feel like the naming of read hooks such as `useAccount`, `useBalance`, `useNetwork` are fine, however I reckon it would be nice to be more explicit with action hook naming to include intending verb (i.e. `useTransactionSend` instead of `useTransaction`). This also aligns with existing hooks such as `useContractWrite` and `useEnsLookup`.

## A note on `skip`

I feel like the `skip` argument can be a bit confusing in practice, as it encourages negating logic.

An example of where we use `skip` could be to not run the hook until an ID is provided to the component:

```tsx
const [{ data, error, loading }, getBalance] = useBalance({
  addressOrName: address
  formatUnits: 'gwei',
  skip: !address
})
```

However, this could get more confusing with multiple inputs, such as:

```tsx
const [{ data, error, loading }, getBalance] = useBalance({
  addressOrName: name || address
  formatUnits: 'gwei',
  skip: !name && !address
})
```

I feel like if we flip the logic, and introduce an `enabled` argument, this would make DX a bit easier to follow & reason about:

```tsx
const [{ data, error, loading }, getBalance] = useBalance({
  addressOrName: name || address
  formatUnits: 'gwei',
  enabled: Boolean(name || address)
})
```

By default, if `enabled` is not provided, then it is truthy & it still fetches on mount.

## React Query & `Provider`

This implementation will use [React Query](https://react-query.tanstack.com/), which means we will need to provide a query client (via react-query's `QueryClientProvider`) within wagmi's `Provider`.

## Storage persistence

I think maybe we should have storage persistence an opt-in feature, that people can toggle on from the `Provider`. Storage persistence is available via [react-query's `persistQueryClient`](https://react-query.tanstack.com/plugins/persistQueryClient)

### Usage

```tsx
import { Provider, createPersistor } from 'wagmi';

const localStoragePersistor = createPersistor({ storage: window.localStorage })

const App = () => (
  <Provider persistor={localStoragePersistor}>
    <YourRoutes />
  </Provider>
)
```

## Read hooks

The following hooks will see a common set of changes to their APIs:

### Arguments

The following set of **optional** arguments will be added to the read hooks:

- `cacheTime: number`: The time (in ms) that the data remains in the cache, cached data is displayed initially to the user while a background fetch is being performed. Defaults to `5 * 60 * 1000` (5 minutes).
- `staleTime: number`: The time (in ms) after which the data is considered stale, and a background refetch is needed. Defaults to `0`.
- `onSuccess: (data: TData) => void`: A callback function to be invoked when the data is successfully fetched.
- `onError: (error: TError) => void`: A callback function to be invoked when an error has been thrown.
- `onSettled: (data?: TData, error?: TError) => void`: A callback function to be invoked when the data has either been fetched successfully or not (kinda like `finally`).
- `suspense: boolean`: Enable the hook to use suspense

### Return values

The `loading` flag will be removed in favour of the following set of deterministic states:

- `isIdle`: A flag to indicate that the promise has not yet been invoked, and data has not been loaded yet.
- `isLoading`: A flag to indicate that the data is loading for the first time
- `isReloading`: A flag to indicate that the data is loading in the background, and showing cached success/error data in the meantime (meaining this flag can be truthy when isSuccess/isError is truthy).
- `isSuccess`: A flag to indicate the data has been fetched successfully.
- `isError`: A flag to indicate that an error was thrown upon fetching the account
- `status`: A string indicating the current status of the request (can be either: `"idle"`, `"loading"`, `"error"` or `"success"`)

### `useAccount` 

The new `useAccount` API will look like such:

```tsx
const [{
  data,         
  error,        
  isLoading,    
  isReloading,  
  isSuccess,    
  isError       
}, disconnect] = useAccount({
  fetchEns?: boolean,
}, {
  enabled?: boolean,
  cacheTime?: number,
  staleTime?: number,
  onSuccess?: (data: TData) => void,
  onError?: (error: TError) => void,
  onSettled?: (data?: TData, error?: TError) => void,
  suspense?: boolean
})
```

By default, caching will be disabled on the `useAccount` hook (`cacheTime: 0`), as a user could close the window, change their wallet, and then return to the app, they will briefly see stale account details while the new details is fetching in the background. This could be jarring for some users, especially if the network connection is slow.

However, if needed, the cache can be enabled by setting the `cacheTime` flag to a number (e.g. `10 * 60 * 1000` for 10 minutes).

> Side note: Not in the scope of this RFC, but `useAccount` currently only fetches account data of the current signer. I think it would be nice, if we had another hook to fetch account data for a provided address.

### `useBalance`

The new `useBalance` API will look like such:

```tsx
const [{
  data,         
  error,        
  isLoading,    
  isReloading,  
  isSuccess,    
  isError       
}, getBalance] = useBalance({
  addressOrName?: string,
  formatUnits?: string,
  token?: string,
}, {
  watch?: string,
  enabled?: boolean,
  cacheTime?: number,
  staleTime?: number,
  onSuccess?: (data: TData) => void,
  onError?: (error: TError) => void,
  onSettled?: (data?: TData, error?: TError) => void,
  suspense?: boolean
})
```

By default, caching on `useBalance` will:

- be enabled,
- cached in local storage,
- have a cache expiry of **60 minutes**
- have its data always stale (`staleTime = 0`)

### `useBlockNumber`

The new `useBlockNumber` API will look like such:

```tsx
const [{
  data,         
  error,        
  isLoading,    
  isReloading,  
  isSuccess,    
  isError       
}, getBlockNumber] = useBlockNumber({
  enabled?: boolean,
  watch?: string,
  cacheTime?: number,
  staleTime?: number,
  onSuccess?: (data: TData) => void,
  onError?: (error: TError) => void,
  onSettled?: (data?: TData, error?: TError) => void,
  suspense?: boolean
})
```

By default, caching on `useBlockNumber` will be **disabled**.

### `useContract`

The `useContract` API will be unchanged.

### `useContractEvent`

The `useContractEvent` API will be unchanged.

### `useContractRead`

The new `useContractRead` API will look like such:

```tsx
const [{
  data,         
  error,        
  isLoading,    
  isReloading,  
  isSuccess,    
  isError       
}, read] = useContractRead(
  {
    addressOrName: string,
    contractInterface: ContractInterface,
    signerOrProvider?: Signer | Provider,
    args?: any | any[],
    overrides?: CallOverrides
  },
  'getSleep',
  {
    watch?: boolean,
    enabled?: boolean,
    cacheTime?: number,
    staleTime?: number,
    onSuccess?: (data: TData) => void,
    onError?: (error: TError) => void,
    onSettled?: (data?: TData, error?: TError) => void,
    suspense?: boolean
  }
)
```

By default, caching on `useContractRead` will:

- be enabled,
- cached in local storage,
- have garbage collection disabled (`cacheTime = Infinity`),
- have its data always stale (`staleTime = 0`)

### `useEnsAvatar`

The new `useEnsAvatar` API will look like such:

```tsx
const [{
  data,         
  error,        
  isLoading,    
  isReloading,  
  isSuccess,    
  isError       
}, getEnsAvatar] = useEnsAvatar({
  addressOrName: string
}, {
  enabled?: boolean,
  cacheTime?: number,
  staleTime?: number,
  onSuccess?: (data: TData) => void,
  onError?: (error: TError) => void,
  onSettled?: (data?: TData, error?: TError) => void,
  suspense?: boolean
})
```

By default, caching on `useEnsAvatar` will:

- be enabled,
- cached in local storage,
- have garbage collection disabled (`cacheTime = Infinity`),
- have its data always stale (`staleTime = 0`)

### `useEnsLookup`

The new `useEnsLookup` API will look like such:

```tsx
const [{
  data,         
  error,        
  isLoading,    
  isReloading,  
  isSuccess,    
  isError       
}, lookupAddress] = useEnsLookup({
  address: string
}, {
  enabled?: boolean,
  cacheTime?: number,
  staleTime?: number,
  onSuccess?: (data: TData) => void,
  onError?: (error: TError) => void,
  onSettled?: (data?: TData, error?: TError) => void,
  suspense?: boolean
})
```

By default, caching on `useEnsLookup` will:

- be enabled,
- cached in local storage,
- have garbage collection disabled (`cacheTime = Infinity`),
- have its data always stale (`staleTime = 0`)

### `useEnsResolver`

The new `useEnsResolver` API will look like such:

```tsx
const [{
  data,         
  error,        
  isLoading,    
  isReloading,  
  isSuccess,    
  isError       
}, getEnsResolver] = useEnsResolver({
  name: string
}, {
  enabled?: boolean,
  cacheTime?: number,
  staleTime?: number,
  onSuccess?: (data: TData) => void,
  onError?: (error: TError) => void,
  onSettled?: (data?: TData, error?: TError) => void,
  suspense?: boolean
})
```

By default, caching on `useEnsResolver` will:

- be enabled,
- cached in local storage,
- have garbage collection disabled (`cacheTime = Infinity`),
- have its data always stale (`staleTime = 0`)

### `useFeeData`

The new `useFeeData` API will look like such:

```tsx
const [{
  data,         
  error,        
  isLoading,    
  isReloading,  
  isSuccess,    
  isError       
}, getFeeData] = useFeeData({
  name: string
  formatUnits?: string,
}, {
  enabled?: boolean,
  cacheTime?: number,
  staleTime?: number,
  onSuccess?: (data: TData) => void,
  onError?: (error: TError) => void,
  onSettled?: (data?: TData, error?: TError) => void,
  suspense?: boolean
})
```

By default, caching on `useFeeData` will be disabled.

### `useNetwork`

The new `useNetwork` API will look like such:

```tsx
const [{
  data,         
  error,        
  isLoading,    
  isReloading,  
  isSuccess,    
  isError       
}, switchNetwork] = useNetwork({
  enabled?: boolean,
  cacheTime?: number,
  staleTime?: number,
  onSuccess?: (data: TData) => void,
  onError?: (error: TError) => void,
  onSettled?: (data?: TData, error?: TError) => void,
  suspense?: boolean
})
```

By default, caching on `useNetwork` will be disabled.

### `useSigner`

The new `useSigner` API will look like such:

```tsx
const [{
  data,         
  error,        
  isLoading,    
  isReloading,  
  isSuccess,    
  isError       
}, getSigner] = useSigner({
  enabled?: boolean,
  cacheTime?: number,
  staleTime?: number,
  onSuccess?: (data: TData) => void,
  onError?: (error: TError) => void,
  onSettled?: (data?: TData, error?: TError) => void,
  suspense?: boolean
})
```

By default, caching on `useSigner` will be disabled.

### `useToken`

The new `useToken` API will look like such:

```tsx
const [{
  data,         
  error,        
  isLoading,    
  isReloading,  
  isSuccess,    
  isError       
}, getSigner] = useToken({
  address: string,
  formatUnits?: string
}, {
  enabled?: boolean,
  cacheTime?: number,
  staleTime?: number,
  onSuccess?: (data: TData) => void,
  onError?: (error: TError) => void,
  onSettled?: (data?: TData, error?: TError) => void,
  suspense?: boolean
})
```

By default, caching on `useToken` will:

- be enabled,
- cached in local storage,
- have garbage collection disabled (`cacheTime = Infinity`),
- have its data always stale (`staleTime = 0`)

### `useWaitForTransaction`

The new `useWaitForTransaction` API will look like such:

```tsx
const [{
  data,         
  error,        
  isLoading,    
  isReloading,  
  isSuccess,    
  isError       
}, getSigner] = useWaitForTransaction({
  address: string,
  formatUnits?: string
}, {
  enabled?: boolean,
  cacheTime?: number,
  staleTime?: number,
  onSuccess?: (data: TData) => void,
  onError?: (error: TError) => void,
  onSettled?: (data?: TData, error?: TError) => void,
  suspense?: boolean
})
```

By default, caching on `useWaitForTransaction` will be disabled.


## Action hooks

The following hooks will see a common set of changes to their APIs:

### Arguments

The following set of **optional** arguments will be added to the read hooks:

- `onMutate: (variables: TVariables) => Promise<TContext | void> | TContext | void`: A callback function that will be invoked before the mutation function is invoked
- `onSuccess: (data: TData, variables: TVariables, context?: TContext) => Promise<unknown> | void`: A callback function to be invoked when the mutation is successful.
- `onError: (err: TError, variables: TVariables, context?: TContext) => Promise<unknown> | void`: A callback function to be invoked when an error has been thrown.
- `onSettled: (data: TData, error: TError, variables: TVariables, context?: TContext) => Promise<unknown> | void`: A callback function to be invoked when the data has either been mutated successfully or not (kinda like `finally`).

### Return values

The `loading` flag will be removed in favour of the following set of deterministic states:

- `isIdle`: A flag to indicate that the promise has not yet been invoked.
- `isLoading`: A flag to indicate that the promise is loading
- `isSuccess`: A flag to indicate the data has been promise has been resolved.
- `isError`: A flag to indicate that an error was thrown
- `status`: A string indicating the current status of the request (can be either: `"idle"`, `"loading"`, `"error"` or `"success"`)

### `useConnect`

The new `useConnect` API will look like such:

```tsx
const [{
  data,         
  error,        
  isConnecting,    
  isReconnecting,  
  isConnected,    
  isError       
}, connect] = useConnect({
  onMutate?: (variables: TVariables) => void,
  onConnected?: (data: TData) => void,
  onError?: (error: TError) => void,
  onSettled?: (data?: TData, error?: TError) => void
})
```

### `useContractWrite`

The new `useContractWrite` API will look like such:

```tsx
const [{
  data,         
  error,      
  isIdle,  
  isLoading,    
  isSuccess,    
  isError       
}, write] = useContractWrite({
    addressOrName: string,
    contractInterface: ContractInterface,
    signerOrProvider?: Signer | Provider,
    args?: any | any[],
    overrides?: CallOverrides
  },
  'getSleep',
  {
    onMutate?: (variables: TVariables) => void,
    onConnected?: (data: TData) => void,
    onError?: (error: TError) => void,
    onSettled?: (data?: TData, error?: TError) => void
  }
)
```

### `useSignMessage`

The new `useSignMessage` API will look like such:

```tsx
const [{
  data,         
  error, 
  isIdle,       
  isLoading,    
  isSuccess,    
  isError       
}, signMessage] = useSignMessage({
  message: string,
},
{
  onMutate?: (variables: TVariables) => void,
  onConnected?: (data: TData) => void,
  onError?: (error: TError) => void,
  onSettled?: (data?: TData, error?: TError) => void
})
```

### `useTransaction`

The new `useTransaction` API will look like such:

```tsx
const [{
  data,         
  error,    
  isIdle,    
  isLoading,    
  isSuccess,    
  isError       
}, sendTransaction] = useTransaction({
  request: TransactionRequest
},
{
  onMutate?: (variables: TVariables) => void,
  onConnected?: (data: TData) => void,
  onError?: (error: TError) => void,
  onSettled?: (data?: TData, error?: TError) => void
})
```


# Drawbacks

There are 2 immediate drawbacks:

- Bundle size
  - Adding `react-query` could [add up to 13kB](https://bundlephobia.com/package/react-query@3.34.14) to the bundle size. However, `react-query` is tree-shakable, so it is possible that this could be lower.
- Increased API surface
  - With the addition of new async state variables, and caching options, this will increase the API surface layer. But I don't think it's too much of a concern.

# Alternatives

There are a few alternatives that were mentioned in the [precurser discussion thread](https://github.com/tmm/wagmi/discussions/85). They were:

- [Rolling our own states & cache](https://github.com/tmm/wagmi/discussions/85#discussioncomment-1977448),
- Use an alternate async state lib such as SWR,
- [Have separate entries for async state libraries](https://github.com/tmm/wagmi/discussions/85#discussioncomment-1978779)

# How we teach this

Will need to add the new API to the docs, and think about the structure of the docs if we want to separate hooks by "action hooks" & "read hooks".