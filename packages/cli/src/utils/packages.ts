import { execSync } from 'node:child_process'
import { promises as fs } from 'node:fs'
import { resolve } from 'node:path'

export async function getIsPackageInstalled(parameters: {
  packageName: string
  cwd?: string
}) {
  const { packageName, cwd = process.cwd() } = parameters
  try {
    const packageManager = await getPackageManager()
    const command = (() => {
      switch (packageManager) {
        case 'yarn':
          return ['why', packageName]
        case 'bun':
          return ['pm', 'ls', '--all']
        default:
          return ['ls', packageName]
      }
    })()

    const result = execSync(`${packageManager} ${command.join(' ')}`, {
      cwd,
      encoding: 'utf-8',
      stdio: 'pipe',
    })

    // For Bun, we need to check if the package name is in the output
    if (packageManager === 'bun') return result.includes(packageName)

    return result !== ''
  } catch (_error) {
    return false
  }
}

export async function getPackageManager(executable?: boolean | undefined) {
  const userAgent = process.env.npm_config_user_agent
  if (userAgent) {
    if (userAgent.includes('pnpm')) return 'pnpm'
    // The yarn@^3 user agent includes npm, so yarn must be checked first.
    if (userAgent.includes('yarn')) return 'yarn'
    if (userAgent.includes('npm')) return executable ? 'npx' : 'npm'
    if (userAgent.includes('bun')) return executable ? 'bunx' : 'bun'
  }

  const packageManager = await detect()
  if (packageManager === 'npm' && executable) return 'npx'
  return packageManager
}

type PackageManager = 'npm' | 'yarn' | 'pnpm' | 'bun'

async function detect(
  parameters: { cwd?: string; includeGlobalBun?: boolean } = {},
) {
  const { cwd, includeGlobalBun } = parameters
  const type = await getTypeofLockFile(cwd)
  if (type) {
    return type
  }
  const [hasYarn, hasPnpm, hasBun] = await Promise.all([
    hasGlobalInstallation('yarn'),
    hasGlobalInstallation('pnpm'),
    includeGlobalBun && hasGlobalInstallation('bun'),
  ])
  if (hasYarn) return 'yarn'
  if (hasPnpm) return 'pnpm'
  if (hasBun) return 'bun'
  return 'npm'
}

const cache = new Map()

function hasGlobalInstallation(pm: PackageManager): boolean {
  const key = `has_global_${pm}`
  if (cache.has(key)) return cache.get(key)

  try {
    const result = execSync(`${pm} --version`, {
      encoding: 'utf-8',
      stdio: 'pipe',
    })
    const isGlobal = /^\d+.\d+.\d+$/.test(result)
    cache.set(key, isGlobal)
    return isGlobal
  } catch {
    return false
  }
}

function getTypeofLockFile(cwd = '.'): Promise<PackageManager | null> {
  const key = `lockfile_${cwd}`
  if (cache.has(key)) {
    return Promise.resolve(cache.get(key))
  }

  return Promise.all([
    pathExists(resolve(cwd, 'yarn.lock')),
    pathExists(resolve(cwd, 'package-lock.json')),
    pathExists(resolve(cwd, 'pnpm-lock.yaml')),
    pathExists(resolve(cwd, 'bun.lockb')),
  ]).then(([isYarn, isNpm, isPnpm, isBun]) => {
    let value: PackageManager | null = null

    if (isYarn) value = 'yarn'
    else if (isPnpm) value = 'pnpm'
    else if (isBun) value = 'bun'
    else if (isNpm) value = 'npm'

    cache.set(key, value)
    return value
  })
}

async function pathExists(p: string) {
  try {
    await fs.access(p)
    return true
  } catch {
    return false
  }
}
