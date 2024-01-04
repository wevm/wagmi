---
title: Migrate from v1 to v2
titleTemplate: Wagmi CLI
description: Guide for migrating from Wagmi CLI v1 to v2.
---

# Migrate from v1 to v2

To get started, install the latest version of the Wagmi CLI.

::: code-group
```bash-vue [pnpm]
pnpm add @wagmi/cli
```

```bash-vue [npm]
npm install @wagmi/cli
```

```bash-vue [yarn]
yarn add @wagmi/cli
```

```bash-vue [bun]
bun add @wagmi/cli
```
:::

::: info Not ready to migrate yet?
The Wagmi CLI v1 docs are still available at [1.x.wagmi.sh/cli](https://1.x.wagmi.sh/cli).
:::

## Changed generated action and hook names

Generated action and hook names now align with [Wagmi v2 naming conventions](/react/guides/migrate-from-v1-to-v2#renamed-hooks). If you want hooks to still follow Wagmi v1 naming conventions, set [`getActionName`](/cli/api/plugins/actions#getactionname) and [`getHookName`](/cli/api/plugins/react#gethookname) to `'legacy'`.

```ts
import { defineConfig } from '@wagmi/cli'
import { actions, react } from '@wagmi/cli/plugins'

export default defineConfig({
  plugins: [
    actions({
      getActionName: 'legacy', // [!code focus]
    }),
    react({
      getHookName: 'legacy', // [!code focus]
    }),
  ],
})
```
