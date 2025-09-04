import { pascalCase } from 'change-case'

export function toCoreAction(opts: {
  name: string
  type: 'public' | 'wallet'
}) {
  const typePrefix = pascalCase(opts.name)
  return `
import {
  type ${typePrefix}ErrorType as viem_${typePrefix}ErrorType,
  type ${typePrefix}Parameters as viem_${typePrefix}Parameters,
  type ${typePrefix}ReturnType as viem_${typePrefix}ReturnType,
  ${opts.name} as viem_${opts.name},
} from 'viem/actions'

import type { Config } from '../createConfig.js'
import type { ChainIdParameter } from '../types/properties.js'
import type { Compute } from '../types/utils.js'
import { getAction } from '../utils/getAction.js'

export type ${typePrefix}Parameters<
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
> = Compute<
  viem_${typePrefix}Parameters & ChainIdParameter<config, chainId>
>

export type ${typePrefix}ReturnType = viem_${typePrefix}ReturnType

export type ${typePrefix}ErrorType = viem_${typePrefix}ErrorType

/** https://wagmi.sh/core/api/actions/${opts.name} */
export function ${opts.name}<
  config extends Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
>(
  config: config,
  parameters: ${typePrefix}Parameters<config, chainId>,
): Promise<${typePrefix}ReturnType> {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  const action = getAction(client, viem_${opts.name}, '${opts.name}')
  return action(rest)
}
`
}
