#!/usr/bin/env node
import path from 'path'
import { fileURLToPath } from 'url'
import { cac } from 'cac'
import cpy from 'cpy'
import { execa } from 'execa'
import fs from 'fs-extra'
import { oraPromise } from 'ora'
import pico from 'picocolors'
import { default as prompts } from 'prompts'

import { type Template } from './types.js'
import { getPackageManager } from './utils/getPackageManager.js'
import { notifyUpdate } from './utils/notifyUpdate.js'
import {
  getTemplateFramework,
  getTemplateFrameworks,
  getTemplates,
  getTemplatesByFramework,
} from './utils/templates.js'
import {
  ValidationError,
  validateProjectName,
  validateTemplateName,
} from './utils/validate.js'
import { version } from './version.js'

const log = console.log

export type CLIArgs = readonly string[]
export type CLIOptions = {
  [k: string]: any
}

async function run({
  args,
  options,
  templates,
}: {
  args: CLIArgs
  options: CLIOptions
  templates: Template[]
}) {
  if (options.help) return

  log()
  log(
    `Welcome to ${pico.bold(
      pico.blue('create-wagmi'),
    )} – the quickest way to get started with wagmi!`,
  )
  log()

  const __dirname = fileURLToPath(new URL('.', import.meta.url))
  const templatesPath = path.join(__dirname, '..', 'templates')
  let templateId = options.template || options.t

  // Validate template if provided
  let templateValidation = await validateTemplateName({
    isNameRequired: false,
    templateId,
    templates,
  })
  if (!templateValidation.valid) throw new ValidationError(templateValidation)

  // Validate project name
  let projectName: string
  let projectPath: string
  if (args[0]) {
    projectPath = args[0].trim()
    const splitPath = projectPath.split('/')
    projectName = splitPath[splitPath.length - 1]?.trim() || ''
    log(pico.green('✔'), pico.bold('Using project name:'), projectName)
  } else {
    const res = await prompts({
      initial: 'my-app',
      name: 'projectName',
      message: 'What is your project named?',
      type: 'text',
      async validate(projectName) {
        const validation = await validateProjectName({
          projectName,
          projectPath: projectName,
        })
        if (!validation.valid) return validation.message
        return true
      },
    })
    projectName = res.projectName?.trim()
    projectPath = projectName
  }

  // Validate project name
  const nameValidation = await validateProjectName({
    projectName,
    projectPath,
  })
  if (!nameValidation.valid) throw new ValidationError(nameValidation)

  const frameworks = await getTemplateFrameworks()

  const templatesByFramework = await getTemplatesByFramework()
  let frameworkId =
    getTemplateFramework({
      templateId,
      templatesByFramework,
    }) || frameworks[0]?.id

  // Extract template ID from CLI or prompt
  if (!templateId || !frameworkId) {
    frameworkId = (
      await prompts({
        name: 'frameworkId',
        message: 'What framework would you like to use?',
        type: 'select',
        choices: frameworks
          .map(({ name, ...t }) => ({
            ...t,
            value: name,
          }))
          .sort((a, b) => (a.default && !b.default ? -1 : 1)),
      })
    ).frameworkId
    if (!frameworkId) return

    const frameworkTemplates = templatesByFramework[frameworkId]
    if (!frameworkTemplates) return

    templateId = (
      await prompts({
        name: 'templateId',
        message: 'What template would you like to use?',
        type: 'select',
        choices: frameworkTemplates
          .map(({ id, ...t }) => ({
            ...t,
            value: id,
          }))
          .sort((a, b) => (a.default && !b.default ? -1 : 1)),
      })
    ).templateId
  }

  // Get framework meta
  const frameworkMeta = frameworks.find(({ id }) => id === frameworkId)
  if (!frameworkMeta) return

  // Get template meta
  const templateMeta = templates.find(({ id }) => id === templateId)
  if (!templateMeta) return

  const context = (() => {
    let ctx = {}
    return {
      get() {
        return ctx
      },
      set(newCtx: any) {
        ctx = { ...ctx, ...newCtx }
      },
    }
  })()

  const hooks = templateMeta.hooks
  await hooks?.afterValidate?.({ context })

  // Validate template name
  templateValidation = await validateTemplateName({
    templateId,
    templates,
  })
  if (!templateValidation.valid) throw new ValidationError(templateValidation)

  const targetPath = path.join(process.cwd(), projectPath)
  log(`Creating a new wagmi app in ${pico.green(targetPath)}.`)
  log()
  log(
    `Using ${pico.bold(frameworkMeta.title)}${
      !templateMeta.default ? ` with ${pico.bold(templateMeta.title)}` : ''
    }.`,
  )
  log()

  // Copy template contents into the target path
  const templatePath = path.join(
    templatesPath,
    frameworkMeta.name,
    templateMeta.name,
  )
  await cpy(path.join(templatePath, '**', '*'), targetPath, {
    filter: (file) => file.name !== '_meta.ts',
    rename: (name) => name.replace(/^_dot_/, '.'),
  })

  // Create package.json for project
  const packageJson = await fs.readJSON(path.join(targetPath, 'package.json'))
  packageJson.name = projectName
  await fs.writeFile(
    path.join(targetPath, 'package.json'),
    JSON.stringify(packageJson, null, 2),
  )

  const packageManager = await getPackageManager({ options })
  if (packageManager === 'npm') {
    await fs.appendFile(
      path.join(targetPath, '.npmrc'),
      '\nlegacy-peer-deps = true',
    )
  }

  await hooks?.beforeInstall?.({ context, targetPath })

  // Install in background to not clutter screen
  log(`Using ${pico.bold(packageManager)}.`)
  log()
  const installArgs = [
    'install',
    packageManager === 'npm' ? '--quiet' : '--silent',
  ]
  await oraPromise(
    execa(packageManager, installArgs, {
      cwd: targetPath,
      env: {
        ...process.env,
        ADBLOCK: '1',
        DISABLE_OPENCOLLECTIVE: '1',
        // we set NODE_ENV to development as pnpm skips dev
        // dependencies when production
        NODE_ENV: 'development',
      },
    }),
    {
      text: 'Installing packages. This may take a couple of minutes.',
      failText: 'Failed to install packages.',
      successText: 'Installed packages.',
    },
  )
  log()

  await hooks?.afterInstall?.({ context, targetPath })

  // Create git repository
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
    log(pico.green('✔'), 'Initialized git repository.')
    log()
  }

  log('―――――――――――――――――――――')
  log()
  log(
    `${pico.green('Success!')} Created ${pico.bold(
      projectName,
    )} at ${pico.green(path.resolve(projectPath))}`,
  )
  log()
  log(
    `To start your app, run \`${pico.bold(
      pico.cyan(`cd ${projectPath}`),
    )}\` and then \`${pico.bold(
      pico.cyan(
        `${packageManager}${packageManager === 'npm' ? ' run' : ''} dev`,
      ),
    )}\``,
  )
  log()
  log('―――――――――――――――――――――')
  log()

  await hooks?.afterSetup?.({ context, targetPath })
}
;(async () => {
  let templates: Template[]
  try {
    templates = await getTemplates()
  } catch (err) {
    log(pico.red((<Error>err).message))
    process.exit(1)
  }

  const cli = cac('create-wagmi')
    .version(version)
    .usage(`${pico.green('<project-directory>')} [options]`)
    .option(
      '-t, --template [name]',
      `A template to bootstrap with. Available: ${templates
        .sort((a, b) => (a.default && !b.default ? -1 : 1))
        .map(({ id }) => id)
        .join(', ')}`,
    )
    .option('--npm', 'Use npm as your package manager')
    .option('--pnpm', 'Use pnpm as your package manager')
    .option('--yarn', 'Use yarn as your package manager')
    .option('--skip-git', 'Skips initializing the project as a git repository')
    .help()

  const { args, options } = cli.parse(process.argv)

  try {
    await run({ args, options, templates })
    log()
    await notifyUpdate({ options })
  } catch (err) {
    const error = err as Error
    log(
      error instanceof ValidationError
        ? error.message
        : pico.red((<Error>error).message),
    )
    log()
    await notifyUpdate({ options })
    process.exit(1)
  }
})()
