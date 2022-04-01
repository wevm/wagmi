# wagmi

React Hooks for Ethereum

[![Version](https://img.shields.io/npm/v/wagmi?label=&colorB=3fba11)](https://www.npmjs.com/package/wagmi) [![License](https://img.shields.io/npm/l/wagmi?label=&colorB=3fba11)](/LICENSE) [![Downloads](https://img.shields.io/npm/dm/wagmi?colorA=161b22&colorB=3fba11&label=Downloads)](https://www.npmjs.com/package/wagmi) [![Sponsors](https://img.shields.io/github/sponsors/tmm?colorA=161b22&colorB=3fba11&label=Sponsors)](https://github.com/sponsors/tmm)

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
import { Provider, createClient } from 'wagmi'

const client = createClient()

function App() {
  return (
    <Provider client={client}>
      <Profile />
    </Provider>
  )
}

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

function Profile() {
  const { data } = useAccount()
  const { connectors, connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()

  if (data?.address)
    return (
      <div>
        Connected to {data.address}
        <button onClick={disconnect}>Disconnect</button>
      </div>
    )
  return <button onClick={connect}>Connect Wallet</button>
}
```

In this example, we create a wagmi `Client` (using the default configuration) and pass it to the React Context `Provider`. Next, we use the `useConnect` hook to connect an injected wallet (i.e. MetaMask) to the app. Finally, we show the connected account's address with `useAccount` and allow them to disconnect with `useDisconnect`.

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
