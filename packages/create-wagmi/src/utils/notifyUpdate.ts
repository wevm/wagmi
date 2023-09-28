import pico from 'picocolors'
import checkForUpdate from 'update-check'

import { type CLIOptions } from '../cli.js'
import { getPackageManager } from './getPackageManager.js'

import packageJson from '../../package.json'

const log = console.log

export async function notifyUpdate({ options }: { options: CLIOptions }) {
  try {
    const res = await checkForUpdate(packageJson)
    if (res?.latest) {
      const packageManager = await getPackageManager({ options })
      const updateMessage =
        packageManager === 'pnpm'
          ? 'pnpm add -g create-wagmi'
          : packageManager === 'yarn'
          ? 'yarn global add create-wagmi'
          : 'npm i -g create-wagmi'

      log(
        pico.bold(
          `${pico.yellow(
            'A new version of `create-wagmi` is available!',
          )}\nYou can update by running: ${pico.cyan(updateMessage)}\n`,
        ),
      )
    }
    process.exit()
  } catch {
    // ignore error
  }
}
