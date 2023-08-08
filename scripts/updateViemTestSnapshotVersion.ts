import fs from 'fs-extra'
import { glob } from 'glob'

// Updates viem version in Vitest snapshots.

// Link packages
console.log('Updating viem test snapshot version.')

const packageJson = await fs.readJson('package.json')
const viemVersion = packageJson.devDependencies.viem

// Get all *.test.ts files
const testPaths = await glob('packages/**/*.test.ts', {
  ignore: ['**/dist/**', '**/node_modules/**'],
})

let count = 0
for (const testPath of testPaths) {
  const testFile = await fs.readFile(testPath, { encoding: 'utf-8' })

  // Skip files that don't contain viem version
  if (!testFile.includes('Version: viem@')) continue
  // Skip files that contain current version
  if (testFile.includes(`Version: viem@${viemVersion}`)) continue

  console.log(testPath)
  const updatedTestFile = testFile.replace(
    /Version: viem@[A-Za-z0-9\-\.]+/g,
    `Version: viem@${viemVersion}`,
  )
  await fs.writeFile(testPath, updatedTestFile, { encoding: 'utf-8' })

  count += 1
}

console.log(`Done. Updated ${count} ${count === 1 ? 'file' : 'files'}.`)
