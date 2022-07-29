import { default as fse } from 'fs-extra'

import { Config } from '../config'
import { pathToFileURL } from 'node:url'

type ResolveConfig = {
  configPath: string
}

export async function resolveConfig({
  configPath,
}: ResolveConfig): Promise<Config> {
  const fileBase = `${configPath}.timestamp-${Date.now()}`
  const fileNameTmp = `${fileBase}.mjs`
  const fileUrl = `${pathToFileURL(fileBase)}.mjs`
  const code = await fse.readFile(configPath, 'utf-8')
  // write to disk, load it with native Node ESM, then delete the file.
  fse.writeFileSync(fileNameTmp, code)
  try {
    return (await import(fileUrl)).default
  } finally {
    fse.unlinkSync(fileNameTmp)
  }
}
