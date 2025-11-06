---
title: Migrate from v2 to v3
description: Guide for migrating from Wagmi v2 to v3.
---

<script setup>
import packageJson from '../../../packages/react/package.json'

const viemVersion = packageJson.peerDependencies.viem
</script>

# Migrate from v2 to v3

## Overview

To get started, install the latest version of Wagmi.

::: code-group
```bash [pnpm]
pnpm add wagmi@3
```

```bash [npm]
npm install wagmi@3
```

```bash [yarn]
yarn add wagmi@3
```

```bash [bun]
bun add wagmi@3
```
:::

::: info Not ready to migrate yet?
The Wagmi v2 docs are still available at [2.x.wagmi.sh/react](https://2.x.wagmi.sh/react).
:::

