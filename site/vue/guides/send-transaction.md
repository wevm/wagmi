# Send Transaction

The following guide teaches you how to send transactions in Wagmi. The example below builds on the [Connect Wallet guide](/vue/guides/connect-wallet) and uses the [useSendTransaction](/vue/api/composables/useSendTransaction) & [useWaitForTransaction](/vue/api/composables/useWaitForTransactionReceipt) composables. 

## Example

Feel free to check out the example before moving on:

<iframe frameborder="0" width="100%" height="500px" src="https://stackblitz.com/edit/vitejs-vite-wkaruk?embed=1&file=src%2FApp.tsx&hideExplorer=1&view=preview"></iframe>

## Steps

### 1. Connect Wallet 

Follow the [Connect Wallet guide](/vue/guides/connect-wallet) guide to get this set up.

### 2. Create a new component

Create your `SendTransaction` component that will contain the send transaction logic.

::: code-group

```tsx [SendTransaction.vue]
<script setup lang="ts">
</script>

<template>
  <form>
    <input name="address" placeholder="0xA0Cf…251e" required />
    <input name="value" placeholder="0.05" required />
    <button type="submit">Send</button>
  </form>
</template>
```

:::

### 3. Add a form handler

Next, we will need to add a handler to the form that will send the transaction when the user hits "Send". This will be a basic handler in this step.

::: code-group

```vue [SendTransaction.vue]
<script setup lang="ts">
  function submit(event: Event) { // [!code ++]
    const formData = new FormData(event.target as HTMLFormElement) // [!code ++]
    const to = formData.get('address') as `0x${string}` // [!code ++]
    const value = formData.get('value') as string // [!code ++]
    sendTransaction({ to, value: parseEther(value) }) // [!code ++]
  } // [!code ++]
</script>

<template>
  <form> // [!code --]
  <form @submit.prevent="submit"> // [!code ++]
    <input name="address" placeholder="0xA0Cf…251e" required />
    <input name="value" placeholder="0.05" required />
    <button type="submit">Send</button>
  </form>
</template>
```

:::

### 4. Hook up the `useSendTransaction` Composable

Now that we have the form handler, we can hook up the [`useSendTransaction` Composable](/vue/api/composables/useSendTransaction) to send the transaction.

::: code-group

```vue [SendTransaction.vue]
<script setup lang="ts">
  import { useSendTransaction } from 'wagmi' // [!code ++]
  import { parseEther } from 'viem' // [!code ++]

  const { data: hash, sendTransaction } = useSendTransaction() // [!code ++]

  function submit(event: Event) {
    const formData = new FormData(event.target as HTMLFormElement)
    const to = formData.get('address') as `0x${string}`
    const value = formData.get('value') as string
    sendTransaction({ to, value: parseEther(value) }) // [!code ++]
  }
</script>

<template>
  <form @submit.prevent="submit">
    <input name="address" placeholder="0xA0Cf…251e" required />
    <input name="value" placeholder="0.05" required />
    <button type="submit">Send</button>
    <div v-if="hash">Transaction Hash: {{ hash }}</div> // [!code ++]
  </form>
</template>
```

:::

### 5. Add loading state (optional)

We can optionally add a loading state to the "Send" button while we are waiting confirmation from the user's wallet.

::: code-group

```vue [SendTransaction.vue]
<script setup lang="ts">
  import { useSendTransaction } from 'wagmi'
  import { parseEther } from 'viem'

  const { 
    data: hash, 
    isPending, // [!code ++]
    sendTransaction 
  } = useSendTransaction()

  function submit(event: Event) {
    const formData = new FormData(event.target as HTMLFormElement)
    const to = formData.get('address') as `0x${string}`
    const value = formData.get('value') as string
    sendTransaction({ to, value: parseEther(value) })
  }
</script>

<template>
  <form @submit.prevent="submit">
    <input name="address" placeholder="0xA0Cf…251e" required />
    <input name="value" placeholder="0.05" required />
    <button :disabled="isPending" type="submit"> // [!code ++]
      <span v-if="isPending">Sending...</span> // [!code ++]
      <span v-else>Send</span> // [!code ++]
    </button>
    <div v-if="hash">Transaction Hash: {{ hash }}</div>
  </form>
</template>
```

:::

### 6. Wait for transaction receipt (optional)

We can also display the transaction confirmation status to the user by using the [`useWaitForTransactionReceipt` Composable](/vue/api/composables/useWaitForTransactionReceipt). 

::: code-group

