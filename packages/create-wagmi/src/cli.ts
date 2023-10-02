#!/usr/bin/env node
import * as fs from 'node:fs'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'
import { cac } from 'cac'
import spawn from 'cross-spawn'
import pc from 'picocolors'
import prompts from 'prompts'

import { type Framework, frameworks } from './frameworks.js'
import {
  copy,
  emptyDir,
  formatTargetDir,
  isEmpty,
  isValidPackageName,
  pkgFromUserAgent,
  toValidPackageName,
} from './utils.js'
import { version } from './version.js'

const templates = frameworks
  .map((f) => f.variants?.map((v) => v.name) || [f.name])
  .reduce((a, b) => a.concat(b), [])

const cli = cac('create-wagmi')

cli
  .usage(`${pc.green('<project-directory>')} [options]`)
  .option(
    '-t, --template [name]',
    `Template to bootstrap with. Available: ${templates
      .sort((a, b) => (a && !b ? -1 : 1))
      .join(', ')}`,
  )
  .option('--bun', 'Use bun as your package manager')
  .option('--npm', 'Use npm as your package manager')
  .option('--pnpm', 'Use pnpm as your package manager')
  .option('--yarn', 'Use yarn as your package manager')

cli.help()
cli.version(version)

const cwd = process.cwd()

const renameFiles: Record<string, string | undefined> = {
  '_env.local': '.env.local',
  _gitignore: '.gitignore',
}

const defaultTargetDir = 'wagmi-project'

