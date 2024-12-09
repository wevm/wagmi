import escalade from 'escalade'

export async function getIsUsingTypeScript() {
  try {
    const cwd = process.cwd()
    const tsconfig = await escalade(cwd, (_dir, names) => {
      const files = [
        'tsconfig.json',
        'tsconfig.base.json',
        'tsconfig.lib.json',
        'tsconfig.node.json',
      ]
      for (const name of names) {
        if (files.includes(name)) return name
      }
      return undefined
    })
    if (tsconfig) return true

    const wagmiConfig = await escalade(cwd, (_dir, names) => {
      const files = ['wagmi.config.ts', 'wagmi.config.mts']
      for (const name of names) {
        if (files.includes(name)) return name
      }
      return undefined
    })
    if (wagmiConfig) return true

    return false
  } catch {
    return false
  }
}
