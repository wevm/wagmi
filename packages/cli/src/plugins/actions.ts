import { pascalCase } from 'change-case'

import { type Contract, type Plugin } from '../config.js'
import { type Evaluate, type RequiredBy } from '../types.js'
import { getAddressDocString } from '../utils/getAddressDocString.js'
import { getIsPackageInstalled } from '../utils/packages.js'

export type ActionsConfig = {
  getActionName?:
    | 'legacy' // TODO: Deprecate `'legacy'` option
    | ((options: {
        contractName: string
        type: 'read' | 'simulate' | 'watch' | 'write'
      }) => string)
  overridePackageName?: '@wagmi/core' | 'wagmi' | undefined
}

type ActionsResult = Evaluate<RequiredBy<Plugin, 'run'>>

export function actions(config: ActionsConfig = {}): ActionsResult {
  function getActionName(
    type: 'read' | 'simulate' | 'watch' | 'write',
    contractName: string,
  ) {
    const ContractName = pascalCase(contractName)

    if (typeof config.getActionName === 'function')
      return config.getActionName({
        type,
        contractName: ContractName,
      })
    else if (typeof config.getActionName === 'string') {
      switch (type) {
        case 'simulate':
          return `prepareWrite${ContractName}`
      }
    }

    const actionName = `${type}${ContractName}`
    if (type === 'watch') return `${actionName}Event`
    return actionName
  }

  return {
    name: 'Action',
    async run({ contracts }) {
      const imports = new Set<string>([])
      const content: string[] = []
      const pure = '/*#__PURE__*/'

      for (const contract of contracts) {
        let hasReadFunction = false
        let hasWriteFunction = false
        let hasEvent = false
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

        let innerContent
        if (contract.meta.addressName)
          innerContent = `{ abi: ${contract.meta.abiName}, address: ${contract.meta.addressName} }`
        else innerContent = `{ abi: ${contract.meta.abiName} }`

        if (hasEvent) {
          imports.add('createWatchContractEvent')
          const actionName = getActionName('watch', contract.name)
          const docString = genDocString('watchContractEvent', contract)
          content.push(
            `${docString}
export const ${actionName} = ${pure} createWatchContractEvent(${innerContent})`,
          )
        }

        if (hasReadFunction) {
          imports.add('createReadContract')
          const actionName = getActionName('read', contract.name)
          const docString = genDocString('readContract', contract)
          content.push(
            `${docString}
export const ${actionName} = ${pure} createReadContract(${innerContent})`,
          )
        }

        if (hasWriteFunction) {
          {
            imports.add('createWriteContract')
            const actionName = getActionName('write', contract.name)
            const docString = genDocString('writeContract', contract)
            content.push(
              `${docString}
export const ${actionName} = ${pure} createWriteContract(${innerContent})`,
            )
          }

          {
            imports.add('createSimulateContract')
            const actionName = getActionName('simulate', contract.name)
            const docString = genDocString('simulateContract', contract)
            content.push(
              `${docString}
export const ${actionName} = ${pure} createSimulateContract(${innerContent})`,
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

function genDocString(actionName: string, contract: Contract) {
  const docString = getAddressDocString({ address: contract.address })
  if (docString)
    return `/**
 * Wraps __{@link ${actionName}}__ with \`abi\` set to __{@link ${contract.meta.abiName}}__
 * 
 ${docString}
 */`

  return `/**
 * Wraps __{@link ${actionName}}__ with \`abi\` set to __{@link ${contract.meta.abiName}}__
 */`
}
