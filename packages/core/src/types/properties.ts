import type { Config } from '../config.js'

export type ChainId<
  config extends Config,
  chain extends
    | config['chains'][number]['id']
    | undefined = config['chains'][number]['id'],
> = {
  chainId?: chain | config['chains'][number]['id'] | undefined
}
