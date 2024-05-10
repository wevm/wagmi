<script setup>
import packageJson from '../../packages/vue/package.json'

const viemVersion = packageJson.peerDependencies.viem
</script>

# Installation

Install Wagmi via your package manager, a `<script>` tag, or build from source.

## Package Manager

Install the required packages.

::: code-group
```bash-vue [pnpm]
pnpm add @wagmi/vue viem@{{viemVersion}} @tanstack/vue-query
```

```bash-vue [npm]
npm install @wagmi/vue viem@{{viemVersion}} @tanstack/vue-query
```

```bash-vue [yarn]
yarn add @wagmi/vue viem@{{viemVersion}} @tanstack/vue-query
```

```bash-vue [bun]
bun add @wagmi/vue viem@{{viemVersion}} @tanstack/vue-query
```
:::

- [Viem](https://viem.sh) is a TypeScript interface for Ethereum that performs blockchain operations.
- [TanStack Query](https://tanstack.com/query/v5) is an async state manager that handles requests, caching, and more.
- [TypeScript](/vue/typescript) is optional, but highly recommended. Learn more about [TypeScript support](/vue/typescript).

## Requirements

Wagmi is optimized for modern browsers. It is compatible with the following browsers.

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
pnpm add wagmi@canary
```

```bash [npm]
npm install wagmi@canary
```

```bash [yarn]
yarn add wagmi@canary
```

```bash [bun]
bun add wagmi@canary
```
:::

Or clone the [Wagmi repo](https://github.com/wevm/wagmi) to your local machine, build, and link it yourself.

```bash
gh repo clone wevm/wagmi
cd wagmi
pnpm install
pnpm build
cd packages/vue
pnpm link --global
```

Then go to the project where you are using Wagmi and run `pnpm link --global wagmi` (or the package manager that you used to link Wagmi globally). Make sure you installed the [required peer dependencies](/vue/getting-started#manual-installation) and their versions are correct.

## Security

Ethereum-related projects are often targeted in attacks to steal users' assets. Make sure you follow security best-practices for your project. Some quick things to get started.

- Pin package versions, upgrade mindfully, and inspect lockfile changes to minimize the risk of [supply-chain attacks](https://nodejs.org/en/guides/security/#supply-chain-attacks).
- Install the [Socket Security](https://socket.dev) [GitHub App](https://github.com/apps/socket-security) to help detect and block supply-chain attacks.
- Add a [Content Security Policy](https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html) to defend against external scripts running in your app.
