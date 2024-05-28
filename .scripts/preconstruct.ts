import fs from 'node:fs/promises'
import path from 'node:path'
import { glob } from 'glob'

// Symlinks package sources to dist for local development

console.log('Setting up packages for development.')

// Get all package.json files
const packagePaths = await glob('**/package.json', {
  ignore: ['**/dist/**', '**/node_modules/**'],
})

let count = 0
for (const packagePath of packagePaths) {
  type Package = {
    bin?: Record<string, string> | undefined
    exports?:
      | Record<string, { types: string; default: string } | string>
      | undefined
    name?: string | undefined
    private?: boolean | undefined
  }
  const file = Bun.file(packagePath)
  const packageJson = (await file.json()) as Package

  // Skip private packages
  if (packageJson.private && packageJson.name !== '@wagmi/test') continue
  if (!packageJson.exports) continue
  if (packageJson.bin) continue

  count += 1
  console.log(`${packageJson.name} — ${path.dirname(packagePath)}`)

  const dir = path.resolve(path.dirname(packagePath))

  // Empty dist directory
  const dist = path.resolve(dir, 'dist')
  let files: string[] = []
  try {
    files = await fs.readdir(dist)
  } catch {
    await fs.mkdir(dist)
  }

  const promises = []
  for (const file of files) {
    promises.push(
      fs.rm(path.join(dist, file), { recursive: true, force: true }),
    )
  }
  await Promise.all(promises)

  // Link exports to dist locations
  for (const [key, exports] of Object.entries(packageJson.exports)) {
    // Skip `package.json` exports
    if (/package\.json$/.test(key)) continue
    if (typeof exports === 'string') continue

    // Link exports to dist locations
    for (const [type, value] of Object.entries(exports) as [
      type: 'types' | 'default',
      value: string,
    ][]) {
      const srcDir = path.resolve(
        dir,
        path
          .dirname(value)
          .replace(`dist/${type === 'default' ? 'esm' : type}`, 'src'),
      )
      let srcFileName: string
      if (key === '.') srcFileName = 'index.ts'
      else srcFileName = path.basename(`${key}.ts`)
      const srcFilePath = path.resolve(srcDir, srcFileName)

      const distDir = path.resolve(dir, path.dirname(value))
      const distFileName = path.basename(value)
      const distFilePath = path.resolve(distDir, distFileName)

      await fs.mkdir(distDir, { recursive: true })

      // Symlink src to dist file
      await fs.symlink(srcFilePath, distFilePath, 'file')
    }
  }
}

console.log(`Done. Set up ${count} ${count === 1 ? 'package' : 'packages'}.`)
