import { type TemplateFramework } from '../types.js'

type CreateTemplateFramework = Omit<TemplateFramework, 'id' | 'name'>

export function createTemplateFramework(
  templateFramework: CreateTemplateFramework,
): CreateTemplateFramework {
  return templateFramework
}
