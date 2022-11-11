import { execa } from 'execa'
import { default as fs } from 'fs-extra'
import type { Options } from 'tsup'

import path from 'path'

type GetConfig = Omit<
  Options,
  'bundle' | 'clean' | 'dts' | 'entry' | 'format'
> & {
  entry?: string[]
  exports?: { [key: string]: string | { default: string; types?: string } }
  dev?: boolean
}

export function getConfig({
  dev,
  exports = {},
  ...options
}: GetConfig): Options {
  if (!options.entry?.length) throw new Error('entry is required')
  const entry: string[] = options.entry ?? []

  // Hacks tsup to create Preconstruct-like linked packages for development
  // https://github.com/preconstruct/preconstruct
  if (dev)
    return {
      clean: true,
      // Only need to generate one file with tsup for development since we will create links in `onSuccess`
      entry: [entry[0] as string],
      format: ['esm'],
      silent: true,
      async onSuccess() {
        // remove all files in dist
        await fs.emptyDir('dist')
        // symlink files and type definitions
        for (const file of entry) {
          const filePath = path.resolve(file)
          const distSourceFile = filePath
            .replace(file, file.replace('src/', 'dist/'))
            .replace(/\.ts$/, '.js')
          // Make sure directory exists
          await fs.ensureDir(path.dirname(distSourceFile))
          // Create symlink between source and dist file
          await fs.symlink(filePath, distSourceFile, 'file')
          // Create file linking up type definitions
          const srcTypesFile = path
            .relative(path.dirname(distSourceFile), filePath)
            .replace(/\.ts$/, '')
          await fs.outputFile(
            distSourceFile.replace(/\.js$/, '.d.ts'),
            `export * from '${srcTypesFile}'`,
          )
        }
        validateExports(exports)
      },
    }

  return {
    bundle: true,
    clean: true,
    dts: true,
    format: ['esm'],
    splitting: true,
    target: 'es2021',
    async onSuccess() {
      if (typeof options.onSuccess === 'function') await options.onSuccess()
      else if (typeof options.onSuccess === 'string') execa(options.onSuccess)
      validateExports(exports)
    },
    ...options,
  }
}

/**
 * Validate exports point to actual files
 */
async function validateExports(exports: {
  [key: string]: string | { default: string }
}) {
  for (const [key, value] of Object.entries(exports)) {
    if (typeof value === 'string') continue
    for (const [type, path] of Object.entries(value)) {
      const fileExists = await fs.pathExists(path)
      if (!fileExists)
        throw new Error(
          `File does not exist for export "${type}": "${value.default}" in "${key}."`,
        )
    }
  }
}
