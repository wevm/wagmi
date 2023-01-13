import { pascalCase } from 'change-case'
import dedent from 'dedent'

import type { Contract, Plugin } from '../config'
import type { RequiredBy } from '../types'
import { getAddressDocString } from '../utils'

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
        const innerHookParams: Record<string, string> = {
          abi: contract.meta.abiName,
        }
        let extraTypeParams = ''
        let innerContent = ''
        if (contract.meta.addressName) {
          if (typeof contract.address === 'object') {
            if (Object.keys(contract.address).length > 1) {
              extraTypeParams = `& { chainId?: keyof typeof ${contract.meta.addressName} }`
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
        const { hasReadFunction, hasWriteFunction, hasEvent } = getAbiItemTypes(
          contract.abi,
        )

        if (hooks.useContract) {
          const innerHookName = 'useContract'
          const hookName = innerHookName.replace('Contract', baseHookName)
          imports.add(innerHookName)
          const options = {
            contract,
            hookName,
            innerContent,
            innerHookName,
            innerHookParams,
          }
          let code
          if (isTypeScript) {
            const typeName = 'UseContractConfig'
            imports.add(typeName)
            code = getHookCode({
              type: 'ts',
              options: {
                ...options,
                extraTypeParams,
                typeName,
              },
            })
          } else code = getHookCode({ type: 'js', options })
          content.push(code)
        }

        if (hasReadFunction) {
          if (hooks.useContractRead) {
            const innerHookName = 'useContractRead'
            const hookName = innerHookName.replace('Contract', baseHookName)
            imports.add(innerHookName)
            const options = {
              contract,
              hookName,
              innerContent,
              innerHookName,
              innerHookParams,
            }
            let code
            if (isTypeScript) {
              const typeName = 'UseContractReadConfig'
              imports.add(typeName)
              code = getHookCode({
                type: 'ts',
                options: {
                  ...options,
                  extraTypeParams,
                  genericSlotType: 'functionName',
                  typeName,
                },
              })
            } else code = getHookCode({ type: 'js', options })
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
                const innerHookName = 'useContractRead'
                const hookName = innerHookName.replace(
                  'ContractRead',
                  baseHookName + pascalCase(item.name),
                )
                imports.add(innerHookName)
                const options = {
                  contract,
                  hookName,
                  innerContent,
                  innerHookName,
                  innerHookParams,
                }
                let code
                if (isTypeScript) {
                  const typeName = 'UseContractReadConfig'
                  imports.add(typeName)
                  code = getHookCode({
                    type: 'ts',
                    options: {
                      ...options,
                      extraTypeParams,
                      genericSlotType: 'functionName',
                      genericSlotValue: item.name,
                      typeName,
                    },
                  })
                } else
                  code = getHookCode({
                    type: 'js',
                    options: {
                      ...options,
                      defaultItemType: 'functionName',
                      defaultItemValue: item.name,
                    },
                  })
                content.push(code)
              }
            }
          }
        }

        if (hasWriteFunction) {
          if (hooks.useContractWrite) {
            const innerHookName = 'useContractWrite'
            const hookName = innerHookName.replace('Contract', baseHookName)
            imports.add(innerHookName)
            const options = {
              contract,
              hookName,
              innerContent,
              innerHookName,
              innerHookParams,
            }
            let code
            if (isTypeScript) {
              const typeName = 'UseContractWriteConfig'
              imports.add(typeName)
              code = getHookCode({
                type: 'ts',
                options: {
                  ...options,
                  extraTypeParams,
                  genericSlotType: 'functionName',
                  typeName,
                },
              })
            } else code = getHookCode({ type: 'js', options })
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
                const innerHookName = 'useContractWrite'
                const hookName = innerHookName.replace(
                  'ContractWrite',
                  baseHookName + pascalCase(item.name),
                )
                imports.add(innerHookName)
                const options = {
                  contract,
                  hookName,
                  innerContent,
                  innerHookName,
                  innerHookParams,
                }
                let code
                if (isTypeScript) {
                  const typeName = 'UseContractWriteConfig'
                  imports.add(typeName)
                  code = getHookCode({
                    type: 'ts',
                    options: {
                      ...options,
                      extraTypeParams,
                      genericSlotType: 'functionName',
                      genericSlotValue: item.name,
                      typeName,
                    },
                  })
                } else
                  code = getHookCode({
                    type: 'js',
                    options: {
                      ...options,
                      defaultItemType: 'functionName',
                      defaultItemValue: item.name,
                    },
                  })
                content.push(code)
              }
            }
          }

          if (hooks.usePrepareContractWrite) {
            const innerHookName = 'usePrepareContractWrite'
            const hookName = innerHookName.replace('Contract', baseHookName)
            imports.add(innerHookName)
            const options = {
              contract,
              hookName,
              innerContent,
              innerHookName,
              innerHookParams,
            }
            let code
            if (isTypeScript) {
              const typeName = 'UsePrepareContractWriteConfig'
              imports.add(typeName)
              code = getHookCode({
                type: 'ts',
                options: {
                  ...options,
                  extraTypeParams,
                  genericSlotType: 'functionName',
                  typeName,
                },
              })
            } else code = getHookCode({ type: 'js', options })
            content.push(code)
          }
          if (hooks.usePrepareContractFunctionWrite) {
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
                const innerHookName = 'usePrepareContractWrite'
                const hookName = innerHookName.replace(
                  'ContractWrite',
                  baseHookName + pascalCase(item.name),
                )
                imports.add(innerHookName)
                const options = {
                  contract,
                  hookName,
                  innerContent,
                  innerHookName,
                  innerHookParams,
                }
                let code
                if (isTypeScript) {
                  const typeName = 'UsePrepareContractWriteConfig'
                  imports.add(typeName)
                  code = getHookCode({
                    type: 'ts',
                    options: {
                      ...options,
                      extraTypeParams,
                      genericSlotType: 'functionName',
                      genericSlotValue: item.name,
                      typeName,
                    },
                  })
                } else
                  code = getHookCode({
                    type: 'js',
                    options: {
                      ...options,
                      defaultItemType: 'functionName',
                      defaultItemValue: item.name,
                    },
                  })
                content.push(code)
              }
            }
          }
        }

        if (hasEvent) {
          if (hooks.useContractEvent) {
            const innerHookName = 'useContractEvent'
            const hookName = innerHookName.replace('Contract', baseHookName)
            imports.add(innerHookName)
            const options = {
              contract,
              hookName,
              innerContent,
              innerHookName,
              innerHookParams,
            }
            let code
            if (isTypeScript) {
              const typeName = 'UseContractEventConfig'
              imports.add(typeName)
              code = getHookCode({
                type: 'ts',
                options: {
                  ...options,
                  extraTypeParams,
                  genericSlotType: 'eventName',
                  typeName,
                },
              })
            } else code = getHookCode({ type: 'js', options })
            content.push(code)
          }
          if (hooks.useContractItemEvent) {
            const contractNames = new Set<string>()
            for (const item of contract.abi) {
              if (item.type === 'event') {
                // Skip overrides since they are captured by same hook
                if (contractNames.has(item.name)) continue
                contractNames.add(item.name)
                const innerHookName = 'useContractEvent'
                const hookName = innerHookName.replace(
                  'Contract',
                  baseHookName + pascalCase(item.name),
                )
                imports.add(innerHookName)
                const options = {
                  contract,
                  hookName,
                  innerContent,
                  innerHookName,
                  innerHookParams,
                }
                let code
                if (isTypeScript) {
                  const typeName = 'UseContractEventConfig'
                  imports.add(typeName)
                  code = getHookCode({
                    type: 'ts',
                    options: {
                      ...options,
                      extraTypeParams,
                      genericSlotType: 'eventName',
                      genericSlotValue: item.name,
                      typeName,
                    },
                  })
                } else
                  code = getHookCode({
                    type: 'js',
                    options: {
                      ...options,
                      defaultItemType: 'eventName',
                      defaultItemValue: item.name,
                    },
                  })
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

type SharedOptions = {
  contract: Contract
  hookName: string
  innerContent?: string
  innerHookName: string
  innerHookParams: Record<string, string>
}
type GetHookCode =
  | {
      type: 'ts'
      options: SharedOptions & {
        extraTypeParams?: string
        genericSlotType?: 'eventName' | 'functionName'
        genericSlotValue?: string
        typeName: string
      }
    }
  | {
      type: 'js'
      options: SharedOptions & {
        defaultItemType?: 'eventName' | 'functionName'
        defaultItemValue?: string
      }
    }

function getHookCode({ type, options }: GetHookCode) {
  const { contract, hookName, innerContent, innerHookName, innerHookParams } =
    options
  const params = { ...innerHookParams }
  if (type === 'ts' && options.genericSlotType && options.genericSlotValue)
    params[options.genericSlotType] = `'${options.genericSlotValue}'`
  const innerHookConfig =
    Object.entries(params).reduce((prev, curr) => {
      return dedent`
        ${prev}
        ${curr[0]}: ${curr[1]},
      `
    }, '{') + '...config}'

  let itemValue
  let itemType
  if (type === 'ts') {
    itemValue = options.genericSlotValue
    itemType = options.genericSlotType
  } else {
    itemValue = options.defaultItemValue
    itemType = options.defaultItemType
  }
  let description = `Wraps {@link ${innerHookName}} with \`abi\` set to {@link ${contract.meta.abiName}}`
  if (itemValue && itemType)
    description += ` and \`${itemType}\` set to \`"${itemValue}"\``
  const addressDocString = getAddressDocString({ address: contract.address })

  if (type === 'js')
    return dedent`
      /**
       * ${description}. ${addressDocString}
       */
      export function ${hookName}(config = {}) {
        ${innerContent}
        return ${innerHookName}(${innerHookConfig})
      }
    `

  const {
    extraTypeParams = '',
    genericSlotType,
    genericSlotValue,
    typeName,
  } = options
  let omitted = `'abi'`
  if (contract.meta.addressName) omitted += ` | 'address'`
  if (genericSlotValue) omitted += ` | '${genericSlotType}'`
  if (!genericSlotType)
    return dedent`
      /**
       * ${description}. ${addressDocString}
       */
      export function ${hookName}(
        config: Omit<${typeName}, ${omitted}>${extraTypeParams} = {} as any,
      ) {
        ${innerContent}
        return ${innerHookName}(${innerHookConfig})
      }
    `

  const genericName = genericSlotType ? `T${pascalCase(genericSlotType)}` : ''
  const genericValue = genericSlotValue ? `'${genericSlotValue}'` : 'string'

  // TODO: Refactor way generics are constructed in template string and
  // don't hardcode this logic inside function
  const isContractWrite = innerHookName === 'useContractWrite'
  const modeGenericSlot = isContractWrite
    ? "TMode extends 'prepared' | 'recklesslyUnprepared',"
    : ''
  const modeGenericValue = isContractWrite ? 'TMode, ' : ''

  return dedent`
    /**
     * ${description}. ${addressDocString}
     */
    export function ${hookName}<
      ${modeGenericSlot}
      TAbi extends readonly unknown[] = typeof ${contract.meta.abiName},
      ${genericName} extends string = ${genericValue}
    >(
      config: Omit<${typeName}<${modeGenericValue}TAbi, ${genericName}>, ${omitted}>${extraTypeParams} = {} as any,
    ) {
      ${innerContent}
      return ${innerHookName}(${innerHookConfig} as ${typeName}<${modeGenericValue}TAbi, ${genericName}>)
    }
  `
}

function getAbiItemTypes(abi: Contract['abi']) {
  let hasReadFunction,
    hasWriteFunction,
    hasEvent = false
  for (const component of abi) {
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
  return { hasReadFunction, hasWriteFunction, hasEvent } as const
}
