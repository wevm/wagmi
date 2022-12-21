import { pascalCase } from 'change-case'
import dedent from 'dedent'

import type { Contract, Plugin } from '../config'

type ReactConfig = {
  hooks?: {
    /**
     * Generate `useContract` hook.
     *
     * @default true
     */
    useContract?: boolean
    /**
     * Generate `useContractRead` hook.
     *
     * @default true
     */
    useContractRead?: boolean
    /**
     * Generate hook for each "read" function in contract ABI.
     *
     * @default true
     */
    useContractFunctionRead?: boolean
    /**
     * Generate `useContractWrite` hook.
     *
     * @default true
     */
    useContractWrite?: boolean
    /**
     * Generate hook for each "write" function in contract ABI.
     *
     * @default true
     */
    useContractFunctionWrite?: boolean
  }
}

// shared:
// x generated hook name
// x default config to `{}`?
// x underlying hook name
// x hardcode `abi` (and `address`/`functionName` if applicable)
// - tsdoc (@inheritDoc?)
// typescript:
// - generics?
// - config?
// - properties?

function buildHook({
  contract,
  hookName,
  isTypeScript,
  innerHookName,
  innerHookConfig,
  tsAssertConfig,
  tsGenerics,
  tsType,
}: {
  contract: Contract
  hookName: string
  isTypeScript: boolean
  innerHookName: string
  innerHookConfig?: Record<string, string>
  tsAssertConfig?: string
  tsGenerics?: {
    config: string
    hook: string
    type: string
  }
  tsType: string
}) {
  const hasAddress = !!contract.address
  const hasMultichainAddress = typeof contract.address === 'object'

  let isConfigRequired = false
  const wrappedHookParams: Record<string, string> = {
    abi: contract.meta.abiName,
    ...innerHookConfig,
  }
  if (contract.meta.addressName) {
    if (hasMultichainAddress) {
      wrappedHookParams[
        'address'
      ] = `config.chainId ? ${contract.meta.addressName}[config.chainId] : undefined`
      isConfigRequired = true
    } else if (hasAddress)
      wrappedHookParams['address'] = contract.meta.addressName
  }
  const wrappedHookConfig =
    Object.entries(wrappedHookParams).reduce((prev, curr) => {
      return dedent`
      ${prev}
      ${curr[0]}: ${curr[1]},
    `
    }, '{') + '...config }'
  const defaultConfig = isConfigRequired
    ? ''
    : `= {}${isTypeScript ? 'as any' : ''}`

  if (!isTypeScript)
    return dedent`
      export function ${hookName}(config ${defaultConfig}) {
        return ${innerHookName}(${wrappedHookConfig})
      }
    `

  const typeParams: Record<string, { optional?: boolean; type: string }> = {}
  if (hasMultichainAddress) {
    typeParams['chainId'] = {
      optional: true,
      type: `keyof typeof ${contract.meta.addressName}`,
    }
  }
  let typeConfig =
    Object.entries(typeParams).reduce((prev, curr) => {
      return dedent`
      ${prev}
      ${curr[0]}${curr[1].optional ? '?' : ''}: ${curr[1].type},
    `
    }, '& {') + '}'
  if (typeConfig === '& {}') typeConfig = ''

  const typeName = `${pascalCase(hookName)}Config`
  const generics = Object.assign({ type: '', config: '', hook: '' }, tsGenerics)
  const as = tsAssertConfig ? ` as ${tsAssertConfig}` : ''
  return dedent`
    type ${typeName}${generics.type} = ${tsType}${typeConfig}
    export function ${hookName}${generics.hook}(config: ${typeName}${generics.config} ${defaultConfig}) {
      return ${innerHookName}(${wrappedHookConfig}${as})
    }
  `
}

export function react(config: ReactConfig): Plugin {
  const hooks = {
    useContract: true,
    useContractRead: true,
    useContractFunctionRead: true,
    useContractWrite: true,
    useContractFunctionWrite: true,
    ...config?.hooks,
  }
  return {
    name: 'React',
    async run({ contracts, isTypeScript }) {
      const imports = new Set<string>([])
      const actionsImports = new Set<string>([])

      const content: string[] = []
      for (const contract of contracts) {
        let hasReadFunction,
          hasWriteFunction,
          hasEvent = false
        for (const component of contract.abi) {
          if (component.type === 'function')
            if (
              component.stateMutability === 'view' ||
              component.stateMutability === 'pure'
            )
              hasReadFunction = true
            else hasWriteFunction = true
          else if (component.type === 'event') hasEvent = true
          // Exit early if all flags are `true`
          if (hasReadFunction && hasWriteFunction && hasEvent) break
        }

        const hasAddress = !!contract.address
        const selectAddress = hasAddress ? `| 'address'` : ''

        if (hooks.useContract) {
          const hookName = 'useContract'
          const typeName = 'UseContractConfig'
          imports.add(hookName)
          if (isTypeScript) imports.add(typeName)
          content.push(
            buildHook({
              contract,
              hookName: `use${pascalCase(contract.name)}Contract`,
              innerHookName: hookName,
              isTypeScript,
              tsType: `Omit<${typeName}, 'abi'${selectAddress}>`,
            }),
          )
        }
        if (hasReadFunction) {
          if (hooks.useContractRead) {
            const hookName = 'useContractRead'
            const typeName = 'UseContractReadConfig'
            const selectDataTypeName = 'ReadContractResult'
            imports.add(hookName)
            if (isTypeScript) {
              imports.add(typeName)
              actionsImports.add(selectDataTypeName)
            }
            const generics = {
              functionName: 'TFunctionName',
              selectData: 'TSelectData',
            }
            const tsAssertConfig = `${typeName}<typeof ${contract.meta.abiName}, ${generics.functionName}, ${generics.selectData}>`
            const tsSelectDataSlot = `${generics.selectData} = ${selectDataTypeName}<typeof ${contract.meta.abiName}, ${generics.functionName}>`
            content.push(
              buildHook({
                contract,
                hookName: `use${pascalCase(contract.name)}Read`,
                innerHookName: hookName,
                isTypeScript,
                tsAssertConfig,
                tsGenerics: {
                  config: `<${generics.functionName}, ${generics.selectData}>`,
                  hook: `<${generics.functionName} extends string, ${tsSelectDataSlot}>`,
                  type: `<${generics.functionName} = string, ${tsSelectDataSlot}>`,
                },
                tsType: `Omit<${tsAssertConfig}, 'abi'${selectAddress}>`,
              }),
            )
          }
        }
      }

      return {
        imports: dedent`
        import { ${[...imports.values()].join(', ')} } from 'wagmi'
        import { ${[...actionsImports.values()].join(
          ', ',
        )} } from 'wagmi/actions'
        `,
        content: content.join('\n\n'),
      }
    },
  }
}
