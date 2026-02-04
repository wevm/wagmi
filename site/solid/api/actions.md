# Actions

`@wagmi/solid` exports all of the actions from `@wagmi/core`. These actions can be used for lower-level control or when you need to interact with Wagmi outside of Solid components.

## Import

```ts
import { getBalance, sendTransaction } from '@wagmi/solid/actions'
```

## Usage

```ts
import { getBalance } from '@wagmi/solid/actions'
import { config } from './config'

const balance = await getBalance(config, {
  address: '0x...',
})
```

## Available Actions

See the [`@wagmi/core` Actions docs](/core/api/actions) for the full list of available actions and their documentation.

## When to Use Actions vs Primitives

**Use Primitives when:**
- You need reactive data in your Solid components
- You want automatic caching and refetching
- You're building UI that displays blockchain data

**Use Actions when:**
- You need imperative control over when data is fetched
- You're working outside of Solid components
- You need to chain multiple operations together
- You're building utilities or helper functions

## Example: Using Actions with Primitives

```tsx
import { useConnection } from '@wagmi/solid'
import { signMessage } from '@wagmi/solid/actions'
import { config } from './config'

function SignMessage() {
  const connection = useConnection()

  const handleSign = async () => {
    if (!connection.address) return
    
    const signature = await signMessage(config, {
      message: 'Hello, World!',
    })
    console.log('Signature:', signature)
  }

  return (
    <button onClick={handleSign}>
      Sign Message
    </button>
  )
}
```
