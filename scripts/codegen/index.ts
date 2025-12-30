import { exec } from 'node:child_process'
import fs from 'node:fs/promises'
import { promisify } from 'node:util'
import { type Item, items, type requiredItem } from './config.ts'

console.log('Generating code.')

// TODO:
// - write exports
// - watchAsset mutation
// - connectorClient query actions

// get paths + code
const generated = new Map<string, string>()
const nameLookup = { react: 'hook', vue: 'composable' } as const
const counters = new Map<'core' | 'query' | keyof typeof nameLookup, number>()
for (const item of items) {
  if (item.type === 'mutation') continue
  console.log(`${item.name} — core, query, ${item.primitive.types.join(', ')}`)
  // core action
  generated.set(
    `packages/core/src/actions/${item.name}.ts`,
    item.type === 'query' ? genQueryAction(item) : '',
  )
  counters.set('core', (counters.get('core') ?? 0) + 1)
  // query options
  generated.set(
    `packages/core/src/query/${item.name}.ts`,
    item.type === 'query' ? genQueryOptions(item) : genMutationOptions(item),
  )
  counters.set('query', (counters.get('query') ?? 0) + 1)
  // framework primitives
  for (const primitive of item.primitive.types) {
    const type = nameLookup[primitive]
    generated.set(
      `packages/${primitive}/src/${type}s/${getPrimitiveName(item.name)}.ts`,
      item.type === 'query'
        ? genQueryPrimitive({ name: primitive, type }, item)
        : '',
    )
    counters.set(primitive, (counters.get(primitive) ?? 0) + 1)
  }
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
  `Generated ${generated.size} file${generated.size === 1 ? '' : 's'}. ${[...counters.entries()].map(([k, v]) => `${v} ${k}`).join(', ')}`,
)

///

function genMutationOptions(item: Extract<Item, { type: 'mutation' }>) {
  const typePrefix = item.name.charAt(0).toUpperCase() + item.name.slice(1)

  const dataTypeParameters = item.query.data
    .map((x) => getTypeParameter(x))
    .join('')
  const hasConfig = item.query.variables.at(0)?.name === 'config'
  const functionTypeParameters = item.query.variables
    .slice(hasConfig ? 1 : 0)
    .map((x) =>
      getTypeParameter(x, {
        default: item.query.variables.some((x) =>
          Boolean(typeof x === 'object' && x.default),
        ),
      }),
    )
    .join('')
  const variablesTypeParameters = item.query.variables
    .map((x) => getTypeParameter(x))
    .join('')

  const simpleMutate =
    item.query.data.length === 0 && item.query.variables.length === 0
  const dataSlots = item.query.data.map(unwrapName).join(', ')
  const variablesSlots = item.query.variables.map(unwrapName).join(', ')

  const imports = getCoreImports(item)
  const t = 't'

  return `${genComment()}
import type { MutationObserverOptions${simpleMutate ? '' : ', MutateOptions'} } from '@tanstack/query-core'
import {
  type ${typePrefix}ErrorType,
  type ${typePrefix}Parameters,
  type ${typePrefix}ReturnType,
  ${item.name},
} from '../actions/${item.name}.js'${imports ? `\n${imports}` : ''}
import type { Config } from '../createConfig.js'${simpleMutate ? "\nimport type { Mutate, MutateAsync } from './types.js'" : ''}
import type * as ${t} from '../types/utils.js'

export function ${item.name}MutationOptions${simpleMutate ? '' : '<config extends Config>'}(config: ${simpleMutate ? 'Config' : 'config'}) {
  return {
    mutationFn: (variables) => {
      return ${item.name}(config, variables)
    },
    mutationKey: ['${item.name}'],
  } as const satisfies MutationObserverOptions<
    ${typePrefix}Data${item.query.data.length ? `<${item.query.data.map((x) => x.type).join(', ')}>` : ''},
    ${typePrefix}ErrorType,
    ${typePrefix}Variables${item.query.variables.length ? `<${item.query.variables.map((x) => x.type).join(', ')}>` : ''}
  >
}

export type ${typePrefix}Data${dataTypeParameters ? `<${dataTypeParameters}>` : ''} = ${typePrefix}ReturnType${dataSlots ? `<${dataSlots}>` : ''}

export type ${typePrefix}Variables${variablesTypeParameters ? `<${variablesTypeParameters}>` : ''} = ${typePrefix}Parameters${variablesSlots ? `<${variablesSlots}>` : ''}${item.query.optionalParameters ? ' | undefined' : ''}

export type ${typePrefix}Mutate<${hasConfig ? 'config extends Config, ' : ''}context = unknown> = ${
    simpleMutate
      ? `Mutate<${typePrefix}Data, ${typePrefix}ErrorType, ${typePrefix}Variables, context>`
      : `${functionTypeParameters ? `<${functionTypeParameters}>` : ''}(
  variables: ${typePrefix}Variables${variablesSlots ? `<${variablesSlots}>` : ''},
  options?:
    | ${t}.Compute<
        MutateOptions<
          ${typePrefix}Data${dataSlots ? `<${dataSlots}>` : ''},
          ${typePrefix}ErrorType,
          ${t}.Compute<${typePrefix}Variables${variablesSlots ? `<${variablesSlots}>` : ''}>,
          context
        >
      >
    | undefined,
) => void`
  }

export type ${typePrefix}MutateAsync<${hasConfig ? 'config extends Config, ' : ''}context = unknown> = ${
    simpleMutate
      ? `MutateAsync<${typePrefix}Data, ${typePrefix}ErrorType, ${typePrefix}Variables, context>`
      : `${functionTypeParameters ? `<${functionTypeParameters}>` : ''}(
  variables: ${typePrefix}Variables${variablesSlots ? `<${variablesSlots}>` : ''},
  options?:
    | ${t}.Compute<
        MutateOptions<
          ${typePrefix}Data${dataSlots ? `<${dataSlots}>` : ''},
          ${typePrefix}ErrorType,
          ${t}.Compute<${typePrefix}Variables${variablesSlots ? `<${variablesSlots}>` : ''}>,
          context
        >
      >
    | undefined,
) => Promise<${typePrefix}Data${dataSlots ? `<${dataSlots}>` : ''}>`
  }
`
}

