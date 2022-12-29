import { pascalCase } from 'change-case'
import dedent from 'dedent'

import type { Plugin } from '../config'

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

// function buildHook({
//   contract,
//   hookName,
//   isTypeScript,
//   innerHookName,
//   innerHookConfig,
//   tsAssertConfig,
//   tsGenerics,
// }: {
//   contract: Contract
//   hookName: string
//   isTypeScript: boolean
//   innerHookName: string
//   innerHookConfig?: Record<string, string>
//   tsAssertConfig?: string
//   tsGenerics?: {
//     config: string
//     hook: string
//     type: string
//   }
// }) {
//   if (!isTypeScript)
//     return dedent`
//       export function ${hookName}(config ${defaultConfig}) {
//         return ${innerHookName}(${wrappedHookConfig})
//       }
//     `

//   const typeParams: Record<string, { optional?: boolean; type: string }> = {}
//   if (hasMultichainAddress) {
//     typeParams['chainId'] = {
//       optional: true,
//       type: `keyof typeof ${contract.meta.addressName}`,
//     }
//   }
//   let typeConfig =
//     Object.entries(typeParams).reduce((prev, curr) => {
//       return dedent`
//       ${prev}
//       ${curr[0]}${curr[1].optional ? '?' : ''}: ${curr[1].type},
//     `
//     }, '& {') + '}'
//   if (typeConfig === '& {}') typeConfig = ''

//   const generics = Object.assign({ type: '', config: '', hook: '' }, tsGenerics)
//   const as = tsAssertConfig ? ` as ${tsAssertConfig}` : ''
//   return dedent`
//     export function ${hookName}${generics.hook}(config: ${generics.config} ${defaultConfig}) {
//       return ${innerHookName}(${wrappedHookConfig}${as})
//     }
//   `
// }

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
        const hasMultichainAddress = typeof contract.address === 'object'

        let isConfigRequired = false
        let tsDocAddress = ''
        const wrappedHookParams: Record<string, string> = {
          abi: contract.meta.abiName,
        }
        if (contract.meta.addressName) {
          if (hasMultichainAddress) {
            wrappedHookParams[
              'address'
            ] = `config.chainId ? ${contract.meta.addressName}[config.chainId] : undefined`
            isConfigRequired = true
            tsDocAddress = dedent``
          } else if (hasAddress) {
            wrappedHookParams['address'] = contract.meta.addressName
            tsDocAddress = `address: ${contract.meta.addressName}`
          }
        }
        const wrappedHookConfig =
          Object.entries(wrappedHookParams).reduce((prev, curr) => {
            return dedent`
            ${prev}
            ${curr[0]}: ${curr[1]},
          `
          }, '{') + `...config}`
        const defaultConfig = isConfigRequired
          ? ''
          : ` = {}${isTypeScript ? 'as any' : ''}`
        const typeParams = hasMultichainAddress
          ? dedent`& {
            chainId?: keyof typeof ${contract.meta.addressName}
          }`
          : ''
        const omittedTypeParams = hasMultichainAddress
          ? '"abi" | "address"'
          : '"abi"'

        if (hooks.useContract) {
          const hookName = `use${pascalCase(contract.name)}Contract`
          const innerHookName = 'useContract'
          const tsDoc = dedent`
            /**
             * ${contract.name} useContract.
             * ${tsDocAddress}
             */
          `
          imports.add(innerHookName)
          if (isTypeScript) {
            const typeName = 'UseContractConfig'
            imports.add(typeName)
            content.push(dedent`
              ${tsDoc}
              export function ${hookName}(config: Omit<${typeName}, ${omittedTypeParams}>${typeParams}${defaultConfig}) {
                return ${innerHookName}(${wrappedHookConfig})
              }
            `)
          } else {
            content.push(dedent`
              ${tsDoc}
              export function ${hookName}(config${defaultConfig}) {
                return ${innerHookName}(${wrappedHookConfig})
              }
            `)
          }
        }
        if (hasReadFunction) {
          if (hooks.useContractRead) {
            const hookName = `use${pascalCase(contract.name)}Read`
            const innerHookName = 'useContractRead'
            const tsDoc = dedent`
              /**
               * ${contract.name} useContractRead.
               * ${tsDocAddress}
               */
            `
            imports.add(innerHookName)
            if (isTypeScript) {
              const typeName = 'UseContractReadConfig'
              imports.add(typeName)
              content.push(dedent`
                ${tsDoc}
                export function ${hookName}<
                  TAbi extends readonly unknown[] = typeof ${contract.meta.abiName},
                  TFunctionName extends string = string
                >(
                  config: Omit<${typeName}<TAbi, TFunctionName>, ${omittedTypeParams}>${typeParams}${defaultConfig},
                ) {
                  return ${innerHookName}(${wrappedHookConfig} as ${typeName}<TAbi, TFunctionName>)
                }
              `)
            } else {
              content.push(dedent`
                ${tsDoc}
                export function ${hookName}(config${defaultConfig}) {
                  return ${innerHookName}(${wrappedHookConfig})
                }
              `)
            }
          }
        }
      }

      return {
        imports: dedent`
          import { ${[...imports.values()].join(', ')} } from 'wagmi'
        `,
        content: content.join('\n\n'),
      }
    },
  }
}
