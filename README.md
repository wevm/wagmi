# wagmi

React Hooks for Ethereum, built on [ethers.js](https://github.com/ethers-io/ethers.js).

[![Version](https://img.shields.io/npm/v/wagmi?colorA=292929&colorB=3c82f6)](https://www.npmjs.com/package/wagmi) [![Downloads](https://img.shields.io/npm/dm/wagmi?colorA=292929&colorB=3c82f6)](https://www.npmjs.com/package/wagmi) [![License](https://img.shields.io/npm/l/wagmi?colorA=292929&colorB=3c82f6)](/LICENSE) [![Sponsors](https://img.shields.io/github/sponsors/tmm?colorA=292929&colorB=3c82f6)](https://github.com/sponsors/tmm)

## Features

- 🚀 20+ hooks for working with wallets, ENS, contracts, transactions, signing, etc.
- 💼 Built-in wallet connectors for MetaMask, WalletConnect, and Coinbase Wallet
- 👟 Caching, request deduplication, and persistence
- 🌀 Auto-refresh data on wallet, block, and network changes
- 🦄 TypeScript ready
- 🌳 Test suite running against forked Ethereum network

...and a lot more.

## Documentation

For full documentation and examples, visit [wagmi.sh](https://wagmi.sh).

## Installation

Install wagmi and its ethers peer dependency.

```bash
npm install wagmi ethers
```

## Quick Start

Connect a wallet in under 60 seconds. LFG.

```tsx
import { Provider, createClient, useAccount, useConnect } from 'wagmi'

const client = createClient()

function App() {
  return (
    <Provider client={client}>
      <Profile />
    </Provider>
  )
}

function Profile() {
  const { data, disconnect } = useAccount()
  const { connectors, connect } = useConnect()

  if (data?.address)
    return (
      <div>
        Connected to {data.address}
        <button onClick={disconnect}>Disconnect</button>
      </div>
    )
  return <button onClick={() => connect(connectors[0])}>Connect Wallet</button>
}
```

In this example, we create a wagmi `Client` (using the default configuration) and pass it to the React Context `Provider`. Then, we use the `useConnect` hook to connect a wallet to the app. Finally, we show the connected account's address using `useAccount`.

The default client is initialized with MetaMask, but connectors for WalletConnect and Coinbase Wallet are also just an import away. `useAccount` can also automatically fetch (and cache) the connected account's ENS name and avatar.

We've only scratched the surface for what you can do with wagmi!

## Community

Check out the following places for more wagmi-related content:

- Join the [discussions on GitHub](https://github.com/tmm/wagmi/discussions)
- Follow [@awkweb](https://twitter.com/awkweb) on Twitter for project updates
- Sign the [guestbook](https://github.com/tmm/wagmi/discussions/2)
- Share [your project/organization](https://github.com/tmm/wagmi/discussions/201) that uses wagmi

## Support

Help support future development and make wagmi a sustainable open-source project:

- [awkweb.eth](https://etherscan.io/enslookup-search?search=awkweb.eth)
- [GitHub Sponsors](https://github.com/sponsors/tmm)
- [Gitcoin Grant](https://gitcoin.co/grants/4493/wagmi-react-hooks-library-for-ethereum)

## Contributing

If you're interested in contributing to wagmi, please read the [contributing docs](/.github/CONTRIBUTING.md) **before submitting a pull request**.

## License

The MIT License.

<br />
<br />

wagmi frens
