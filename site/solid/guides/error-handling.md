# Error Handling

`@wagmi/solid` provides comprehensive error handling through typed errors and TanStack Query's error states.

## Query Errors

When using query primitives, errors are available through the `error` property:

```tsx
import { useBalance } from '@wagmi/solid'

function Balance() {
  const balance = useBalance(() => ({
    address: '0x...',
  }))

  return (
    <div>
      {balance.isError && (
        <p>Error: {balance.error?.message}</p>
      )}
      {balance.isSuccess && (
        <p>Balance: {balance.data?.formatted}</p>
      )}
    </div>
  )
}
```

## Mutation Errors

For mutation primitives like `useConnect` or `useDisconnect`, you can handle errors similarly:

```tsx
import { useConnect } from '@wagmi/solid'
import { injected } from '@wagmi/solid/connectors'

function Connect() {
  const connect = useConnect()

  const handleConnect = () => {
    connect.mutate(
      { connector: injected() },
      {
        onError(error) {
          console.error('Failed to connect:', error.message)
        },
      }
    )
  }

  return (
    <div>
      <button onClick={handleConnect}>Connect</button>
      {connect.isError && <p>Error: {connect.error?.message}</p>}
    </div>
  )
}
```

## Error Types

Wagmi exports specific error types that you can use for more granular error handling:

```tsx
import { useConnect, ConnectorNotFoundError } from '@wagmi/solid'

function Connect() {
  const connect = useConnect()

  const handleConnect = () => {
    connect.mutate(
      { connector: injected() },
      {
        onError(error) {
          if (error instanceof ConnectorNotFoundError) {
            console.error('Wallet not installed')
          } else {
            console.error('Unknown error:', error.message)
          }
        },
      }
    )
  }

  // ...
}
```

## Common Errors

### ConnectorNotFoundError

Thrown when trying to use a connector that isn't available (e.g., MetaMask not installed).

### ChainNotConfiguredError

Thrown when trying to use a chain that isn't configured in your Wagmi config.

### ConnectorAlreadyConnectedError

Thrown when trying to connect with a connector that's already connected.

## Further Reading

- [Wagmi Errors](/solid/api/errors)
- [TanStack Query Error Handling](https://tanstack.com/query/latest/docs/framework/solid/guides/queries#error-handling)
