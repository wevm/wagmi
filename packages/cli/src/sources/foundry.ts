import { default as fse } from 'fs-extra'

import type { ContractsFn } from '../config'

type FoundryConfig = {
  /** Project's artifacts directory */
  out: string
}

/**
 * Source for ABIs from [Foundry](https://github.com/foundry-rs/foundry) project
 */
export function foundry({ out }: FoundryConfig): ContractsFn {
  return async () => {
    if (!fse.pathExistsSync(out)) throw new Error('Out not found')
    return []
  }
}
