import { mkdir } from 'node:fs/promises'
import { homedir } from 'node:os'
import type { createSpinner as nanospinner_createSpinner } from 'nanospinner'
import { join } from 'pathe'
import { vi } from 'vitest'

const cacheDir = join(homedir(), '.wagmi-cli/plugins/fetch/cache')
await mkdir(cacheDir, { recursive: true })

vi.mock('nanospinner', async (importOriginal) => {
  const mod = await importOriginal<{
    createSpinner: typeof nanospinner_createSpinner
  }>()

  function createSpinner(
    initialText: string,
    opts: Parameters<typeof nanospinner_createSpinner>[1],
  ) {
    let currentText = ''
    const spinner = mod.createSpinner(initialText, opts)
    return {
      ...spinner,
      start(text = initialText) {
        // biome-ignore lint/suspicious/noConsoleLog: console.log is used for logging
        console.log(`- ${text}`)
        spinner.start(text)
        currentText = text
      },
      success(text = currentText) {
        // biome-ignore lint/suspicious/noConsoleLog: console.log is used for logging
        console.log(`√ ${text}`)
        spinner.success(text)
      },
      error(text = currentText) {
        console.error(`× ${text}`)
        spinner.error(text)
      },
    }
  }
  return { createSpinner }
})

vi.mock('picocolors', async () => {
  function pass(input: string | number | null | undefined) {
    return input
  }
  return {
    default: {
      blue: pass,
      gray: pass,
      green: pass,
      red: pass,
      white: pass,
      yellow: pass,
    },
  }
})
