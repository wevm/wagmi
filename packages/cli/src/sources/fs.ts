import type { Abi } from 'abitype'
import { default as fse } from 'fs-extra'

import { extname } from 'pathe'

import type { SourceFn } from '../config'
import { pathToFileURL } from 'node:url'

type FsConfig = {
  /**
   * Source file containing contract interface
   */
  path: string
}

export function fs({ path }: FsConfig): SourceFn {
  const cache: Record<string, Abi> = {}
  return async () => {
    if (cache[path]) return cache[path] as Abi
    if (!fse.existsSync(path)) throw new Error('File not found')

    let abi: Abi
    const file = await fse.readFile(path, 'utf-8')
    if (extname(path) === '.json') {
      abi = JSON.parse(file)
    } else {
      // Load default export from JS or TS file
      const fileBase = `${path}.timestamp-${Date.now()}`
      const fileNameTemp = `${fileBase}.mjs`
      fse.writeFileSync(fileNameTemp, file)
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
