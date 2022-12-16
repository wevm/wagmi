import dedent from 'dedent'
import { findUp } from 'find-up'
import { default as fse } from 'fs-extra'
import { z } from 'zod'

import { Config, defaultConfig } from '../config'
import * as logger from '../logger'
import { findConfig, format } from '../utils'

const Init = z.object({
  config: Config.optional(),
})
export type Init = z.infer<typeof Init>

export async function init({ config = defaultConfig }: Init = {}) {
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
  const outPath = `${cwd}/wagmi.config.${extension}`

  let content: string
  if (tsconfig)
    content = dedent(`
      import { defineConfig } from '@wagmi/cli'
      
      export default defineConfig(${JSON.stringify(config)})
    `)
  else
    content = dedent(`
      // @ts-check

      /**
       * @type {import('@wagmi/cli').Config}
       **/
      export default ${JSON.stringify(config)}
    `)
  const formatted = await format(content)
  await fse.writeFile(outPath, formatted)
  logger.success(`Config created at "${outPath}"`)
}
