import { pascalCase } from 'change-case'
import dedent from 'dedent'

import type { Contract, Plugin } from '../config'
import type { RequiredBy } from '../types'
import { getAddressDocString, getIsPackageInstalled } from '../utils'

type ActionsConfig = {
  /**
   * Generate `getContract` action.
   *
   * @default true
   */
  getContract?: boolean
  /**
   * Override detected import source for actions.
   */
  overridePackageName?: 'wagmi/actions' | '@wagmi/core'
  /**
   * Generate `prepareWriteContract` action.
   *
   * @default true
   */
  prepareWriteContract?: boolean
  /**
   * Generate `readContract` action.
   *
   * @default true
   */
  readContract?: boolean
  /**
   * Generate `watchContractEvent` action.
   *
   * @default true
   */
  watchContractEvent?: boolean
}

type ActionsResult = RequiredBy<Plugin, 'run'>

export function actions(config: ActionsConfig = {}): ActionsResult {
  const actions = {
    getContract: true,
    prepareWriteContract: true,
    readContract: true,
    watchContractEvent: true,
    ...config,
  }
  return {
    name: 'Core',
    async run({ contracts, isTypeScript }) {
      const imports = new Set<string>([])

      const content: string[] = []
      for (const contract of contracts) {
        const baseActionName = pascalCase(contract.name)
        const innerActionParams: Record<string, string> = {
          abi: contract.meta.abiName,
        }
        let extraTypeParams = ''
        if (contract.meta.addressName) {
          if (typeof contract.address === 'object') {
            if (Object.keys(contract.address).length > 1) {
              extraTypeParams = dedent`& {
                chainId: keyof typeof ${contract.meta.addressName}
              }`
              innerActionParams[
                'address'
              ] = `${contract.meta.addressName}[config.chainId]`
            } else
              innerActionParams['address'] = `${contract.meta.addressName}[${
                Object.keys(contract.address!)[0]
              }]`
          } else if (contract.address)
            innerActionParams['address'] = contract.meta.addressName
        }
        const { hasReadFunction, hasWriteFunction, hasEvent } = getAbiItemTypes(
          contract.abi,
        )

        if (actions.getContract) {
          const innerActionName = 'getContract'
          const actionName = innerActionName.replace('Contract', baseActionName)
          imports.add(innerActionName)
          const options = {
            contract,
            actionName,
            innerActionName,
            innerActionParams,
          }
          let code
          if (isTypeScript) {
            const typeName = 'GetContractArgs'
            imports.add(typeName)
            code = getActionCode({
              type: 'ts',
              options: {
                ...options,
                extraTypeParams,
                typeName,
              },
            })
          } else code = getActionCode({ type: 'js', options })
          content.push(code)
        }

        if (hasReadFunction) {
          if (actions.readContract) {
            const innerActionName = 'readContract'
            const actionName = innerActionName.replace(
              'Contract',
              baseActionName,
            )
            imports.add(innerActionName)
            const options = {
              contract,
              actionName,
              innerActionName,
              innerActionParams,
            }
            let code
            if (isTypeScript) {
              const typeName = 'ReadContractConfig'
              imports.add(typeName)
              code = getActionCode({
                type: 'ts',
                options: {
                  ...options,
                  extraTypeParams,
                  genericSlotType: 'functionName',
                  typeName,
                },
              })
            } else code = getActionCode({ type: 'js', options })
            content.push(code)
          }
        }

        if (hasWriteFunction) {
          if (actions.prepareWriteContract) {
            const innerActionName = 'prepareWriteContract'
            const actionName = innerActionName.replace(
              'Contract',
              baseActionName,
            )
            imports.add(innerActionName)
            const options = {
              contract,
              actionName,
              innerActionName,
              innerActionParams,
            }
            let code
            if (isTypeScript) {
              const typeName = 'PrepareWriteContractConfig'
              imports.add(typeName)
              code = getActionCode({
                type: 'ts',
                options: {
                  ...options,
                  extraTypeParams,
                  genericSlotType: 'functionName',
                  typeName,
                },
              })
            } else code = getActionCode({ type: 'js', options })
            content.push(code)
          }
        }

        if (hasEvent) {
          if (actions.watchContractEvent) {
            const innerActionName = 'watchContractEvent'
            const actionName = innerActionName.replace(
              'Contract',
              baseActionName,
            )
            imports.add(innerActionName)
            const options = {
              contract,
              actionName,
              innerActionName,
              innerActionParams,
            }
            let code
            if (isTypeScript) {
              const typeName = 'WatchContractEventConfig'
              const callbackTypeName = 'WatchContractEventCallback'
              imports.add(typeName)
              imports.add(callbackTypeName)
              code = getActionCode({
                type: 'ts',
                options: {
                  ...options,
                  callbackTypeName,
                  extraTypeParams,
                  genericSlotType: 'eventName',
                  typeName,
                },
              })
            } else
              code = getActionCode({
                type: 'js',
                options: {
                  ...options,
                  defaultItemType: 'eventName',
                },
              })
            content.push(code)
          }
        }
      }

      let packageName
      if (config.overridePackageName) packageName = config.overridePackageName
      if (await getIsPackageInstalled({ packageName: 'wagmi' }))
        packageName = 'wagmi/actions'
      else if (await getIsPackageInstalled({ packageName: '@wagmi/core' }))
        packageName = '@wagmi/core'
      else packageName = '@wagmi/core'

      const importValues = [...imports.values()]
      return {
        imports: importValues.length
          ? dedent`
            import { ${importValues.join(', ')} } from '${packageName}'
          `
          : '',
        content: content.join('\n\n'),
      }
    },
  }
}

