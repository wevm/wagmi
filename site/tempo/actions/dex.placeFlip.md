# `dex.placeFlip`

Places a flip order that automatically flips to the opposite side when filled.  

## Usage

::: code-group

```ts twoslash [example.ts]
// @twoslash-cache: {"v":1,"hash":"e9b109959543a4af97fa80fd74ff57c367fad28063d8fae2ea79374624391edb","data":"N4Igdg9gJgpgziAXAbVAFwJ4AcZJACwgDcYAnEAGhDRgA808BLAWywlLQAIBBAYzUYQwCKnDQBDDkgCcVADYwwAczT4kAdioTSSmA0Qg+AoSJBzGYXIgAMVXvknj+ZGQF8K6bFYLEXWuvogABTi5uJwAJScAGYArmD8gmCcWJJwMACqYIxocEFEobEwiJxipBZKFJywvCyhcCVgscwARmQRJS2MShZoADrZrOxcqaTpWTmmUBC8CAYAsrFyAljm8JzipWjlypykMFj76WASxskQ0RucTa1knC0YVz0kyXRsliecF/fhMJwAjNZOEFAW8hIo0BEAHQDAYAWk4ABEZg1OPg0GgsA0APTYoiMGDMKFwfDY6azbGxATmATwbGjcbZXKUajiJRzZDIEB0cSsBQslhsDicYApNKZJlwTiuGKkCDMTgAcnxhMVsLADIlkyCioALAAmayKqrSCIDXGcA3Wa0221gEAAXQdom0+l1mjMihUakQgK0kl0gU1E2Z8gsVn+dgcpCcNHIiGk7k8ODwhBI5H89CYQ2FABVGLwANYssSSfQADkjnuUqiQuv9Oj0eHzRZZ5ksSH1UccznjiY81C8qd8GeoATwITCkU4vBMXFnYGi3RKAGEhEulANBcMZ+vuiXXUh/v8AKzyL21xAANgbgbwC43bfDSAAzN2Y723APMCmDGm/GOWYGAuYhfKQsCkAAklAnTdL0B5lkeuqyNW3oaLeTYGOwEHQU+HaIGeID2D2cZIOWSaDr+PjpiyNBAURc57DAvAwIwWBoCUuYxsIsZJAASsxrHsSy5JzCAXHiDxiRCExLFsWgUIIVIvonuW541j6HraHeBj7HJwlhvhhHER+pG+uoFE/t4/6jnRgTbsKRhJKYpbKf86g3qhl5aQGmGGNJwh4VYxnRrGLiIC+J6WUOf4jrR44GA5XCwLQSn6P85b1l5PpvqyjaBClQVICFJHhbqL7RVRNnxfRcQJGcKRyE4MAAGLmFgADKGAJAAPGui7dAAfEED7Lpw/UblUoy8noZCok5JhQilUKrM1bVsV1CRQgACo4zCzWMfV7kog0dJw21yswjDpD1wADJwD1gThMH3HBJwANz3Y9zDiIWZAlAABtYtAACTAGUFSuADn3JI9aAQH9YCA8DYMQ8oUMw49GzMBA8Qca9PQfV9D3XQAQowL0tBAEAKJJmNwwWhaNM0bSkPTD3RO1LZM9cLNkOzslCfjElSWcAn6WgMOuINAxgDNcCpCxjVre1m28CJKJ4NtTUsVKmyc2xT13Ko4hcOIVLyqbBahHIjwG1inAAO74IoMSMHIChQDCYADAAchANCcfg12cCHmxwN19hypAsR6wFnAm1wjviJMMTsAnLsJ9xcC8TJ8MDG0ocJHIsSwFAXzJJsLRyDMhb3DA0TsH8+xoLEpDZLsmxHO86SKf67JIJy3K0Lyqy4FQAOT7kW45lwoq8PspswBN3RVOimLSrK8pKgAAsnShXdis77GqgxCnPCeEmwm/RJdu/74fx8wEfDgWHAp9JSKPABVKMq39vio95skfk3bENAhinwGCBecx1OAAF4ZyLxoCvJQQQ7qw2Im/EoyBwFsFzPANAlg0DOi+tsSSCthionQVjHBV8IBQgpg6Eo68sBBAiBQL67gBiuDND7BIjEjhLC4Ag8QyccjfzOHAJadAVo61aqrSOI1jpVGodjXGJwSjBklDqQERoqhXnYV9e23NOKMyhP/ZgF0CwwB0VCaw/xFSGNhgIIspiizmMulYliOprBQmkNIRxHDnEI0UCURUwNDS8ChNE48xpSFeDCS0WIGA4lgB4QMSeANHQUC5NNZgLJRpKE4AiFBilnS5L2iyPJB0pQIl2jGfacYpHZK5C3NugUqC5kzmQ0WSRBbyQ2GAcuMAXjJVNuIMpzoQCuXSuWNS2Ujy5W0n5VaLF1qdUjkVAi74wrxndJVaycVMyBEnIwcIURoG7gGkoVcx0Z7nyuY+F0iFECGi7As68GFAiFK2SVUy4Urz/AOcOGixyJyHAgDgDgGAoi8nUfjLohMGDPOUvqf4WUFAaSQJ5ZZgQ4V4y2Z5EyuzOzAtiqCwCJzQhnOnFo7UBQS7FC2DsSo1RmJ1DkKiG4rMzqIt6PcncdLQwgFEngRYyw2JrD1syioTFDjwAhFbGS3xNjcruA8J4jAXicDBB8Lg3wWi/ABECEE1hdUQmhOqBEyJZjMIxFiRAuIVREhJGSFElJqQ5AJHAek4oQymAkAPFAXIeR8nHiAT+oohW/y3gqZUBJmCQI1H67RepDTGk4Kac02JLSGltPm+0ToUX6H1KW9SaFfS2DyjpEA0bCU7M/JWsl1EAJ2XBXKKFmAojGMZszW4o4Zmdl1J5TFFb5m4rwD21shkrAemJY2/UzbqpgsSrPTg3M0qdhPCOi8PosoToMBumd6EiKhUbf8Rd34YottsglEAdV44WK8TYw41i3GFg8fKZ9O1ygsTOtzT9ljf0wChAJVu7dcxeFlvLRWfwn3AY1rMPA/V0y5CuK+pWaMinwyuC4j96pkAdQkNXZiEALBIgAKIAA1zq/oqA6IILCcRutmFCXB9DaAYAAF70jlPDWcchsR0GIsoZ+CtmIAGI/oYDhAuFi7FIi0TZByENI8w0skydPM+O5RTcxvnfRUEBaBgLoUmi0z6viXH+HY+BCdGacGsFAxieH/i2YA/B6xtijRRAtI5/hwguB4f1G5sxHnvGKms/mxxnBfPqnM8ByzAI7H2Ns3h41fnLl4ZfCF9xYWbEReSw4nzObdFxZzRZ74vj/HSFS/ZuEpX/OgTw7qHLH68s+L8f46LFp6vWgyZPFptbKlUAw38BEXS/ijY2NKrDwIQNKChFUPoIBIv2OW0tkAVX/HLehINtp7dTATbs0WTgDKiiTOLZ2QF5bLwoQPfezxCHj2IDnWesy7kl1HMpe2yFZAu3HZ5mqgdh5XnlneaOy8+7fKBDw1s+Z86zKXuTIcilbbV0PKPdMkH+o5k3b3V85sjM4cNrMuRK9VUvto/vfER9j3POjffYB79z7/2hbpyxUDeh2mQZwNB/aCtmqxufYhsSKG/vSqm7NnDmw8PewGIR4jChZzkcRNR2jBZ6OMftcx0SbG6FQk4zxiF/GaZCdoCJ3Q2JxO8CkzAGTcmDi5AiEpoNQ9Q1jw01POAArhS6fs3/AzRmTMQLK+rpW3xIu1ZOxl5zjNXMIPc+z/LkXus5pjwFgHwWE9s6/cBrztpU8OdDxVqzhWo91wa5lxm2Xs+5aT/norMWSt9b4fF6xiWts1YQWl3r6emuMxa7Xtr9fwmdYCcV4pDXMmDbyVUhL43M5TfCFcWbQR5uLc4Mt1b/x1ub822PnbZSckgH2x08S3T7NnZA46KZg7XnSFyhDn0d3oeTqT8T09pV4z/AquTlHra70ggIVO0YUE4QkkY98IlrBeB81YC4D4CEC1sQBN0Ip0U8dioCcDB4ZEYtkUIEdwokdKJ/9b16IgCO0/tQCrIShlskkMBlsUCXwrwUIn86xMCiCtk/RP9/l4xCCrIQUAD6I5Z+dYMrk4AaYYABgChSBRDxDblhBxCRdmxM4AYQJxCAZOAcYoAlhJs5R8RYAZtBQFA2UkklBCYilVCjDE5Q4pQ4AWB3ZJAwCM4JCwAAApcQAoDqBeAZCwv4faETa6BUCFPQmAcuDVR2GAFoe4OUR2dIMYOXMAI7TQ7QnVWgc+KUNAR2CAUoHAWoJcXgXcIYPVBodUAAKh4E4ABn6jEIUHUN4CajgClEdhyHwA0L0EICgBsNiHsGmwqJ8KhBrlQQiABiqBUJMHEKhDIDlFIDYXUMknLlGPkIUChGTnbhmIzlNhnEknrk4FjhCMcMdnKBoEcMkkeH9lgChAACsbDtgYBeRvYyjuBOAlAa5DU5Beixiaii5SwEg/hCk249icMDicg/gcNkAAYIVdYpExBpgqQAYGMmNHVsRIBYArioR2AlAWMfUmoaAxA4QiB9RdQDdsRxAsBGBeMZh4ApF0RmA5AJMITKToTcZIRBkoB5dwS5RITiQ0AIJSA4StdMRmNkSYBUT0TMTsRsSCE8SCSiSSSyT6SGioRqTaT5SGjuTJjoR11M5niIBXj3jFiYBaitjC5djy4mjVAmTQ5Z5ZVVA/gAYhTEAfD1Ckilj1QAB9EokogAdUkA7iUA9NdKDj+G1N1J8K+BaAuOYjQEVClEaXaL1n2GuFYhtOkJAmuhoBOFtgGAjgSHwGjlxilHMD+icKiIgBiLuG4G2kgnSJdkeCOEJBIyqEgGkMkBBJrNELTIhEzLlmzKjiEHzM4ELL+Bti+GTM4DOJAyuOZVuOYCkU4A6hgFbL+DBMgCOJkhVM4EgmxAAHk+SETcQhSRSdAxSJTcT8TCTjNZTyTOSlSJNxA4QVyYA4QhA4QVS4RBBu12ABgcYEyLBG5SAfozh4iKM1Mx4djbDdgbSniXjQg9TqiDTEB1RMkrinN9T+iIBUFFQXYPYsjMjSA5AoBHEYY28ThUQsKa4nZ2B8KqgcNGSqQUK4K0KMKyKsiABSd+KoRUXC/Cwi7NdXEi5hGAbCiivCqAairI2i/oRrcYyY9gIISwR2TgCjUgKYnUT0wgSFOAKoMQ2M2VQ1cuBwLAHASwAiiICIIi8rHYNDGS6Q/nHOXQFkrYJwOuMhJWGitU5ShCsAC0B6JSqYkoNS6mLELS+UNo3S8QfSkkoykI3irGDY5AEZUIJhE8FSGKx6DYzw8odiKEUgeISCBI4OOAfqOyYEe0ogZgX0F8fUX0csXhbytKrgLc8MyM7K3K/K66IqgIEq6AYoMqiKawaQCKGq1Kh6DY+03oMgOWQTFUs3ZiKkJIF7dQX0aQYajYLgeKhlB0OEA4yK/6K8V5fUFajYhKuQDKgZOS7qxAca9uUIK8ykma3gOaoQF7Paq8awWqnNWKrgMak4Cam6n6CwITBlV0rDV5F8CKdUS5IQv4BBRUT092N4viHUt+IQRUGGPolYsAIIAGRESSXQaQsGKG1wAAQiRFxrICJoBjMt4qsX4tJtE2kLho9k4ERq6HkLABJpxvpqJrEq2B5P6wBnVGAtHiMNjmtOUKqLUJnHqOKL4SQu90a31SpFs0DCI0XmYA6hCsIEdjYTRsYkmOVr0FVunI1v2i1p1voq4GYAwAlqMIQXkpkKWJtpsSZKqHVJhi/Oto+JAwGJ1GYuEu4qpq8ost6FIsEvIq4tEscKZI9qdsYt9rDtYvYqVAjp4qDr4tyAEqEojp5ujrACttjusrkpgAUt8tkthvUqCtKBCtUDCoisMsUBCMcUDuIozs4GQFLtIH8ors0qrp0t2D0rRB2uMudEcMmIhsYihts1hvhuZqRrZtRpjq9uWJ9Kxs5rxs4AJpmmJrprxopubuDtprXruEZoRrnrEPZp3vJp5rHrAGn37hU2mQXJZGQDELbhYnhO10RJ6FUFiBaChFnGYCRO6quKAdgGxGrh1LxGlOM3MBaCPiXquOdyLSxxeRfHLB3SxRezYJ8I4NynwPjGsE+1R0ANjOgCiFjp9tsrZBgAAH4SgTiqhok0T2IkhQh6leRUQTjkAHQzoiAyNy4ggABqVzEcGucK53KgUVAwGmtDHDAGCS9Qs0lo+S9sEDTgcVFYIwgMZoCEKUXgI0ybcIdISOpRpwgYJcMYLgE0noyC19H6UgR4Kh+yuYjYJm8KqAL1IQGC6x5fOAX+sQHIR6vhK/GwuwpqaQ0E9k3oaIIIF8IYj+zEREn6MAdQNEo89sWIYzZJl86hn1ZJl8XjaJqEF8RUtAGk3hIISC7R/aEijYBM4c1IBogErIsEuauQcxdgACmYhJh1fc4BqRUU0ScUpeU86B4k0kj1d2UpmkiTNpv8gC+Z02OEAMSIS1WWyeZChW3cPGWzE8XW1Cn2xUWcPGEoFigiqoY5k4fe9O1ES5/GM8RwiS+i8Yw5u5xADNO565mR25+FEoB5tymEySzJdUecpcgGNpjp/802bp/k3p0B4UgZo8oZk8tAKU888ZskiFm8uZzp02RZ1FlZj8mypuIufFpIPuVkV3LkcCliFkIgXxazXRG/S7CKaQDFXdV8NggY3BkncKMnZHfgkg75RibCMgaCWCJFFA3Uf4DBitHyfKPAUVqCKAHlrgklPq5tQNFkKGvAblllg0QiFgmwFdEAdZI2aQyCREEoXUbde0Z7U8Xlgh1wKZWcWAbMB5UUBaYQfTABB+Mk9jD+NdKNFNVOAPABZ1QNj19df3WNJUZ1YPNgSNnTR5boH1uNKEeB65JNS5UUJV6CKoPSIWTeERMRLgL1qRZaVZeRDaRRQpFRL6fFDRMUMYLUXIHRa0DNAxIJDmLmXtaNuvXPTzArexQJUhPtxPQd8LLbUd4JRGMJKAmAxApd5d60BxbthOBJJUWg1JdJPhPow5s1pVjcq1jNPNqAXhFkRpcQJAUAAIRQWwoQPAZkVwVwIAA=="}
// @filename: config.ts
// @errors: 2322
import type { Config } from 'wagmi'
export const config = {} as Config
// @filename: example.ts
// ---cut---
import { Actions } from 'wagmi/tempo'
import { parseUnits } from 'viem'
import { Tick } from 'viem/tempo'
import { config } from './config'

const { orderId, receipt } = await Actions.dex.placeFlipSync(config, {
  amount: parseUnits('100', 6),
  flipTick: Tick.fromPrice('1.01'),
  tick: Tick.fromPrice('0.99'),
  token: '0x20c0000000000000000000000000000000000001',
  type: 'buy',
})

console.log('Flip order ID:', orderId)
// @log: Flip order ID: 456n
```

