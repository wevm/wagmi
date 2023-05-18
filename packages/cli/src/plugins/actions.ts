import { pascalCase } from 'change-case'
import dedent from 'dedent'

import type { Plugin } from '../config'
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
  /**
   * Generate `writeContract` action.
   *
   * @default true
   */
  writeContract?: boolean
}

type ActionsResult = RequiredBy<Plugin, 'run'>

export function actions(config: ActionsConfig = {}): ActionsResult {
  const actions = {
    getContract: true,
    prepareWriteContract: true,
    readContract: true,
    watchContractEvent: true,
    writeContract: true,
    ...config,
  }
  return {
    name: 'Core',
    async run({ contracts, isTypeScript, outputs }) {
      const imports = new Set<string>([])
      const hasWriteContractMode = outputs.some(
        (x) =>
          x.plugin.name === 'React' && x.imports?.includes('WriteContractMode'),
      )

      const actionNames = new Set<string>()
      const getActionNameError = (name: string, contractName: string) =>
        new Error(
          `Action name "${name}" must be unique for contract "${contractName}".`,
        )

      const content: string[] = []
      for (const contract of contracts) {
        const baseActionName = pascalCase(contract.name)

        let typeParams = ''
        let omitted = ''
        const innerActionParams: Record<string, string> = {
          abi: contract.meta.abiName,
        }
        if (contract.meta.addressName) {
          omitted = `| 'address'`
          if (typeof contract.address === 'object') {
            typeParams = `& { chainId?: keyof typeof ${contract.meta.addressName} }`
            if (Object.keys(contract.address).length > 1) {
              innerActionParams[
                'address'
              ] = `${contract.meta.addressName}[config.chainId as keyof typeof ${contract.meta.addressName}]`
            } else
              innerActionParams['address'] = `${contract.meta.addressName}[${
                Object.keys(contract.address!)[0]
              }]`
          } else if (contract.address)
            innerActionParams['address'] = contract.meta.addressName
        }

        const innerActionConfig =
          Object.entries(innerActionParams).reduce(
            (prev, curr) => `${prev}${curr[0]}: ${curr[1]},`,
            '{',
          ) + '...config}'

        type Item = { name: string; value: string }
        const genDocString = (actionName: string, item?: Item) => {
          let description = `Wraps __{@link ${actionName}}__ with \`abi\` set to __{@link ${contract.meta.abiName}}__`
          if (item)
            description += ` and \`${item.name}\` set to \`"${item.value}"\``
          if (contract.address) {
            const docString = getAddressDocString({ address: contract.address })
            if (docString)
              return dedent`
              /**
              * ${description}.
              * 
              ${docString}
              */
              `
          }
          return dedent`
          /**
           * ${description}.
           */
          `
        }

        if (actions.getContract) {
          const name = `get${baseActionName}`
          if (actionNames.has(name))
            throw getActionNameError(name, contract.name)
          actionNames.add(name)

          imports.add('getContract')
          const docString = genDocString('getContract')

          let code
          if (isTypeScript) {
            imports.add('GetContractArgs')
            // prettier-ignore
            code = dedent`
            ${docString}
            export function ${name}(
              config: Omit<GetContractArgs, 'abi'${omitted}>${typeParams},
            ) {
              return getContract(${innerActionConfig})
            }
            `
          } else
            code = dedent`
            ${docString}
            export function ${name}(config) {
              return getContract(${innerActionConfig})
            }
            `
          content.push(code)
        }

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

        if (hasReadFunction) {
          if (actions.readContract) {
            const name = `read${baseActionName}`
            if (actionNames.has(name))
              throw getActionNameError(name, contract.name)
            actionNames.add(name)

            imports.add('readContract')
            const docString = genDocString('readContract')

            let code
            if (isTypeScript) {
              imports.add('ReadContractConfig')
              code = dedent`
              ${docString}
              export function ${name}<
                TAbi extends readonly unknown[] = typeof ${contract.meta.abiName},
                TFunctionName extends string = string,
              >(
                config: Omit<ReadContractConfig<TAbi, TFunctionName>, 'abi'${omitted}>${typeParams},
              ) {
                return readContract(${innerActionConfig} as unknown as ReadContractConfig<TAbi, TFunctionName>)
              }
              `
            } else
              code = dedent`
              ${docString}
              export function ${name}(config) {
                return readContract(${innerActionConfig})
              }
              `
            content.push(code)
          }
        }

        if (hasWriteFunction) {
          if (actions.writeContract) {
            const name = `write${baseActionName}`
            if (actionNames.has(name))
              throw getActionNameError(name, contract.name)
            actionNames.add(name)

            imports.add('writeContract')
            const docString = genDocString('writeContract')

            let code
            if (isTypeScript) {
              const hasMultichainAddress = typeof contract.address === 'object'
              const TChainId = hasMultichainAddress
                ? `TMode extends WriteContractMode, TChainId extends number = keyof typeof ${contract.meta.addressName}`
                : ''
              let typeParams_ = ''
              if (TChainId) {
                if (!hasWriteContractMode) imports.add('WriteContractMode')
                typeParams_ = `& { mode: TMode; chainId?: TMode extends 'prepared' ? TChainId : keyof typeof ${contract.meta.addressName} }`
              }

              imports.add('WriteContractArgs')
              imports.add('WriteContractPreparedArgs')
              imports.add('WriteContractUnpreparedArgs')
              code = dedent`
              ${docString}
              export function ${name}<
                TFunctionName extends string,
                ${TChainId}
              >(
                config:
                  | (Omit<WriteContractPreparedArgs<typeof ${contract.meta.abiName}, TFunctionName>, 'abi'${omitted}>${typeParams_})
                  | (Omit<WriteContractUnpreparedArgs<typeof ${contract.meta.abiName}, TFunctionName>, 'abi'${omitted}>${typeParams_}),
              ) {
                return writeContract(${innerActionConfig} as unknown as WriteContractArgs<typeof ${contract.meta.abiName}, TFunctionName>)
              }
              `
            } else
              code = dedent`
              ${docString}
              export function ${name}(config) {
                return writeContract(${innerActionConfig})
              }
              `
            content.push(code)
          }

          if (actions.prepareWriteContract) {
            const name = `prepareWrite${baseActionName}`
            if (actionNames.has(name))
              throw getActionNameError(name, contract.name)
            actionNames.add(name)

            imports.add('prepareWriteContract')
            const docString = genDocString('prepareWriteContract')

            let code
            if (isTypeScript) {
              imports.add('PrepareWriteContractConfig')
              // prettier-ignore
              code = dedent`
              ${docString}
              export function ${name}<
                TAbi extends readonly unknown[] = typeof ${contract.meta.abiName},
                TFunctionName extends string = string,
              >(
                config: Omit<PrepareWriteContractConfig<TAbi, TFunctionName>, 'abi'${omitted}>${typeParams},
              ) {
                return prepareWriteContract(${innerActionConfig} as unknown as PrepareWriteContractConfig<TAbi, TFunctionName>)
              }
              `
            } else
              code = dedent`
              ${docString}
              export function ${name}(config) {
                return prepareWriteContract(${innerActionConfig})
              }
              `
            content.push(code)
          }
        }

        if (hasEvent) {
          if (actions.watchContractEvent) {
            const name = `watch${baseActionName}Event`
            if (actionNames.has(name))
              throw getActionNameError(name, contract.name)
            actionNames.add(name)

            imports.add('watchContractEvent')
            const docString = genDocString('watchContractEvent')

            let code
            if (isTypeScript) {
              imports.add('WatchContractEventConfig')
              imports.add('WatchContractEventCallback')
              // prettier-ignore
              code = dedent`
              ${docString}
              export function ${name}<
                TAbi extends readonly unknown[] = typeof ${contract.meta.abiName},
                TEventName extends string = string,
              >(
                config: Omit<WatchContractEventConfig<TAbi, TEventName>, 'abi'${omitted}>${typeParams},
                callback: WatchContractEventCallback<TAbi, TEventName>,
              ) {
                return watchContractEvent(${innerActionConfig} as WatchContractEventConfig<TAbi, TEventName>, callback)
              }
              `
            } else
              code = dedent`
              ${docString}
              export function ${name}(config, callback) {
                return watchContractEvent(${innerActionConfig}, callback)
              }
              `
            content.push(code)
          }
        }
      }

      let packageName
      if (config.overridePackageName) packageName = config.overridePackageName
      else if (await getIsPackageInstalled({ packageName: 'wagmi' }))
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
