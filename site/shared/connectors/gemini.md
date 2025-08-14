# gemini

Connector for [Gemini Wallet](https://www.gemini.com/wallet).

## Import

```ts-vue
import { gemini } from '{{connectorsPackageName}}'
```

## Usage

```ts-vue{3,7}
import { createConfig, http } from '{{packageName}}'
import { mainnet, sepolia } from '{{packageName}}/chains'
import { gemini } from '{{connectorsPackageName}}'

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [gemini()],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
```

## Parameters

```ts-vue
import { type GeminiParameters } from '{{connectorsPackageName}}'
```

### appMetadata

`AppMetadata | undefined`

Metadata about your application that will be displayed in the Gemini Wallet interface.

The `AppMetadata` object can include:

- `name`: `string` - The name of your application
- `url`: `string` - URL of your application  
- `icon`: `string` - URL to your application's icon or logo

```ts-vue
import { gemini } from '{{connectorsPackageName}}'

const connector = gemini({
  appMetadata: { // [!code focus]
    name: 'My Wagmi App', // [!code focus]
    url: 'https://example.com', // [!code focus]
    icon: 'https://example.com/favicon.ico', // [!code focus]
  }
})
```