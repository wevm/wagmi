import { exec } from 'node:child_process'
import fs from 'node:fs/promises'
import path from 'node:path'
import { promisify } from 'node:util'
import { items } from './config.ts'

console.log('Generating query options.')

const generated = new Map<string, string>()
for (const item of items) {
  const code = genQueryOptions(item)
  console.log(`- ${item.name}Options`)
  generated.set(`${item.name}.ts`, code)
}
const dir = 'packages/core/src/query'
await Promise.all(
  Array.from(generated.entries()).map(([filename, code]) =>
    fs.writeFile(path.join(dir, filename), code),
  ),
)

console.log(
  `Generated ${generated.size} query option${generated.size === 1 ? '' : 's'}.`,
)

const execAsync = promisify(exec)
const { stderr } = await execAsync('pnpm biome check --write')
if (stderr) console.error(stderr)

function genQueryOptions(item: (typeof items)[number]) {
  const typePrefix = item.name.charAt(0).toUpperCase() + item.name.slice(1)

  const imports = item.query.imports.length
    ? `import type { ${item.query.imports.join(', ')} } from 'viem'`
    : undefined
  const optionsTypeParameters = item.query.options
    .map((x) => getTypeParameter(x))
    .join('')
  const optionsFunctionTypeParameters = item.query.options
    .map((x) => getTypeParameter(x, { const: true, default: true }))
    .join('')
  const dataTypeParameters = item.query.data
    .map((x) => getTypeParameter(x))
    .join('')
  const optionsSlots = item.query.options
    .map((x) => (typeof x === 'string' ? x : x.name))
    .join(', ')
  const dataSlots = item.query.data
    .map((x) => (typeof x === 'string' ? x : x.name))
    .join(', ')

  const requiredChecks = item.required
    .map((x) => {
      if (typeof x === 'string')
        return `if (!parameters.${x}) throw new Error('${x} is required')`
      return `if (${x.map((y) => `!parameters.${y}`).join(' && ')}) throw new Error('${x.join(' or ')} is required')`
    })
    .join('\n')

  return `
import type { QueryOptions } from '@tanstack/query-core'
import {
  type ${typePrefix}ErrorType,
  type ${typePrefix}Parameters,
  type ${typePrefix}ReturnType,
  ${item.name},
} from '../actions/${item.name}.js'${imports ? `\n${imports}` : ''}
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type * as t from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type ${typePrefix}Options<${optionsTypeParameters}> = ${item.query.optionsType ? item.query.optionsType : `t.Compute<t.ExactPartial<${typePrefix}Parameters<${optionsSlots}>> & ScopeKeyParameter>`}

export function ${item.name}QueryOptions<${optionsFunctionTypeParameters}>(
  config: config,
  options: ${typePrefix}Options<${optionsSlots}> = {} as never,
) {
  return {
    async queryFn({ queryKey }) {
      const { scopeKey: _, ...parameters } = queryKey[1]${requiredChecks ? `\n${requiredChecks}` : ''}
      const result = await ${item.name}(config, parameters as never)
      return (result ?? null) as never
    },
    queryKey: ${item.name}QueryKey(options as never),
  } as const satisfies QueryOptions<
    ${typePrefix}QueryFnData${dataSlots ? `<${dataSlots}>` : ''},
    ${typePrefix}ErrorType,
    ${typePrefix}Data${dataSlots ? `<${dataSlots}>` : ''},
    ${typePrefix}QueryKey${optionsSlots ? `<${optionsSlots}>` : ''}
  >
}

export type ${typePrefix}QueryFnData${dataTypeParameters ? `<${dataTypeParameters}>` : ''} = t.Compute<${typePrefix}ReturnType${dataSlots ? `<${dataSlots}>` : ''}>

export type ${typePrefix}Data${dataTypeParameters ? `<${dataTypeParameters}>` : ''} = ${typePrefix}QueryFnData${dataSlots ? `<${dataSlots}>` : ''}

export function ${item.name}QueryKey<${optionsFunctionTypeParameters}>(
  options: ${typePrefix}Options<${optionsSlots}> = {} as never,
) {
  return ['${item.name}', filterQueryOptions(options)] as const
}

export type ${typePrefix}QueryKey<${optionsTypeParameters}> = ReturnType<
  typeof ${item.name}QueryKey<${optionsSlots}>
>
`
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