<<< @/snippets/react/config-tempo.ts{ts} [config.ts]

:::

### Asynchronous Usage

The example above uses a `*Sync` variant of the action, that will wait for the transaction to be included before returning.

If you are optimizing for performance, you should use the non-sync `dex.placeFlip` action and wait for inclusion manually:

```ts
import { Actions } from 'wagmi/tempo'
import { Actions as viem_Actions } from 'viem/tempo'
import { waitForTransactionReceipt } from 'wagmi/actions'
import { parseUnits } from 'viem'
import { Tick } from 'viem/tempo'

const hash = await Actions.dex.placeFlip(config, {
  amount: parseUnits('100', 6),
  flipTick: Tick.fromPrice('1.01'),
  tick: Tick.fromPrice('0.99'),
  token: '0x20c0000000000000000000000000000000000001',
  type: 'buy',
})
const receipt = await waitForTransactionReceipt(config, { hash })

const { args: { orderId } } 
  = viem_Actions.dex.placeFlip.extractEvent(receipt.logs)
```

## Return Type

```ts
type ReturnType = {
  /** ID of the placed flip order */
  orderId: bigint
  /** Address of the order maker */
  maker: Address
  /** Address of the base token */
  token: Address
  /** Amount of tokens in the order */
  amount: bigint
  /** Whether this is a buy order */
  isBid: boolean
  /** Price tick for the order */
  tick: number
  /** Target tick to flip to when order is filled */
  flipTick: number
  /** Transaction receipt */
  receipt: TransactionReceipt
}
```

## Parameters

### amount

- **Type:** `bigint`

Amount of tokens to place in the order.

### flipTick

- **Type:** `number`

Target tick to flip to when order is filled. Must be greater than `tick` for buy orders, less than `tick` for sell orders.

### tick

- **Type:** `number`

Price tick for the order. Use `Tick.fromPrice()` to convert from a price string.

### token

- **Type:** `Address`

Address of the base token.

### type

- **Type:** `'buy' | 'sell'`

Order type - `'buy'` to buy the token, `'sell'` to sell it.

<!--@include: @shared/tempo-write-parameters.md-->

## Viem

- [`dex.placeFlip`](https://viem.sh/tempo/actions/dex.placeFlip)
