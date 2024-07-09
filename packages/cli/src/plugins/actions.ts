import { pascalCase } from 'change-case'

import type { Contract, Plugin } from '../config.js'
import type { Compute, RequiredBy } from '../types.js'
import { getAddressDocString } from '../utils/getAddressDocString.js'
import { getIsPackageInstalled } from '../utils/packages.js'

export type ActionsConfig = {
  getActionName?:
    | 'legacy' // TODO: Deprecate `'legacy'` option
    | ((options: {
        contractName: string
        itemName?: string | undefined
        type: 'read' | 'simulate' | 'watch' | 'write'
      }) => string)
  overridePackageName?: '@wagmi/core' | 'wagmi' | undefined
}

type ActionsResult = Compute<RequiredBy<Plugin, 'run'>>

export function actions(config: ActionsConfig = {}): ActionsResult {
  return {
    name: 'Action',
    async run({ contracts }) {
      const imports = new Set<string>([])
      const content: string[] = []
      const pure = '/*#__PURE__*/'

      const actionNames = new Set<string>()
      for (const contract of contracts) {
        let hasReadFunction = false
        let hasWriteFunction = false
        let hasEvent = false
        const readItems = []
        const writeItems = []
        const eventItems = []
        for (const item of contract.abi) {
          if (item.type === 'function')
            if (
              item.stateMutability === 'view' ||
              item.stateMutability === 'pure'
            ) {
              hasReadFunction = true
              readItems.push(item)
            } else {
              hasWriteFunction = true
              writeItems.push(item)
            }
          else if (item.type === 'event') {
            hasEvent = true
            eventItems.push(item)
          }
        }

        let innerContent: string
        if (contract.meta.addressName)
          innerContent = `abi: ${contract.meta.abiName}, address: ${contract.meta.addressName}`
        else innerContent = `abi: ${contract.meta.abiName}`

        if (hasReadFunction) {
          const actionName = getActionName(
            config,
            actionNames,
            'read',
            contract.name,
          )
          const docString = genDocString('readContract', contract)
          const functionName = 'createReadContract'
          imports.add(functionName)
          content.push(
            `${docString}
export const ${actionName} = ${pure} ${functionName}({ ${innerContent} })`,
          )

          const names = new Set<string>()
          for (const item of readItems) {
            if (item.type !== 'function') continue
            if (
              item.stateMutability !== 'pure' &&
              item.stateMutability !== 'view'
            )
              continue

            // Skip overrides since they are captured by same hook
            if (names.has(item.name)) continue
            names.add(item.name)

            const hookName = getActionName(
              config,
              actionNames,
              'read',
              contract.name,
              item.name,
            )
            const docString = genDocString('readContract', contract, {
              name: 'functionName',
              value: item.name,
            })
            content.push(
              `${docString}
export const ${hookName} = ${pure} ${functionName}({ ${innerContent}, functionName: '${item.name}' })`,
            )
          }
        }

        if (hasWriteFunction) {
          {
            const actionName = getActionName(
              config,
              actionNames,
              'write',
              contract.name,
            )
            const docString = genDocString('writeContract', contract)
            const functionName = 'createWriteContract'
            imports.add(functionName)
            content.push(
              `${docString}
export const ${actionName} = ${pure} ${functionName}({ ${innerContent} })`,
            )

            const names = new Set<string>()
            for (const item of writeItems) {
              if (item.type !== 'function') continue
              if (
                item.stateMutability !== 'nonpayable' &&
                item.stateMutability !== 'payable'
              )
                continue

              // Skip overrides since they are captured by same hook
              if (names.has(item.name)) continue
              names.add(item.name)

              const actionName = getActionName(
                config,
                actionNames,
                'write',
                contract.name,
                item.name,
              )
              const docString = genDocString('writeContract', contract, {
                name: 'functionName',
                value: item.name,
              })
              content.push(
                `${docString}
export const ${actionName} = ${pure} ${functionName}({ ${innerContent}, functionName: '${item.name}' })`,
              )
            }
          }

          {
            const actionName = getActionName(
              config,
              actionNames,
              'simulate',
              contract.name,
            )
            const docString = genDocString('simulateContract', contract)
            const functionName = 'createSimulateContract'
            imports.add(functionName)
            content.push(
              `${docString}
export const ${actionName} = ${pure} ${functionName}({ ${innerContent} })`,
            )

            const names = new Set<string>()
            for (const item of writeItems) {
              if (item.type !== 'function') continue
              if (
                item.stateMutability !== 'nonpayable' &&
                item.stateMutability !== 'payable'
              )
                continue

              // Skip overrides since they are captured by same hook
              if (names.has(item.name)) continue
              names.add(item.name)

              const actionName = getActionName(
                config,
                actionNames,
                'simulate',
                contract.name,
                item.name,
              )
              const docString = genDocString('simulateContract', contract, {
                name: 'functionName',
                value: item.name,
              })
              content.push(
                `${docString}
export const ${actionName} = ${pure} ${functionName}({ ${innerContent}, functionName: '${item.name}' })`,
              )
            }
          }
        }

        if (hasEvent) {
          const actionName = getActionName(
            config,
            actionNames,
            'watch',
            contract.name,
          )
          const docString = genDocString('watchContractEvent', contract)
          const functionName = 'createWatchContractEvent'
          imports.add(functionName)
          content.push(
            `${docString}
export const ${actionName} = ${pure} ${functionName}({ ${innerContent} })`,
          )

          const names = new Set<string>()
          for (const item of eventItems) {
            if (item.type !== 'event') continue

            // Skip overrides since they are captured by same hook
            if (names.has(item.name)) continue
            names.add(item.name)

            const actionName = getActionName(
              config,
              actionNames,
              'watch',
              contract.name,
              item.name,
            )
            const docString = genDocString('watchContractEvent', contract, {
              name: 'eventName',
              value: item.name,
            })
            content.push(
              `${docString}
export const ${actionName} = ${pure} ${functionName}({ ${innerContent}, eventName: '${item.name}' })`,
            )
          }
        }
      }

      const importValues = [...imports.values()]

      let packageName = '@wagmi/core/codegen'
      if (config.overridePackageName) {
        switch (config.overridePackageName) {
          case '@wagmi/core':
            packageName = '@wagmi/core/codegen'
            break
          case 'wagmi':
            packageName = 'wagmi/codegen'
            break
        }
      } else if (await getIsPackageInstalled({ packageName: 'wagmi' }))
        packageName = 'wagmi/codegen'
      else if (await getIsPackageInstalled({ packageName: '@wagmi/core' }))
        packageName = '@wagmi/core/codegen'

      return {
        imports: importValues.length
          ? `import { ${importValues.join(', ')} } from '${packageName}'\n`
          : '',
        content: content.join('\n\n'),
      }
    },
  }
}

