import { default as fse } from 'fs-extra'

import type { ContractsFn } from '../config'

type HardhatConfig = {
  /** Project's artifacts directory */
  artifacts: string
}

/**
 * Source for ABIs from [Hardhat](https://hardhat.org) project
 */
export function hardhat({ artifacts }: HardhatConfig): ContractsFn {
  return async () => {
    if (!fse.pathExistsSync(artifacts)) throw new Error('artifacts not found')
    return []
  }
}
