<!--
<script setup>
import Browsers from '../components/Browsers.vue'
const docsPath = 'react'
const packageDir = 'react'
const packageName = 'wagmi'
</script>
-->

## Requirements

Wagmi is optimized for modern browsers. It is compatible with the latest versions of the following browsers.

<Browsers />

::: tip
Depending on your environment, you might need to add polyfills. See [Viem Platform Compatibility](https://viem.sh/docs/compatibility) for more info.
:::

## Using Unreleased Commits

If you can't wait for a new release to test the latest features, you can either install from the `canary` tag (tracks the [`main`](https://github.com/wevm/wagmi/tree/main) branch).

::: code-group
```bash-vue [pnpm]
pnpm add {{packageName}}@canary
```

```bash-vue [npm]
npm install {{packageName}}@canary
```

```bash-vue [yarn]
yarn add {{packageName}}@canary
```

```bash-vue [bun]
bun add {{packageName}}@canary
```
:::

Or clone the [Wagmi repo](https://github.com/wevm/wagmi) to your local machine, build, and link it yourself.

```bash-vue
gh repo clone wevm/wagmi
cd wagmi
pnpm install
pnpm build
cd packages/{{packageDir}}
pnpm link --global
```

Then go to the project where you are using Wagmi and run `pnpm link --global {{packageName}}` (or the package manager that you used to link Wagmi globally). Make sure you installed any [required peer dependencies](#package-manager) and their versions are correct.

## Security

Ethereum-related projects are often targeted in attacks to steal users' assets. Make sure you follow security best-practices for your project. Some quick things to get started.

- Pin package versions, upgrade mindfully, and inspect lockfile changes to minimize the risk of [supply-chain attacks](https://nodejs.org/en/guides/security/#supply-chain-attacks).
- Install the [Socket Security](https://socket.dev) [GitHub App](https://github.com/apps/socket-security) to help detect and block supply-chain attacks.
- Add a [Content Security Policy](https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html) to defend against external scripts running in your app.
- Pin [GitHub Action](https://x.com/paulmillr/status/1900948425325031448) versions to commits instead of tags.