function genQueryAction(item: Extract<Item, { type: 'query' }>) {
  const typePrefix = item.name.charAt(0).toUpperCase() + item.name.slice(1)

  const parametersTypeParameters = item.action.parameters
    .map((x) => getTypeParameter(x, { default: true }))
    .join('')
  const functionTypeParameters = item.action.parameters
    .map((x) => getTypeParameter(x))
    .join('')
  const returnTypeTypeParameters = item.action.returnType
    .map((x) => getTypeParameter(x))
    .join('')

  const parametersSlots = item.action.parameters.map(unwrapName).join(', ')
  const returnTypeSlots = item.action.returnType.map(unwrapName).join(', ')
  const compute = { parameters: item.action.compute?.parameters ?? true }

  return `${genComment()}
import {
  type ${typePrefix}ErrorType as viem_${typePrefix}ErrorType,
  type ${typePrefix}Parameters as viem_${typePrefix}Parameters,
  type ${typePrefix}ReturnType as viem_${typePrefix}ReturnType,
  ${item.name} as viem_${item.name},
} from 'viem/actions'
import type { Config } from '../createConfig.js'
import type { ChainIdParameter } from '../types/properties.js'${
    compute.parameters
      ? `\nimport type { Compute } from '../types/utils.js'`
      : ''
  }
import { getAction } from '../utils/getAction.js'

export type ${typePrefix}Parameters${parametersTypeParameters ? `<${parametersTypeParameters}>` : ''} = ${compute.parameters ? 'Compute<' : ''}viem_${typePrefix}Parameters & ChainIdParameter${parametersSlots ? `<${parametersSlots}>` : ''}${compute.parameters ? '>' : ''}

export type ${typePrefix}ReturnType${returnTypeTypeParameters ? `<${returnTypeTypeParameters}>` : ''} = viem_${typePrefix}ReturnType${returnTypeSlots ? `<${returnTypeSlots}>` : ''}

export type ${typePrefix}ErrorType = viem_${typePrefix}ErrorType

/** https://wagmi.sh/core/api/actions/${item.name} */
export async function ${item.name}${functionTypeParameters ? `<${functionTypeParameters}>` : ''}(
  config: config,
  parameters: ${typePrefix}Parameters${parametersSlots ? `<${parametersSlots}>` : ''}${item.required.length ? '' : ' = {}'},
): Promise<${typePrefix}ReturnType${returnTypeSlots ? `<${returnTypeSlots}>` : ''}> {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  const action = getAction(client, viem_${item.name}, '${item.name}')
  return action(rest)
}
`
}

