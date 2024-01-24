import { findUp } from 'find-up'

export async function getIsUsingTypeScript() {
  try {
    const cwd = process.cwd()
    const tsconfig = await findUp('tsconfig.json', { cwd })
    const wagmiConfig = await findUp('wagmi.config.ts', { cwd })
    return !!tsconfig || !!wagmiConfig
  } catch {
    return false
  }
}
