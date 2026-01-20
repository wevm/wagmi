<script setup>
import packageJson from '../../packages/vue/package.json'

const typescriptVersion = packageJson.peerDependencies.typescript
</script>

# TypeScript

## Requirements

Wagmi is designed to be as type-safe as possible! Things to keep in mind:

- Types currently require using TypeScript {{typescriptVersion}}.
- [TypeScript doesn't follow semver](https://www.learningtypescript.com/articles/why-typescript-doesnt-follow-strict-semantic-versioning) and often introduces breaking changes in minor releases.
- Changes to types in this repository are considered non-breaking and are usually released as patch changes (otherwise every type enhancement would be a major version!).
- It is highly recommended that you lock your `wagmi` and `typescript` versions to specific patch releases and upgrade with the expectation that types may be fixed or upgraded between any release.
- The non-type-related public API of Wagmi still follows semver very strictly.

To ensure everything works correctly, make sure your `tsconfig.json` has [`strict`](https://www.typescriptlang.org/tsconfig#strict) mode set to `true`.

::: code-group
```json [tsconfig.json]
{
  "compilerOptions": {
    "strict": true
  }
}
```
:::

## Config Types

By default Vue Plugins does not work well with type inference. To support strong type-safety across the Vue Plugins boundary, there are two options available:

- Declaration merging to "register" your `config` globally with TypeScript.
- `config` property to pass your `config` directly to composables.

### Declaration Merging

[Declaration merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html) allows you to "register" your `config` globally with TypeScript. The `Register` type enables Wagmi to infer types in places that wouldn't normally have access to type info via a Vue Plugin alone. 

To set this up, add the following declaration to your project. Below, we co-locate the declaration merging and the `config` set up.

```ts
import { createConfig, http } from '@wagmi/vue'
import { mainnet, sepolia } from 'wagmi/chains'

declare module '@wagmi/vue' { // [!code focus]
  interface Register { // [!code focus]
    config: typeof config // [!code focus]
  } // [!code focus]
} // [!code focus]

export const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
```

Since the `Register` type is global, you only need to add it once in your project. Once set up, you will get strong type-safety across your entire project. For example, query composables will type `chainId` based on your `config`'s `chains`. 

```ts twoslash
// @twoslash-cache: {"v":1,"hash":"21ee40fb2fb12112e58ba8b16f5d7f9ef29efdee74e4bd47b38d17e1aa2e8800","data":"N4Igdg9gJgpgziAXAbVAFwJ4AcZJACwgDcYAnEAGhDRgA808AKAQwBsBLZuASgAIAzAK5gAxmnYQwvQXBgAhVhBEBrAHKCAtgCMyAHhGT+7AOa86NMFDi8AwoZO8AvLfvHdpGMyiTWGXqgAdKV4QrUUVAFFaLEUPUjhEXmAgkNTUjy8fP1h+ZkFWNETk4LTS3gzvMF9eMGYNGESAkAi0fDI4EWYwJoBuFLLSiqzpUlZGgjQ0LASAehmYVvbOsAA6CV7+gfTPSurmLHYAVVHx/EnpxDn99hWFtvjltYgZ642S0oBfPvevzd4wpTKAAq7HqiQAjAAmAAMsO+aQMYDQpGYYgSST+aSGVT8MDAcEOYHYJHibAASvAIKwSUVMQNsXsoFAPHB0U1obQYFzuVzwQAWKAAdnBAA4RJCtHzBVAAJwyyEAZlgzC04IVCoArDB+XyeW8tlidsMASobBkaFBEoroSKNXaRfCBr93obMjjeBp8uJOqxWAraS76Ub3V5mfA2SAOZ1weCtLBoRqZYLBVoFQA2BUxtOC6GQkUitMSmCQ5jgwUKpNp6Pg/UGkIMvwm5RmzwWiF8zXp6Hgx1lZ1pfupFbD3j8j0QDy8YcrXu8EnsfgYAASXHwAH5EoxGCIOHjCrZd0jdNOAHwUXhYZgo+o0eKJABqZAXy9XAAUr3UFu0+I4T7xX6QEAaOwsi6FoEBUp4YAnnwAA+0iWDARhgDAUDfB857FGk07oQAumevAiPgzDsGAACSUBmPQeJWIRrjIE0REkfiTS4cgYCaDopBsU07BQKxTh0WARjGAxIBMaRcCsexnFkDxIB8ax56yKwMBiAAIswaDMIJWgmKRaAnowl7Xl+8QAPobrwhyyAogLqNoZDvqZt5wPorjnhJ5FQMpMCqRpWnMDBiQ2fI4RqLJpAUmggikGAQLYDAugqWpaCadpJ5BKCWATmg0i2eFDlcZQIDeCICCIBMUyzDMADuzDGMBKxwPgMxEIIMAvAcMwGBoOVwCqqlwDMMhhfZkUlXA2mkAwiAylQqlgMYrRIPyVDTcYCx4KNdkqEVZAlRwKFINCVBMSiYgHXNGHoIleCECSJU0PQTBsJwPD5WNe2RbodjCSY7jBtUgTvE2UQxBO7QBlsDa8DkeQFNDdblEDfi1GCvBNC09wdF0tZ1rDsVjJjVUXHMdxLF0Tz4wasPXMcxNNGc1WXF1NwUw8VMSGzNMDrOg6hOFIIY1CsLQrOiLIqiaDolhQZutUeIEkSJIDawFJwFSNIYoGZR00yLIRhyPI8vyQqiuKkrSnKirKqq6pajqeogLOMOo/84UtlpqFWgqNp2hqDp0iEAuDO7noFOwPp+kjBPu6GhvjFGpaxvGibJqmGZZjmeYFkWJZlhWgpVinvPy7sjae+aPujh2Gpdj2we8KHofTrX46TjhfzzouK4tVZW47uwe6JDYh5oMew4ESZn6uQ+T692+H43t+Th/gBQEgUl4GQV0MG8PBwg5KRqHoZhfxd2AHz4ee4IH6OMZ2jG4LnnpxgGUZM8rxZVmhbtEWOVIM5We7RJ4rGCtZAq41AHRVivFRKYDMpEj6rlT6/99rkCoGVCqpMar1UajcFqbUOpsx6kBfqg14AjSgd9QBk1pqzT5BqBaeJlr4FWnydaV5NqzRADtQqE0FonyQJCM6xELq3hOjdagd1KpkEApgkAU0ryzULCwpaK1ECCjOtAXAiBFSQlESAIwi1Px4FIrAWgKwZYlT4ngeRABaAxkIHF+wVA4wUT1zB4ASjgXgAByKECp/G8BAjUCAeUuBwBMLUMIMBeBoAgAkxKAT1JciwAAWWYBgHQFJ+C6DvvBZ+T8Yz3yPkhE+UATz+JWIdGAJBWD2NIAow6wj9FiI/JdcgiAyzSMwDge6xADrrW8ZVYygEcAzQwHwLyFErJpJgJk7JuSkIFPvsUjUz8ymIWQqhE89CVFIDUSARabCkDaOoNwralVZlQFacddp4lxHSyur03COjYDmJQTNJIaCBGAObgIQCGgAkAAF8HAWITAfxQQgj8OgVxRgwBCLEVIhRCEipm7cBKjeZgSBQDmCVhIMAeAbEfA+EAA"}
// @errors: 2322
import { type Config } from '@wagmi/vue'
import { mainnet, sepolia } from 'wagmi/chains'

declare module '@wagmi/vue' {
  interface Register {
    config: Config<readonly [typeof mainnet, typeof sepolia]>
  }
}
// ---cut---
import { useBlockNumber } from '@wagmi/vue'

useBlockNumber({ chainId: 123 })
```

You just saved yourself a runtime error and you didn't even need to pass your `config`. 🎉

### Hook `config` Property

For cases where you have more than one Wagmi `config` or don't want to use the declaration merging approach, you can pass a specific `config` directly to composables via the `config` property.

```ts
import { createConfig, http } from '@wagmi/vue'
import { mainnet, optimism } from '@wagmi/vue/chains'

export const configA = createConfig({ // [!code focus]
  chains: [mainnet], // [!code focus]
  transports: { // [!code focus]
    [mainnet.id]: http(), // [!code focus]
  }, // [!code focus]
}) // [!code focus]

export const configB = createConfig({ // [!code focus]
  chains: [optimism], // [!code focus]
  transports: { // [!code focus]
    [optimism.id]: http(), // [!code focus]
  }, // [!code focus]
}) // [!code focus]
```

As you expect, `chainId` is inferred correctly for each `config`.

```ts twoslash
// @twoslash-cache: {"v":1,"hash":"9b5b0298b470a179bc3ea33df03ba8ced7d88ec92e62fe07acf70060b35435dd","data":"N4Igdg9gJgpgziAXAbVAFwJ4AcZJACwgDcYAnEAGhDRgA808AKAQwBsBLZuASgAIAzAK5gAxmnYQwvQXBgAhVhBEBrAHKCAtgCMyAHhGT+7AOa86NMFDi8AwoZO8AvLfvGKvEfmbswASShm9DCW1gZgRsbIADognt5gcDEAushgmjqkKTHsUMlOHq7RsV4+iSApadpkWSA5ye6yrDBiACLMaMz5WiY+aAB8jFjMpMwaMDSkcAD6APyIvACqsgpKaulkAArDo+NkcPqu7nE+/g0wTa3tzH3c80vyiirqVaQASuOCpGAAKtgwuo1mmg2h0+lEwOwNFgIKQ0NJlo81i9KCAoEoEIgCGg0Fg4IgAPT4gDuzGMGnYADo4Ph8URBDB8cwsOx8QYoRA4MwtE04PiZA9Vs8Mii4B1YUgAJxUJpgYxofBIACMABYqGLjOM8PyVk91uRpT5cIgAAxUOIjMRkSUAXwo6D+eEIJH11HMTDYnB48IFupeujs4RMulIMGYaLArAwvFQ4N4cd43NWAFFaFhFCHJvNgLH47mQ2HJJHeLB+MxBKw0Fmc7ma7x8+Gi2AdvMYkn5XsRMwwDEANzV2vx+uFqOfVgtrE4vGE8b4DtdikSXv9gd10MNqNM9gLUhj3gxfDY3EExnMikzudgBcQE/sJdSAfWvv3uOP/uJlTfSEweaKgBMxoAp9czCNALTQPFeGzZ8ayHCMo2COAFghZ1OVYd44AgVhnSraCV1goswygEM4AgmJjVoGBKKoyiVSgAB2RUAA4RF/LRlToqAJQlX8AGZYC5RUeJ4gBWGAVWVai7xXPM12HBNERsfMaCgeZeONRjhM0xigIfHTa3wqMNHLcRO1YVgeJw6TB1kuDeEI4jSJAcjO0VRUtFgY1hIlOi6K0HiADYeNc/y6ONX9GMY/zWJgX9mEVOieO8/yXMVKSrNXAtbPfZRFNDZSf2VESAuNRU9JrV9oIq3MKRq3gVV4DQYRgXgaopMrnXYfgMAACS4fA5l4RhGBEDhgkrWxRrANBdFavp3CGEYxgmCCADUyE6nq+q2RbdkmPhHD6XgNlICByVkXQtAgTDQzAG5eAAH2kSwYCMMAYCgJ9rSSOa6vcbpjF6AYFp2ZbZjuBFBT1baQb2GaapucGfSRDJ3jQT4fj+OGKTBCF2Vhb0dWRq0qDREQMQnI9CRJMlKWpWl6RvVlTuhTluXgPkId9YUqFFYYGEQZVhOlYI5QVRAVTVYYNX5kBtURIViZADg3qQX8zS8MCrRNW17RwPAyBOl1efFRAouF2V5SQOizWgI1eN/NWQCMGUdjwHxYFoClwJRHJ9dIUgAFp7d/AOeONHiA7olEaHoPBfhwXgAHI/x4xPeHYaxIDhLg4BMJs2d4NAIELv4k5aSisAAWWYDAdHefhdEVB6npLQ0oD6ROKRRJoSFYP3De7w1VfV7ZLXIcW6J16gHUxJ1FZjmXBhOnBYQwPhjj8KABvLmAq5ruuXsb5vhFbt725FMV+bNpWRctxBreoKXNUxDf/EHlXEEd81mDHpVJ7taeetZ7EHnm6TES8IAr0wOvVw28K7V1rjAeu/pXDNwDBEYMNkiwxmgtlFMaYmqZkgsuaymUiwljLBWSy6UDK8CbGMccbZZyTE7N2EAZU8JYJHDuccB5JzHnPCw+ci52EkP0lwuyzJty7n3IeKcN4zztiEZeCQN40q1iqvGTRcZsqfgYXVf8gF+wgTAhBKCnCyHwQSEhdgKE2DoUwthYhuEBy0PsvARy5FqLUVogxZirF2KcW4nxUMWhBIiTEsqCSVF1HSVodlXK7R3qqTDhpLSHCtEZLjLQoyFZ2CmXMtQqybioBEQ8eOZycU3IeS8j5PygVgqhXCpFaKsV4qJToslKpsSLHrnkqsRJ+U6qFWEsVUqYjeDaMmWVVqwyGpNRajVdq60uq9WpANIaI12BjXmDYSa01ZrzW2EtPY8w1qkA2ms/A0MTl7ScIdY6p0M7/EutdLsd1Honxem3T631j7PVeu9PoF8+ZW38ubUWSBwWP1INLPAYQIjvztiPTW48gpT0wEAggICXQL3hZIUUBRAzGAAIK7NcJgyx0ZzHxjwamdMpznG9LkhQ4yRS4kSPod+PcIAmEXh6a4iRo5eFyIEUouArCrwCvEVSzc0iRX8MJJuRRzCJXCOvJuaV0z+xTN0V+H8hjjRlRMT/cC7KZJUoQjYuxaF4COLIOawVsrSkOQqRRbxNFlT0SYixNiHEuK8X4mEoSolxKSVES4mVfSElKWSbwNSaThLaQmVMi1fTckmTYIUplNCJHuJIm6lK7kYCeW8r5AKQVFQhTChFKKOg2kJSSilLVaa5IxrynGlURV/IlSydqyqMzar1UaiGRZbV+wdVWX1DZw19m7P2VjH6wNbmrRWZtakNzdpegOkdE6Z0XlXSaO8vgnyAU/PBF9YFPNL5IEYqqG+FsxYP3VM/WIrgSVIuHsUUeEwkCJQxTPbFzpo5gJACwDgXA+By0hn6dBQZaE4NzHSghGYzETNoayqhObimcubDygA8lgcQZ0NC8HwQy0gLbSF9OFTyvhlN8SQOIxnEyKqLxSojelDKfS5U8Lo6KpVzIA5MchCx/JbHlFXjUZx3SOqyp6v0Ya41khQKmrQ5G7jLKM5YEEDQAA4jsAAYqamEGBHVRrkoqczHLnVlILTyrxXl/LCRJVoJzv4YAtBEHRdidEbAaX/L+QqJKJSaXijYFov5hK/n4CFqjL4+2puo3JVgv58O6Z02gfDFomjWdbbZKz2GuOadsvmzxtAoD8BgN5SKjFeJ8UVMwZgDsYCMUVMJZr/l/ISjq/wX8Ih+DxX8hpZrdF4v9pXEl7JEiM35KzRZIrzLSsuvKQ52gRaallvqZW6tzS60xTio2zpzaZM4ape2pJKleDKnClFQKiW+20OhLCNgeXksFbexZ5bdnytaCTG5wzIhhJ0QlK5YSxoGKdOVN5m7PESXKkGx5losBlSKkG8afySZcineklNibTq+msEVAAZQ6JYYYUA5AXKgBqT7JWiyFZpcV+nG4Vv2bIrQLiNgJT8BEMqfy/BuJJkYnFEQxpYA2DcvFQJJVjQSnDsLu9f3Uo48mw99DEjjBcGOvkmA2Wf65cWwTuSZW3U3YAhby3Vvrc29twBQzWq8e0KJ4TOnJSftm8NXb73PuLftcd49iRqXFIcjgC0U68RK4eJFg6o3X2CJs/K+b33KefdjdV5kjXVLUtJlIN538ioqc5Fp3HmCebE+e9T1Xm3KoA9Z8J7+UnXYoAU6LzT7lTObM8Yr2t5P1f++y7rxp53v5vgQAADKKijyRUkMAtgkVj53pbCePe969wP1PVah+5imbM4dCzWrLIuVO9Z8xNlzomtsqai6jk7WWmctdVzN3LX2g8vdzyLqHpuh8lu3yz6/J+kVFNATB6CmiBmOS3TBkWE5iJlIGf1hlmluGgKRgVjeA+C+Hjn+FmnBEhGezhGgy5kVlJnJno3kWpnJCpBpDpAZE3CZnZFZh5A5hQL1BBRNlCwhTvglhhThUxAINgM/UQB4hRVNS1mNAAyxQNhhFYP5lckdhlEhXvhtlgFVh4gdioGdmCFdkxHdjoC9gQCoF9kxANiDlUJDiKkjhA1jkxEwKThTjTgzjoQgGzhIjzi5CaELmLkxWakTh3j3kQWQSAP+VPiBU7m7hgF7n7ikINA/iEO/VRT/nEKNCA1ASsLAywGXjIGgQ8BKE3jgV3gQQPgbkCNPWCPPmvVBXFj/A4KfUllhVfVfigAENiO/l/gnkSMdBxUsMXnSMgUyLXiJQiDyL8MKJQWJTQQpQQ072Qwo3U2XyjEw3GiX2N1si5XHEI2YzgFI3I0IXG1oVo1kUVUYyI1E1FHE0ETVRUQgF2LzSkT4wOIY03GE2OLOlY3OMlVUU1QzwSzkzfERD0W5SU2MRU1MWsww2010xgAMzGGMzEFMzdwkUZwmTmLsh7w5xgCcxczcwlCik8xhx8n82izCmC1C2EnC0i2i1iwlHGzxydyDzSwy1031xGg7yRPewZzp3yxX1dTW0q2qzolq3qygEa2aw8zaw61/C6x6xi360G06RG1/HTz7R33V2Hxm2MjmzMgWyWPj1Z1Xw5w2xLVqXLQaSrSaVrVaUOw6S6VcmuPOwUljSuxuxaXuxTUDypTwNe1L05KjERI02RNNzWz+wByBxBzBwhyG2hx814nh0R08xRzRyAMx2xyVMzw01pOzxJzJxb1IEp2pxL21LLypV9OZ2m1s25I5y5x5z5wFyFxF0VDFwlylx8w4ll3lx4kV2VGV2pJVORK1zgB1xED1xyxZL9LZN1PLKcloD7w3yrwdy+Pxx1N4Bd0RHhLLNWw52nJnN9393nPTIbxDxInDw0Ej2j1lEX1ZNLO7z1MnM3K3LT232WKLBzzzzogLzb3zIvJZxROvPIlvLvNt1r13LdIbyb3JxzPfJHK43dwnN/PX3/IAuNAfMXNSzH0n2n05A1Hn1kFIFXKvJgqnLgvguty3yAp+Ogj32VHmVHUPwnUf2nTP1nSv3Gj2SYpv14GXS3Qf2P3XWuQgJf3uV3SeXOleSPVuhPV/0BQ+gvT+RKL/yBWkKVAlOqKhVqJ4LfWJSaOENaPRQAS8I6OAzVFAzCEJQRRMDkHJWJUpT6UQ1pURG2NQ1BIkQWNwrklWII2eIzi2PpR2PnO9OkDuIpnkRExeLOPFXeKuN8rHMkS3ACtIOPEeOCrExEAkwuKk0+J7NTKQz+P1XjQt2UymhBNLzBLgEy0hKMxM1IDMy9KiuLJLOgvXMnPROxMxPc1xObL8wCyJLhxJLJKixizi0iu+LTOApS3pJxEZOHJco+2qsXIDI515Jq2G0FOFJazFM62616xlKG3lMVM/JpJGtslmwKS1M/PqvZ0nINNLTqQrUaRrRaXrUtKbW6UGq/IuyGSdLux4gysXI9N3ALL8tquZzOt+3+2EkB2B1B3a3DKhxh2jIRz/DjJgFR3RyTO7NdPrxS0zOb1bzzMgtzSLI5KirmsnMrN5350F1/GF1F3FxgElzCWbKgFbIVwik7KTBVxTKGrVwxtsj7IHKHINzxrOzwoatgqIt9znO+sLMJ0LxXJmq/OJtFrFrtx3Mlr8uDxOkPIjx8HQpjxwrluBsryVrt12uGu5qfMppfLfNxqmq5JFoIqNoAuVCQqltGtAuzNzOL0Fq7xN1RJvMIodqAOdrVtHwnynw8VnywvPNHMvJ9p/PtoduIv8mdt3yHUopHWahougknR4pnS2R2UvzGjYo4vv14HOUuS2j4r2Ff0Ev3U/zeTEqCLkqkrAEvQUvFh4nvXkLvmfSfhllMuMDkE0riJELRQlC+iUKSNwJhDhGAAJnlj1EmQED3STgAAFyCWRqDE5wRwQ+DUDGBZ6GiDUhCBiTB5h+6SVJluAd6YC96D6cj/Aj6jhXAz7XA5BL6UQlpmAkBQBzAEIJAwA8BvZrRrQgA"}
// @errors: 2322
import { type Config } from '@wagmi/vue'
import { mainnet, optimism } from '@wagmi/vue/chains'

declare const configA: Config<readonly [typeof mainnet]>
declare const configB: Config<readonly [typeof optimism]>
// ---cut---
import { useBlockNumber } from '@wagmi/vue'

useBlockNumber({ chainId: 123, config: configA })
useBlockNumber({ chainId: 123, config: configB })
```

This approach is more explicit, but works well for advanced use-cases, if you don't want to use a Vue Plugin or declaration merging, etc.

## Const-Assert ABIs & Typed Data

Wagmi can infer types based on [ABIs](https://docs.soliditylang.org/en/latest/abi-spec.html#json) and [EIP-712](https://eips.ethereum.org/EIPS/eip-712) Typed Data definitions, powered by [Viem](https://viem.sh) and [ABIType](https://github.com/wevm/abitype). This achieves full end-to-end type-safety from your contracts to your frontend and enlightened developer experience by autocompleting ABI item names, catching misspellings, inferring argument and return types (including overloads), and more.

For this to work, you must either [const-assert](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions) ABIs and Typed Data (more info below) or define them inline. For example, `useReadContract`'s `abi` configuration parameter:

```ts
const { data } = useReadContract({
  abi: […], // <--- defined inline // [!code focus]
})
```

```ts
const abi = […] as const // <--- const assertion // [!code focus]
const { data } = useReadContract({ abi })
```

If type inference isn't working, it's likely you forgot to add a `const` assertion or define the configuration parameter inline. Also, make sure your ABIs, Typed Data definitions, and [TypeScript configuration](#requirements) are valid and set up correctly.

::: tip
Unfortunately [TypeScript doesn't support importing JSON `as const` yet](https://github.com/microsoft/TypeScript/issues/32063). Check out the [Wagmi CLI](/cli/getting-started) to help with this! It can automatically fetch ABIs from Etherscan and other block explorers, resolve ABIs from your Foundry/Hardhat projects, generate Vue Composables, and more.
:::

Anywhere you see the `abi` or `types` configuration property, you can likely use const-asserted or inline ABIs and Typed Data to get type-safety and inference. These properties are also called out in the docs.

Here's what [`useReadContract`](/vue/api/composables/useReadContract) looks like with and without a const-asserted `abi` property.

::: code-group
```ts twoslash [Const-Asserted]
// @twoslash-cache: {"v":1,"hash":"c81ecea55f2b27ad2c18ae6e5fc3ad6aed33ef72a35b2bb465243c2101cb267c","data":"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"}
const erc721Abi = [
  {
    name: 'balanceOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ type: 'address', name: 'owner' }],
    outputs: [{ type: 'uint256' }],
  },
  {
    name: 'isApprovedForAll',
    type: 'function',
    stateMutability: 'view',
    inputs: [
      { type: 'address', name: 'owner' },
      { type: 'address', name: 'operator' },
    ],
    outputs: [{ type: 'bool' }],
  },
  {
    name: 'getApproved',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ type: 'uint256', name: 'tokenId' }],
    outputs: [{ type: 'address' }],
  },
  {
    name: 'ownerOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ type: 'uint256', name: 'tokenId' }],
    outputs: [{ type: 'address' }],
  },
  {
    name: 'tokenURI',
    type: 'function',
    stateMutability: 'pure',
    inputs: [{ type: 'uint256', name: 'tokenId' }],
    outputs: [{ type: 'string' }],
  },
] as const
// ---cut---
import { useReadContract } from '@wagmi/vue'

const { data } = useReadContract({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: erc721Abi,
  functionName: 'balanceOf',
  // ^?



  args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e'],
  // ^?
})

data
// ^?
```
```ts twoslash [Not Const-Asserted]
// @twoslash-cache: {"v":1,"hash":"fd8f5c57d72097f21d1a246c1505fe478b32857ce6eeba0f9c882f247122d11d","data":"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="}
declare const erc721Abi: {
  name: string;
  type: string;
  stateMutability: string;
  inputs: {
    type: string;
    name: string;
  }[];
  outputs: {
    type: string;
  }[];
}[]
// ---cut---
import { useReadContract } from '@wagmi/vue'

const { data } = useReadContract({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: erc721Abi,
  functionName: 'balanceOf',
  // ^?



  args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e'],
  // ^?
})

data
// ^?
```
:::

<br/>
<br/>

You can prevent runtime errors and be more productive by making sure your ABIs and Typed Data definitions are set up appropriately. 🎉

```ts twoslash
// @twoslash-cache: {"v":1,"hash":"a8bdf07964e5e57f195e43b7354ec3ed1fdcf454f5eca95c72e560cff7e4b73d","data":"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"}
// @errors: 2820
const erc721Abi = [
  {
    name: 'balanceOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ type: 'address', name: 'owner' }],
    outputs: [{ type: 'uint256' }],
  },
  {
    name: 'isApprovedForAll',
    type: 'function',
    stateMutability: 'view',
    inputs: [
      { type: 'address', name: 'owner' },
      { type: 'address', name: 'operator' },
    ],
    outputs: [{ type: 'bool' }],
  },
  {
    name: 'getApproved',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ type: 'uint256', name: 'tokenId' }],
    outputs: [{ type: 'address' }],
  },
  {
    name: 'ownerOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ type: 'uint256', name: 'tokenId' }],
    outputs: [{ type: 'address' }],
  },
  {
    name: 'tokenURI',
    type: 'function',
    stateMutability: 'pure',
    inputs: [{ type: 'uint256', name: 'tokenId' }],
    outputs: [{ type: 'string' }],
  },
] as const
// ---cut---
import { useReadContract } from '@wagmi/vue'

useReadContract({
  abi: erc721Abi,
  functionName: 'balanecOf',
})
```

## Configure Internal Types

For advanced use-cases, you may want to configure Wagmi's internal types. Most of Wagmi's types relating to ABIs and EIP-712 Typed Data are powered by [ABIType](https://github.com/wevm/abitype). See the [ABIType docs](https://abitype.dev) for more info on how to configure types.
