import { pascalCase } from 'change-case'
import dedent from 'dedent'

import type { Plugin } from '../config'

type ReactConfig = {
  hooks?: {
    useContract?: boolean
    useContractEvent?: boolean
    useContractInfiniteReads?: boolean
    useContractRead?: boolean
    useContractReads?: boolean
    useContractWrite?: boolean
    usePrepareContractWrite?: boolean
  }
}

export function react(config: ReactConfig): Plugin {
  const hooks = {
    useContract: true,
    useContractEvent: true,
    useContractInfiniteReads: true,
    useContractRead: true,
    useContractReads: true,
    useContractWrite: true,
    usePrepareContractWrite: true,
    ...config?.hooks,
  }
  return {
    name: 'react',
    async run({ contracts, content, isTypeScript }) {
      let header = ''
      const wagmiImports = new Set<string>([])
      for (const contract of contracts) {
        const hasAddress = !!contract.address
        const hasMultichainAddress = typeof contract.address === 'object'
        const addressArg = hasAddress
          ? hasMultichainAddress
            ? 'chainId,'
            : ''
          : 'address,'
        const addressType = hasAddress
          ? hasMultichainAddress
            ? `chainId: ChainId<typeof ${contract.meta.addressName}>`
            : ''
          : `address?: UseContractConfig['address']`
        const contractConfig = dedent`
          abi: ${contract.meta.abiName},
          address: ${
            contract.address
              ? `${contract.meta.addressName}${
                  typeof contract.address === 'string' ? '' : '[chainId]'
                }`
              : 'address'
          },
        `

        if (isTypeScript && hasMultichainAddress)
          header =
            'type ChainId<T extends Record<string, unknown>> = keyof T extends infer K ? K extends `${infer Id extends number}` ? Id : never : never'

        if (hooks.useContract) {
          const hookName = getHookName({ name: contract.name })
          wagmiImports.add('useContract')

          let typeName = ''
          let typeContent = ''
          if (isTypeScript) {
            wagmiImports.add('UseContractConfig')
            typeName = getTypeName({ hookName })
            typeContent = dedent`
              type ${typeName} = Pick<UseContractConfig, 'signerOrProvider'> ${
              addressType
                ? `& {
                ${addressType}
              }`
                : ''
            }
            `
          }

          contract.content = dedent`
            ${contract.content}

            ${typeContent}
            export function ${hookName}({
              ${addressArg}
              signerOrProvider,
            }${typeName ? `: ${typeName}` : ''}) {
              return useContract({
                ${contractConfig}
                signerOrProvider,
              })
            }
          `
        }
      }

      return {
        contracts,
        content: {
          header: [...content.header, header],
          imports: [
            ...content.imports,
            `import { ${[...wagmiImports.values()].join(', ')} } from 'wagmi'`,
          ],
        },
      }
    },
  }
}

function getHookName({ name, suffix }: { name: string; suffix?: string }) {
  return `use${pascalCase(name)}${suffix ? pascalCase(suffix) : ''}`
}

function getTypeName({ hookName }: { hookName: string }) {
  return `${pascalCase(hookName)}Config`
}
