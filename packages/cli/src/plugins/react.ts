import { pascalCase } from 'change-case'
import dedent from 'dedent'

import type { Plugin } from '../config'

type ReactConfig = {
  hooks?: {
    useContract?: boolean
    useContractEvent?: boolean
    useContractRead?: boolean
    useContractWrite?: boolean
    usePrepareContractWrite?: boolean
  }
}

export function react(config: ReactConfig): Plugin {
  const hooks = {
    useContract: true,
    useContractEvent: true,
    useContractRead: true,
    useContractWrite: true,
    usePrepareContractWrite: true,
    ...config?.hooks,
  }
  return {
    name: 'React',
    async run({ contracts, content, isTypeScript }) {
      const imports = new Set<string>([])
      for (const contract of contracts) {
        const hasAddress = !!contract.address
        const hasMultichainAddress = typeof contract.address === 'object'

        let addressConfig, addressType
        if (hasMultichainAddress) {
          addressConfig = `${contract.meta.addressName}[config.chainId]`
          addressType = `chainId: keyof typeof ${contract.meta.addressName}`
        } else if (hasAddress) {
          addressConfig = contract.meta.addressName
          addressType = ''
        } else {
          addressType = `address?: UseContractConfig['address']`
        }
        const contractConfig = dedent`
          abi: ${contract.meta.abiName},
          ${addressConfig ? `address: ${addressConfig},` : ''}
        `

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

        const content = []
        if (hooks.useContract) {
          imports.add('useContract')
          if (isTypeScript) imports.add('UseContractConfig')
          content.push(
            template.useContract({
              addressType,
              contractConfig,
              isConfigRequired: hasMultichainAddress,
              isTypeScript,
              name: contract.name,
            }),
          )
        }
        if (hasReadFunction) {
          if (hooks.useContractRead) {
            imports.add('useContractRead')
            if (isTypeScript) imports.add('UseContractReadConfig')
            if (hasReadFunction) {
              content.push(
                template.useContractRead({
                  addressType,
                  contractConfig,
                  isConfigRequired: hasMultichainAddress,
                  isTypeScript,
                  name: contract.name,
                }),
              )
            }
          }
        }

        contract.content = `${contract.content}\n\n${content.join('\n\n')}`
      }

      return {
        contracts,
        content: {
          header: [...content.header],
          imports: [
            ...content.imports,
            `import { ${[...imports.values()].join(', ')} } from 'wagmi'`,
          ],
        },
      }
    },
  }
}

type SharedTemplateConfig = {
  addressType: string
  contractConfig: string
  isConfigRequired: boolean
  isTypeScript: boolean
  name: string
}

const template = {
  useContract(config: SharedTemplateConfig) {
    const {
      addressType,
      contractConfig,
      isConfigRequired,
      isTypeScript,
      name,
    } = config
    const hookName = getHookName({ name })

    let typeName = ''
    let typeContent = ''
    if (isTypeScript) {
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

    return dedent`
      ${typeContent}
      export function ${hookName}(config${typeName ? `: ${typeName}` : ''}${
      isConfigRequired ? '' : '= {}'
    }) {
        return useContract({
          ${contractConfig}
          ...config,
        })
      }
    `
  },
  useContractRead(config: SharedTemplateConfig) {
    const {
      addressType,
      contractConfig,
      isConfigRequired,
      isTypeScript,
      name,
    } = config
    const hookName = getHookName({ name, suffix: 'read' })

    let typeName = ''
    let typeContent = ''
    if (isTypeScript) {
      typeName = getTypeName({ hookName })
      typeContent = dedent`
        type ${typeName}<TFunctionName = string> = Omit<
          UseContractReadConfig<typeof wagmiMintEtherscanABI, TFunctionName>,
          ${[`'abi'`, ...(addressType ? [`'address'`] : [])].join(' | ')}
        > ${
          addressType
            ? `& {
            ${addressType}
          }`
            : ''
        }
      `
    }

    return dedent`
      ${typeContent}
      export function ${hookName}(config${typeName ? `: ${typeName}` : ''}${
      isConfigRequired ? '' : '= {}'
    }) {
        return useContractRead({
          ${contractConfig}
          ...config,
        })
      }
    `
  },
}

function getHookName({ name, suffix }: { name: string; suffix?: string }) {
  return `use${pascalCase(name)}${suffix ? pascalCase(suffix) : ''}`
}

function getTypeName({ hookName }: { hookName: string }) {
  return `${pascalCase(hookName)}Config`
}
