---
"@wagmi/connectors": major
"@wagmi/core": major
---

All connector dependencies are now optional peer dependencies. This means that if you want to use a specific connector, you need to install its required dependencies.

#### baseAccount

[`baseAccount`](https://wagmi.sh/core/api/connectors/baseAccount) requires `@base-org/account`

```
pnpm add @base-org/account@~2.4.0
```

#### coinbaseWallet

[`coinbaseWallet`](https://wagmi.sh/core/api/connectors/coinbaseWallet) requires `@coinbase/wallet-sdk`

```
pnpm add @coinbase/wallet-sdk@~4.3.6
```

#### gemini

[`gemini`](https://wagmi.sh/core/api/connectors/gemini) requires `@gemini-wallet/core`

```
pnpm add @gemini-wallet/core@~0.3.1
```

#### metaMask

[`metaMask`](https://wagmi.sh/core/api/connectors/metaMask) requires `@metamask/sdk`

```
pnpm add @metamask/sdk@~0.33.1
```

#### porto

[`porto`](https://wagmi.sh/core/api/connectors/porto) requires `porto`

```
pnpm add porto@~0.2.35
```

#### safe

[`safe`](https://wagmi.sh/core/api/connectors/safe) requires `@safe-global/safe-apps-provider` and `@safe-global/safe-apps-sdk`

```
pnpm add @safe-global/safe-apps-provider@~0.18.6 @safe-global/safe-apps-sdk@~9.1.0
```

#### walletConnect

[`walletConnect`](https://wagmi.sh/core/api/connectors/walletConnect) requires `walletconnect/ethereum-provider`

```
pnpm add @walletconnect/ethereum-provider@~2.21.1
```

