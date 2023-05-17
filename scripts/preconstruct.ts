import { execaSync } from 'execa'
import fs from 'fs-extra'
import { glob } from 'glob'
import path from 'path'

preconstruct()

// Symlinks package sources to dist for local development
async function preconstruct() {
  // Check to see if references submodule is installed separately from root monorepo
  if (!process.env.SUBMODULE) {
    const referencesNodeModulesPaths = await glob(
      'references/**/node_modules/',
      { ignore: ['**/node_modules/**/node_modules/**'] },
    )
    const needsInstall = referencesNodeModulesPaths.includes(
      'references/node_modules',
    )
    if (needsInstall) {
      console.log('Reinstalling references modules.')
      // TODO: `rimraf` not working with `bun` for some reason
      execaSync('rm', ['-rf', ...referencesNodeModulesPaths])
      execaSync('pnpm', ['install', '--ignore-scripts'])
      console.log('Done. Reinstalled references modules.\n')
    }
  }

  // Link packages
  console.log('Setting up packages for development.')
  // Get all package.json files
  const packagePaths = await glob('**/package.json', {
    ignore: ['**/dist/**', '**/node_modules/**'],
  })

  let count = 0
  for (const packagePath of packagePaths) {
    const packageFile = (await fs.readJson(packagePath)) as Package
    // Skip private packages
    if (packageFile.private) continue
    if (!packageFile.exports) continue

    count += 1
    const dir = path.resolve(path.dirname(packagePath))
    const srcDir = path.resolve(path.dirname(packagePath), 'src')
    console.log(`${packageFile.name} — ${path.dirname(packagePath)}`)

    // Link exports to dist locations
    for (const [key, exports] of Object.entries(packageFile.exports)) {
      // Skip `package.json` exports
      if (/package\.json$/.test(key)) continue
      if (typeof exports === 'string') continue

      let srcFileName: string
      if (key === '.') srcFileName = 'index.ts'
      else srcFileName = path.basename(`${key}.ts`)
      const srcFilePath = path.resolve(srcDir, srcFileName)

      // Link exports to dist locations
      for (const [type, value] of Object.entries(exports) as [
        type: 'types' | 'import' | 'default',
        value: string,
      ][]) {
        const distDir = path.resolve(dir, path.dirname(value))
        const distFileName = path.basename(value)
        const distFilePath = path.resolve(distDir, distFileName)
        await fs.ensureDir(distDir)
        await fs.emptyDir(distDir)

        if (type === 'default') {
          // TODO: Add CommonJS require hook for completeness, but not really required since things work without it.
          // https://github.com/preconstruct/preconstruct/blob/main/packages/cli/src/dev.ts#L381
        }
        // Symlink src to dist file
        else await fs.symlink(srcFilePath, distFilePath, 'file')
      }
    }
  }

  console.log(`Done. Set up ${count} packages.`)
}

type Package = {
  name?: string
  private?: boolean
  exports?: Record<
    string,
    { types: string; import: string; default: string } | string
  >
}
