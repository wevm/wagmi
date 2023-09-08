<script setup>
const docsPath = "react"
const packageName = 'wagmi'
</script>

# Errors

Error classes used by Wagmi.

<!--@include: @shared/errors.md-->

## React

### WagmiProviderNotFoundError

When a Wagmi hook is used outside of a [`WagmiProvider`](/react/WagmiProvider).

```ts
import { WagmiProviderNotFoundError } from 'wagmi'
```