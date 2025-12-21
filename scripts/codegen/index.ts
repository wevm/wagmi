import { exec } from 'node:child_process'
import fs from 'node:fs/promises'
import { promisify } from 'node:util'
import { type Item, items } from './config.ts'

// TODO:
// - default coupling
// - mutationOptions
// - react hooks/vue composables

console.log('Generating query options.')

const generated = new Map<string, string>()
for (const item of items) {
  const code = genQueryOptions(item)
  console.log(`- ${item.name}QueryOptions`)
  generated.set(`packages/core/src/query/${item.name}.ts`, code)
}
// write files
await Promise.all(
  Array.from(generated.entries()).map(([filename, code]) =>
    fs.writeFile(filename, code),
  ),
)

// format output
const execAsync = promisify(exec)
const { stderr } = await execAsync('pnpm biome check --write')
if (stderr) console.error(stderr)

console.log(
  `Generated ${generated.size} query option${generated.size === 1 ? '' : 's'}.`,
)

///

function genQueryOptions(item: Item) {
  const typePrefix = item.name.charAt(0).toUpperCase() + item.name.slice(1)

  const viemImports = item.query.imports.filter((x) => typeof x === 'string')
  const customImports = item.query.imports
    .filter((x) => typeof x === 'object')
    .map((x) => `import { ${x.names.join(', ')} } from '${x.path}'`)
  const imports = [
    ...(viemImports.length
      ? [`import type { ${viemImports.join(', ')} } from 'viem'`]
      : []),
    ...(customImports.length ? customImports : []),
  ].join('\n')

  const optionsTypeParameters = item.query.options
    .map((x) => getTypeParameter(x))
    .join('')
  const functionTypeParameters = item.query.options
    .map((x) => getTypeParameter(x, { const: true, default: true }))
    .join('')
  const dataTypeParameters = item.query.data
    .map((x) => getTypeParameter(x))
    .join('')

  const optionsSlots = item.query.options.map(unwrapName).join(', ')
  const dataSlots = item.query.data.map(unwrapName).join(', ')

  const enabled = item.required
    .flatMap((x) => {
      const get = (y: Extract<typeof x, string | { name: string }>) => {
        const o = 'options'
        if (typeof y === 'string') return `${o}.${y}`
        return y.cond(o, y.name)
      }
      if (Array.isArray(x)) return `Boolean(${x.map(get).join(' || ')})`
      return get(x)
    })
    .join(' && ')
  const queryKeySkippedParameters = ['abi', 'connector']
  const getParameterPrefix = (
    y: Extract<(typeof item)['required'][number], string | { name: string }>,
  ) =>
    queryKeySkippedParameters.includes(unwrapName(y)) ? 'options' : 'parameters'
  const filteredProperties = [
    ...new Set(
      item.required
        .flatMap((x) => (Array.isArray(x) ? x : [x]).map(unwrapName))
        .filter((x) => queryKeySkippedParameters.includes(x)),
    ).values(),
  ]
  const hasConnectorUid = filteredProperties.includes('connector')

  const requiredChecks = item.required
    .map((x) => {
      const get = (y: Extract<typeof x, string | { name: string }>) => {
        const o = getParameterPrefix(y)
        if (typeof y === 'string') return `${o}.${y}`
        return y.cond(o, y.name)
      }
      if (Array.isArray(x))
        return `if (${x.map((y) => `!${get(y)}`).join(' && ')}) throw new Error('${x.length > 2 ? x.map((y, i) => `${i === x.length - 1 ? 'or ' : ''}${unwrapName(y)}`).join(', ') : x.map(unwrapName).join(' or ')} is required')`
      return `if (!${get(x)}) throw new Error('${unwrapName(x)} is required')`
    })
    .join('\n')
  const requiredParameters = [
    ...item.required.flatMap((x) => {
      const get = (y: Extract<typeof x, string | { name: string }>) => {
        const o = getParameterPrefix(y)
        if (typeof y === 'string') return `${o}.${y}`
        return `${y.cond(o, y.name)} ? ${o}.${y.name} : undefined`
      }
      if (Array.isArray(x)) return x.map((y) => `${unwrapName(y)}: ${get(y)}`)
      return `${unwrapName(x)}: ${get(x)}`
    }),
    ...(item.query.skipped?.map((x) => `${unwrapName(x)}: options.${x}`) ?? []),
  ].join(', ')

  const t = 't'
  const optionsType =
    item.query.optionsType ??
    ((t: string, typePrefix: string, slots: string) =>
      `${t}.Compute<${t}.ExactPartial<${typePrefix}Parameters<${slots}>> & ScopeKeyParameter>`)

  return `
import { type QueryObserverOptions } from '@tanstack/query-core'
import {
  type ${typePrefix}ErrorType,
  type ${typePrefix}Parameters,
  type ${typePrefix}ReturnType,
  ${item.name},
} from '../actions/${item.name}.js'${imports ? `\n${imports}` : ''}
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type * as ${t} from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type ${typePrefix}Options<${optionsTypeParameters}> = ${optionsType(t, typePrefix, optionsSlots)}

export function ${item.name}QueryOptions<${functionTypeParameters}>(
  config: config,
  options: ${typePrefix}Options<${optionsSlots}> = {}${item.query.cast?.options ? ' as never' : ''},
) {
  return {${enabled ? `\nenabled: Boolean(${enabled}),` : ''}
    queryFn: async (context) => {
      const { scopeKey: _, ...parameters } = context.queryKey[1]${requiredChecks ? `\n${requiredChecks}` : ''}
      const result = await ${item.name}(config, ${requiredParameters ? `{ ...(parameters${item.query.cast?.parameters ? ' as any' : ''}), ${requiredParameters}}` : `parameters${item.query.cast?.parameters ? ' as never' : ''}`})
      return (result ?? null)${item.query.cast?.return ? ` as unknown as ${typePrefix}Data${dataSlots ? `<${dataSlots}>` : ''}` : ''}
    },
    queryKey: ${item.name}QueryKey(options${item.query.cast?.queryKey ? ' as never' : ''}),
  } as const satisfies QueryObserverOptions<
    ${typePrefix}QueryFnData${dataSlots ? `<${dataSlots}>` : ''},
    ${typePrefix}ErrorType,
    ${typePrefix}Data${dataSlots ? `<${dataSlots}>` : ''},
    ${typePrefix}QueryFnData${dataSlots ? `<${dataSlots}>` : ''},
    ${typePrefix}QueryKey${optionsSlots ? `<${optionsSlots}>` : ''}
  >
}

export type ${typePrefix}QueryFnData${dataTypeParameters ? `<${dataTypeParameters}>` : ''} = t.Compute<${typePrefix}ReturnType${dataSlots ? `<${dataSlots}>` : ''}>

export type ${typePrefix}Data${dataTypeParameters ? `<${dataTypeParameters}>` : ''} = ${typePrefix}QueryFnData${dataSlots ? `<${dataSlots}>` : ''}

export function ${item.name}QueryKey<${functionTypeParameters}>(
  ${item.query.skipped ? `{ ${item.query.skipped.map((x, i) => `${x}: ${'_'.repeat(i + 1)}`).join(', ')}, ...options }` : 'options'}: ${typePrefix}Options<${optionsSlots}> = {}${item.query.cast?.options ? ' as never' : ''},
) {
  return ['${item.name}', filterQueryOptions(${hasConnectorUid ? '{ ...options, connectorUid: options.connector?.uid }' : 'options'})] as const
}

export type ${typePrefix}QueryKey<${optionsTypeParameters}> = ReturnType<
  typeof ${item.name}QueryKey<${optionsSlots}>
>
`
}

function unwrapName(value: string | { name: string }) {
  if (typeof value === 'string') return value
  return value.name
}

function getTypeParameter(
  item: 'chainId' | 'config' | { name: string; type: string },
  opts: { const?: true; default?: true } = {},
) {
  const unwrapped =
    typeof item === 'object'
      ? item
      : {
          name: item,
          type:
            item === 'chainId' ? "config['chains'][number]['id']" : 'Config',
          default:
            item === 'chainId' ? "config['chains'][number]['id']" : 'Config',
          const: false,
        }
  return `\n${opts.const && 'const' in unwrapped && unwrapped.const ? 'const ' : ''}${unwrapped.name}${unwrapped.type ? ` extends ${unwrapped.type}` : ''}${opts.default && 'default' in unwrapped && unwrapped.default ? `= ${unwrapped.default}` : ''},`
}
