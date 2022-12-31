import { pascalCase } from 'change-case'
import dedent from 'dedent'
import { execa } from 'execa'

import type { Contract, Plugin } from '../config'
import type { RequiredBy } from '../types'
import { getAddressDocString, getPackageManager } from '../utils'

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

type ReactResult = RequiredBy<Plugin, 'run' | 'validate'>

export function react(config: ReactConfig = {}): ReactResult {
  const hooks = {
    useContract: true,
    useContractEvent: true,
    useContractItemEvent: true,
    useContractRead: true,
    useContractFunctionRead: true,
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

        const baseHookName = pascalCase(contract.name)
        const innerHookParams: Record<string, string> = {
          abi: contract.meta.abiName,
        }
        let omittedTypeParams = '"abi"'
        let typeParams = ''
        if (contract.meta.addressName) {
          if (typeof contract.address === 'object') {
            omittedTypeParams = '"abi" | "address"'
            if (Object.keys(contract.address).length > 1) {
              typeParams = dedent`& {
                chainId?: keyof typeof ${contract.meta.addressName}
              }`
              innerHookParams[
                'address'
              ] = `config.chainId ? ${contract.meta.addressName}[config.chainId] : undefined`
            } else
              innerHookParams['address'] = `${contract.meta.addressName}[${
                Object.keys(contract.address!)[0]
              }]`
          } else if (contract.address)
            innerHookParams['address'] = contract.meta.addressName
        }

        if (hooks.useContract) {
          const innerHookName = 'useContract'
          const hookName = innerHookName.replace('Contract', baseHookName)
          imports.add(innerHookName)
          const innerHookConfig = getInnerHookConfig({ innerHookParams })
          let code
          if (isTypeScript) {
            const typeName = 'UseContractConfig'
            imports.add(typeName)
            code = dedent`
              /**
               ${getDescriptionDocString({
                 innerHookName,
                 abiName: contract.meta.abiName,
               })} ${getAddressDocString({ address: contract.address })}
              */
              export function ${hookName}(config: Omit<${typeName}, ${omittedTypeParams}>${typeParams} = {} as any) {
                return ${innerHookName}(${innerHookConfig})
              }
            `
          } else
            code = getJSHookCode({
              contract,
              hookName,
              innerHookName,
              innerHookParams,
            })
          content.push(code)
        }

        if (hasReadFunction) {
          if (hooks.useContractRead) {
            const innerHookName = 'useContractRead'
            const hookName = innerHookName.replace('Contract', baseHookName)
            imports.add(innerHookName)
            let code
            if (isTypeScript) {
              const typeName = 'UseContractReadConfig'
              imports.add(typeName)
              code = getTSHookCode({
                contract,
                hookName,
                innerHookName,
                innerHookParams,
                itemType: 'functionName',
                omittedTypeParams,
                typeName,
                typeParams,
              })
            } else
              code = getJSHookCode({
                contract,
                hookName,
                innerHookName,
                innerHookParams,
              })
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
                if (contractNames.has(item.name)) continue
                contractNames.add(item.name)
                const innerHookName = 'useContractRead'
                const hookName = innerHookName.replace(
                  'ContractRead',
                  baseHookName + pascalCase(item.name),
                )
                imports.add(innerHookName)
                let code
                if (isTypeScript) {
                  const typeName = 'UseContractReadConfig'
                  imports.add(typeName)
                  code = getTSHookCode({
                    contract,
                    hookName,
                    innerHookName,
                    innerHookParams,
                    itemName: item.name,
                    itemType: 'functionName',
                    omittedTypeParams,
                    typeName,
                    typeParams,
                  })
                } else
                  code = getJSHookCode({
                    contract,
                    hookName,
                    innerHookName,
                    innerHookParams,
                    itemName: item.name,
                    itemType: 'functionName',
                  })
                content.push(code)
              }
            }
          }
        }

        if (hasWriteFunction) {
          if (hooks.usePrepareContractWrite) {
            const innerHookName = 'usePrepareContractWrite'
            const hookName = innerHookName.replace('Contract', baseHookName)
            imports.add(innerHookName)
            let code
            if (isTypeScript) {
              const typeName = 'UsePrepareContractWriteConfig'
              imports.add(typeName)
              code = getTSHookCode({
                contract,
                hookName,
                innerHookName,
                innerHookParams,
                itemType: 'functionName',
                omittedTypeParams,
                typeName,
                typeParams,
              })
            } else
              code = getJSHookCode({
                contract,
                hookName,
                innerHookName,
                innerHookParams,
              })
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
                if (contractNames.has(item.name)) continue
                contractNames.add(item.name)
                const innerHookName = 'usePrepareContractWrite'
                const hookName = innerHookName.replace(
                  'ContractWrite',
                  baseHookName + pascalCase(item.name),
                )
                imports.add(innerHookName)
                let code
                if (isTypeScript) {
                  const typeName = 'UsePrepareContractWriteConfig'
                  imports.add(typeName)
                  code = getTSHookCode({
                    contract,
                    hookName,
                    innerHookName,
                    innerHookParams,
                    itemName: item.name,
                    itemType: 'functionName',
                    omittedTypeParams,
                    typeName,
                    typeParams,
                  })
                } else
                  code = getJSHookCode({
                    contract,
                    hookName,
                    innerHookName,
                    innerHookParams,
                    itemName: item.name,
                    itemType: 'functionName',
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
            let code
            if (isTypeScript) {
              const typeName = 'UseContractEventConfig'
              imports.add(typeName)
              code = getTSHookCode({
                contract,
                hookName,
                innerHookName,
                innerHookParams,
                itemType: 'eventName',
                omittedTypeParams,
                typeName,
                typeParams,
              })
            } else
              code = getJSHookCode({
                contract,
                hookName,
                innerHookName,
                innerHookParams,
              })
            content.push(code)
          }
          if (hooks.useContractItemEvent) {
            const contractNames = new Set<string>()
            for (const item of contract.abi) {
              if (item.type === 'event') {
                if (contractNames.has(item.name)) continue
                contractNames.add(item.name)
                const innerHookName = 'useContractEvent'
                const hookName = innerHookName.replace(
                  'ContractEvent',
                  baseHookName + pascalCase(item.name),
                )
                imports.add(innerHookName)
                let code
                if (isTypeScript) {
                  const typeName = 'UseContractEventConfig'
                  imports.add(typeName)
                  code = getTSHookCode({
                    contract,
                    hookName,
                    innerHookName,
                    innerHookParams,
                    itemName: item.name,
                    itemType: 'eventName',
                    omittedTypeParams,
                    typeName,
                    typeParams,
                  })
                } else
                  code = getJSHookCode({
                    contract,
                    hookName,
                    innerHookName,
                    innerHookParams,
                    itemName: item.name,
                    itemType: 'eventName',
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
    async validate() {
      const { packageManager, check, install } = await getPackageCommands()
      try {
        const { stdout } = await execa(packageManager, check, {
          cwd: process.cwd(),
        })
        if (stdout !== '') return
        // eslint-disable-next-line no-empty
      } catch {}

      throw new Error(dedent`
        wagmi must be installed to use React plugin.
        To install, run: ${packageManager} ${install.join(' ')}
      `)
    },
  }
}

function getTSHookCode({
  contract,
  hookName,
  innerHookName,
  innerHookParams,
  itemName,
  itemType,
  omittedTypeParams,
  typeName,
  typeParams,
}: {
  contract: Contract
  docString?: string
  hookName: string
  innerHookName: string
  innerHookParams: Record<string, string>
  itemName?: string
  itemType: 'functionName' | 'eventName'
  omittedTypeParams: string
  typeName: string
  typeParams: string
}) {
  const innerHookConfig = getInnerHookConfig({
    itemName,
    itemType,
    innerHookParams,
  })
  const omitted = `${omittedTypeParams}${itemType ? ` | "${itemType}"` : ''}`
  const itemGeneric = `T${pascalCase(itemType)}`
  return dedent`
    /**
     ${getDescriptionDocString({
       innerHookName,
       abiName: contract.meta.abiName,
       itemName,
       itemType,
     })} ${getAddressDocString({ address: contract.address })}
    */
    export function ${hookName}<
      TAbi extends readonly unknown[] = typeof ${contract.meta.abiName},
      ${itemGeneric} extends string = ${itemName ? `"${itemName}"` : 'string'}
    >(
      config: Omit<${typeName}<TAbi, ${itemGeneric}>, ${omitted}>${typeParams} = {} as any,
    ) {
      return ${innerHookName}(${innerHookConfig} as ${typeName}<TAbi, ${itemGeneric}>)
    }
  `
}

function getJSHookCode({
  contract,
  hookName,
  innerHookName,
  innerHookParams,
  itemName,
  itemType,
}: {
  contract: Contract
  hookName: string
  innerHookName: string
  innerHookParams: Record<string, string>
  itemName?: string
  itemType?: 'functionName' | 'eventName'
}) {
  const innerHookConfig = getInnerHookConfig({
    itemName,
    itemType,
    innerHookParams,
  })
  return dedent`
    /**
     ${getDescriptionDocString({
       innerHookName,
       abiName: contract.meta.abiName,
       itemName,
       itemType,
     })} ${getAddressDocString({ address: contract.address })}
    */
    export function ${hookName}(config = {}) {
      return ${innerHookName}(${innerHookConfig})
    }
  `
}

function getInnerHookConfig({
  itemName,
  itemType,
  innerHookParams,
}: {
  itemName?: string
  itemType?: 'functionName' | 'eventName'
  innerHookParams: Record<string, string>
}) {
  const params = { ...innerHookParams }
  if (itemType && itemName) params[itemType] = `"${itemName}"`
  return (
    Object.entries(params).reduce((prev, curr) => {
      return dedent`
    ${prev}
    ${curr[0]}: ${curr[1]},
  `
    }, '{') + `...config}`
  )
}

function getDescriptionDocString({
  abiName,
  innerHookName,
  itemName,
  itemType,
}: {
  abiName: string
  innerHookName: string
  itemName?: string
  itemType?: 'functionName' | 'eventName'
}) {
  return dedent`
     * Wraps {@link ${innerHookName}} with \`abi\` set to {@link ${abiName}}${
    itemName && itemType ? ` and \`${itemType}\` set to \`"${itemName}"\`` : ''
  }.
  `
}

async function getPackageCommands() {
  const packageManager = await getPackageManager()
  switch (packageManager) {
    case 'yarn':
      return {
        packageManager,
        check: ['list', '--pattern', 'wagmi'],
        install: ['add', 'wagmi'],
      }
    case 'npm':
      return {
        packageManager,
        check: ['ls', 'wagmi'],
        install: ['install', '--save', 'wagmi'],
      }
    case 'pnpm':
      return {
        packageManager,
        check: ['ls', 'wagmi'],
        install: ['add', 'wagmi'],
      }
  }
}
