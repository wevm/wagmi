---
title: Migrate from v1 to v2
titleTemplate: Wagmi CLI
description: Guide for migrating from Wagmi CLI v1 to v2.
---

# Migrate from v1 to v2

To get started, install the latest version of the Wagmi CLI using the `beta` dist-tag.

::: code-group
```bash-vue [pnpm]
pnpm add @wagmi/cli@beta
```

```bash-vue [npm]
npm install @wagmi/cli@beta
```

```bash-vue [yarn]
yarn add @wagmi/cli@beta
```

```bash-vue [bun]
bun add @wagmi/cli@beta
```
:::

::: info Wagmi CLI v2 is currently in beta.
We recommend trying it out in your projects, but there may be breaking changes before the final release. If you find bugs or have feedback, please [open an issue](https://github.com/wevm/wagmi/issues/new/choose) or [reply to the discussion thread](https://github.com/wevm/wagmi/discussions/3068).
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
