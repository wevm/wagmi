import * as allChains from '@wagmi/chains'
import { capitalCase, pascalCase } from 'change-case'
import dedent from 'dedent'
import { execa } from 'execa'

import type { Contract, Plugin } from '../config'
import { getPackageManager } from '../utils'

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
   * Generate `useContractRead` hook.
   *
   * @default true
   */
  useContractRead?: boolean
  /**
   * Generate hook for each "read" function in contract ABI.
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
}

const chainMap: Record<allChains.Chain['id'], allChains.Chain> = {}
for (const chain of Object.values(allChains)) {
  if (!('id' in chain)) continue
  chainMap[chain.id] = chain
}

export function react(config: ReactConfig = {}): Plugin {
  const hooks = {
    useContract: true,
    useContractEvent: true,
    useContractRead: true,
    useContractFunctionRead: true,
    usePrepareContractWrite: true,
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
        const hasAddress = !!contract.address
        const hasMultichainAddress = typeof contract.address === 'object'
        const hasMultipleDeployments =
          typeof contract.address === 'object' &&
          Object.keys(contract.address).length > 1

        let isConfigRequired = false
        const innerHookParams: Record<string, string> = {
          abi: contract.meta.abiName,
        }
        if (contract.meta.addressName) {
          if (hasMultichainAddress) {
            if (hasMultipleDeployments)
              innerHookParams[
                'address'
              ] = `config.chainId ? ${contract.meta.addressName}[config.chainId] : undefined`
            else
              innerHookParams['address'] = `${contract.meta.addressName}[${
                Object.keys(contract.address!)[0]
              }]`
            isConfigRequired = true
          } else if (hasAddress) {
            innerHookParams['address'] = contract.meta.addressName
          }
        }
        const innerHookConfig =
          Object.entries(innerHookParams).reduce((prev, curr) => {
            return dedent`
            ${prev}
            ${curr[0]}: ${curr[1]},
          `
          }, '{') + `...config}`
        const defaultConfig = isConfigRequired
          ? ''
          : ` = {}${isTypeScript ? 'as any' : ''}`
        const typeParams = hasMultipleDeployments
          ? dedent`& {
            chainId?: keyof typeof ${contract.meta.addressName}
          }`
          : ''
        const omittedTypeParams = hasMultichainAddress
          ? '"abi" | "address"'
          : '"abi"'

        if (hooks.useContract) {
          const innerHookName = 'useContract'
          const hookName = innerHookName.replace('Contract', baseHookName)
          const docString = dedent`
            /**
             ${getDescriptionDocString({
               innerHookName,
               abiName: contract.meta.abiName,
             })} ${getAddressDocString({ address: contract.address })}
             */
          `
          imports.add(innerHookName)
          let code
          if (isTypeScript) {
            const typeName = 'UseContractConfig'
            imports.add(typeName)
            code = dedent`
              ${docString}
              export function ${hookName}(config: Omit<${typeName}, ${omittedTypeParams}>${typeParams}${defaultConfig}) {
                return ${innerHookName}(${innerHookConfig})
              }
            `
          } else
            code = getJSHookCode({
              defaultConfig,
              docString,
              hookName,
              innerHookName,
              innerHookConfig,
            })
          content.push(code)
        }

        if (hasReadFunction) {
          if (hooks.useContractRead) {
            const innerHookName = 'useContractRead'
            const hookName = innerHookName.replace('Contract', baseHookName)
            const docString = dedent`
              /**
              ${getDescriptionDocString({
                innerHookName,
                abiName: contract.meta.abiName,
              })} ${getAddressDocString({ address: contract.address })}
              */
            `
            imports.add(innerHookName)
            let code
            if (isTypeScript) {
              const typeName = 'UseContractReadConfig'
              imports.add(typeName)
              code = getTSHookCode({
                contract,
                defaultConfig,
                docString,
                hookName,
                innerHookName,
                innerHookConfig,
                omittedTypeParams,
                typeName,
                typeParams,
              })
            } else
              code = getJSHookCode({
                defaultConfig,
                docString,
                hookName,
                innerHookName,
                innerHookConfig,
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
                const hookName = innerHookName
                  .replace('Contract', baseHookName + pascalCase(item.name))
                  .replace('Read', '')
                const docString = dedent`
                  /**
                  ${getDescriptionDocString({
                    innerHookName,
                    abiName: contract.meta.abiName,
                  }).replace(
                    '.',
                    ` and \`functionName\` set to \`"${item.name}"\`.`,
                  )} ${getAddressDocString({ address: contract.address })}
                  */
                `
                imports.add(innerHookName)
                innerHookParams['functionName'] = `"${item.name}"`
                const wrappedHookConfig =
                  Object.entries(innerHookParams).reduce((prev, curr) => {
                    return dedent`
                      ${prev}
                      ${curr[0]}: ${curr[1]},
                    `
                  }, '{') + `...config}`
                let code
                if (isTypeScript) {
                  const typeName = 'UseContractReadConfig'
                  imports.add(typeName)
                  code = dedent`
                    ${docString}
                    export function ${hookName}<
                      TAbi extends readonly unknown[] = typeof ${contract.meta.abiName},
                      TFunctionName extends string = "${item.name}"
                    >(
                      config: Omit<${typeName}<TAbi, TFunctionName>, ${omittedTypeParams} | "functionName">${typeParams}${defaultConfig},
                    ) {
                      return ${innerHookName}(${wrappedHookConfig} as ${typeName}<TAbi, TFunctionName>)
                    }
                  `
                } else
                  code = getJSHookCode({
                    defaultConfig,
                    docString,
                    hookName,
                    innerHookName,
                    innerHookConfig: wrappedHookConfig,
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
            const docString = dedent`
              /**
              ${getDescriptionDocString({
                innerHookName,
                abiName: contract.meta.abiName,
              })} ${getAddressDocString({ address: contract.address })}
              */
            `
            imports.add(innerHookName)
            let code
            if (isTypeScript) {
              const typeName = 'UsePrepareContractWriteConfig'
              imports.add(typeName)
              code = getTSHookCode({
                contract,
                defaultConfig,
                docString,
                hookName,
                innerHookName,
                innerHookConfig,
                omittedTypeParams,
                typeName,
                typeParams,
              })
            } else
              code = getJSHookCode({
                defaultConfig,
                docString,
                hookName,
                innerHookName,
                innerHookConfig,
              })
            content.push(code)
          }
        }

        if (hasEvent) {
          if (hooks.useContractEvent) {
            const innerHookName = 'useContractEvent'
            const hookName = innerHookName.replace('Contract', baseHookName)
            const docString = dedent`
              /**
              ${getDescriptionDocString({
                innerHookName,
                abiName: contract.meta.abiName,
              })} ${getAddressDocString({ address: contract.address })}
              */
            `
            imports.add(innerHookName)
            let code
            if (isTypeScript) {
              const typeName = 'UseContractEventConfig'
              imports.add(typeName)
              code = getTSHookCode({
                contract,
                defaultConfig,
                docString,
                hookName,
                innerHookName,
                innerHookConfig,
                omittedTypeParams,
                typeName,
                typeParams,
              })
            } else
              code = getJSHookCode({
                defaultConfig,
                docString,
                hookName,
                innerHookName,
                innerHookConfig,
              })
            content.push(code)
          }
        }
      }

      return {
        imports: dedent`
          import { ${[...imports.values()].join(', ')} } from 'wagmi'
        `,
        content: content.join('\n\n'),
      }
    },
    async validate() {
      const packageManager = await getPackageManager()
      let command = []
      let install = ''
      switch (packageManager) {
        case 'yarn':
          command = ['list', '--pattern', 'wagmi']
          install = 'add'
          break
        case 'npm':
          command = ['ls', 'wagmi']
          install = 'install --save'
          break
        case 'pnpm':
        default:
          command = ['ls', 'wagmi']
          install = 'add'
      }

      const { stdout } = await execa(packageManager, command)
      if (stdout !== '') return

      throw new Error(dedent`
        wagmi must be installed to use React plugin.
        To install, run: ${packageManager} ${install} wagmi
      `)
    },
  }
}

function getTSHookCode({
  contract,
  defaultConfig,
  docString,
  hookName,
  innerHookName,
  innerHookConfig,
  omittedTypeParams,
  typeName,
  typeParams,
}: {
  contract: Contract
  defaultConfig: string
  docString: string
  hookName: string
  innerHookName: string
  innerHookConfig: string
  omittedTypeParams: string
  typeName: string
  typeParams: string
}) {
  return dedent`
    ${docString}
    export function ${hookName}<
      TAbi extends readonly unknown[] = typeof ${contract.meta.abiName},
      TFunctionName extends string = string
    >(
      config: Omit<${typeName}<TAbi, TFunctionName>, ${omittedTypeParams}>${typeParams}${defaultConfig},
    ) {
      return ${innerHookName}(${innerHookConfig} as ${typeName}<TAbi, TFunctionName>)
    }
  `
}

function getJSHookCode({
  defaultConfig,
  docString,
  hookName,
  innerHookName,
  innerHookConfig,
}: {
  defaultConfig: string
  docString: string
  hookName: string
  innerHookName: string
  innerHookConfig: string
}) {
  return dedent`
    ${docString}
    export function ${hookName}(config${defaultConfig}) {
      return ${innerHookName}(${innerHookConfig})
    }
  `
}

function getDescriptionDocString({
  abiName,
  innerHookName,
}: {
  abiName: string
  innerHookName: string
}) {
  return dedent`
     * Wraps {@link ${innerHookName}} with \`abi\` set to {@link ${abiName}}.
  `
}

function getAddressDocString({ address }: { address: Contract['address'] }) {
  if (!address || typeof address === 'string') return ''
  if (Object.keys(address).length === 1) {
    const chain = chainMap[parseInt(Object.keys(address)[0]!)]!
    const blockExplorer = chain.blockExplorers?.default
    if (!blockExplorer) return ''
    const address_ = Object.values(address)[0]
    return `[View on ${blockExplorer.name}.](${blockExplorer.url}/address/${address_})`
  }

  return dedent`
    ${Object.entries(address).reduce((prev, curr) => {
      const chain = chainMap[parseInt(curr[0])]!
      const address = curr[1]
      const blockExplorer = chain.blockExplorers?.default
      if (!blockExplorer) return prev
      return `${prev}\n* - [${capitalCase(chain.name)}](${
        blockExplorer.url
      }/address/${address})`
    }, 'View on Block Explorer:')}
  `
}
