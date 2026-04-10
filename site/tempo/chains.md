# Chains

The following Tempo chains are available:

::: code-group
```ts [React]
import {
  tempoDevnet, // [!code hl]
  tempoLocalnet, // [!code hl]
  tempoTestnet, // [!code hl]
} from 'wagmi/chains'
```

```ts [Core]
import {
  tempoDevnet, // [!code hl]
  tempoLocalnet, // [!code hl]
  tempoTestnet, // [!code hl]
} from '@wagmi/core/chains'
```
:::

## Default Fee Token

It is possible to set a default fee token for a Tempo chain by adding a `feeToken` property as an extension to the chain.

Once set, all transactions will use this token as the default fee token, unless an override is provided at the transaction level.

::: code-group
```ts [React]
import { tempoTestnet } from 'wagmi/chains'

const chain = tempoTestnet.extend({
  feeToken: '0x20c0000000000000000000000000000000000001',
})
```

```ts [Core]
import { tempoTestnet } from '@wagmi/core/chains'

const chain = tempoTestnet.extend({
  feeToken: '0x20c0000000000000000000000000000000000001',
})
```
:::
