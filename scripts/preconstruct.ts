import fs from 'fs-extra'
import { glob } from 'glob'
import path from 'path'

// Symlinks package sources to dist for local development

// Link packages
console.log('Setting up packages for development.')
// Get all package.json files
const packagePaths = await glob('**/package.json', {
  ignore: ['**/dist/**', '**/node_modules/**'],
})

let count = 0
for (const packagePath of packagePaths) {
  type Package = {
    name?: string
    private?: boolean
    exports?: Record<string, { types: string; default: string } | string>
  }
  const packageFile = (await fs.readJson(packagePath)) as Package

  // Skip private packages
  if (packageFile.private) continue
  if (!packageFile.exports) continue

  count += 1
  const dir = path.resolve(path.dirname(packagePath))
  const srcDir = path.resolve(path.dirname(packagePath), 'src')
  console.log(`${packageFile.name} — ${path.dirname(packagePath)}`)
  await fs.emptyDir(path.resolve(dir, 'dist'))

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
    for (const [, value] of Object.entries(exports) as [
      type: 'types' | 'default',
      value: string,
    ][]) {
      const distDir = path.resolve(dir, path.dirname(value))
      const distFileName = path.basename(value)
      const distFilePath = path.resolve(distDir, distFileName)
      await fs.ensureDir(distDir)

      // Symlink src to dist file
      await fs.symlink(srcFilePath, distFilePath, 'file')
    }
  }
}

console.log(`Done. Set up ${count} ${count === 1 ? 'package' : 'packages'}.`)
