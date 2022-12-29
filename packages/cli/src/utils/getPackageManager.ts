import { detect } from 'detect-package-manager'

export function getPackageManager() {
  const userAgent = process.env.npm_config_user_agent
  if (userAgent) {
    if (userAgent.includes('pnpm')) return 'pnpm'
    if (userAgent.includes('npm')) return 'npm'
    if (userAgent.includes('yarn')) return 'yarn'
  }
  return detect()
}
