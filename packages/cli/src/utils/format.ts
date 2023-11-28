import prettier from 'prettier'

/**
 * Formats string of code.
 * @param content Code to format
 */
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
    // disable all prettier plugins due to potential ESM issues with prettier
    // https://github.com/wagmi-dev/wagmi/issues/2971
    plugins: [],
  })
}