function genQueryOptions(item: Extract<Item, { type: 'query' }>) {
  const typePrefix = item.name.charAt(0).toUpperCase() + item.name.slice(1)

  const optionsTypeParameters = item.action.parameters
    .map((x) => getTypeParameter(x))
    .join('')
  const functionTypeParameters = item.action.parameters
    .map((x) =>
      getTypeParameter(x, {
        default: item.action.parameters.some((x) =>
          Boolean(typeof x === 'object' && x.default),
        ),
      }),
    )
    .join('')
  const dataTypeParameters = item.action.returnType
    .map((x) => getTypeParameter(x))
    .join('')

  const optionsSlots = item.action.parameters.map(unwrapName).join(', ')
  const dataSlots = item.action.returnType.map(unwrapName).join(', ')

  const queryKeySkipped = ['abi', 'connector']
  const getParameterPrefix = (prop: requiredItem) =>
    queryKeySkipped.includes(unwrapName(prop)) ? 'options' : 'parameters'

  const enabled = (() => {
    const o = 'options'
    const get = (
      prop: string | { name: string; cond: (o: string, n: string) => string },
    ) => {
      if (typeof prop === 'string') return `${o}.${prop}`
      return prop.cond(o, prop.name)
    }
    return item.required
      .flatMap((x) => {
        if (Array.isArray(x)) return `Boolean(${x.map(get).join(' || ')})`
        return get(x)
      })
      .join(' && ')
  })()
  const requiredChecks = (() => {
    const get = (prop: requiredItem) => {
      const o = getParameterPrefix(prop)
      if (typeof prop === 'string') return `${o}.${prop}`
      return prop.cond(o, prop.name)
    }
    return item.required
      .map((x) => {
        if (Array.isArray(x))
          return `if (${x.map((y) => `!${get(y)}`).join(' && ')}) throw new Error('${x.length > 2 ? x.map((y, i) => `${i === x.length - 1 ? 'or ' : ''}${unwrapName(y)}`).join(', ') : x.map(unwrapName).join(' or ')} is required')`
        return `if (!${get(x)}) throw new Error('${unwrapName(x)} is required')`
      })
      .join('\n')
  })()
  const requiredParameters = item.required
    .flatMap((x) => {
      const get = (prop: requiredItem) => {
        const o = getParameterPrefix(prop)
        if (typeof prop === 'string') return `${o}.${prop}`
        if (queryKeySkipped.includes(prop.name)) return `${o}.${prop.name}`
        return `${prop.cond(o, prop.name)} ? ${o}.${prop.name} : undefined`
      }
      if (Array.isArray(x)) return x.map((y) => `${unwrapName(y)}: ${get(y)}`)
      return `${unwrapName(x)}: ${get(x)}`
    })
    .join(', ')

  const t = 't'
  const optionsType = (
    t: string,
    typePrefix: string,
    slots: string,
    extras: string,
  ) =>
    `${t}.Compute<${t}.ExactPartial<${typePrefix}Parameters<${slots}>> & ${extras}>`

  const hasConnectorUid = (() => {
    const filteredProperties = [
      ...new Set(
        item.required
          .flatMap((x) => (Array.isArray(x) ? x : [x]).map(unwrapName))
          .filter((x) => queryKeySkipped.includes(x)),
      ).values(),
    ]
    return filteredProperties.includes('connector')
  })()

  const imports = getCoreImports(item)

  return `${genComment()}
import type { QueryObserverOptions } from '@tanstack/query-core'
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

export type ${typePrefix}Options<${optionsTypeParameters}> = ${optionsType(t, typePrefix, optionsSlots, 'ScopeKeyParameter')}

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
  options: ${typePrefix}Options<${optionsSlots}> = {}${item.query.cast?.options ? ' as never' : ''},
) {
  return ['${item.name}', filterQueryOptions(${hasConnectorUid ? '{ ...options, connectorUid: options.connector?.uid }' : 'options'})] as const
}

export type ${typePrefix}QueryKey<${optionsTypeParameters}> = ReturnType<
  typeof ${item.name}QueryKey<${optionsSlots}>
>
`
}

