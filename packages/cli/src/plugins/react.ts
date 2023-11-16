import { pascalCase } from 'change-case'

import { type Plugin } from '../config.js'
import { type Evaluate, type RequiredBy } from '../types.js'

export type ReactConfig = { foo?: string | undefined }

type ReactResult = Evaluate<RequiredBy<Plugin, 'run'>>

// Useful when building this plugin:
// https://ts-ast-viewer.com

export function react(_config: ReactConfig = {}): ReactResult {
  return {
    name: 'React',
    async run({ contracts }) {
      const imports = new Set<string>([])
      const content: string[] = []

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

        if (hasReadFunction) {
          imports.add('createReadContract')
          content.push(
            `export const useRead${pascalCase(
              contract.name,
            )} = createReadContract(${innerContent})`,
          )
        }

        if (hasWriteFunction) {
          imports.add('createWriteContract')
          content.push(
            `export const useWrite${pascalCase(
              contract.name,
            )} = createWriteContract(${innerContent})`,
          )
        }
      }

      const importValues = [...imports.values()]
      console.log(
        importValues.length
          ? `import { ${importValues.join(', ')} } from 'wagmi/codegen'\n`
          : '',
      )
      console.log(content.join('\n\n'))

      return {
        imports: importValues.length
          ? `import { ${importValues.join(', ')} } from 'wagmi/codegen'\n`
          : '',
        content: content.join('\n\n'),
      }
    },
  }
}
