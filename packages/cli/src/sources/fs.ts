import { default as fse } from 'fs-extra'

import { extname } from 'pathe'

import { SourceFn } from '../config'
import { ContractInterface } from '../types'
import { pathToFileURL } from 'node:url'

type FsConfig = {
  path: string
}

export function fs({ path }: FsConfig): SourceFn {
  const cache: Record<string, ContractInterface> = {}
  return async () => {
    if (cache[path]) return cache[path] as ContractInterface
    if (!fse.existsSync(path)) throw new Error('File not found')

    let contractInterface: ContractInterface
    const file = await fse.readFile(path, 'utf-8')
    if (extname(path) === '.json') {
      contractInterface = JSON.parse(file)
    } else {
      // Load default export from JS or TS file
      const fileBase = `${path}.timestamp-${Date.now()}`
      const fileNameTemp = `${fileBase}.mjs`
      fse.writeFileSync(fileNameTemp, file)
      try {
        const fileUrl = `${pathToFileURL(fileBase)}.mjs`
        contractInterface = (await import(fileUrl)).default
      } finally {
        fse.unlinkSync(fileNameTemp)
      }
    }

    cache[path] = contractInterface
    return contractInterface
  }
}
