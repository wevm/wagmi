# wagmi

React Hooks library for Ethereum, built on [ethers.js](https://github.com/ethers-io/ethers.js).

<p>
  <a aria-label="Version" href="https://www.npmjs.com/package/wagmi">
    <img
      alt=""
      src="https://img.shields.io/npm/v/wagmi?color=%23161b22&label=%20npm"
    />
  </a>
  <a aria-label="License" href="/LICENSE">
    <img
      alt=""
      src="https://img.shields.io/npm/l/wagmi?color=%23161b22"
    />
  </a>
  <a aria-label="Sponsors" href="https://github.com/sponsors/tmm">
    <img
      alt=""
      src="https://img.shields.io/github/sponsors/tmm?color=%23161b22"
    />
  </a>
  <a aria-label="Downloads" href="https://www.npmjs.com/package/wagmi">
    <img
      alt=""
      src="https://img.shields.io/npm/dm/wagmi?color=%23161b22"
    />
  </a>
</p>

## Features

- 🚀 20+ hooks for working with wallets, ENS, contracts, transactions, signing, etc.
- 💼 Built-in wallet connectors for MetaMask, WalletConnect, and Coinbase Wallet
- 🌀 Auto-refresh data on wallet and network changes
- 🦄 TypeScript ready
- 💨 Zero-dependencies (besides ethers.js peer dependency)
- 🌳 Test suite and documentation
- 📖 MIT License

## Documentation

Visit https://wagmi-xyz.vercel.app to view the full documentation.

## Usage

1. Install the dependencies.

```bash
npm add wagmi ethers
```

2. Wrap your app with the `Provider` component.

```tsx
import { Provider } from 'wagmi'

const App = () => (
  <Provider>
    <YourRoutes />
  </Provider>
)
```

3. Use hooks.

```tsx
import { useAccount } from 'wagmi'

const Page = () => {
  const [{ data, error, loading }, disconnect] = useAccount({
    fetchEns: true,
  })

  return ...
}
```

Every component inside the `Provider` is set up with the default `InjectedConnector` for connecting wallets and ethers.js [Default Provider](https://docs.ethers.io/v5/api/providers/#providers-getDefaultProvider) for fetching data.

Want to learn more? Check out the [guides](https://wagmi-xyz.vercel.app/guides/connect-wallet) or browse the [API docs](https://wagmi-xyz.vercel.app/docs/provider).

## Community

- Join the [discussions on GitHub](https://github.com/tmm/wagmi/discussions)
- Follow [@awkweb](https://twitter.com/awkweb) on Twitter for project updates
- Sign the [guestbook](https://github.com/tmm/wagmi/discussions/2)
- Share [your project/organization](https://github.com/tmm/wagmi/discussions/201) that uses wagmi

## Support

- awkweb.eth
- [GitHub Sponsors](https://github.com/sponsors/tmm)
- [Gitcoin Grant](https://gitcoin.co/grants/4493/wagmi-react-hooks-library-for-ethereum)

## Thanks

- [ricmoo.eth](https://twitter.com/ricmoo) for creating and continued work on [ethers.js](https://github.com/ethers-io/ethers.js)
- [Mirror](https://mirror.xyz) for creating space to do good work

## License

MIT.

<br />

wagmi
