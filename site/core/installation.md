<script setup>
import packageJson from '../../packages/core/package.json'

const viemVersion = packageJson.peerDependencies.viem
</script>

# Installation

Install Wagmi Core via your package manager, a `<script>` tag, or build from source.

## Package Manager

Install the required packages.

::: code-group
```bash-vue [pnpm]
pnpm add @wagmi/core viem@{{viemVersion}}
```

```bash-vue [npm]
npm install @wagmi/core viem@{{viemVersion}}
```

```bash-vue [yarn]
yarn add @wagmi/core viem@{{viemVersion}}
```

```bash-vue [bun]
bun add @wagmi/core viem@{{viemVersion}}
```
:::

- [Viem](https://viem.sh) is a TypeScript interface for Ethereum that performs blockchain operations.
- [TypeScript](/react/typescript) is optional, but highly recommended. Learn more about [TypeScript support](/react/typescript).

## CDN

If you're not using a package manager, you can also use Wagmi Core via an ESM-compatible CDN such as [esm.sh](https://esm.sh). Simply add a `<script type="module">` tag to the bottom of your HTML file with the following content.

```html-vue
<script type="module">
  import { createClient } from 'https://esm.sh/viem'
  import { createConfig } from 'https://esm.sh/@wagmi/core@{{viemVersion}}'
  import { injected } from 'https://esm.sh/@wagmi/connectors'
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

If you can't wait for a new release to test the latest features, you can either install from the `canary` tag (tracks the [`main`](https://github.com/wevm/wagmi/tree/main) branch).

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

Or clone the [Wagmi repo](https://github.com/wevm/wagmi) to your local machine, build, and link it yourself.

```bash
gh repo clone wevm/wagmi
cd wagmi
pnpm install
pnpm build
cd packages/core
pnpm link --global
```

Then go to the project where you are using Wagmi and run `pnpm link --global @wagmi/core` (or the package manager that you used to link Wagmi globally). Make sure you installed the [required peer dependencies](/core/getting-started#manual-installation) and their versions are correct.

## Security

Ethereum-related projects are often targeted in attacks to steal users' assets. Make sure you follow security best-practices for your project. Some quick things to get started.

- Pin package versions, upgrade mindfully, and inspect lockfile changes to minimize the risk of [supply-chain attacks](https://nodejs.org/en/guides/security/#supply-chain-attacks).
- Install the [Socket Security](https://socket.dev) [GitHub App](https://github.com/apps/socket-security) to help detect and block supply-chain attacks.
- Add a [Content Security Policy](https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html) to defend against external scripts running in your app.
