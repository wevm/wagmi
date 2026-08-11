import { spawnSync } from 'node:child_process'
import { readdir, readFile, rm } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('.', import.meta.url))
const nextRoot = path.join(root, 'next')
const viteRoot = path.join(root, 'vite')

const targets = [
  {
    name: 'Next.js (Turbopack)',
    command: 'next',
    args: ['build', nextRoot, '--turbopack'],
    output: path.join(nextRoot, '.next/static/chunks'),
    clean: path.join(nextRoot, '.next'),
  },
  {
    name: 'Next.js (Webpack)',
    command: 'next',
    args: ['build', nextRoot, '--webpack'],
    output: path.join(nextRoot, '.next/static/chunks'),
    clean: path.join(nextRoot, '.next'),
  },
  {
    name: 'Vite',
    command: 'vite',
    args: ['build', viteRoot],
    output: path.join(viteRoot, 'dist/assets'),
    clean: path.join(viteRoot, 'dist'),
  },
] as const

const unusedChainMarkers = [
  'Artela Testnet',
  'Bitkub Testnet',
  'WorldLand Mainnet',
  'Zora Goerli Testnet',
]

for (const target of targets) {
  console.log(`\nBuilding ${target.name}.`)
  await rm(target.clean, { force: true, recursive: true })

  const result = spawnSync(target.command, target.args, {
    cwd: root,
    env: { ...process.env, NEXT_TELEMETRY_DISABLED: '1' },
    stdio: 'inherit',
  })
  if (result.error) throw result.error
  if (result.status !== 0)
    throw new Error(`${target.name} build exited with code ${result.status}.`)

  const files = await getJavaScriptFiles(target.output)
  if (files.length === 0)
    throw new Error(`${target.name} build did not emit client JavaScript.`)

  for (const file of files) {
    const source = await readFile(file, 'utf8')
    const marker = unusedChainMarkers.find((marker) => source.includes(marker))
    if (marker)
      throw new Error(
        `${target.name} included unused Viem chain "${marker}" in ${path.relative(root, file)}.`,
      )
  }
}

async function getJavaScriptFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = await Promise.all(
    entries.map((entry) => {
      const file = path.join(directory, entry.name)
      if (entry.isDirectory()) return getJavaScriptFiles(file)
      return /\.[cm]?js$/.test(entry.name) ? [file] : []
    }),
  )
  return files.flat()
}
