import { type Template } from '../types.js'

type CreateTemplate = Omit<Template, 'id' | 'framework' | 'name'>

export function createTemplate(template: CreateTemplate): CreateTemplate {
  return template
}
