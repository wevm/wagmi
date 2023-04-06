import { detect } from 'detect-package-manager'
import { execa } from 'execa'

export async function getIsPackageInstalled({
  packageName,
  cwd = process.cwd(),
}: {
  packageName: string
  cwd?: string
}) {
  try {
    const packageManager = await getPackageManager()
    const command =
      packageManager === 'yarn' ? ['why', packageName] : ['ls', packageName]
    const { stdout } = await execa(packageManager, command, { cwd })
    if (stdout !== '') return true
    return false
  } catch (error) {
    return false
  }
}

export async function getInstallCommand(packageName: string) {
  const packageManager = await getPackageManager(false)
  switch (packageManager) {
    case 'yarn':
      return [packageManager, ['add', packageName]] as const
    case 'npm':
      return [packageManager, ['install', '--save', packageName]] as const
    case 'pnpm':
      return [packageManager, ['add', packageName]] as const
    default:
      throw new Error(`Unknown package manager: ${packageManager}`)
  }
}

export async function getPackageManager(executable?: boolean) {
  const userAgent = process.env.npm_config_user_agent
  if (userAgent) {
    if (userAgent.includes('pnpm')) return 'pnpm'
    // The yarn@^3 user agent includes npm, so yarn must be checked first.
    if (userAgent.includes('yarn')) return 'yarn'
    if (userAgent.includes('npm')) return executable ? 'npx' : 'npm'
  }
  const packageManager = await detect()
  if (packageManager === 'npm' && executable) return 'npx'
  return packageManager
}