function genDocString(
  actionName: string,
  contract: Contract,
  item?: { name: string; value: string },
) {
  let description = `Wraps __{@link ${actionName}}__ with \`abi\` set to __{@link ${contract.meta.abiName}}__`
  if (item) description += ` and \`${item.name}\` set to \`"${item.value}"\``

  const docString = getAddressDocString({ address: contract.address })
  if (docString)
    return `/**
 * ${description}
 * 
 ${docString}
 */`

  return `/**
 * ${description}
 */`
}

function getActionName(
  config: ActionsConfig,
  actionNames: Set<string>,
  type: 'read' | 'simulate' | 'watch' | 'write',
  contractName: string,
  itemName?: string | undefined,
) {
  const ContractName = pascalCase(contractName)
  const ItemName = itemName ? pascalCase(itemName) : undefined

  let actionName: string
  if (typeof config.getActionName === 'function')
    actionName = config.getActionName({
      type,
      contractName: ContractName,
      itemName: ItemName,
    })
  else if (typeof config.getActionName === 'string' && type === 'simulate') {
    actionName = `prepareWrite${ContractName}${ItemName ?? ''}`
  } else {
    actionName = `${type}${ContractName}${ItemName ?? ''}`
    if (type === 'watch') actionName = `${actionName}Event`
  }

  if (actionNames.has(actionName))
    throw new Error(
      `Action name "${actionName}" must be unique for contract "${contractName}". Try using \`getActionName\` to create a unique name.`,
    )

  actionNames.add(actionName)
  return actionName
}
