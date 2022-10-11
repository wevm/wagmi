#!/usr/bin/env node

import { cac } from 'cac'
import chalk from 'chalk'
import cpy from 'cpy'
import { detect } from 'detect-package-manager'
import { execa } from 'execa'
import fs from 'fs-extra'
import prompts from 'prompts'
import validateNpmPackageName from 'validate-npm-package-name'

import { name, version } from '../package.json'
import path from 'path'
import { fileURLToPath } from 'url'

class CLIError extends Error {}

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const templatesPath = path.join(__dirname, '..', 'templates')
const templateNames = fs.readdirSync(templatesPath)
const log = console.log

const validateProjectName = (projectName: string) => {
  const { validForNewPackages, warnings } = validateNpmPackageName(projectName)
  return {
    valid: validForNewPackages,
    warnings,
  }
}

const cli = cac(name)
  .version(version)
  .usage(`${chalk.green('<project-directory>')} [options]`)
  .option(
    '-t, --template [name]',
    `A template to bootstrap with. Available: ${templateNames.join(', ')}`,
    {
      default: 'basic',
    },
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

    const templateName = options.template || options.t
    const templatePath = path.join(templatesPath, templateName)

    if (!fs.existsSync(templatePath))
      throw new CLIError(
        [
          chalk.red(`🙈 the template "${templateName}" does not exist.`),
          `👉 choose a valid name. Available: ${templateNames.join(', ')}`,
        ].join('\n'),
      )

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
          message: 'what would you like to name your project?',
          type: 'text',
          validate: (name) =>
            !validateProjectName(name).valid
              ? `"${name}" is not a valid project name. Enter another name.`
              : true,
        })
      ).projectName
      projectPath = projectName
      log('sick name 👍')
      await new Promise((resolve) => setTimeout(resolve, 500))
      log()
    }

    if (!validateProjectName(projectName).valid)
      throw new CLIError(
        [
          chalk.red(`🙈 "${projectName}" is not a valid project name.`),
          validateProjectName(projectName).warnings?.map(
            (warning) => `👉 ${warning}`,
          ),
        ].join('\n'),
      )

    ////////////////////////////////////////////////////////////////

    const targetPath = path.join(process.cwd(), projectPath)

    if (fs.existsSync(targetPath))
      throw new CLIError(
        [
          chalk.red(`🙈 the directory "${projectPath}" already exists.`),
          `👉 choose another name or delete the directory.`,
        ].join('\n'),
      )

    log(chalk.cyan('👷‍♂️ creating a new wagmi app in', chalk.green(targetPath)))
    log()

    await cpy(path.join(templatePath, '**', '*'), targetPath, {
      rename: (name) => name.replace(/^_dot_/, '.'),
    })

    const packageJson = await fs.readJSON(path.join(targetPath, 'package.json'))
    packageJson.name = projectName
    await fs.writeFile(
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
        `📦 installing dependencies with ${chalk.bold(
          packageManager,
        )}. this may take a minute or so...`,
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
    log(chalk.green(`🔥 your wagmi app has been set up!`))
    log()
    log(
      chalk.cyan(
        `🚀 to start your app, run \`${chalk.bold(
          `cd ${projectPath}`,
        )}\` and then \`${chalk.bold(
          `${packageManager}${packageManager === 'npm' ? ' run' : ''} dev`,
        )}\``,
      ),
    )
    log()
    log(chalk.magenta('♥ gn ♥'))
  } catch (error) {
    if (error instanceof CLIError) {
      log(error.message)
    } else {
      log(chalk.red((<Error>error).message))
    }
    process.exit(1)
  }
})()
