import type { Config } from '../config.js'

export type ChainId<
  config extends Config,
  chainId extends
    | config['chains'][number]['id']
    | undefined = config['chains'][number]['id'],
> = {
  chainId?: chainId | config['chains'][number]['id'] | undefined
}
