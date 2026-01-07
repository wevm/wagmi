<!--
<script setup>
const TVariables = 'TVariables'
</script>
-->

### address

`Address | undefined`

- Connected address from connector.
- Defaults to first address in [`addresses`](#addresses).

### addresses

`readonly Address[] | undefined`

Connected addresses from connector.

### chain

`Chain | undefined`

Connected chain from connector. If chain is not configured by config, it will be `undefined`.

### chainId

`number | undefined`

Connected chain id from connector.

### connector

`Connector | undefined`

Connected connector.

### isConnecting / isReconnecting / isConnected / isDisconnected

`boolean`

Boolean variables derived from [`status`](#status).

### status

`'connecting' | 'reconnecting' | 'connected' | 'disconnected'`

- `'connecting'` attempting to establish connection.
- `'reconnecting'` attempting to re-establish connection to one or more connectors.
- `'connected'` at least one connector is connected.
- `'disconnected'` no connection to any connector.

::: info You can use `status` to narrow the return type. 
For example, when `status` is `'connected'` properties like `address` are guaranteed to be defined.

```ts twoslash
// @twoslash-cache: {"v":1,"hash":"70621ff7ba048810d10cff60e35c82126a2beb12177fb38b972d09b620d6367c","data":"N4Igdg9gJgpgziAXAbVAFwJ4AcZJACwgDcYAnEAGhDRgA808BjCMONAAmbDBkbQEsWidgHEYaAMIsefQWABK4gK6kwAFWy4qbAIakGiACxUANjDABzNPiQBGAAxU0ei+KbTeAlpRAn+PJEcQRnw9HT4yJEMAXwp0TTxCEnInOgMQAAosUggcfQwASnZdNCU4YQAdECh+OC4ZGigq9gAfdir6zxgmkFb2kFJeD1lLZraO4YFRkB9dfTsAVlNzKxtEADYnFzdEEBKynz8AxCCQsIjyRFsF2PicROJI1Pp3Vg5O2SF2YAqwdn/2DooFBBnByuwAILA0FwADcvwBgOh8Dg8GEgyBLBMGHYyChIJRFHYADpSfiYcgALqU+F/AFnfzCCShfx9JRgWAAM383VpiIZYAAklBhGAlABbABGZD59MmEFITPlpFl/1qUm4XRF7DQpCUMFV7HVk38FmEnJ0JlRhtqABFah9GubLdaEQDaopHabnVaDW7/vtwRNNREerTorNnPMjABmZaWax2IJR1zpL3eUw8uxUM6kcI0S4AJlu1ASuwAjvrSBgfDQXrsuGxOCavj86f8gQSwcJySjDZ2YWj2BioFicXjkWCiaTib2wVSaf7OCywEyV2yOTBuTwoIaBcLRRLpSql46FUqQ2gFTa4BqGt1hLr9Te755vewLb6b/a6pMHx+XT9dsjTgT0TUsH1XWAwNKmCP8w1+CNtCjAxDDjXwVkTK5k22NMWzAQ4syuHNQjzC4kGLSkc2gXBdn4Tl2AydMwGJQN2AAXk49gAHJHW6biijbf5mN+USwDEiTxKkyTJKQkBxXEHQkFANJzDgOQ8DQBBomiIA==="}
import { type GetConnectionReturnType } from '@wagmi/core'
const connection = {} as GetConnectionReturnType
// ---cut---
if (connection.status === 'connected') {
  connection
  // ^?















}
```

Or when status is `'disconnected'` properties like `address` are guaranteed to be `undefined`:

```ts twoslash
// @twoslash-cache: {"v":1,"hash":"03f1cafa2983888b08080373baa176953254622dd97feb972d42875fedc5dd86","data":"N4Igdg9gJgpgziAXAbVAFwJ4AcZJACwgDcYAnEAGhDRgA808BjCMONAAmbDBkbQEsWidgHEYaAMIsefQWABK4gK6kwAFWy4qbAIakGiACxUANjDABzNPiQBGAAxU0ei+KbTeAlpRAn+PJEcQRnw9HT4yJEMAXwp0TTxCEnInOgMQAAosUggcfQwASnZdNCU4YQAdECh+OC4ZGigq9gAfdir6zxgmkFb2kFJeD1lLZraO4YFRkB9dfTsAVlNzKxtEADYnFzdEEBKynz8AxCCQsIjyRFsF2PicROJI1Pp3Vg5O2SF2YAqwdn/2DooFBBnByuwlGBYAAzfzdADcvwBgOBoLg8GEkJhcKgiL+ALO/kxUJgsJ4uKRBNC/gAklBidjyXjkR80BBSAzSTjmQDalJuF16exoToTOief9aopWf4LMIRWKYBL2HzJrL5aLxZTJXAACK1VndYRoUhKJXa4rOUrgqo1OqTbpVPHRWbOeZGTa+FbWOxBN2udIy7ymOF2KhnUjhGiXABMt2oCV2AEczaQMD4aC9dlw2Jw1V8fvj/kCQfBwViuUyLSW0RiISSyQiLYSwJzGxSi5xqWA6W3uc3Juy+1XO6qBREhQqtaO4NK1ZYNYrlWOGurhZrzTP9fbx41jabN8j9jbqgaHT1na69AZDJ6zJYfVc/dtA/mwIdQ1dw6FIxckHGAF1w2gXBdn4aF2AyIMwAAOmPdgAF4kPYAByO1DSgFCikLf5oN+fCwAIojCJI4jiJdKgAFtxB0JBQDScw4DkPA0AQaJoiAA"}
import { type GetConnectionReturnType } from '@wagmi/core'
const connection = {} as GetConnectionReturnType
// ---cut---
if (connection.status === 'disconnected') {
  connection
  // ^?















}
```
:::
