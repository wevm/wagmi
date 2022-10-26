import { default as fs } from 'fs-extra'
import { defineConfig } from 'tsup'

import { dependencies, peerDependencies } from './package.json'
import path from 'path'

const entry = [
  'src/index.ts',
  'src/chains.ts',
  'src/connectors/coinbaseWallet.ts',
  'src/connectors/metaMask.ts',
  'src/connectors/walletConnect.ts',
  'src/connectors/mock/index.ts',
  'src/internal.ts',
  'src/providers/alchemy.ts',
  'src/providers/public.ts',
  'src/providers/infura.ts',
  'src/providers/jsonRpc.ts',
]

export default defineConfig(() => {
  if (process.env.DEV === 'true')
    return {
      clean: true,
      entry: ['src/index.ts'],
      format: ['esm'],
      async onSuccess() {
        // remove all files in dist
        await fs.emptyDir(path.join(__dirname, 'dist'))
        // symlink files and type definitions
        for (const file of entry) {
          const filePath = path.resolve(file)
          const distSourceFile = filePath
            .replace(file, file.replace('src/', 'dist/'))
            .replace(/\.ts$/, '.js')
          // Make sure directory exists
          await fs.ensureDir(path.dirname(distSourceFile))
          // Create symlink between source and dist file
          await fs.symlink(filePath, distSourceFile, 'file')
          // Create file linking up type definitions
          const srcTypesFile = path
            .relative(path.dirname(distSourceFile), filePath)
            .replace(/\.ts$/, '')
          await fs.outputFile(
            distSourceFile.replace(/\.js$/, '.d.ts'),
            `export * from '${srcTypesFile}'`,
          )
        }
      },
    }

  return {
    bundle: true,
    clean: true,
    dts: true,
    entry,
    external: [...Object.keys(dependencies), ...Object.keys(peerDependencies)],
    format: ['esm'],
    platform: 'browser',
  }
})
