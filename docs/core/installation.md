# Installation

Install Wagmi Core via your package manager or a `<script>` tag.

## Package Manager

Install the required packages.

::: code-group
```bash [pnpm]
pnpm add @wagmi/core viem
```

```bash [npm]
npm install @wagmi/core viem
```

```bash [yarn]
yarn add @wagmi/core viem
```
:::

- [Viem](https://viem.sh) is a TypeScript interface for Ethereum that performs blockchain operations.
- [TypeScript](/react/typescript) is optional, but highly recommended. Learn more about [TypeScript support](/react/typescript).

## CDN

If you're not using a package manager, you can also use Wagmi Core via an ESM-compatible CDN such as [esm.sh](https://esm.sh). Simply add a `<script type="module">` tag to the bottom of your HTML file with the following content.

```html
<script type="module">
  import { createClient } from 'https://esm.sh/viem'
  import { createConfig } from 'https://esm.sh/@wagmi/core'
  import { injected } from 'https://esm.sh/@wagmi/connectors'
</script>
```

Check out the React docs for info on how to use [React without JSX](https://react.dev/reference/react/createElement#creating-an-element-without-jsx).

## Requirements

Wagmi Core is optimized for modern browsers. It is compatible with the following browsers.

```
Chrome >= 91
Edge >= 91
Firefox >= 90
Safari >= 15
iOS >= 15
opera >= 77
```

::: tip
Depending on your environment, you might need to add polyfills. See [Viem Platform Compatibility](https://viem.sh/docs/compatibility.html) for more info.
:::