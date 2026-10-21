#!/usr/bin/env node
import { Cli, z } from 'incur'

import { generate } from './commands/generate.js'
import { init } from './commands/init.js'
import { version } from './version.js'

try {
  process.title = 'node (wagmi)'
} catch {}

const commonOptions = {
  config: z.string().optional().describe('Path to config file'),
  root: z.string().optional().describe('Root path to resolve config from'),
}

const cli = Cli.create('wagmi', {
  description: 'Manage and generate code from Ethereum ABIs',
  // Installed per-project, so don't suggest a global `--update`.
  update: false,
  version,
})
  .command('generate', {
    alias: { config: 'c', root: 'r', watch: 'w' },
    description: 'Generate code based on configuration',
    options: z.object({
      ...commonOptions,
      watch: z.boolean().optional().describe('Watch for changes'),
    }),
    async run({ options }) {
      await generate(options)
    },
  })
  .command('init', {
    alias: { config: 'c', root: 'r' },
    description: 'Create configuration file',
    options: z.object(commonOptions),
    async run({ options }) {
      await init(options)
    },
  })

// Keep the `-v` shorthand from the previous CLI.
const argv = process.argv.slice(2)
await cli.serve(argv.length === 1 && argv[0] === '-v' ? ['--version'] : argv)
