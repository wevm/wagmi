/**
 * Formats string of code.
 * @param content Code to format
 */
export async function format(content: string) {
  const { format: prettier, resolveConfig } = await import('prettier')
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
