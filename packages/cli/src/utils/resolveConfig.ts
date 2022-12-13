import { default as fse } from 'fs-extra'
import { z } from 'zod'

import { Config } from '../config'
import { fromZodError } from '../errors'
import { pathToFileURL } from 'node:url'

type ResolveConfig = {
  configPath: string
}

export async function resolveConfig({
  configPath,
}: ResolveConfig): Promise<Config> {
  const fileBase = `${configPath}.timestamp-${Date.now()}`
  const fileNameTemp = `${fileBase}.mjs`
  const code = await fse.readFile(configPath, 'utf-8')
  // write to disk, load it with native Node ESM, then delete the file.
  fse.writeFileSync(fileNameTemp, code)
  try {
    const fileUrl = `${pathToFileURL(fileBase)}.mjs`
    const config = (await import(fileUrl)).default
    // TODO: Strip TypeScript by bundling before parsing
    // https://github.com/vitejs/vite/blob/main/packages/vite/src/node/config.ts#LL939
    const parsed = await Config.parseAsync(config)
    return parsed
  } catch (error) {
    if (error instanceof z.ZodError)
      throw fromZodError(error, { prefix: 'Invalid Config' })
    throw error
  } finally {
    fse.unlinkSync(fileNameTemp)
  }
}
