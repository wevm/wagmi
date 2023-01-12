import dedent from 'dedent'
import { default as fse } from 'fs-extra'

import type { Config } from '../config'
import { defaultConfig } from '../config'
import * as logger from '../logger'
import { findConfig, format, getIsUsingTypeScript } from '../utils'

export type Init = {
  config?: Config
}

export async function init({ config = defaultConfig }: Init = {}) {
  // Check for exisiting config file
  const configPath = await findConfig()
  if (configPath) {
    logger.info(`Config already exists at "${configPath}"`)
    return configPath
  }

  logger.log('Creating config…')
  const cwd = process.cwd()
  // Check if project is using TypeScript
  const isUsingTypeScript = await getIsUsingTypeScript()
  const extension = isUsingTypeScript ? 'ts' : 'js'
  const outPath = `${cwd}/wagmi.config.${extension}`

  let content: string
  if (isUsingTypeScript)
    content = dedent(`
      import { defineConfig } from '@wagmi/cli'
      
      export default defineConfig(${JSON.stringify(config)})
    `)
  else
    content = dedent(`
      // @ts-check

      /** @type {import('@wagmi/cli').Config} */
      export default ${JSON.stringify({
        ...config,
        out: config.out.replace('.ts', '.js'),
      })}
    `)
  const formatted = await format(content)
  await fse.writeFile(outPath, formatted)
  logger.success(`Config created at "${outPath}"`)

  return outPath
}
