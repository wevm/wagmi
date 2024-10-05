import fs from 'node:fs/promises'
import path from 'node:path'
import { defineConfig } from 'tsup'
import { generateTsupOptions, parsePresetOptions } from 'tsup-preset-solid'

export default defineConfig(async () => {
  const packageJson = await getPackageJson()
  const out_dir = path.dirname(packageJson.main)
  const entry_dir = out_dir.replace('dist/esm', 'src')
  const entry_filename = path.basename(packageJson.main).replace('.js', '.ts')

  const parsed = parsePresetOptions({
    cjs: false,
    drop_console: false,
    entries: {
      entry: `${entry_dir}/${entry_filename}`,
    },
    out_dir,
  })

  return generateTsupOptions(parsed)
})

// Ideally, we put this inside `tsup.config.ts#onSuccess`, but type definitions complete after `onSuccess`.
// https://github.com/egoist/tsup/issues/700
process.on('beforeExit', async (code) => {
  if (code === 0) {
    // copy types to correct location
    const packageJson = await getPackageJson()
    const typesFilePath = `${path.dirname(packageJson.main)}/index.d.ts`
    const typesDir = path.dirname(packageJson.types)
    await fs.mkdir(typesDir, { recursive: true })
    await fs.copyFile(typesFilePath, packageJson.types)
    await fs.rm(typesFilePath)

    // inline bundled css
    const searchValue = 'var styles = "";'
    const mainContent = await fs.readFile(packageJson.main, 'utf-8')
    if (!mainContent.includes(searchValue)) {
      console.error(`Bundled styles replacer '${searchValue}' not found`)
      process.exit(1)
    }

    const stylesFilePath = `${path.dirname(packageJson.main)}/index.css`
    const stylesContent = await fs.readFile(stylesFilePath, 'utf-8')
    const content = mainContent.replace(
      searchValue,
      `var styles = \`${stylesContent.replaceAll('\\', '\\\\')}\`;`,
    )
    await fs.writeFile(packageJson.main, content)
    await fs.rm(stylesFilePath)

    process.exit()
  }
})

async function getPackageJson() {
  return (await fs
    .readFile('package.json', 'utf-8')
    .then(JSON.parse)) as Package
  type Package = {
    main: string
    types: string
  }
}
