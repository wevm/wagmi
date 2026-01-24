import { writeFile } from 'node:fs/promises'
import dedent from 'dedent'
import { relative, resolve } from 'pathe'
import pc from 'picocolors'
import { z } from 'zod'

import { type Config, defaultConfig } from '../config.js'
import { fromZodError } from '../errors.js'
import * as logger from '../logger.js'
import { findConfig } from '../utils/findConfig.js'
import { format } from '../utils/format.js'
import { getIsUsingTypeScript } from '../utils/getIsUsingTypeScript.js'

export type Init = {
  /** Path to config file */
  config?: string
  /** Watch for file system changes to config and plugins */
  content?: Config
  /** Directory to init config file */
  root?: string
}

const Init = z.object({
  config: z.string().optional(),
  content: z.object({}).optional(),
  root: z.string().optional(),
})

export async function init(options: Init = {}) {
  // Validate command line options
  try {
    await Init.parseAsync(options)
  } catch (error) {
    if (error instanceof z.ZodError)
      throw fromZodError(error, { prefix: 'Invalid option' })
    throw error
  }

  // Check for existing config file
  const configPath = await findConfig(options)
  if (configPath) {
    logger.info(
      `Config already exists at ${pc.gray(
        relative(process.cwd(), configPath),
      )}`,
    )
    return configPath
  }

  const spinner = logger.spinner('Creating config')
  spinner.start()
  // Check if project is using TypeScript
  const isUsingTypeScript = await getIsUsingTypeScript()
  const rootDir = resolve(options.root || process.cwd())
  let outPath: string
  if (options.config) {
    outPath = resolve(rootDir, options.config)
  } else {
    const extension = isUsingTypeScript ? 'ts' : 'js'
    outPath = resolve(rootDir, `wagmi.config.${extension}`)
  }

  let content: string
  if (isUsingTypeScript) {
    const config = options.content ?? defaultConfig
    content = dedent(`
      import { defineConfig } from '@wagmi/cli'
      
      export default defineConfig(${JSON.stringify(config)})
    `)
  } else {
    const config = options.content ?? {
      ...defaultConfig,
      out: defaultConfig.out.replace('.ts', '.js'),
    }
    content = dedent(`
      // @ts-check

      /** @type {import('@wagmi/cli').Config} */
      export default ${JSON.stringify(config, null, 2).replace(
        /"(\d*)":/gm,
        '$1:',
      )}
    `)
  }

  const formatted = await format(content)
  await writeFile(outPath, formatted)
  spinner.success()
  logger.success(
    `Config created at ${pc.gray(relative(process.cwd(), outPath))}`,
  )

  return outPath
}
