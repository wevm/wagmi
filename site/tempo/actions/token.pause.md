# `token.pause`

Pauses a TIP-20 token, preventing all transfers. Requires the `PAUSE` role. [Learn more about token roles](https://docs.tempo.xyz/protocol/tip403/spec)

## Usage

::: code-group

```ts twoslash [example.ts]
// @twoslash-cache: {"v":1,"hash":"a6393fccb27fa70eaa319de7e39d7a619889bb2d3f5ab63be266ef0351e444c4","data":"N4Igdg9gJgpgziAXAbVAFwJ4AcZJACwgDcYAnEAGhDRgA808BLAWywlLQAIBBAYzUYQwCKnDQBDDkgCcVADYwwAczT4kAdioTSSmA0Qg+AoSJBzGYXIgAMVXvknj+ZGQF8K6bFYLEXWuvogABTi5uJwAJScvCZcMWAAZoxKiJwAwkJJSgA6YCxsHNGZyZQgYpL6ACyaZooqaogAbFqSuoHxWaXmlkgAjHYOpE405IjS7p44eIQk5P70ePFinIxwAAriAK5wMFCpAEYQEAriYKXlUogAHP21yqpIVy06ekzrWztQXRZWAMwDjmcoyuE2oXmmvjm1ACi1inFIMF4MEYWDQqQAKkNhMNBGAAEqI5Go87afTSW4Ke4NGraNp4BFIlEMeQ/JD/ED2QEjPogjxgqYGGZ+aELAz5dhcIy40wXfS9ayyO71DTPOkGKUmb49RDszlDIFsxqgzACnyzUo0UUgcWFNAQADWihJFT6vRqlOViAArKrXgY7Y6ziztbrBsMXIhKpVjeDBZCLTCDAlNmB+LjOFgPjAAMoYVMAHgyiWSAD4gh1kqki1kKBnHMw9GQ4KkNcIAHQBxRtzPbHN53htjZDBsjOCF4pKEsRVJrUgQZirGD5ns7XOptsEtCbUhgABqoU2MBLuTA4gbcEzSLrvbXvFKUAgvAQBg2vbgnHEnHRAEk1gAmaxOE7MA21yXIADkIBoDF8FWFZ30/OB+3wOdIG2D80yEICHC4AB3cRGDQd8EnYbCYCArE4BxLC7VyfZyIsXg5E2WAoE4LDP32ORH3tTh6JIhF4T0bc8mUD8hIvEwYDbC1xCUZ9kGQEA6DPLAFFKAADLSiNyG0uGAaIEXEGhq2SWt8DQNAsE4VxOASOdmE4AByAABfClAXAB6GIESc3TWAlTgDJoAKbLshznLcuSvJ8mBvIcCw4D8vIAsKAzW3fWz7PnSL3Ji9g4pCthktyJY4gnTgAF5DJgYyYFMpQgmAXJOGiBLhFSZAiogABdCgWoo05JI4ZsgoG1qupgAK20YKAetSCyrKCCJ+rAVr3FyVwIjA1M4QROBNjkLhqvEfDCJ4TD22A7ss1vcsJ1rZq1qAh1FFSJzrFoNtvqc1attyLSNJAPqlMzYdSgrJROAAWnSCcZJBkAwbPUpkZHJsYc4Icz0bUg4ARiglIRLcd1MdF8HItBKOotaGSJLhTjYmASDALgoGM8QEb6spST6P92Q9B4xl9QIVz7VMtT+AF9W5b1rBjU0hShS1AhCMJIiKYRyuLFI4Z1/yCm1zpRF5xBel+AW6iF5pqFaP0OQnSW2Wl8NRkaeW+RNbwlYTK0giwOccA4DAomA1JshAT6AN4axY7j+OE8TpPk+sCPnUuXpKh9JUhez2l7eAp3Ixdg1ED/BXvfjeZAlPc9L3IpZjhgXIiEkTW4CbqsTCb+9H2fEByfIjTG4UDTOGYaBDvIgPiFm+BxLgfIFE4WB9k2JQlAsKGR8pnD4M4ReFzkNu7TI3IAClxFb7NeFIJl26b8fEQcPI4EcmeiDntj9gwThcJgfYfE5y4R2HjUCYBciD3HpPZedBDbvjQLhCAB8cC8EYEkXgRQAqWFZs2HaAAqHgnANJFg7qPaIx84DvlwoRfAT9VDQHfAdewH53zD27goNs3FGoRA0rWdhwgm5tjIHOUgy0x6M2ITvNs+EdziOwsZaIpw+LkV7GxU+uE740Beh+MAv9IKwDbAAKyYVTWqzBwGEO4JwJQ3F9ihCkRwmAY9EoSFTA3Cc25dg6M0YRSmyDkAaRnkiKhbYxAPk2GgDSPUgiLSwM2TynlICwBMW2dgShPIPifJ5Y+NAxDQyIH+SobZaCeXEFgRgnlgnwHxhZZgcgADE1SqHhIgJEqIjNciBOafjcJIjomxMsvExAiTkkwFSekzJfccl1XyYU4ppTymVJ6W2OpjSel9NIKQCIbYvwUxsXYhxAiyHOKUWteinA1F/1oW0rgekt5kWIWMxAO8x4TygFPcBuQAD6+D8EAHVJCiSUH875MFyK2IgPYuQD9l5QqMYiNATl3wjkIFABCglLC0LIO3VYNBWZyAwLkJCqYUJCDae+cwjpHn7GAaAngaxvwIIpr/faU0uIwFrJAUgH5BKqBgL/JYeLFBoEJbkcIyFUIUs4FS8ioQYVQQpjygx0kTEHzMWefGnBswwF3uRQJkBtFYR6Zwb8nkADyAy4kJKSdAcZ+NJlZLgDMvJaAClFJKWUipVS5whNqWgepDTxDQ0NTAaGQhoY9OhoIKIAlcgT0EhYASzBjK4i+WAAAorQVSy9tgPP5QcqFRzXmIB2oDExpUnFcIgI1JyFM5DcT/uwOQUAnIRAANy5ESVjO+uCFowAbcgpBpAW21lPq0yJlbBGcO4UEOtA7G0AFIkq1icsOltbbO1gG7bOCwRF+2DqbSOqAY7kETrQFOk5witnsCCJYXCnAM03rEU5f5hAIDxNrB3VFDz7FsQcFgHAlhW0RA7V2zyPa93vhEaRc8VFdC6LYuUXgvEqZOH8eq2AWzS3bog61J9ojUhvqOJ+g+849CwTEn+zgAGgO7HA61RjijkDM1CPNL0ZsvQMcYx+LgN876ojbKQFM34wDk1WEWFWnA712sQEQZgZtfh/jNlcbauGeO8c4Oa/YCL+BCZE2J2CcBJMBGk88+TOoFQ6lU9xpjXBnl7rIKeOQPrHw1M8nQREkTcSIHUOoM20hbOtWY6xuQPVoaaPKUHJoZc/xBc06F/j98ZOwEQI5ncoRXN+o87QLzxgwC+caE0awanu08cUQ51mTnMsposB51uchvliF7SkfmOodplU4LXci1VX2MAbZwPEULEpCCclu6RsiwBBA0gAEVOLoHlAASYA3XXAAEJOBzeUGQNbGkwPqd3X2zb82cX/P6zCob+wRtgA21thba3T2YZEQDLSO0s05tUYvMSBaSFOLHkxcIeCIFgHLXAS9XBblVRsXobMGrmDZnI4QXCy1xtwhEVDtosOjLw8RxAZH+3OvMAwKQx+1V72wukiThQQRbm1hEft+NxOq2zvnYe9dIGt07t7fumjC6h3NpPTo25jOqfSRZ/WpdK7nLs83Qxw7POJf8+PY94XYAiei+vaIu9MAH0Edva+99pHv0Ud/eIf9UXFC7DbftrnUHOp69IERw3cAv3kdUKb83gHLdzUe894HnXutQ76wNy712xsi6rZN6bd2cXLdW7dk7pBds24g/L0aMeeVnZD8NwRN3jvbaT77rZL2gYtHkkgRSZRdWlGQB3bcSIYnWpGZ5TeqhNj7DbDEZgtqUnOrGZ5LiULPLzM9eYfY3kq0mIiMDbmsokAAT/PIK21IRawmnbgYMVgah6ldkgD2kxK7mmrngIIqLoBRA17OuDckYAAH5UinAwLWb6aTUS4lCNjZgo1H/IB6tOTgRAEAs00mAA1L0OxLMNxGbtPlQE6ngGnjohpOemPDQqoF1jrt0NJJwAALKHQCBqRyo6CbANi4JnIqJ1hUK7C1ioF0L8q5BJB4xcBXLhCPIBwsCSC/zX4IaSLyofhQBQCETv4wrMFMLt5iCETeZCAtwHjzyHz9YnwBJBLc4JBBC/C8KN5DLN4ppgDqBpI6A5IWCbClLaGRo37OraG/A+p7oJBti/CrIBpyBqZBAFqtDEEioYpyoDaZiUHqKKHeZyBtjJrGTiIaFWQ2pjITL6FOourwBuoj6LLer+H2GBr+FBFoBpHQytCRA7JlpaQVq7RaxFApjHScBeio7r7Vq1oxDFGpCLqtq1jVGswp6QZHaNFoilGPbnqXpCIs5tGIC/RFFNGc6p7c6jR9EdE6JdEg6vbA46r6oaRJFpEhGDJhHN4REOpRHTK5KxHuoLJeqVJJFrINKpHsAprpGnHGSZE6AawCTQKJqJAXH5YyRl4KRKRfZIilBEDWBti9A/Gxwz4mwuhlzyhL5UjOy2wvCBDcJFzb5hily8gH4QhH4ijtBwirCvifAHBHAnBBg8xAl/h/hPA5wNBEn5yBDolZhfCb4qgchwmyx/hGieyxi2xKClDdZ4DQmAmXD8xEmCwNC2Aol4BMrXiYkUSHhFyKg76lzyzcwxCwBMCpT6QXT5aZThQ5RrrRSVLdTJR6RBSaxZBhTZSORORtgT46wlQFHLAGQUlqK1h0z3y2QnRnSSiXT4zXRix3SQyPQDRhzORRzWAxwpxBnBmJy/SbRqbdEzo1pzrClix7ADE2mfBqalAjjiBICgABCKCLxCB4BEQgCuCuBAA==="}
// @filename: config.ts
// @errors: 2322
import type { Config } from 'wagmi'
export const config = {} as Config
// @filename: example.ts
// ---cut---
import { Actions } from 'wagmi/tempo'
import { config } from './config'

const { isPaused, receipt } = await Actions.token.pauseSync(config, {
  token: '0x20c0000000000000000000000000000000000000',
})

console.log('Is paused:', isPaused)
// @log: Is paused: true
```

<<< @/snippets/react/config-tempo.ts{ts} [config.ts]

:::

### Asynchronous Usage

The example above uses a `*Sync` variant of the action, that will wait for the transaction to be included before returning.

If you are optimizing for performance, you should use the non-sync `token.pause` action and wait for inclusion manually:

```ts
import { Actions as viem_Actions } from 'viem/tempo'
import { Actions } from 'wagmi/tempo'
import { waitForTransactionReceipt } from 'wagmi/actions'

const hash = await Actions.token.pause(config, {
  token: '0x20c0000000000000000000000000000000000000',
})
const receipt = await waitForTransactionReceipt(config, { hash })

const { args } 
  = viem_Actions.token.pause.extractEvent(receipt.logs)
```

## Return Type

```ts
type ReturnType = {
  /** Whether the token is paused */
  isPaused: boolean
  /** Transaction receipt */
  receipt: TransactionReceipt
  /** Address that paused the token */
  updater: Address
}
```

## Parameters

### token

- **Type:** `Address | bigint`

Address or ID of the TIP-20 token.

<!--@include: @shared/tempo-write-parameters.md-->

## Viem

- [`token.pause`](https://viem.sh/tempo/actions/token.pause)
