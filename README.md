<p>
  <a aria-label="NPM version" href="https://www.npmjs.com/package/wagmi">
    <img
      alt=""
      src="https://img.shields.io/npm/v/wagmi.svg?style=for-the-badge&labelColor=161c22"
    />
  </a>
  <a aria-label="License" href="/LICENSE">
    <img
      alt=""
      src="https://img.shields.io/npm/l/wagmi.svg?style=for-the-badge&labelColor=161c22"
    />
  </a>
  <a aria-label="Sponsors" href="https://github.com/sponsors/tmm">
    <img
      alt=""
      src="https://img.shields.io/github/sponsors/tmm.svg?style=for-the-badge&labelColor=161c22"
    />
  </a>
</p>

# wagmi

**React Hooks library for Ethereum, built on [ethers.js](https://github.com/ethers-io/ethers.js).**

🚀 &nbsp; 20+ hooks for working with wallets, ENS, contracts, transactions, signing, etc.

💼 &nbsp; Built-in wallet connectors for MetaMask, WalletConnect, and Coinbase Wallet

🌀 &nbsp; Auto-refresh data on wallet and network changes

🦄 &nbsp; TypeScript ready

💨 &nbsp; Zero-dependencies (besides ethers.js peer dependency)

🌳 &nbsp; Test suite and documentation

📖 &nbsp; MIT License

## Documentation

Visit https://wagmi-xyz.vercel.app to view the full documentation.

## Usage

1. Install the dependencies.

```bash
pnpm add wagmi ethers
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

Feel free to join the [discussions on GitHub](https://github.com/tmm/wagmi/discussions) or reach out [on Twitter](https://twitter.com/awkweb)!

## Support

- awkweb.eth
- [GitHub Sponsors](https://github.com/sponsors/tmm)
- Sign the [guestbook](https://github.com/tmm/wagmi/discussions/2)

## Thanks

- [ricmoo.eth](https://twitter.com/ricmoo) for creating and continued work on [ethers.js](https://github.com/ethers-io/ethers.js)
- [Mirror](https://mirror.xyz) for creating space to do good work

## License

MIT.

<br />

wagmi
