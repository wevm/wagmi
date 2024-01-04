# Configuring CLI

When running `wagmi` from the command line, `@wagmi/cli` will automatically try to resolve a config file named `wagmi.config.js` or `wagmi.config.ts` inside the project root. The most basic config file looks like this:

::: code-group
```js [wagmi.config.js]
export default {
  // config options
}
```
:::

Note `@wagmi/cli` supports using ES modules syntax in the config file even if the project is not using native Node ESM, e.g. `"type": "module"` in package.json. In this case, the config file is auto pre-processed before load.

You can also explicitly specify a config file to use with the `--config`/`-c` CLI option (resolved relative to the current directory):

```bash
wagmi --config my-config.js
```

To scaffold a config file quickly, check out the [`init`](/cli/api/commands/init) command.

## Config Intellisense

Since Wagmi CLI ships with TypeScript typings, you can use your editor's intellisense with [JSDoc](https://jsdoc.app) type hints:

::: code-group
```js [wagmi.config.js]
/** @type {import('@wagmi/cli').Config} */
export default {
  // ...
}
```
:::

Alternatively, you can use the `defineConfig` utility which should provide intellisense without the need for JSDoc annotations:

::: code-group
```js [wagmi.config.js]
import { defineConfig } from '@wagmi/cli'

export default defineConfig({
  // ...
})
```
:::

Wagmi CLI also directly supports TypeScript config files. You can use `wagmi.config.ts` with the `defineConfig` helper as well.

## Conditional Config

If the config needs to conditionally determine options based on the environment, it can export a function instead:

::: code-group
```js [wagmi.config.js]
export default defineConfig(() => {
  if (process.env.NODE_ENV === 'dev') {
    return {
      // dev specific config
    }
  } else {
    return {
      // production specific config
    }
  }
})
```
:::

## Async Config

If the config needs to call async function, it can export a async function instead:

::: code-group
```js [wagmi.config.js]
export default defineConfig(async () => {
  const data = await asyncFunction()
  return {
    // ...
  }
})
```
:::

This can be useful for resolving external resources from the network or filesystem that are required for configuration ahead of running a command.

## Array Config

The config can also be represented either as a pre-defined array or returned as an array from a function:

::: code-group
```js [wagmi.config.js]
export default defineConfig([
  {
  // config 1
  },
  {
  // config 2
  },
])
```
:::

## Environment Variables

Environmental Variables can be obtained from `process.env` as usual.

Note that Wagmi CLI doesn't load `.env` files by default as the files to load can only be determined after evaluating the config. However, you can use the exported `loadEnv` utility to load the specific `.env` files if needed.

::: code-group
```js [wagmi.config.js]
import { defineConfig, loadEnv } from '@wagmi/cli'

export default defineConfig(() => {
  const env = loadEnv({
    mode: process.env.NODE_ENV,
    envDir: process.cwd(),
  })
  return {
    // ...
  }
})
```
:::