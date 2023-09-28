import { templateFrameworks, templates } from '../generated/imports'
import { type Template, type TemplateFramework } from '../types.js'

export const getTemplatesByFramework = async () => {
  const templateMeta: Record<string, Template[]> = {}

  for (const [frameworkName, templateImports] of Object.entries(templates)) {
    for (const [templateName, templateImport] of Object.entries(
      templateImports,
    )) {
      const template = (await templateImport()).default
      const newTemplate = {
        ...template,
        name: templateName,
        framework: frameworkName,
        id: `${frameworkName}${template.default ? '' : `-${templateName}`}`,
      }

      if (!templateMeta[frameworkName])
        templateMeta[frameworkName] = [newTemplate]
      else templateMeta[frameworkName]?.push(newTemplate)
    }
  }

  return templateMeta
}

export const getTemplates = async () => {
  return Object.values(await getTemplatesByFramework()).flat()
}

export const getTemplateFramework = ({
  templateId,
  templatesByFramework,
}: {
  templateId: string
  templatesByFramework: Record<string, Template[]>
}) => {
  for (const [frameworkName, templates] of Object.entries(
    templatesByFramework,
  )) {
    if (templates.find((template) => template.id === templateId))
      return frameworkName
  }
}

export const getTemplateFrameworks = async (): Promise<TemplateFramework[]> =>
  Promise.all(
    Object.entries(templateFrameworks).map(async ([name, import_]) => ({
      ...(await import_()).default,
      id: name,
      name,
    })),
  )
