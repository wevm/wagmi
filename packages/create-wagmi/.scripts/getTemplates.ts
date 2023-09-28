// Temporary workaround until esbuild supports glob imports.
// https://github.com/evanw/esbuild/pull/2508
function getTemplates() {
  const frameworks = fs.readdirSync(path.join(__dirname, 'templates'))

  let frameworksSrc = 'export const templateFrameworks = {'
  let templatesSrc = 'export const templates = {'

  frameworks.forEach((framework) => {
    const frameworkPath = path.join(__dirname, 'templates', framework)
    if (!fs.lstatSync(frameworkPath).isDirectory()) return
    if (!fs.existsSync(path.join(frameworkPath, '_meta.ts'))) {
      console.log(
        pico.yellow(
          [
            `Unable to find \`_meta.ts\` for framework "${framework}".`,
            '',
            'Please make sure that you have a file named `_meta.ts` in the root of your framework folder.',
            '',
            'Example:',
            '',
            `${path.join(frameworkPath, '_meta.ts')}`,
            '```',
            "import { createTemplateFramework } from '../createTemplateFramework'",
            '',
            'export default createTemplateFramework({',
            '  name: "example-framework",',
            '  title: "Example Framework",',
            '  description: "An example framework",',
            '})',
            '```',
          ].join('\n'),
        ),
      )
    } else {
      frameworksSrc += `\n  '${framework}': () => import('../../templates/${framework}/_meta'),`
      templatesSrc += `\n  '${framework}': {`
    }

    const templates = fs.readdirSync(frameworkPath)
    templates.forEach((template) => {
      const templatePath = path.join(frameworkPath, template)
      if (!fs.lstatSync(templatePath).isDirectory()) return
      if (!fs.existsSync(path.join(templatePath, '_meta.ts'))) {
        console.log(
          pico.yellow(
            [
              `Unable to find \`_meta.ts\` for template "${template}".`,
              '',
              'Please make sure that you have a file named `_meta.ts` in the root of your template folder.',
              '',
              'Example:',
              '',
              `${path.join(templatePath, '_meta.ts')}`,
              '```',
              "import { createTemplate } from '../createTemplate'",
              '',
              'export default createTemplate({',
              '  name: "example-template",',
              '  title: "Example Template",',
              '  description: "An example template using wagmi",',
              '})',
              '```',
            ].join('\n'),
          ),
        )
      } else {
        templatesSrc += `\n    '${template}': () => import('../../templates/${framework}/${template}/_meta'),`
      }
    })

    templatesSrc += '\n  },'
  })
  templatesSrc += '\n}\n'
  frameworksSrc += '\n}\n'

  const generatedPath = path.join(__dirname, 'src/generated')
  if (!fs.existsSync(generatedPath)) fs.mkdirSync(generatedPath)
  fs.writeFileSync(
    path.join(generatedPath, 'imports.ts'),
    `${templatesSrc}\n${frameworksSrc}`,
  )

  return frameworks
}
