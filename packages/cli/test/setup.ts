import { homedir } from 'os'
import { default as fs } from 'fs-extra'
import { join } from 'pathe'
import { vi } from 'vitest'

const cacheDir = join(homedir(), '.wagmi-cli/plugins/fetch/cache')
await fs.ensureDir(cacheDir)

vi.mock('ora', async () => {
  function ora() {
    class Ora {
      #text: string | undefined

      start(text: string | undefined = 'start') {
        console.log(`- ${text}`)
        this.#text = text
      }

      succeed(text: string | undefined = this.#text ?? 'succeed') {
        console.log(`✔ ${text}`)
        this.#text = undefined
      }

      fail(text: string | undefined = this.#text ?? 'fail') {
        console.error(`✖ ${text}`)
        this.#text = undefined
      }
    }
    return new Ora()
  }
  return {
    default: ora,
  }
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
