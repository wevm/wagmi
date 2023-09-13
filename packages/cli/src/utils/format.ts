import prettier from 'prettier'

export async function format(content: string) {
  const config = await prettier.resolveConfig(process.cwd())
  return prettier.format(content, {
    arrowParens: 'always',
    endOfLine: 'lf',
    parser: 'typescript',
    printWidth: 80,
    semi: false,
    singleQuote: true,
    tabWidth: 2,
    trailingComma: 'all',
    ...config,
    plugins: [],
  })
}
