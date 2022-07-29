#!/usr/bin/env node
import { cac } from 'cac'

import { version } from '../package.json'
import * as logger from './logger'

const cli = cac('wagmi')

cli
  .command('generate', 'generate code based on configuration')
  .option('-c, --config <path>', '[string] path to config file')
  .option('-r, --root <path>', '[string] root path')
  .action(async ({ config, root }: { config?: string; root?: string }) => {
    const { generate } = await import('./commands')
    await generate({ config, root })
  })

cli
  .command('init', 'create configuration file')
  .example((name) => `${name} init`)
  .action(async () => {
    const { init } = await import('./commands')
    await init()
  })

cli.help()
cli.version(version)

void (async () => {
  try {
    // Parse CLI args without running command
    cli.parse(process.argv, { run: false })
    await cli.runMatchedCommand()
  } catch (error) {
    logger.error((<Error>error).message)
    process.exit(1)
  }
})()
