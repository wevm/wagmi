import { parse } from 'dotenv'
import { expand } from 'dotenv-expand'

import { existsSync, readFileSync, statSync } from 'node:fs'
import { dirname, join } from 'node:path'

// https://github.com/vitejs/vite/blob/main/packages/vite/src/node/env.ts#L7
export function loadEnv(
  config: {
    mode?: string
    envDir?: string
  } = {},
): Record<string, string> {
  const mode = config.mode
  if (mode === 'local') {
    throw new Error(
      `"local" cannot be used as a mode name because it conflicts with the .local postfix for .env files.`,
    )
  }

  const envFiles = [
    /** default file */ '.env',
    /** local file */ '.env.local',
    ...(mode
      ? [
          /** mode file */ `.env.${mode}`,
          /** mode local file */ `.env.${mode}.local`,
        ]
      : []),
  ]

  const envDir = config.envDir ?? process.cwd()
  const parsed = Object.fromEntries(
    envFiles.flatMap((file) => {
      const path = lookupFile(envDir, [file], {
        pathOnly: true,
        rootDir: envDir,
      })
      if (!path) return []
      return Object.entries(parse(readFileSync(path)))
    }),
  )

  try {
    // let environment variables use each other
    expand({ parsed })
  } catch (error) {
    // custom error handling until https://github.com/motdotla/dotenv-expand/issues/65 is fixed upstream
    // check for message "TypeError: Cannot read properties of undefined (reading 'split')"
    if ((error as Error).message.includes('split')) {
      throw new Error(
        'dotenv-expand failed to expand env vars. Maybe you need to escape `$`?',
      )
    }
    throw error
  }

  return parsed
}

function lookupFile(
  dir: string,
  formats: string[],
  options?: {
    pathOnly?: boolean
    rootDir?: string
    predicate?: (file: string) => boolean
  },
): string | undefined {
  for (const format of formats) {
    const fullPath = join(dir, format)
    if (existsSync(fullPath) && statSync(fullPath).isFile()) {
      const result = options?.pathOnly
        ? fullPath
        : readFileSync(fullPath, 'utf-8')
      if (!options?.predicate || options.predicate(result)) {
        return result
      }
    }
  }

  const parentDir = dirname(dir)
  if (
    parentDir !== dir &&
    (!options?.rootDir || parentDir.startsWith(options?.rootDir))
  )
    return lookupFile(parentDir, formats, options)

  return undefined
}
