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

  let content: string
  if (tsconfig)
    content = dedent(`
    import { defineConfig } from '@wagmi/cli'
    
    export default defineConfig({
      contracts: [],
      plugins: [],
    })
  `)
  else
    content = dedent(`
    // @ts-check

    /**
     * @type {import('@wagmi/cli').Config}
     **/
    export default {
      contracts: [],
      plugins: [],
    }
  `)
  await fse.writeFile(configName, content, {})
  logger.success(`Config created at "${configName}"`)
}
