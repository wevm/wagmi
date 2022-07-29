import dedent from 'dedent'
import { findUp } from 'find-up'
import { default as fse } from 'fs-extra'

import * as logger from '../logger'
import { findConfig } from '../utils'

export async function init() {
  logger.log('Creating config…')
  // Check for exisiting config file
  const configPath = await findConfig()
  if (configPath) {
    logger.info(`Config already exists at "${configPath}"`)
    return
  }

  const cwd = process.cwd()
  // Check if project is using TypeScript
  const tsconfig = await findUp('tsconfig.json', { cwd })
  const extension = tsconfig ? 'ts' : 'js'
  const configName = `${cwd}/wagmi.config.${extension}`

  const content = dedent(`
    import { defineConfig } from '@wagmi/cli/config'
    
    export default defineConfig({})
  `)
  await fse.writeFile(configName, content, {})
  logger.success(`Config created at "${configName}"`)
}
