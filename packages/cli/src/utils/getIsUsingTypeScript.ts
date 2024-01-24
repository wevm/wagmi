import { findUp } from 'find-up'

export async function getIsUsingTypeScript() {
  try {
    const cwd = process.cwd()
    const tsconfig = await findUp('tsconfig.json', { cwd })
    if (tsconfig) return true

    const wagmiConfig = await findUp(['wagmi.config.ts', 'wagmi.config.mts'], {
      cwd,
    })
    if (wagmiConfig) return true

    return false
  } catch {
    return false
  }
}
