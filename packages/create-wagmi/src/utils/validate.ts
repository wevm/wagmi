import fs from 'fs-extra'
import pico from 'picocolors'
import validatePackageName from 'validate-npm-package-name'

import path from 'path'
import { type Template } from '../types.js'

type ValidationResult =
  | {
      valid: false
      message: string
      problems: string
    }
  | {
      valid: true
      message?: never
      problems?: never
    }

export async function validateProjectName({
  projectName,
  projectPath,
}: {
  projectName: string
  projectPath: string
}): Promise<ValidationResult> {
  // Validate project name
  const nameValidation = validatePackageName(projectName)
  if (!nameValidation.validForNewPackages) {
    const problems = [
      ...(nameValidation.errors ?? []),
      ...(nameValidation.warnings ?? []),
    ]
    return {
      valid: false,
      message: `🙈 "${projectName}" is not a valid project name.`,
      problems: problems.map((problem) => `👉 ${problem}`).join('\n'),
    }
  }

  // Validate project target path
  const targetPath = path.join(process.cwd(), projectPath)
  if (await fs.pathExists(targetPath))
    return {
      valid: false,
      message: `🙈 the directory "${projectPath}" already exists.`,
      problems: '👉 choose another name or delete the directory.',
    }

  return {
    valid: true,
  }
}

export async function validateTemplateName({
  isNameRequired = true,
  templateId,
  templates,
}: {
  isNameRequired?: boolean
  templateId: string
  templates: Template[]
}): Promise<ValidationResult> {
  if (isNameRequired && !templateId)
    return {
      valid: false,
      message: '🙈 no template provided.',
      problems: '👉 select a template or provide one using --template.',
    }

  if (templateId && !templates.find((template) => template.id === templateId))
    return {
      valid: false,
      message: `🙈 the template "${templateId}" does not exist.`,
      problems: `Choose a valid name. Available: ${templates
        .map(({ id }) => id)
        .join(', ')}`,
    }

  return { valid: true }
}

export class ValidationError extends Error {
  override name = 'ValidationError'
  constructor(validation: ValidationResult) {
    super([pico.red(validation.message), validation.problems].join('\n'))
  }
}
