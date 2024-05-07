<!-- <script setup>
const packageName = 'wagmi'
const connectorsPackageName = 'wagmi/connectors'
</script> -->

# mock

Connector for mocking Wagmi functionality.

## Import

```ts-vue
import { mock } from '{{connectorsPackageName}}'
```

## Usage

```ts-vue{3,8-14}
import { createConfig, http } from '{{packageName}}'
import { mainnet, sepolia } from '{{packageName}}/chains'
import { mock } from '{{connectorsPackageName}}'

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [
    mock({
      accounts: [
        '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
        '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
        '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
      ],
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
```

## Parameters

```ts-vue
import { type MockParameters } from '{{connectorsPackageName}}'
```

### accounts

`readonly [Address, ...Address[]]`

Accounts to use with the connector.

```ts-vue
import { mock } from '{{connectorsPackageName}}'

const connector = mock({
  accounts: [ // [!code focus]
    '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', // [!code focus]
    '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', // [!code focus]
    '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC', // [!code focus]
    '0x90F79bf6EB2c4f870365E785982E1f101E93b906', // [!code focus]
    '0x15d34aaf54267db7d7c367839aaf71a00a2c6a65', // [!code focus]
    '0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc', // [!code focus]
    '0x976EA74026E726554dB657fA54763abd0C3a0aa9', // [!code focus]
    '0x14dC79964da2C08b23698B3D3cc7Ca32193d9955', // [!code focus]
    '0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f', // [!code focus]
    '0xa0Ee7A142d267C1f36714E4a8F75612F20a79720', // [!code focus]
  ], // [!code focus]
})
```

### features

`{ connectError?: boolean | Error | undefined; reconnect?: boolean | undefined; signMessageError?: boolean | Error | undefined; signTypedDataError?: boolean | Error | undefined; switchChainError?: boolean | Error | undefined; } | undefined`

Feature flags that change behavior of Wagmi internals.

```ts-vue
import { mock } from '{{connectorsPackageName}}'
import { UserRejectedRequestError } from 'viem'

const connector = mock({
  accounts: [
    '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
    '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
  ],
  features: { // [!code focus]
    connectError: new UserRejectedRequestError(new Error('Failed to connect.')), // [!code focus]
    reconnect: false, // [!code focus]
  }, // [!code focus]
})
```

#### connectError

`boolean | Error | undefined`

Whether to throw an error when `connector.connect` is called.

#### reconnect

`boolean | undefined`

Enables reconnecting to connector.

#### signMessageError

`boolean | Error | undefined`

Whether to throw an error when `'personal_sign'` is called.

#### signTypedDataError

`boolean | Error | undefined`

Whether to throw an error when `'eth_signTypedData_v4'` is called.

#### switchChainError

`boolean | Error | undefined`

Whether to throw an error when `connector.switchChain` is called.