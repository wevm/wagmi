# `token.mint`

Mints new TIP-20 tokens to a recipient. Requires the `ISSUER` role. [Learn more about roles](https://docs.tempo.xyz/protocol/tip20/spec#role-based-access-control)

## Usage

::: code-group

```ts twoslash [example.ts]
// @twoslash-cache: {"v":1,"hash":"46f1c80e43ab006ecc429ac40c2ea48df2c7b1c8e47b608bc34a4be0659f09aa","data":"N4Igdg9gJgpgziAXAbVAFwJ4AcZJACwgDcYAnEAGhDRgA808BLAWywlLQAIBBAYzUYQwCKnDQBDDkgCcVADYwwAczT4kAdioTSSmA0Qg+AoSJBzGYXIgAMVXvknj+ZGQF8K6bFYLEXWuvogABTi5uJwAJScAGYArmD8gmCcWJJwMACqYIxocEFEobEwiJxipBZKFJywvCyhcCVgscwARmQRJS2MShZoADrZrOxcqaTpWTmmUBC8CAYAsrFyAljm8JzipWjlypykMFj76WASxskQ0RucTa1knC0YVz0kyXRsliecF/fhMJwAjNZOEFAW8hIo0BEAHQDAYAWk4ABEZg1OPg0GgsA0APTYoiMGDMKFwfDY6azbGxATmATwbGjcbZXKUajiJRzZDIEB0cSsBQslhsDicYApNKZJlwTiuGKkCDMTgAcnxhMVsLADIlkyCioALAAmayKqrSCIDXGcA3Wa0221gEAAXQdom0+l1mjMihUakQgK0kl0gU1E2Z8gsVn+dgcpCcNHIiGk7k8ODwhBI5H89DwITCkU4vBMXALYGi3RKAGEhKWlANBcN81XuiyxJJ9AAOSOe5SqJAANn9Oj0eGL1ZZ5ksSH1UccznjiY81C8qd8GeoAWHhb2MF4MEYWDQJQAKjHhLGkgAlbe7/fN11If7/ACs8i9PcQHu0gbw+x3e4YYYnRBdWnGNZyQNsk0XFMDDTPw1yzAw62FIwklMFspF9ABmTCX27H0PwDIcDBQkwx3DJBgJAewZzjSde0gzBoJ8dMWRoBCQCQrg0AgABrRRb1be9dU7BQ8KQZ9WUHQJuL4+0AKsSjqNA2jEEw3UGKXGCV1Y9cDDiBIzk4ZhegAZQwBIAB5KxLboAD4ghHMtOGs6sqlGXk9DIVESOEKEZMUKFjJOMyEihAAFRxmE8sYrMbJRbI6TgwrlYz0gs4ABk4LLOG4koAANrFoAASYAygqVw8oAbky7LeQgeID3ubpemq5Jsp/a9GuPcRT0SIRL1/fdWtcWyBjADy4FSHcjNM8zeBZck5hAeZeilQ8AEkwsNHLeMUKVuI2ZJxCgKAjjgGEwAGAA5CAaCPfBGClR6rjgOb8DlSBYilM8hByhwuAAd3ESYYnYP6/m2Hq4B+5JuIGNpOAsXg5FiWAoC+I77jkGYePuGBonYP59jQWJSGyXZNiOd50ihVi2Q5LkeT5XAqDytnclrIZhVFXh9nEGgXO6Kp0UxaVZXlJUAAEgaUYzsQLfY1UGIUuFFGghjF6IUqlmW5YVmB5YcCw4CVziRR4PrhE17XFWltk9cJ7F1bYJWBmLMQGxspROAAXnzPmBbioIMra6jjZKZBnYgZ0ash4QVdREPss4SPCTYKFGCgB0ShFrAggiCgavcAZXDNS6Ek3I4li4P3xCBnILbOc7/LAQLZoSBy4qqJOdpKRVCqhQfjRquqGpKQFrDAQu2pbvuB6H6fS4GNm8sdCguXc5gWUc72EUFpRaedDfIpZTfoqlBEIpjKK43OteuWJ0nhBZQ98Ahk9octrdBq4Hr0ZgF4XAoD83EIfZ0IB0L6H+O6XC3pwIDi/AYIKaAQrzXkhRECsYXBAWsBpJisFVxsUCDmRg4QojuyLHFCscVOYq09qOF0glfSPn7F2OBiBWGfiIlROKZFAKKWjFg+Mup5zJm8AQnS7EgiHAgDgDgGAoijxOJ0ZqJwBIYX+L2NssC3ycMIoEJR/4zDkUQBJJSQjJx4PEdpTMxDQikLzMGSU+RCjFC2DsSo1Rtx1DkKiG4bRSCJS6D0E4tD6xOMmAtFEeBFjLD3Gsb67iKhbkOPACE/MkhfEuJsfxdwHhPEYC8TgYIPhcG+C0X4AIgQgmsCUiE0J1QImRLMHOGIsSIFxCqIkJIyQokpNSHIBI4D0nFCGUwEh2RIE5NyWgvJVgsw4lzVWYoxhalyNbCWyoCTMFdhqUZzi9SGmNJwU05psSWkNLaK59onSMI0eoVhol2F+kkogkAETQzGMAmYwRYFfS4IXIxaxLFbHZhkXIzAURcqcD6CAQq6gDRQEwo+csvBey9jUuWawj5ML6mkPqR84hMItDbLqXUAAhXg0gYDqEfNIR80RrAtAAKItBaLC9R+hDQiVfD6KcrzuHcT4VYVh5i/n6iscuEF8FiHgrIJCnaskSiwsKoaXgVyNWaq1dq60HK7lcpxTon0EkuHSV2nJL5VgPRipUhKwFmlmJwSIXgcaUVJpOD+O7CACgBgFFIJ7OA3q3HWUDfyKgi08Cvz+HlL1Cg8pGWgEsP4Mj8SwESXAQUCgvEtFiEoEJ3tY0Q3+ojKUGbjJyEkDtcGAwABS4gCgmV5n+ANQajLbgcNkOACoU2ZxgOjfJAMYAtHuHKAG6QxgXQGFGhNUAk3FNoAnHKAMIClBwLUUsvAGxDFKQ0dUAAqHgnA8ohqDfG5G4QpQAxyPgNtqhoCltiPYDYUoY0mCDVCbGSh855SqK+4Q76yBylIN+w66M/2hpgFCIGZMQOqH5vmHqeNOBfT7VWgG5QaBVp6o8G6sAoQACtS3bBgLyC6B7uCcCUNjCpcgj2FvjcbCQCRPVxVJqhg66GcgQxXcgPKMidxwHOmIaYVI8oOiCLnHE2JICwEI1CdgShekUgrTQMQcIiD6l1FCWg2JxBYEYPSOUAnzromYHIAAxPx+Agm0AichKBgYvGrOCeJLZwDYmJNtKkzJmAcmFNKeGSp+AaB1Oae07p/ThmZjWahKZizzmbOwFIIEqEnBp1UYgDRujb640IeSAjFD6Mr13qpIjJZyTVDRp84gejM6k2TrAAAfT3XugA6pIcmSgWuNfun8DLWXC1fBaPh7caBFRShvoQKA319jXF3JV/17tHo0BOHIDAAxXoJHekIeqUpzB8XBiOiAY67jcDCutfab9HhHEJC0BQVRID+skEWmAjwltiAhGtgY4Q3ofV25wfbfxQi0dum/f1uHIOEfcSR5g51OAmRgC9lOeVICYd+glzg61sQAHkPOSY6dJ6Avnzr+cWtiILamNNaZ03pgzCXYtoDM+Z8QcJUcwDhEIOECW4SCCiATUgAxmCE0RiWdgzAMlCAa8y2ZzNkMZt2JVyj1HQjZf/XGxA6oV6EbdjlyDn6dRvzkNjTgy7SByCgIqCIrULTJVWjnGARuV2m/N1UA6wn6r9ArmrvXEAv2KkN8bgApCbKoipncW6t2cpKOxcj28dyb9gLuq3u6pDr73UJAPsCCJYAGnBmXJaz4qVrhBZFwCqIGybySKnowcFgHAlgI+R7ADbmPUpM/+rddDXQoGthOFxpDaabu3PJY18385WV89AZKMXiApfy/yj0A9XY1e0R6fr32qPyd4PIAAaEbOj5mGb9qlwRt5R9xQlIPEdaYBX6PWskQ4E1WiDMCwvqX0bYy4Wi31wbHw3RsX6vxvwejgHvwCEfyJ0QGf1UmsGkFUg/yPyyng2q16DIHGjkCi2M2xDoG3CpCSHfHUF9GkAQI2C4B3wKDkAdDhHQzXzIA4UQH1H1GIPg13zkFP2bWzwgJQLJlCAwOsywNoBwLOHfF7A4WsE/3H2P2uE4JOFQJ4PFwsCwPIMazKmUHoMwlUnVAoWuA8l9iVFa0YCN04HPEy2NiEEVFakLSgw6yCDykRB6l0H9RKldRgFcAAEIkR7CyBXC8om8W87cPDlA7h9DDDjCuh/0wB3C7DAjSBXDXcV1hNANl42Z1Rpc5ks0voKs34j0T1ctz1BNR8ki8ptcvcPYPddDAwTJiNeQTIF9CAAZ84LDNxANyi9BKi+ZmAaioo6iGi08PZmAMAci/g/Yc8W0FAoRBiggPcqhAMm9BcBjdcP1fcDcHdjdw9LdrdzlbcThUQA8ndE8oA4ivhU8wB+jBjFi/ddjOBg9jkw99j1io8tjY80QVi9izcDiq0Pc5izj29s8YBc9J9C8Z859SgF9VAq9jpV869FA+1LdfDNjW8I4ATSBp8S8sR59K9l8ITa918s5DjEjy4tDnDdCi8DDaNQjTCwBzCviFjoMwAbCoiHDOAnCPI3CAiHDvC4To9/CGSgjSSjCTDwjIjPCYi8TktCi6ZJkUAuR0gFlkBA1SYdxxN8dcQehVBYgWgoQCxmBCdZNhkfNsQ7tMs8QwsdNzAWh5YFjCMIhHRwFIEkBMIXknk3wCIpINxvdhV7xbAqJfkVIAUxEpUnVdJghJtoAogzj9dO82QYAAB+EobDKoQeeTfcJIUIK+XkVEbDZAB0RKIgCATOYEAAan+C+HTGxmOmtPDWiQMEeP2hXTyhTzQHjWKxvRz3HEg04FiRWCzQDGaAhClF4EQwRlSEEz7SqGbOrRsjGC4EK2fUO0ODqFIEeEjO7z/g2EMOOigEGSEBVxnPCFKHVLEByFwKEF9VcVLRYAMMrQOicxj2iCCEwgiDxzaQJ3FzAHUHkx0HJwsFiB01fK5yjOGVfMwkM16GiChEwgZzMzLiCEVx7Kim2I2Fm2BzFBHPRmvLylwLkChH53FzQG/SVK8wJx8z80/LJwpxCyp3C1p36QMMgos0wpwv5kYpCwDEiAaXLi1zgF6MoQal0MfEaPT310VALDHiuItyqBEpOE5JrJKEksamfGT1s0+JKPfSErksQGOTkukoRIbFEoUqHzs0KPVARz+F40wuwrF35nws80xG8yJxIsUzIv5mC1C2pwiwM3Mri3MwYssrQGYrhFYr5zBiF1mwsGYqSFpn9ElOmXlx3BZCIGsChH+CSutBtP1XtP+G0TYTfBwgFUCE/Q9P+UwT+QgntXwRsRlTdI9g6j/CPA/hhgGk6k5XtN1FyqdPwgQW4RqpvHQSKu9JomwWwklS0mlWdQMGkTlAhQURynqstgAAlwh8B8pCoSoVClAKoolZg8AFqSQsk/pno45P4zhmrVJHweUxJmFOrpJZqzgdq1BeqXkbVsFhJhrWQlAWRnC8ACr0rVItEjUkAvSxqQBupepDIHASQShCp/h9Q1IWF1A2xpBrBxAWheBYBohobYbex4bEbkbUb8YMbdQ4aEakaUa0aCaiacbSb8ZCrobirfTXBwECxYAmAllzYfIpQZQtZNldYDMo5TZWbRQPkObxYFQtlVQwluZ6FugNlRaoQLSvZdktDRRuquAZRa564uB2a/JzU25go5pO4vZu4R4hdRKhadRAQoRHxjlewC5Y4IA55aAEV9QkUUU0UMVdQsUcU8UCUiUSUyVKVqVaV6VGUWU2Vh4Z5zUHa1UdUY7Y7bRw6l4CSFihKQajrMlwalrjkVa/Ibqkg7qy4WQb5xAkBQAAg9okg8BmRXBXAgA==="}
// @filename: config.ts
// @errors: 2322
import type { Config } from 'wagmi'
export const config = {} as Config
// @filename: example.ts
// ---cut---
import { Actions } from 'wagmi/tempo'
import { parseUnits } from 'viem'
import { config } from './config'

const { receipt } = await Actions.token.mintSync(config, {
  amount: parseUnits('10.5', 6),
  to: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbb',
  token: '0x20c0000000000000000000000000000000000000',
})

console.log('Transaction hash:', receipt.transactionHash)
// @log: Transaction hash: 0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
```

<<< @/snippets/react/config-tempo.ts{ts} [config.ts]

:::

### Asynchronous Usage

The example above uses a `*Sync` variant of the action, that will wait for the transaction to be included before returning.

If you are optimizing for performance, you should use the non-sync `token.mint` action and wait for inclusion manually:

```ts
import { Actions as viem_Actions } from 'viem/tempo'
import { Actions } from 'wagmi/tempo'
import { parseUnits } from 'viem'
import { waitForTransactionReceipt } from 'wagmi/actions'

const hash = await Actions.token.mint(config, {
  amount: parseUnits('10.5', 6),
  to: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbb',
  token: '0x20c0000000000000000000000000000000000000',
})
const receipt = await waitForTransactionReceipt(config, { hash })

const { args } 
  = viem_Actions.token.mint.extractEvent(receipt.logs)
```

## Return Type

```ts
type ReturnType = {
  /** Amount of tokens minted */
  amount: bigint
  /** Transaction receipt */
  receipt: TransactionReceipt
  /** Address tokens were minted to */
  to: Address
}
```

## Parameters

### amount

- **Type:** `bigint`

Amount of tokens to mint.

### memo (optional)

- **Type:** `Hex`

Memo to include in the mint.

### to

- **Type:** `Address`

Address to mint tokens to.

### token

- **Type:** `Address | bigint`

Address or ID of the TIP-20 token.

<!--@include: @shared/tempo-write-parameters.md-->

## Viem

- [`token.mint`](https://viem.sh/tempo/actions/token.mint)