async function init() {
  const { args, options } = cli.parse(process.argv)
  if (options.help) return
  if (options.version) return

  const argTargetDir = formatTargetDir(args[0])
  const argTemplate = options.template || options.t

  let targetDir = argTargetDir || defaultTargetDir
  function getProjectName() {
    return targetDir === '.' ? path.basename(path.resolve()) : targetDir
  }

  let result: prompts.Answers<
    'framework' | 'overwrite' | 'packageName' | 'projectName' | 'variant'
  >
  try {
    result = await prompts(
      [
        {
          type: argTargetDir ? null : 'text',
          name: 'projectName',
          message: pc.reset('Project name:'),
          initial: defaultTargetDir,
          onState(state) {
            targetDir = formatTargetDir(state.value) || defaultTargetDir
          },
        },
        {
          type() {
            return !fs.existsSync(targetDir) || isEmpty(targetDir)
              ? null
              : 'confirm'
          },
          name: 'overwrite',
          message() {
            return `${
              targetDir === '.'
                ? 'Current directory'
                : `Target directory "${targetDir}"`
            } is not empty. Remove existing files and continue?`
          },
        },
        {
          type(_, { overwrite }: { overwrite?: boolean }) {
            if (overwrite === false)
              throw new Error(`${pc.red('✖')} Operation cancelled`)
            return null
          },
          name: 'overwriteChecker',
        },
        {
          type() {
            return isValidPackageName(getProjectName()) ? null : 'text'
          },
          name: 'packageName',
          message: pc.reset('Package name:'),
          initial() {
            return toValidPackageName(getProjectName())
          },
          validate(dir) {
            return isValidPackageName(dir) || 'Invalid package.json name'
          },
        },
        {
          type:
            argTemplate && templates.includes(argTemplate) ? null : 'select',
          name: 'framework',
          message:
            typeof argTemplate === 'string' && !templates.includes(argTemplate)
              ? pc.reset(
                  `"${argTemplate}" isn't a valid template. Please choose from below: `,
                )
              : pc.reset('Select a framework:'),
          initial: 0,
          choices: frameworks.map((framework) => {
            const frameworkColor = framework.color
            return {
              title: frameworkColor(framework.display || framework.name),
              value: framework,
            }
          }),
        },
        {
          type(framework: Framework) {
            return framework?.variants?.length > 1 ? 'select' : null
          },
          name: 'variant',
          message: pc.reset('Select a variant:'),
          choices(framework: Framework) {
            return framework.variants.map((variant) => {
              const variantColor = variant.color
              return {
                title: variantColor(variant.display || variant.name),
                value: variant.name,
              }
            })
          },
        },
      ],
      {
        onCancel() {
          throw new Error(`${pc.red('✖')} Operation cancelled`)
        },
      },
    )
  } catch (error) {
    console.log((error as Error).message)
    return
  }

  // user choice associated with prompts
  const {
    framework,
    overwrite,
    packageName,
    variant = framework?.variants[0]?.name,
  } = result

  const root = path.join(cwd, targetDir)

  if (overwrite) emptyDir(root)
  else if (!fs.existsSync(root)) fs.mkdirSync(root, { recursive: true })

  // determine template
  const template: string = variant || framework?.name || argTemplate

  const pkgInfo = pkgFromUserAgent(process.env.npm_config_user_agent)
  type PkgManager = 'bun' | 'npm' | 'pnpm' | 'yarn'
  let pkgManager: PkgManager
  if (options.bun) pkgManager = 'bun'
  else if (options.npm) pkgManager = 'npm'
  else if (options.pnpm) pkgManager = 'pnpm'
  else if (options.yarn) pkgManager = 'yarn'
  else pkgManager = pkgInfo ? (pkgInfo.name as PkgManager) : 'npm'
  const isYarn1 = pkgManager === 'yarn' && pkgInfo?.version?.startsWith('1.')

  const { customCommand } =
    frameworks.flatMap((f) => f.variants).find((v) => v.name === template) ?? {}

  if (customCommand) {
    const fullCustomCommand = customCommand
      .replace(/^npm create /, () => {
        // `bun create` uses it's own set of templates,
        // the closest alternative is using `bun x` directly on the package
        if (pkgManager === 'bun') return 'bun x create-'
        return `${pkgManager} create `
      })
      // Only Yarn 1.x doesn't support `@version` in the `create` command
      .replace('@latest', () => (isYarn1 ? '' : '@latest'))
      .replace(/^npm exec/, () => {
        // Prefer `pnpm dlx`, `yarn dlx`, or `bun x`
        if (pkgManager === 'pnpm') return 'pnpm dlx'
        if (pkgManager === 'yarn' && !isYarn1) return 'yarn dlx'
        if (pkgManager === 'bun') return 'bun x'
        // Use `npm exec` in all other cases,
        // including Yarn 1.x and other custom npm clients.
        return 'npm exec'
      })

    const [command, ...args] = fullCustomCommand.split(' ')
    // we replace TARGET_DIR here because targetDir may include a space
    const replacedArgs = args.map((arg) => arg.replace('TARGET_DIR', targetDir))
    const { status } = spawn.sync(command!, replacedArgs, {
      stdio: 'inherit',
    })
    process.exit(status ?? 0)
  }

  console.log(`\nScaffolding project in ${root}...`)

  const templateDir = path.resolve(
    fileURLToPath(import.meta.url),
    '../../../templates',
    template,
  )

  function write(file: string, content?: string) {
    const targetPath = path.join(root, renameFiles[file] ?? file)
    if (content) fs.writeFileSync(targetPath, content)
    else copy(path.join(templateDir, file), targetPath)
  }

  const files = fs.readdirSync(templateDir)
  for (const file of files.filter((f) => f !== 'package.json')) {
    write(file)
  }

  const pkg = JSON.parse(
    fs.readFileSync(path.join(templateDir, 'package.json'), 'utf-8'),
  )

  pkg.name = packageName || getProjectName()

  write('package.json', `${JSON.stringify(pkg, null, 2)}\n`)

  const cdProjectName = path.relative(cwd, root)
  console.log('\nDone. Now run:\n')
  if (root !== cwd)
    console.log(
      `  cd ${
        cdProjectName.includes(' ') ? `"${cdProjectName}"` : cdProjectName
      }`,
    )

  switch (pkgManager) {
    case 'yarn':
      console.log('  yarn')
      console.log('  yarn dev')
      break
    default:
      console.log(`  ${pkgManager} install`)
      console.log(`  ${pkgManager} run dev`)
      break
  }
  console.log()
}

init().catch((e) => {
  console.error(e)
})
