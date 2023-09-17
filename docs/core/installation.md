# Installation

Install Wagmi Core via your package manager or a `<script>` tag.

## Package Manager

Install the required packages.

::: code-group
```bash [pnpm]
pnpm add @wagmi/core@alpha viem@alpha
```

```bash [npm]
npm install @wagmi/core@alpha viem@alpha
```

```bash [yarn]
yarn add @wagmi/core@alpha viem@alpha
```

```bash [bun]
bun add @wagmi/core@alpha viem@alpha
```
:::

- [Viem](https://viem.sh) is a TypeScript interface for Ethereum that performs blockchain operations.
- [TypeScript](/react/typescript) is optional, but highly recommended. Learn more about [TypeScript support](/react/typescript).

## CDN

If you're not using a package manager, you can also use Wagmi Core via an ESM-compatible CDN such as [esm.sh](https://esm.sh). Simply add a `<script type="module">` tag to the bottom of your HTML file with the following content.

```html
<script type="module">
  import { createClient } from 'https://esm.sh/viem@alpha'
  import { createConfig } from 'https://esm.sh/@wagmi/core@alpha'
  import { injected } from 'https://esm.sh/@wagmi/connectors@alpha'
</script>
```

Check out the React docs for info on how to use [React without JSX](https://react.dev/reference/react/createElement#creating-an-element-without-jsx).

## Requirements

Wagmi Core is optimized for modern browsers. It is compatible with the following browsers.

- Chrome 64+
- Edge 79+
- Firefox 67+
- Opera 51+
- Safari 12+

::: tip
Depending on your environment, you might need to add polyfills. See [Viem Platform Compatibility](https://viem.sh/docs/compatibility.html) for more info.
:::

## Using Unreleased Commits

If you can't wait for a new release to test the latest features, you can either install from the `canary` tag (tracks the [`main`](https://github.com/wagmi-dev/wagmi/tree/main) branch).

::: code-group
```bash [pnpm]
pnpm add @wagmi/core@canary
```

```bash [npm]
npm install @wagmi/core@canary
```

```bash [yarn]
yarn add @wagmi/core@canary
```

```bash [bun]
bun add @wagmi/core@canary
```
:::

Or clone the [Wagmi repo](https://github.com/wagmi-dev/wagmi) to your local machine, build, and link it yourself.

```bash
git clone https://github.com/wagmi-dev/wagmi.git
cd wagmi
pnpm install
pnpm build
cd packages/core
pnpm link --global
```

Then go to the project where you are using Wagmi and run `pnpm link --global @wagmi/core` (or the package manager that you used to link Wagmi globally). Make sure you installed the [required peer dependencies](/core/getting-started#manual-installation) and their versions are correct.
