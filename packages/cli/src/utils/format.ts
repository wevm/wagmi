import { format as prettier, resolveConfig } from 'prettier'

export async function format(content: string) {
  const config = await resolveConfig(process.cwd())
  return prettier(content, {
    arrowParens: 'always',
    endOfLine: 'lf',
    parser: 'typescript',
    printWidth: 80,
    semi: false,
    singleQuote: true,
    tabWidth: 2,
    trailingComma: 'all',
    ...config,
  })
}