```vue [SendTransaction.vue]
<script setup lang="ts">
  import { 
    useSendTransaction,
    useWaitForTransactionReceipt, // [!code ++]
  } from 'wagmi'
  import { parseEther } from 'viem'

  const { 
    data: hash, 
    isPending,
    sendTransaction 
  } = useSendTransaction()

  function submit(event: Event) {
    const formData = new FormData(event.target as HTMLFormElement)
    const to = formData.get('address') as `0x${string}`
    const value = formData.get('value') as string
    sendTransaction({ to, value: parseEther(value) })
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } = // [!code ++]
    useWaitForTransactionReceipt({ // [!code ++]
      hash, // [!code ++]
    }) // [!code ++]
</script>

<template>
  <form @submit.prevent="submit">
    <input name="address" placeholder="0xA0Cf…251e" required />
    <input name="value" placeholder="0.05" required />
    <button :disabled="isPending" type="submit">
      <span v-if="isPending">Sending...</span>
      <span v-else>Send</span>
    </button>
    <div v-if="hash">Transaction Hash: {{ hash }}</div>
    <div v-if="isConfirming">Waiting for confirmation...</div> // [!code ++]
    <div v-if="isConfirmed">Transaction Confirmed!</div> // [!code ++]
  </form>
</template>
```

:::

### 7. Handle errors (optional)

If the user rejects the transaction, or the user does not have enough funds to cover the transaction, we can display an error message to the user.

::: code-group

```vue [SendTransaction.vue]
<script setup lang="ts">
  import { 
    useSendTransaction,
    useWaitForTransactionReceipt,
  } from 'wagmi'
  import { parseEther } from 'viem'

  const { 
    data: hash, 
    error, // [!code ++]
    isPending,
    sendTransaction 
  } = useSendTransaction()

  function submit(event: Event) {
    const formData = new FormData(event.target as HTMLFormElement)
    const to = formData.get('address') as `0x${string}`
    const value = formData.get('value') as string
    sendTransaction({ to, value: parseEther(value) })
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ 
      hash, 
    }) 
</script>

<template>
  <form @submit.prevent="submit">
    <input name="address" placeholder="0xA0Cf…251e" required />
    <input name="value" placeholder="0.05" required />
    <button :disabled="isPending" type="submit">
      <span v-if="isPending">Sending...</span>
      <span v-else>Send</span>
    </button>
    <div v-if="hash">Transaction Hash: {{ hash }}</div>
    <div v-if="isConfirming">Waiting for confirmation...</div> 
    <div v-if="isConfirmed">Transaction Confirmed!</div> 
    <div v-if="error"> // [!code ++]
      Error: {{ (error as BaseError).shortMessage || error.message }} // [!code ++]
    </div> // [!code ++]
  </form>
</template>
```

:::

### 8. Wire it up!

Finally, we can wire up our Send Transaction component to our application's entrypoint.

:::code-group
```vue [App.vue]
<script setup lang="ts">
import { useConnection } from '@wagmi/vue'
import Connection from './Connection.vue'
import Connect from './Connect.vue'
import SendTransaction from './SendTransaction.vue' // [!code ++]

const { isConnected } = useConnection()
</script>

<template>
  <Connection v-if="isConnected" />
  <Connect v-else />
  <SendTransaction v-if="isConnected" /> // [!code ++]
</template>
```
```vue [SendTransaction.vue]
<script setup lang="ts">
  import { 
    useSendTransaction,
    useWaitForTransactionReceipt,
  } from 'wagmi'
  import { parseEther } from 'viem'

  const { 
    data: hash, 
    error,
    isPending,
    sendTransaction 
  } = useSendTransaction()

  function submit(event: Event) {
    const formData = new FormData(event.target as HTMLFormElement)
    const to = formData.get('address') as `0x${string}`
    const value = formData.get('value') as string
    sendTransaction({ to, value: parseEther(value) })
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ 
      hash, 
    }) 
</script>

<template>
  <form @submit.prevent="submit">
    <input name="address" placeholder="0xA0Cf…251e" required />
    <input name="value" placeholder="0.05" required />
    <button :disabled="isPending" type="submit">
      <span v-if="isPending">Sending...</span>
      <span v-else>Send</span>
    </button>
    <div v-if="hash">Transaction Hash: {{ hash }}</div>
    <div v-if="isConfirming">Waiting for confirmation...</div> 
    <div v-if="isConfirmed">Transaction Confirmed!</div> 
    <div v-if="error">
      Error: {{ (error as BaseError).shortMessage || error.message }}
    </div>
  </form>
</template>
```
:::

[See the Example.](#example)
