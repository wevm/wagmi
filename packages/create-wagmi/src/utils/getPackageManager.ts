import { detect } from 'detect-package-manager'

import { type CLIOptions } from '../cli.js'

export const getPackageManager = ({ options }: { options?: CLIOptions }) => {
  if (options) {
    if (options.npm) return 'npm'
    if (options.pnpm) return 'pnpm'
    if (options.yarn) return 'yarn'
  }

  const userAgent = process.env.npm_config_user_agent
  if (userAgent) {
    if (userAgent.includes('pnpm')) return 'pnpm'
    if (userAgent.includes('npm')) return 'npm'
    if (userAgent.includes('yarn')) return 'yarn'
  }
  return detect()
}
