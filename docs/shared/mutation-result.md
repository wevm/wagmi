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

[TanStack Query mutation docs](https://tanstack.com/query/v5/docs/react/reference/useMutation)

### {{mutate}}

`(variables: {{TVariables}}, { onSuccess, onSettled, onError }) => void`

The mutation function you can call with variables to trigger the mutation and optionally hooks on additional callback options.

- #### variables

  `{{TVariables}}`

  The variables object to pass to the <a :href="`/core/api/actions/${mutate}`">`{{mutate}}`</a> action.

- #### onSuccess

  `(data: {{TData}}, variables: {{TVariables}}, context: TContext) => void`

  This function will fire when the mutation is successful and will be passed the mutation's result.

- #### onError

  `(error: {{TError}}, variables: {{TVariables}}, context: TContext | undefined) => void`

  This function will fire if the mutation encounters an error and will be passed the error.

- #### onSettled

  `(data: {{TData}} | undefined, error: {{TError}} | null, variables: {{TVariables}}, context: TContext | undefined) => void`

  - This function will fire when the mutation is either successfully fetched or encounters an error and be passed either the data or error
  - If you make multiple requests, `onSuccess` will fire only after the latest call you've made.

### {{mutate}}Async

`(variables: {{TVariables}}, { onSuccess, onSettled, onError }) => Promise<{{TData}}>`

Similar to [`{{mutate}}`](#mutate) but returns a promise which can be awaited.

### data

`{{TData}} | undefined`

- Defaults to `undefined`
- The last successfully resolved data for the mutation.

### error

`{{TError}} | null`

The error object for the mutation, if an error was encountered.

### failureCount

`number`

- The failure count for the mutation.
- Incremented every time the mutation fails.
- Reset to `0` when the mutation succeeds.

### failureReason

`{{TError}} | null`

- The failure reason for the mutation retry.
- Reset to `null` when the mutation succeeds.

### isError / isIdle / isPending / isSuccess

`boolean`

Boolean variables derived from [`status`](#status).

### isPaused

`boolean`

- will be `true` if the mutation has been `paused`.
- see [Network Mode](https://tanstack.com/query/v5/docs/react/guides/network-mode) for more information.

### reset

`() => void`

A function to clean the mutation internal state (e.g. it resets the mutation to its initial state).

### status

`'idle' | 'pending' | 'error' | 'success'`

- `'idle'` initial status prior to the mutation function executing.
- `'pending'` if the mutation is currently executing.
- `'error'` if the last mutation attempt resulted in an error.
- `'success'` if the last mutation attempt was successful.

### submittedAt

`number`

- The timestamp for when the mutation was submitted.
- Defaults to `0`.

### variables

`{{TVariables}} | undefined`

- The variables object passed to [`{{mutate}}`](#mutate).
- Defaults to `undefined`.