import { pascalCase } from 'change-case'
import dedent from 'dedent'

import type { Plugin } from '../config'
import type { RequiredBy } from '../types'

type ReactConfig = {
  /**
   * Generate `useContract` hook.
   *
   * @default true
   */
  useContract?: boolean
  /**
   * Generate `useContractEvent` hook.
   *
   * @default true
   */
  useContractEvent?: boolean
  /**
   * Generate `useContractEvent` hook for each event in contract ABI.
   *
   * @default true
   */
  useContractItemEvent?: boolean
  /**
   * Generate `useContractRead` hook.
   *
   * @default true
   */
  useContractRead?: boolean
  /**
   * Generate `useContractRead` hook for each "read" function in contract ABI.
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
   * Generate `useContractWrite` hook for each "write" function in contract ABI.
   *
   * @default true
   */
  useContractFunctionWrite?: boolean
  /**
   * Generate `usePrepareContractWrite` hook.
   *
   * @default true
   */
  usePrepareContractWrite?: boolean
  /**
   * Generate `usePrepareContractWrite` hook for each "write" function in contract ABI.
   *
   * @default true
   */
  usePrepareContractFunctionWrite?: boolean
}

type ReactResult = RequiredBy<Plugin, 'run'>

export function react(config: ReactConfig = {}): ReactResult {
  const hooks = {
    useContract: true,
    useContractEvent: true,
    useContractItemEvent: true,
    useContractRead: true,
    useContractFunctionRead: true,
    useContractWrite: true,
    useContractFunctionWrite: true,
    usePrepareContractWrite: true,
    usePrepareContractFunctionWrite: true,
    ...config,
  }
  return {
    name: 'React',
    async run({ contracts, isTypeScript }) {
      const imports = new Set<string>([])

      const content: string[] = []
      for (const contract of contracts) {
        const baseHookName = pascalCase(contract.name)
        const hasMultichainAddress = typeof contract.address === 'object'
        const TChainId = hasMultichainAddress
          ? `TChainId extends number = keyof typeof ${contract.meta.addressName}`
          : ''

        let typeParams = ''
        let innerContent = ''
        let omitted = ''
        const innerHookParams: Record<string, string> = {
          abi: contract.meta.abiName,
        }
        if (contract.meta.addressName) {
          if (typeof contract.address === 'object') {
            omitted = `| 'address'`
            typeParams = `& { chainId?: TChainId }`
            if (Object.keys(contract.address).length > 1) {
              innerHookParams[
                'address'
              ] = `${contract.meta.addressName}[chainId as keyof typeof ${contract.meta.addressName}]`
              imports.add('useNetwork')
              innerContent = dedent`
                const { chain } = useNetwork()
                const chainId = config.chainId ?? chain?.id
              `
            } else
              innerHookParams['address'] = `${contract.meta.addressName}[${
                Object.keys(contract.address!)[0]
              }]`
          } else if (contract.address)
            innerHookParams['address'] = contract.meta.addressName
        }

        const innerHookConfig =
          Object.entries(innerHookParams).reduce(
            (prev, curr) => `${prev}${curr[0]}: ${curr[1]},`,
            '{',
          ) + '...config}'

        if (hooks.useContract) {
          imports.add('useContract')
          let code
          if (isTypeScript) {
            imports.add('UseContractConfig')
            // prettier-ignore
            code = dedent`
            export function use${baseHookName}${TChainId ? `<${TChainId}>` : ''}(
              config: Omit<UseContractConfig, 'abi'>${typeParams} = {} as any,
            ) {
              ${innerContent}
              return useContract(${innerHookConfig})
            }
            `
          } else
            code = dedent`
            export function use${baseHookName}(config = {}) {
              ${innerContent}
              return useContract(${innerHookConfig})
            }
            `
          content.push(code)
        }

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

        if (hasReadFunction) {
          if (hooks.useContractRead) {
            imports.add('useContractRead')
            let code
            if (isTypeScript) {
              imports.add('UseContractReadConfig')
              code = dedent`
              export function use${baseHookName}Read<
                TAbi extends readonly unknown[] = typeof ${contract.meta.abiName},
                TFunctionName extends string = string,
                ${TChainId}
              >(
                config: Omit<UseContractReadConfig<TAbi, TFunctionName>, 'abi'${omitted}>${typeParams} = {} as any,
              ) {
                ${innerContent}
                return useContractRead(${innerHookConfig} as UseContractReadConfig<TAbi, TFunctionName>)
              }
              `
            } else
              code = dedent`
              export function use${baseHookName}Read(config = {}) {
                ${innerContent}
                return useContractRead(${innerHookConfig})
              }
              `
            content.push(code)
          }
          if (hooks.useContractFunctionRead) {
            const contractNames = new Set<string>()
            for (const item of contract.abi) {
              if (
                item.type === 'function' &&
                (item.stateMutability === 'view' ||
                  item.stateMutability === 'pure')
              ) {
                // Skip overrides since they are captured by same hook
                if (contractNames.has(item.name)) continue
                contractNames.add(item.name)
                const config =
                  Object.entries({
                    ...innerHookParams,
                    functionName: `'${item.name}'`,
                  }).reduce(
                    (prev, curr) => `${prev}${curr[0]}: ${curr[1]},`,
                    '{',
                  ) + '...config}'
                imports.add('useContractRead')
                let code
                if (isTypeScript) {
                  imports.add('UseContractReadConfig')
                  // prettier-ignore
                  code = dedent`
                  export function use${baseHookName}${pascalCase(item.name)}<
                    TAbi extends readonly unknown[] = typeof ${contract.meta.abiName},
                    TFunctionName extends string = '${item.name}',
                    ${TChainId}
                  >(
                    config: Omit<UseContractReadConfig<TAbi, TFunctionName>, 'abi'${omitted}>${typeParams} = {} as any,
                  ) {
                    ${innerContent}
                    return useContractRead(${config} as UseContractReadConfig<TAbi, TFunctionName>)
                  }
                  `
                } else {
                  // prettier-ignore
                  code = dedent`
                  export function use${baseHookName}${pascalCase(item.name)}Read(config = {}) {
                    ${innerContent}
                    return useContractRead(${config})
                  }
                  `
                }
                content.push(code)
              }
            }
          }
        }

        if (hasWriteFunction) {
          if (hooks.useContractWrite) {
            imports.add('useContractWrite')
            let code
            if (isTypeScript) {
              imports.add('UseContractWriteConfig')
              imports.add('WriteContractMode')
              code = dedent`
              export function use${baseHookName}Write<
                TMode extends WriteContractMode = WriteContractMode,
                TAbi extends readonly unknown[] = typeof ${contract.meta.abiName},
                TFunctionName extends string = string,
                ${TChainId}
              >(
                config: Omit<UseContractWriteConfig<TMode, TAbi, TFunctionName>, 'abi'${omitted}>${typeParams} = {} as any,
              ) {
                ${innerContent}
                return useContractWrite(${innerHookConfig} as UseContractWriteConfig<TMode, TAbi, TFunctionName>)
              }
              `
            } else
              code = dedent`
              export function use${baseHookName}Write(config = {}) {
                ${innerContent}
                return useContractWrite(${innerHookConfig})
              }
              `
            content.push(code)
          }
          if (hooks.useContractFunctionWrite) {
            const contractNames = new Set<string>()
            for (const item of contract.abi) {
              if (
                item.type === 'function' &&
                (item.stateMutability === 'nonpayable' ||
                  item.stateMutability === 'payable')
              ) {
                // Skip overrides since they are captured by same hook
                if (contractNames.has(item.name)) continue
                contractNames.add(item.name)
                const config =
                  Object.entries({
                    ...innerHookParams,
                    functionName: `'${item.name}'`,
                  }).reduce(
                    (prev, curr) => `${prev}${curr[0]}: ${curr[1]},`,
                    '{',
                  ) + '...config}'
                imports.add('useContractWrite')
                let code
                if (isTypeScript) {
                  imports.add('UseContractWriteConfig')
                  imports.add('WriteContractMode')
                  // prettier-ignore
                  code = dedent`
                  export function use${baseHookName}${pascalCase(item.name)}<
                    TMode extends WriteContractMode = WriteContractMode,
                    TAbi extends readonly unknown[] = typeof ${contract.meta.abiName},
                    TFunctionName extends string = '${item.name}',
                    ${TChainId}
                  >(
                    config: Omit<UseContractWriteConfig<TMode, TAbi, TFunctionName>, 'abi'${omitted}>${typeParams} = {} as any,
                  ) {
                    ${innerContent}
                    return useContractWrite(${config} as UseContractWriteConfig<TMode, TAbi, TFunctionName>)
                  }
                  `
                } else {
                  // prettier-ignore
                  code = dedent`
                  export function use${baseHookName}${pascalCase(item.name)}(config = {}) {
                    ${innerContent}
                    return useContractWrite(${config})
                  }
                  `
                }
                content.push(code)
              }
            }
          }

          if (hooks.usePrepareContractWrite) {
            imports.add('usePrepareContractWrite')
            let code
            if (isTypeScript) {
              imports.add('UsePrepareContractWriteConfig')
              // prettier-ignore
              code = dedent`
              export function usePrepare${baseHookName}Write<
                TAbi extends readonly unknown[] = typeof ${contract.meta.abiName},
                TFunctionName extends string = string,
                ${TChainId}
              >(
                config: Omit<UsePrepareContractWriteConfig<TAbi, TFunctionName>, 'abi'${omitted}>${typeParams} = {} as any,
              ) {
                ${innerContent}
                return usePrepareContractWrite(${innerHookConfig} as UsePrepareContractWriteConfig<TAbi, TFunctionName>)
              }
              `
            } else
              code = dedent`
              export function usePrepare${baseHookName}Write(config = {}) {
                ${innerContent}
                return usePrepareContractWrite(${innerHookConfig})
              }
              `
            content.push(code)
          }

          if (hooks.useContractFunctionWrite) {
            const contractNames = new Set<string>()
            for (const item of contract.abi) {
              if (
                item.type === 'function' &&
                (item.stateMutability === 'nonpayable' ||
                  item.stateMutability === 'payable')
              ) {
                // Skip overrides since they are captured by same hook
                if (contractNames.has(item.name)) continue
                contractNames.add(item.name)
                const config =
                  Object.entries({
                    ...innerHookParams,
                    functionName: `'${item.name}'`,
                  }).reduce(
                    (prev, curr) => `${prev}${curr[0]}: ${curr[1]},`,
                    '{',
                  ) + '...config}'
                imports.add('usePrepareContractWrite')
                let code
                if (isTypeScript) {
                  imports.add('UsePrepareContractWriteConfig')
                  imports.add('WriteContractMode')
                  // prettier-ignore
                  code = dedent`
                  export function usePrepare${baseHookName}${pascalCase(item.name)}<
                    TAbi extends readonly unknown[] = typeof ${contract.meta.abiName},
                    TFunctionName extends string = '${item.name}',
                    ${TChainId}
                  >(
                    config: Omit<UsePrepareContractWriteConfig<TAbi, TFunctionName>, 'abi'${omitted}>${typeParams} = {} as any,
                  ) {
                    ${innerContent}
                    return usePrepareContractWrite(${config} as UsePrepareContractWriteConfig<TAbi, TFunctionName>)
                  }
                  `
                } else {
                  // prettier-ignore
                  code = dedent`
                  export function usePrepare${baseHookName}${pascalCase(item.name)}(config = {}) {
                    ${innerContent}
                    return usePrepareContractWrite(${config})
                  }
                  `
                }
                content.push(code)
              }
            }
          }
        }

        if (hasEvent) {
          if (hooks.useContractEvent) {
            imports.add('useContractEvent')
            let code
            if (isTypeScript) {
              imports.add('UseContractEventConfig')
              // prettier-ignore
              code = dedent`
              export function use${baseHookName}Event<
                TAbi extends readonly unknown[] = typeof ${contract.meta.abiName},
                TEventName extends string = string,
                ${TChainId}
              >(
                config: Omit<UseContractEventConfig<TAbi, TEventName>, 'abi'${omitted}>${typeParams} = {} as any,
              ) {
                ${innerContent}
                return useContractEvent(${innerHookConfig} as UseContractEventConfig<TAbi, TEventName>)
              }
              `
            } else
              code = dedent`
              export function use${baseHookName}Event(config = {}) {
                ${innerContent}
                return useContractEvent(${innerHookConfig})
              }
              `
            content.push(code)
          }
          if (hooks.useContractItemEvent) {
            const contractNames = new Set<string>()
            for (const item of contract.abi) {
              if (item.type === 'event') {
                // Skip overrides since they are captured by same hook
                if (contractNames.has(item.name)) continue
                contractNames.add(item.name)
                const config =
                  Object.entries({
                    ...innerHookParams,
                    eventName: `'${item.name}'`,
                  }).reduce(
                    (prev, curr) => `${prev}${curr[0]}: ${curr[1]},`,
                    '{',
                  ) + '...config}'
                imports.add('useContractEvent')
                let code
                if (isTypeScript) {
                  imports.add('UseContractEventConfig')
                  // prettier-ignore
                  code = dedent`
                  export function use${baseHookName}${pascalCase(item.name)}Event<
                    TAbi extends readonly unknown[] = typeof ${contract.meta.abiName},
                    TEventName extends string = '${item.name}',
                    ${TChainId}
                  >(
                    config: Omit<UseContractEventConfig<TAbi, TEventName>, 'abi'${omitted}>${typeParams} = {} as any,
                  ) {
                    ${innerContent}
                    return useContractEvent(${config} as UseContractEventConfig<TAbi, TEventName>)
                  }
                  `
                } else {
                  // prettier-ignore
                  code = dedent`
                  export function use${baseHookName}${pascalCase(item.name)}Event(config = {}) {
                    ${innerContent}
                    return useContractEvent(${config})
                  }
                  `
                }
                content.push(code)
              }
            }
          }
        }
      }

      const importValues = [...imports.values()]
      return {
        imports: importValues.length
          ? dedent`
          import { ${importValues.join(', ')} } from 'wagmi'
        `
          : '',
        content: content.join('\n\n'),
      }
    },
  }
}
