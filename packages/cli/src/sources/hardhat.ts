import { default as fse } from 'fs-extra'

type HardhatConfig = {
  /** Project's artifacts directory */
  artifacts: string
}

/**
 * Source for ABIs from [Hardhat](https://hardhat.org) project
 */
export function hardhat({ artifacts }: HardhatConfig) {
  return async () => {
    if (!fse.pathExistsSync(artifacts)) throw new Error('artifacts not found')
    return []
  }
}
