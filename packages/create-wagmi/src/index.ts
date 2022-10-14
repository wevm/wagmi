#!/usr/bin/env node

import { cac } from 'cac'
import chalk from 'chalk'
import cpy from 'cpy'
import { detect } from 'detect-package-manager'
import { execa } from 'execa'
import { existsSync, readJSON, writeFile } from 'fs-extra'
// eslint-disable-next-line import/no-named-as-default
import prompts from 'prompts'

import { name, version } from '../package.json'
import { validatePackageName } from './utils'
import path from 'path'
import { fileURLToPath } from 'url'

const templates = [
  {
    name: 'next',
    title: 'Next.js',
    description: 'Create a Next.js wagmi project',
  },
  {
    name: 'connectkit',
    title: 'Next.js + ConnectKit',
    description: 'Create a Next.js wagmi project with ConnectKit included',
  },
  {
    name: 'rainbowkit',
    title: 'Next.js + RainbowKit',
    description: 'Create a Next.js wagmi project with RainbowKit included',
  },
  {
    name: 'vite-react',
    title: 'Vite',
    description: 'Create a Vite React wagmi project',
  },
  {
    name: 'create-react-app',
    title: 'Create React App',
    description: 'Create a Create React App wagmi project',
  },
]

class CLIError extends Error {}

const log = console.log

const cli = cac(name)
  .version(version)
  .usage(`${chalk.green('<project-directory>')} [options]`)
  .option(
    '-t, --template [name]',
    `A template to bootstrap with. Available: ${templates
      .map(({ name }) => name)
      .join(', ')}`,
  )
  .option('--npm', 'Use npm as your package manager')
  .option('--pnpm', 'Use pnpm as your package manager')
  .option('--yarn', 'Use yarn as your package manager')
  .option('--skip-git', 'Skips initializing the project as a git repository')
  .help()

void (async () => {
  try {
    const { args, options } = cli.parse(process.argv)
    if (options.help) return

    ////////////////////////////////////////////////////////////////

    const __dirname = fileURLToPath(new URL('.', import.meta.url))
    const templatesPath = path.join(__dirname, '..', 'templates')

    ////////////////////////////////////////////////////////////////

    let templateName = options.template || options.t

    if (templateName) {
      const templatePath = path.join(templatesPath, templateName)
      if (!existsSync(templatePath))
        throw new CLIError(
          [
            chalk.red(`🙈 the template "${templateName}" does not exist.`),
            `👉 choose a valid name. Available: ${templates
              .map(({ name }) => name)
              .join(', ')}`,
          ].join('\n'),
        )
    }

    ////////////////////////////////////////////////////////////////

    log()
    log(chalk.magenta('♥ gm, welcome to wagmi ♥'))
    log()

    ////////////////////////////////////////////////////////////////

    let projectPath
    let projectName
    if (args[0]) {
      projectPath = args[0]
      const splitPath = args[0].split('/')
      projectName = splitPath[splitPath.length - 1]
    }

    if (!projectName) {
      projectName = (
        await prompts({
          initial: 'my-wagmi-app',
          name: 'projectName',
          message: 'What would you like to name your project?',
          type: 'text',
          validate: (name) =>
            !validatePackageName(name).valid
              ? `"${name}" is not a valid project name. Enter another name.`
              : true,
        })
      ).projectName
      if (!projectName) throw new CLIError()
      projectPath = projectName
      log(chalk.cyan('👍 Sick name'))
      log()
    }

    if (!validatePackageName(projectName).valid)
      throw new CLIError(
        [
          chalk.red(`🙈 "${projectName}" is not a valid project name.`),
          validatePackageName(projectName).warnings?.map(
            (warning) => `👉 ${warning}`,
          ),
        ].join('\n'),
      )

    ////////////////////////////////////////////////////////////////

    const targetPath = path.join(process.cwd(), projectPath)

    if (existsSync(targetPath))
      throw new CLIError(
        [
          chalk.red(`🙈 the directory "${projectPath}" already exists.`),
          `👉 choose another name or delete the directory.`,
        ].join('\n'),
      )

    ////////////////////////////////////////////////////////////////

    if (!templateName) {
      templateName = (
        await prompts({
          name: 'templateName',
          message: 'What template would you like to use?',
          type: 'select',
          choices: templates.map(({ description, name, title }) => ({
            description,
            title,
            value: name,
          })),
        })
      ).templateName
    }

    ////////////////////////////////////////////////////////////////

    log(chalk.cyan('👷‍♂️ Creating a new wagmi app in', chalk.green(targetPath)))
    log()

    const templatePath = path.join(templatesPath, templateName)
    await cpy(path.join(templatePath, '**', '*'), targetPath, {
      rename: (name) => name.replace(/^_dot_/, '.'),
    })

    const packageJson = await readJSON(path.join(targetPath, 'package.json'))
    packageJson.name = projectName
    await writeFile(
      path.join(targetPath, 'package.json'),
      JSON.stringify(packageJson, null, 2),
    )

    ////////////////////////////////////////////////////////////////

    const packageManager = options.pnpm
      ? 'pnpm'
      : options.yarn
      ? 'yarn'
      : options.npm
      ? 'npm'
      : await detect()

    log(
      chalk.cyan(
        `📦 Installing dependencies with ${chalk.bold(
          packageManager,
        )}. This may take a minute or so...`,
      ),
    )
    log()
    await execa(packageManager, ['install'], {
      cwd: targetPath,
      stdio: 'inherit',
    })

    ////////////////////////////////////////////////////////////////

    if (!options.skipGit) {
      await execa('git', ['init'], { cwd: targetPath })
      await execa('git', ['add', '.'], { cwd: targetPath })
      await execa(
        'git',
        [
          'commit',
          '--no-verify',
          '--message',
          'Initial commit from create-wagmi',
        ],
        { cwd: targetPath },
      )
    }

    ////////////////////////////////////////////////////////////////

    log()
    log(chalk.green(`🔥 Your wagmi app has been set up!`))
    log()
    log(
      chalk.cyan(
        `🚀 To start your app, run \`${chalk.bold(
          `cd ${projectPath}`,
        )}\` and then \`${chalk.bold(
          `${packageManager}${packageManager === 'npm' ? ' run' : ''} dev`,
        )}\``,
      ),
    )
    log()
    log(chalk.magenta('♥ gn ♥'))
  } catch (error) {
    log(
      error instanceof CLIError
        ? error.message
        : chalk.red((<Error>error).message),
    )
    process.exit(1)
  }
})()
