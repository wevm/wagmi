import { toCoreAction } from './toCoreAction.js'

// Generates source code

console.log('Generating code.')

const viemActions = [
  { name: 'getEnsName', type: 'public' },
  { name: 'getFeeHistory', type: 'public' },
  { name: 'getStorageAt', type: 'public' },
] as const satisfies { name: string; type: 'public' | 'wallet' }[]

for (const viemAction of viemActions) {
  console.log(viemAction.name)
  // 1. action
  const code = toCoreAction({ name: viemAction.name, type: viemAction.type })
  await Bun.write(`./packages/core/src/actions/${viemAction.name}.ts`, code)
  // 2. query
  // 3. composables/hooks

  // TODO: Format
  // https://www.npmjs.com/package/@biomejs/js-api
}

console.log('Done.')
