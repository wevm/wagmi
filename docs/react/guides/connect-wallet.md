# Connect Wallet

The ability for a user to connect their wallet to perform tasks such as: writing to contracts, signing messages, or sending transactions, is a core function for every Dapp.

Wagmi contains everything you need to get started with building a Connect Wallet module.

To get started, you can either use a [third-party library](#third-party-libraries) or [build your own](#build-your-own).

## Third-party Libraries

You can use a pre-built Connect Wallet module from a third-party library such as:

- [ConnectKit](https://docs.family.co/connectkit) - [Guide](https://docs.family.co/connectkit/getting-started)
- [Web3Modal](https://web3modal.com/) - [Guide](https://docs.walletconnect.com/web3modal/react/about)
- [RainbowKit](https://www.rainbowkit.com/) - [Guide](https://www.rainbowkit.com/docs/installation)
- [Dynamic](https://www.dynamic.xyz/) - [Guide](https://docs.dynamic.xyz/quickstart)

The above libraries are all built on top of Wagmi, handle all the edge cases around wallet connection, and provide a seamless Connect Wallet UX that you can use in your Dapp.

## Build Your Own 🚧

Wagmi provides you with the Hooks to get started building your own Connect Wallet module. 

It takes less than five minutes to get up and running with Browser Wallets, WalletConnect, Ledger, and Coinbase Wallet.

<div ref="el" />

<script setup>
import { createElement } from 'react'
import { createRoot } from 'react-dom/client'
import { ref, onMounted } from 'vue'
import ConnectWallet from '../../components/examples/ConnectWallet'

const el = ref()
onMounted(() => {
  const root = createRoot(el.value)
  root.render(createElement(ConnectWallet, {}, null))
})
</script>

TODO: Steps 🚧