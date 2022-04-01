If you want to contribute, but aren't sure where to start, you can create a [new discussion](https://github.com/tmm/wagmi/discussions) or reach out [on Twitter](https://twitter.com/awkweb).

### Prerequisites

This project uses [pnpm](https://pnpm.io) as a package manager.

### Development

```bash
pnpm i
pnpm dev
```

### Testing

Add a `ALCHEMY_ID` to your environment variables so [Hardhat](https://hardhat.org) can fork mainnet.

Start local Ethereum network and tests in parallel:

```bash
pnpm test:ci
```

Or, run the follow command separately:

```bash
pnpm hardhat:dev
pnpm test:watch
```

### Docs

```bash
pnpm dev:docs
```

### Examples

```bash
pnpm dev:example:next
pnpm dev:example:remix
pnpm dev:example:vite-react
```

### CI

[Add secrets](https://github.com/tmm/wagmi/settings/secrets/actions) to GitHub:

```
NPM_TOKEN
```