function genQueryPrimitive(
  framework: { name: 'react' | 'vue'; type: string },
  item: Extract<Item, { type: 'query' }>,
) {
  const coreTypePrefix = item.name.charAt(0).toUpperCase() + item.name.slice(1)
  const typePrefix = (() => {
    if (coreTypePrefix.startsWith('Get'))
      return coreTypePrefix.replace('Get', 'Use')
    return `Use${coreTypePrefix}`
  })()
  const name = getPrimitiveName(item.name)

  const parametersTypeParameters = item.action.parameters
    .map((x) => getTypeParameter(x, { default: true }))
    .join('')
  const functionTypeParameters = item.action.parameters
    .map((x) => getTypeParameter(x, { default: true, register: true }))
    .join('')
  const returnTypeTypeParameters = item.action.returnType
    .map((x) => getTypeParameter(x, { default: true }))
    .join('')

  const parametersSlots = item.action.parameters.map(unwrapName).join(', ')
  const returnTypeSlots = item.action.returnType.map(unwrapName).join(', ')

  const enabled = item.required.length
    ? 'Boolean(options.enabled && (query.enabled ?? true))'
    : ''
  const parametersType = `export type ${typePrefix}Parameters<${parametersTypeParameters} selectData = ${coreTypePrefix}Data>`
  const returnType = `export type ${typePrefix}ReturnType<${returnTypeTypeParameters ? `${returnTypeTypeParameters}, ` : ''}selectData = ${coreTypePrefix}Data${returnTypeSlots ? `<${returnTypeSlots}>` : ''}>`
  const signature = `/** https://wagmi.sh/${framework.name}/api/${framework.type}s/${name} */
export function ${name}<${functionTypeParameters} selectData = ${coreTypePrefix}Data>(
  parameters: ${typePrefix}Parameters<${parametersSlots}, selectData> = {},
): ${typePrefix}ReturnType<${returnTypeSlots ? `${returnTypeSlots}, ` : ''}selectData>`

  const coreImports = `import type { Config, ${coreTypePrefix}ErrorType, ResolvedRegister } from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import {
  type ${coreTypePrefix}Data,
  type ${coreTypePrefix}Options,
  type ${coreTypePrefix}QueryFnData,
  type ${coreTypePrefix}QueryKey,
  ${item.name}QueryOptions,
} from '@wagmi/core/query'
import type { ConfigParameter, QueryParameter } from '../types/properties.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'
`

  if (framework.name === 'vue')
    return `${genComment()}import { computed } from 'vue'
import type { DeepMaybeRef } from '../types/ref.js'
import { deepUnref } from '../utils/cloneDeep.js'
${coreImports}

${parametersType} = Compute<
  DeepMaybeRef<
    ${coreTypePrefix}Options<${parametersSlots}> &
      ConfigParameter<config> &
      QueryParameter<
        ${coreTypePrefix}QueryFnData${returnTypeSlots ? `<${returnTypeSlots}>` : ''},
        ${coreTypePrefix}ErrorType,
        selectData,
        ${coreTypePrefix}QueryKey<${parametersSlots}>
      >
  >
>

${returnType} = UseQueryReturnType<selectData, ${coreTypePrefix}ErrorType>

${signature} {
  const params = computed(() => deepUnref(parameters))
  const config = useConfig(params)
  const chainId = useChainId({ config })
  const options = computed(() => {
    const { query = {} } = params.value
    const options = ${item.name}QueryOptions(config, {
      ...params.value,
      chainId: params.value.chainId ?? chainId.value,
    })
    return { ...query, ...options${enabled ? `, enabled: ${enabled}` : ''} }
  })
  return useQuery(options as any) as ${typePrefix}ReturnType<selectData>
}
`

  return `'use client'
${genComment()}
${coreImports}

${parametersType} = Compute<
  ${coreTypePrefix}Options<${parametersSlots}> &
    ConfigParameter<config> &
    QueryParameter<
      ${coreTypePrefix}QueryFnData${returnTypeSlots ? `<${returnTypeSlots}>` : ''},
      ${coreTypePrefix}ErrorType,
      selectData,
      ${coreTypePrefix}QueryKey<${parametersSlots}>
    >
>

${returnType} = UseQueryReturnType<selectData, ${coreTypePrefix}ErrorType>

${signature} {
  const { query = {} } = parameters
  const config = useConfig(parameters)
  const chainId = useChainId({ config })
  const options = ${item.name}QueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  })
  return useQuery({ ...query, ...options${enabled ? `, enabled: ${enabled}` : ''} })
}
`
}

function unwrapName(value: string | { name: string }) {
  if (typeof value === 'string') return value
  return value.name
}

function getTypeParameter(
  item: 'chainId' | 'config' | { name: string; type: string },
  opts: { default?: boolean; register?: boolean } = {},
) {
  const unwrapped =
    typeof item === 'object'
      ? item
      : {
          name: item,
          type:
            item === 'chainId' ? "config['chains'][number]['id']" : 'Config',
          default:
            item === 'chainId'
              ? "config['chains'][number]['id']"
              : opts.register
                ? "ResolvedRegister['config']"
                : 'Config',
        }
  return `\n${unwrapped.name}${unwrapped.type ? ` extends ${unwrapped.type}` : ''}${opts.default && 'default' in unwrapped && unwrapped.default ? `= ${unwrapped.default}` : ''},`
}

function getCoreImports(item: Item) {
  const viemImports = (item.query.imports ?? []).filter(
    (x) => typeof x === 'string',
  )
  const customImports = (item.query.imports ?? [])
    .filter((x) => typeof x === 'object')
    .map((x) => `import { ${x.names.join(', ')} } from '${x.path}'`)
  return [
    ...(viemImports.length
      ? [`import type { ${viemImports.join(', ')} } from 'viem'`]
      : []),
    ...(customImports.length ? customImports : []),
  ].join('\n')
}

function getPrimitiveName(name: string) {
  if (name.startsWith('get')) return name.replace('get', 'use')
  return `use${name.charAt(0).toUpperCase() + name.slice(1)}`
}

function genComment() {
  return '/* generated by scripts/codegen */'
}
