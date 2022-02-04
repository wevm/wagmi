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

https://github.com/tmm/wagmi/discussions/85

TODO

# Detailed design

For the purpose of clarity, I think we should introduce the terminology of "read hooks" and "action hooks" or something similar.

This will allow the consumer to know which hooks will invoke on mount (read hooks), and the ones whos actions won't be invoked on mount (action hooks).

I feel like the naming of read hooks such as `useAccount`, `useBalance`, `useNetwork` are fine, however I reckon it would be nice to be more explicit with action hook naming to include intending verb (i.e. `useTransactionSend` instead of `useTransaction`). This also aligns with existing hooks such as `useContractWrite` and `useEnsLookup`.

### Read hooks

The following hooks will see a common set of changes to their APIs:

#### Arguments

The following set of **optional** arguments will be added to the read hooks:

- `cacheTime: number`: The time (in ms) that the data remains in the cache, cached data is displayed initially to the user while a background fetch is being performed.
- `staleTime: number`: The time (in ms) after which the data is considered stale, and a background refetch is needed.
- `onSuccess: (data: TData) => void`: A callback function to be invoked when the data is successfully fetched.
- `onError: (error: TError) => void`: A callback function to be invoked when an error has been thrown.
- `onSettled: (data?: TData, error?: TError) => void`: A callback function to be invoked when the data has either been fetched successfully or not (kinda like `finally`).
- `suspense: boolean`: Enable the hook to use suspense

#### Return values

The `loading` flag will be removed in favour of the following set of deterministic states:

- `isLoading`: A flag to indicate that the data is loading for the first time
- `isReloading`: A flag to indicate that the data is loading in the background, and showing cached success/error data in the meantime (meaining this flag can be truthy when isSuccess/isError is truthy).
- `isSuccess`: A flag to indicate the data has been fetched successfully.
- `isError`: A flag to indicate that an error was thrown upon fetching the account

#### `useAccount` 

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
  cacheTime?: number
})
```

TODO

### Action hooks

# Drawbacks

Why should we *not* do this? Please consider:

- implementation cost, both in term of code size and complexity
- whether the proposed feature can be implemented in user space
- the impact on teaching people React
- integration of this feature with other existing and planned features
- cost of migrating existing React applications (is it a breaking change?)

There are tradeoffs to choosing any path. Attempt to identify them here.

# Alternatives

What other designs have been considered? What is the impact of not doing this?

# Adoption strategy

If we implement this proposal, how will existing React developers adopt it? Is
this a breaking change? Can we write a codemod? Should we coordinate with
other projects or libraries?

# How we teach this

What names and terminology work best for these concepts and why? How is this
idea best presented? As a continuation of existing React patterns?

Would the acceptance of this proposal mean the React documentation must be
re-organized or altered? Does it change how React is taught to new developers
at any level?

How should this feature be taught to existing React developers?

# Unresolved questions

Optional, but suggested for first drafts. What parts of the design are still
TBD?