# Error Handling

The `error` property in Wagmi Hooks is strongly typed with it's corresponding error type. This enables you to have granular precision with handling errors in your application.

You can discriminate the error type by using the `name` property on the error object.

::: code-group
```tsx twoslash [index.tsx]
// @noErrors
import { useBlockNumber } from 'wagmi'

function App() {
  const { data, error } = useBlockNumber()
  //            ^?

  error?.name
  //     ^?

  if (error?.name === 'HttpRequestError') {
    const { status } = error
    //      ^?      
    return <div>A HTTP error occurred. Status: {status}</div>
  }
  if (error?.name === 'LimitExceededRpcError') {
    const { code } = error
    //      ^?
    return <div>Rate limit exceeded. Code: {code}</div>
  }
  // ...
}
```
<<< @/snippets/react/config.ts[config.ts]
:::
