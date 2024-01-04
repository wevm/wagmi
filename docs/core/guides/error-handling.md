# Error Handling

Every module in Wagmi Core exports an accompanying error type which you can use to strongly type your `catch` statements.

These types come in the form of `<Module>ErrorType`. For example, the `getBlockNumber` action exports a `GetBlockNumberErrorType` type.

Unfortunately, [TypeScript doesn't have an abstraction for typed exceptions](https://github.com/microsoft/TypeScript/issues/13219), so the most pragmatic & vanilla approach would be to explicitly cast error types in the `catch` statement.

::: code-group
```tsx [index.tsx]
import { type GetBlockNumberErrorType, getBlockNumber } from '@wagmi/core'
import { config } from './config'

try {
  const blockNumber = await getBlockNumber(config)
} catch (e) {
  const error = e as GetBlockNumberErrorType
  error.name
  //    ^? (property) name: "Error" | "ChainDisconnectedError" | "HttpRequestError" | "InternalRpcError" | "InvalidInputRpcError" | "InvalidParamsRpcError" | "InvalidRequestRpcError" | "JsonRpcVersionUnsupportedError" | ... 16 more ... | "WebSocketRequestError"

  if (error.name === 'InternalRpcError')
    error.code
    //    ^? (property) code: -32603

  if (error.name === 'HttpRequestError')
    error.headers
    //    ^? (property) headers: Headers
    error.status
    //    ^? (property) status: number
}
```
<<< @/snippets/core/config.ts[config.ts]
:::

::: tip
If you are using [Wagmi Hooks](/react/api/hooks), errors are [already strongly typed](/react/guides/error-handling) via the `error` property.
:::