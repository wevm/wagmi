import type { Abi } from 'abitype'
import { default as fse } from 'fs-extra'

import { extname } from 'pathe'

import { pathToFileURL } from 'node:url'

type FsConfig = {
  /**
   * Source file containing ABI
   */
  path: string
}

export function fs({ path }: FsConfig) {
  const cache: Record<string, Abi> = {}
  return async () => {
    if (cache[path]) return cache[path] as Abi
    if (!fse.existsSync(path)) throw new Error('File not found')

    let abi: Abi
    if (extname(path) === '.json') {
      abi = await fse.readJSON(path)
    } else {
      const file = await fse.readFile(path, 'utf-8')
      // Load default export from JS or TS file
      const fileBase = `${path}.timestamp-${Date.now()}`
      const fileNameTemp = `${fileBase}.mjs`
      await fse.writeFile(fileNameTemp, file)
      try {
        const fileUrl = `${pathToFileURL(fileBase)}.mjs`
        abi = (await import(fileUrl)).default
        if (!abi) throw new Error('Missing default export')
      } finally {
        fse.unlinkSync(fileNameTemp)
      }
    }

    cache[path] = abi
    return abi
  }
}
