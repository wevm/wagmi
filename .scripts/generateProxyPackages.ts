import fs from 'node:fs/promises'
import path from 'node:path'
import { glob } from 'glob'

// Generates proxy packages for package.json#exports.

console.log('Generating proxy packages.')

// Get all package.json files
const packagePaths = await glob('packages/**/package.json', {
  ignore: ['**/dist/**', '**/node_modules/**'],
})

let count = 0
for (const packagePath of packagePaths) {
  type Package = Record<string, unknown> & {
    name?: string | undefined
    private?: boolean | undefined
    exports?:
      | Record<string, { types: string; default: string } | string>
      | undefined
  }
  const file = Bun.file(packagePath)
  const packageJson = (await file.json()) as Package

  // Skip private packages
  if (packageJson.private) continue
  if (!packageJson.exports) continue

  count += 1
  console.log(`${packageJson.name} — ${path.dirname(packagePath)}`)

  const dir = path.resolve(path.dirname(packagePath))

  for (const [key, exports] of Object.entries(packageJson.exports)) {
    // Skip `package.json` export
    if (/package\.json$/.test(key)) continue
    if (key === '.') continue
    if (typeof exports === 'string') continue
    if (!exports.default) continue

    const proxyDir = path.resolve(dir, key)
    await fs.mkdir(proxyDir, { recursive: true })

    const types = path.relative(key, exports.types)
    const main = path.relative(key, exports.default)
    await Bun.write(
      `${proxyDir}/package.json`,
      `${JSON.stringify({ type: 'module', types, main }, undefined, 2)}\n`,
    )
  }
}

console.log(
  `Done. Generated proxy packages for ${count} ${
    count === 1 ? 'package' : 'packages'
  }.`,
)
