#!/usr/bin/env node
import { cac } from 'cac'

import { version } from '../package.json'

const cli = cac('wagmi')

cli
  .version(version)
  .option('-c, --config <path>', 'path to config file')
  .option('-r, --root <path>', 'root path')
  .help()

cli.command('init').action(init)

cli.command('[...filters]').action(start)

cli.parse()

export type CliOptions = {
  config?: string
  root?: string
}

async function init(cliFilters: string[], options: CliOptions) {
  const { init } = await import('./commands')
  console.log('init', { cliFilters, options })
  await init()
}

async function start(cliFilters: string[], options: CliOptions) {
  try {
    console.log('start', { cliFilters, options })
    process.exit()
  } catch (e) {
    process.exitCode = 1
    console.error(e)
  }
}
