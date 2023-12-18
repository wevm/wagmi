import { pascalCase } from 'change-case'

import { type Contract, type Plugin } from '../config.js'
import { type Evaluate, type RequiredBy } from '../types.js'
import { getAddressDocString } from '../utils/getAddressDocString.js'

export type ReactConfig = {
  getHookName?:
    | 'legacy' // TODO: Deprecate `'legacy'` option
    | ((options: {
        contractName: string
        type: 'read' | 'simulate' | 'watch' | 'write'
      }) => `use${string}`)
}

type ReactResult = Evaluate<RequiredBy<Plugin, 'run'>>

export function react(config: ReactConfig = {}): ReactResult {
  function getHookName(
    type: 'read' | 'simulate' | 'watch' | 'write',
    contractName: string,
  ) {
    const ContractName = pascalCase(contractName)

    if (typeof config.getHookName === 'function')
      return config.getHookName({
        type,
        contractName: ContractName,
      })
    else if (typeof config.getHookName === 'string') {
      switch (type) {
        case 'read':
          return `use${ContractName}Read`
        case 'simulate':
          return `usePrepare${ContractName}Write`
        case 'watch':
          return `use${ContractName}Event`
        case 'write':
          return `use${ContractName}Write`
      }
    }

    const hookName = `use${pascalCase(type)}${ContractName}`
    if (type === 'watch') return `${hookName}Event`
    return hookName
  }

  return {
    name: 'React',
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
          const hookName = getHookName('watch', contract.name)
          const docString = genDocString('useWatchContractEvent', contract)
          const functionName = 'createUseWatchContractEvent'
          imports.add(functionName)
          content.push(
            `${docString}
export const ${hookName} = ${pure} ${functionName}(${innerContent})`,
          )
        }

        if (hasReadFunction) {
          const hookName = getHookName('read', contract.name)
          const docString = genDocString('useReadContract', contract)
          const functionName = 'createUseReadContract'
          imports.add(functionName)
          content.push(
            `${docString}
export const ${hookName} = ${pure} ${functionName}(${innerContent})`,
          )
        }

        if (hasWriteFunction) {
          {
            const hookName = getHookName('write', contract.name)
            const docString = genDocString('useWriteContract', contract)
            const functionName = 'createUseWriteContract'
            imports.add(functionName)
            content.push(
              `${docString}
export const ${hookName} = ${pure} ${functionName}(${innerContent})`,
            )
          }

          {
            const hookName = getHookName('simulate', contract.name)
            const docString = genDocString('useSimulateContract', contract)
            const functionName = 'createUseSimulateContract'
            imports.add(functionName)
            content.push(
              `${docString}
export const ${hookName} = ${pure} ${functionName}(${innerContent})`,
            )
          }
        }
      }

      const importValues = [...imports.values()]

      return {
        imports: importValues.length
          ? `import { ${importValues.join(', ')} } from 'wagmi/codegen'\n`
          : '',
        content: content.join('\n\n'),
      }
    },
  }
}

function genDocString(hookName: string, contract: Contract) {
  const docString = getAddressDocString({ address: contract.address })
  if (docString)
    return `/**
 * Wraps __{@link ${hookName}}__ with \`abi\` set to __{@link ${contract.meta.abiName}}__
 * 
 ${docString}
 */`

  return `/**
 * Wraps __{@link ${hookName}}__ with \`abi\` set to __{@link ${contract.meta.abiName}}__
 */`
}