type SharedOptions = {
  contract: Contract
  actionName: string
  innerActionName: string
  innerActionParams: Record<string, string>
}
type GetActionCode =
  | {
      type: 'ts'
      options: SharedOptions & {
        extraTypeParams?: string
        genericSlotType?: 'eventName' | 'functionName'
        genericSlotValue?: string
        typeName: string
        callbackTypeName?: string
      }
    }
  | {
      type: 'js'
      options: SharedOptions & {
        defaultItemType?: 'eventName' | 'functionName'
        defaultItemValue?: string
      }
    }

function getActionCode({ type, options }: GetActionCode) {
  const { contract, actionName, innerActionName, innerActionParams } = options
  const params = { ...innerActionParams }
  if (type === 'ts' && options.genericSlotType && options.genericSlotValue)
    params[options.genericSlotType] = `'${options.genericSlotValue}'`
  const innerActionConfig =
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
  let description = `Wraps {@link ${innerActionName}} with \`abi\` set to {@link ${contract.meta.abiName}}`
  if (itemValue && itemType)
    description += ` and \`${itemType}\` set to \`"${itemValue}"\``
  const addressDocString = getAddressDocString({ address: contract.address })
  const callbackArg = itemType === 'eventName' ? ', callback' : ''

  if (type === 'js')
    return dedent`
      /**
       * ${description}. ${addressDocString}
       */
      export function ${actionName}(config${callbackArg}) {
        return ${innerActionName}(${innerActionConfig}${callbackArg})
      }
    `

  const {
    callbackTypeName,
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
      export function ${actionName}(
        config: Omit<${typeName}, ${omitted}>${extraTypeParams}
      ) {
        return ${innerActionName}(${innerActionConfig})
      }
    `

  const genericName = genericSlotType ? `T${pascalCase(genericSlotType)}` : ''
  const genericValue = genericSlotValue ? `'${genericSlotValue}'` : 'string'
  const callbackType = callbackTypeName
    ? `, callback: ${callbackTypeName}<TAbi, ${genericName}>`
    : ''
  return dedent`
    /**
     * ${description}. ${addressDocString}
     */
    export function ${actionName}<
      TAbi extends readonly unknown[] = typeof ${contract.meta.abiName},
      ${genericName} extends string = ${genericValue}
    >(
      config: Omit<${typeName}<TAbi, ${genericName}>, ${omitted}>${extraTypeParams}${callbackType}
    ) {
      return ${innerActionName}(${innerActionConfig} as unknown as ${typeName}<TAbi, ${genericName}>${callbackArg})
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
