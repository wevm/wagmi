# `token.watchMint`

Watches for token mint events on TIP20 tokens.  

## Usage

::: code-group

```ts twoslash [example.ts]
// @twoslash-cache: {"v":1,"hash":"1e6861a9411f2b10135215821f2c629c4813bdfdb5bb1a235a11dc6a7b4e8738","data":"N4Igdg9gJgpgziAXAbVAFwJ4AcZJACwgDcYAnEAGhDRgA808BLAWywlLQAIBBAYzUYQwCKnDQBDDkgCcVADYwwAczT4kAdioTSSmA0Qg+AoSJBzGYXIgAMVXvknj+ZGQF8K6bFYLEXWuvogABTi5uJwAJScvCZcMWAAZoxKiJwAwkJJSgA6YCxsHNGZyZQgYpL6ACyaZooqaogAbFqSuoHxWaXmlkgAjHYOpE405IjS7p44eIQk5P70ePFinACuYADu4mj2qQDqW/YZYGhD/ACiJMcASnorpGAAKl6l5VKI6rK1yqoaLTp6eDWm22ankFisAGYBo5nKNGhNqM8DDM/NQAkxWOwuEZBMIXtp9AAOT4Kb4NGraNp4HEmLrgpBQkD2GEjPrwjyIqbI3xzNELAz5LGcNAQADWinxFRkNVJ9SQAFY/lSDCLxWA6T1EIzmadWYgAEyVBGYLk+WalGj8kAJNb8XGcYH2ACyFjQAB4jlkAHxBDrJVKe5IUThYRzMPRkOCpGnCAB0qsUscd+Bdx1jAAUwxHSHAPcUlF6InsDvgjidhhdFGgbmg7o8vLkwOJw3BQ7wYA6S6mGFQoBBeAgDPsQfBOAl2JwHgBJdP66zCsWKTjMV2cGCXNBwWMW8RKQfIZAgOjNrAKUoAA0vm9ygsKwGipBgWxggaUwfwaDQWE4rjHpAgzCcAA5AAApsSgrgA9DEj5ATemJ3sKMCYj+f4AcBYG7lBMEwNBDgWHAcF5AhXD3jGcCoQk/6AaB4HYewuE0JiRG5EscT5pwAC8D5PjQr5BMAuScNE+HCKkyBMWwAC6FBCcKQzCAUm6pIJYDCcJEnIWwsaMFAUmpB+X5BBEslqT+pmuBEuSsbEqwbCWXE8HaJjxouYBJl2rq+vmwaqcJQjdqkIQ6HAwZyBAShRJxXqcH56lLBACixuFShBEBgVAcGrSRHJ7i5JZuSXueIAyYeoZDMwpR+konAALTpPm26lSA5XNqUrXhiMFH1ZmFXZluJUUIej61vcpjcGOtrGGpIp2XAKwAEZwLwpCMAtHZUehqgduuVZNTJZQEn01iMrKPxjEqAIGMm3YapC0K6i4WrWMaSJmqilqBCEYSREUwjsYk/oNYDOTEUpf2dKIR2IL0vSnXU53NNQrRXUy+Z3QyD3DE9lQvRyJreCivKfXgQRYP+OAcBgUQJmAqQPG5U5QAA8qQ3BQFAj5wKYfYDtSHNcxRE5TgAIpwEAJMK+AdtOs7zrT25Q1KMP6oqXxyogauUqjtMY4glRY7CSD6q9ppExa6IGGTFNkJgUQBa6QXZakN2urG3AhWFEUu55aYADIRVFMVEBAumlLzg4gGkoRyAtTiigunAWCH4oOtLM1uRRkgdiuxwwFAiuHcrvSErY6uI5dgQO8cetqzq2OjCb+Nveb8xfR12ZRM7sVycJIqpOe1i0AAJMAYircorjngA3L3nDNhAaxoKkC3JK6s9gK4kpvCXMoIw0BvI/8gTZbXht6uMzdmzyFtWmTWYjFEKU+yC3axgHSjb/ovTSPDZKY0fZUZgIpnyZIMBufR5Sm0JjfNueAmwtjbB2BKChchEEkH9OAiUYABhMNg8O/ZI4PGlpwc8KCYDnmXNAFYCgQz/iILpUc4hOBwHyLQ2AC0VhKCUBYGq5CpZbCThRVhK45AYNmttXIAApcQ6CADKK1GBYABlg2h4ZmR5DgIBcmxBGFQE4AtDADoYALQMf+dYcBIyxmso8EhzBqG0LoEpCiaB1gQBYTgXgjAki8CKJiSwxwow2IAFQ8FIUcVRFDohiO5g6Rgqhlx6EIFAYRKx7DzwomQvBSUUrGXPMGLJwhsGxjIP+UgeT55gH0YUyJHl7gVNUII3g4g1LrVWJY/Rs11irRoInFpRiABy0AYCxgAFbCJOE+Zg1iwChImkocKcc5CkPIZQgiEgwDtghskO4+dE7dPiR2WayBzw6PbNzWMYg+wrDQOeKSQRDJYCjJBSCkBYDjNjOwJQkEI6QTETQMQtUiCGljLQSC4gsCMEgmc+AW4PzMDkAAYhhdzK5i80BdyqbkE5KKtxXNKXch5n4nmIBeW8mAHyvk/MIX858gLgWVFBeCyF0L/znLhWgBFyK2WwvxaQUgERYyThIQsiASyVnZKic01pHYVgdLiaodFScSK8Klh2c85LECrKoVAGhIybEAH1gnBP2PcXhxqDX0xFYs0ImDsHiwWqMmA/AgIUU6skrOj5OCWHidLUgmDGBiCrHIDAuQ4AYE2fgf8kA5WcHMKnbaZiIAWLIDwdMU4XHSyMVzZCC0FDBkgP67OaqjFLEDTQY4IbcjhAjfYaNi8KLxo7DHcW21/VDNgGMiZj5mxbk4HImARySEnMgL0oQdD+yws4FOSCzNCWPOea84ZlKdDUoHLSgFaAgUgrBRCqFuLYzwqReIWqo6YC1SELVXFtVBBRHHKQXI9ivUWHvcwLYuIZm5DOLQE8tC5WqsTaK8VNTsHnkQDYoq4ybJFJyRFNK0s5DhQdOwOQUAgIRA3i8zg6YJ7KU4AhpDbjSCoeDLNNFNzoO1NyUBAj7iACkhFgxASI6h9DmHILYdw1GfDMBEPuJY1AUj7jyNoEo8U0p7AgiWHWJwM4/LJNAV2IQCATzgxYPdaquO+iHBYBwJYNDEQMO5Cwzh10FEJP+pbHAXczaqksIkLwBO5YtlkbQLAfl4GwBYeEnJspexlOqZYQBJJmnxDaYhXp/OxmOPqXnlwZA65Qj6XlDDeU0XYtxf7Yo5RsZSBrCnLYwNZYAicCk8MxARBmAwwhPqGGhIrJeZi+pQRzNHXOrQLl/LhW4DFfoKVzVlXnrSC1PV9LsXBGatdGQJschWWTu5pBOgzqbm4neOoGG0gxvNfi4luQUlardIi2QJoBp9RbeEoI3bCjVrKP6+Vqb9xQhzfZYt2gy3prvEaE0awDXvPbe9fdvOj3ZtvosIt9BcgDXj14QaCEWobFsW9c2Ds3FFOMEQ5wK4YqCJCCAhvchdSwBBHPCLFpuh/WjwQTAVwABCTgpPlBkBp+eIzjXONmdSAz8nnBdjo+WVj1eRSwB0650zoT9n3MPrAEVGx37f2ytYcoNV4TJWUN4DEoJYBCqXig5s2ySruJtDkZM5scjguEHWMZfHtlSmOSNyb5gZvwwW6t5RrgzAMARPtdxaTdqkpe4UEEdFwZSms8fZ7yVyU4M0d44RlDBn2Ps8CQZWP/H4/i/ReHgPIzqO0c4AxzKwEBNsfS6Z5PPG+PIeI4JxOmewAe+zyU+T5Tfe+YU0piAKnQpBY00rrT+Gjv6fQ6zkzXHxJt9IP5zvgX1Mhb72FgfunFD5xkonUpCPbJU8cmjjHAucdgDx1nyPmx6kk7J6mynyPaf0/P6QZnI+ONl7w6L/1vPd/Y6FyL2/NPxfr+l5eHcPcJAA8MoQdUoZALBO4dse5BdUlSCHhVQRaWMGIZgJdd5OANA3CPNMVSCBlJlcwBaaCSPcZCIEqA6V4fQOcQ+M6ckSuRYSVPWJGeuI2fWaBaYWBPkL6d1aAKIRvXJKzGzAAflSH6WDFjHEJU2mlCF6l7RELAAwGQCkiLE4BDl0lKwAGpehxZZhwowtSDexCE8An8XF3FzwRNKF1hfVvUYB1hugRlOAnQaEBBTxm0dAVhwxAlogWkDEOxQxuZ85gxLCElJFAYcwuA5U9lwhldyYWBJAjEBDdBKl9EW0wsoB4lcRbUIjkjUkloBBaxpo0FQgVhRwRF0dxF3EcVcMEgggIQIh51iU4C30wB1BPlV1ugVgwUmir0bMMCmiIRWVXQEhYwIRD1OU5AGsghE1Wh3CqxPVm0Mc/D5VjlzwVs5BYxX0tg8kYDiVF1yUV1vlfl/l4At08Dd0WVVjRiuVViNi0AbjapspDNP1/9zxddEcYgl5HJ5RrcYMc9o93jjhUg6M0Ngx/iMVE9jDUhQTUhFRE4RMxNYNUogIoTC9QSH8k88MoTOAYTXNrlRNnibEB0OwTkLibitiiUvxdjl0twqVDi6UTid1mUoULij1EVrj2A31bj2Sth7iQo70Jwn0OwX0uTppC4JAgCUBDxFd2xSgiBrBYxeh5TrBrAyClY3h9Reh9R5B94AFtZAgUpGDz4noNS2DuRzQ4ErYO5H554QoVI55+5SEh5R5odJ4Z454F4l4V415jgN4t5VTKDVYtT/59Y6CDBT4wRNQmDwEWDVYTT3piZLY0Z/o7Jkwgog4VDQ4oAv5jZGhqDtT3gQyQAgQSw9ZYZDTRgXoDoYhYAMRwYyJnJhBKJqIi8sIoVJIIAiJbxSJtkapfxNoaJYwiCQYWI9ckyiyQRHJyJXI1QPJX4vJqpfI5JaZUggIh45xeAlSNzNytztydzdzrBehMo5Jq40Bgo9wvZIoe4zJhICdqNnZC8HjcoLIGt0s/ZnxSA1MRRvxkxeFcgxz7BjJShOpxAkBQAAhFBWEhA8BNwQBXBXAgA"}
// @filename: config.ts
// @errors: 2322
import type { Config } from 'wagmi'
export const config = {} as Config
// @filename: example.ts
// ---cut---
import { Actions } from 'wagmi/tempo'
import { config } from './config'

const unwatch = Actions.token.watchMint(config, {
  token: '0x20c0000000000000000000000000000000000001',
  onMint(args, log) {
    console.log('args:', args)
  },
})

// Later, stop watching
unwatch()
```

<<< @/snippets/react/config-tempo.ts{ts} [config.ts]

:::

## Return Type

`() => void`

Returns a function to unsubscribe from the event.

## Parameters

### onMint

- **Type:** `function`

```ts
declare function onMint(args: Args, log: Log): void

type Args = {
  /** Address that received the tokens */
  to: Address
  /** Amount minted */
  amount: bigint
}
```

Callback to invoke when tokens are minted.

### token

- **Type:** `Address | bigint`

Address or ID of the TIP20 token to watch.

### args (optional)

- **Type:** `object`

```ts
type Args = {
  /** Filter by recipient address */
  to?: Address | Address[] | null
}
```

Optional filter arguments.

### fromBlock (optional)

- **Type:** `bigint`

Block to start listening from.

### onError (optional)

- **Type:** `function`

```ts
declare function onError(error: Error): void
```

The callback to call when an error occurred when trying to get for a new block.

### poll (optional)

- **Type:** `true`

Enable polling mode.

### pollingInterval (optional)

- **Type:** `number`

Polling frequency (in ms). Defaults to Client's pollingInterval config.

## Viem

- [`token.watchMint`](https://viem.sh/tempo/actions/token.watchMint)
