import fs from 'fs-extra'

import { providers } from '../../meta'
import { Hooks } from '../../types'
import { SelectAndInjectProvidersContext } from '../common'
import path from 'path'

export const injectProviders = ({
  envNamespace,
  envPrefix,
}: {
  envNamespace: string
  envPrefix: string
}): Hooks<SelectAndInjectProvidersContext> => ({
  async beforeInstall({ context, targetPath }) {
    const { providerNames } = context.get()

    const configPath = path.join(targetPath, 'src', 'wagmi.ts')

    let src = fs.readFileSync(configPath).toString()
    src = src.replace(
      /([\s\S]*getDefaultConfig[\s\S]*)(\s\s}\),)([\s\S]*)/,
      (_, a, _b, c) => {
        return (
          a +
          providerNames
            .map((providerName) => {
              const provider = providers[providerName]
              if (!provider.apiKey) return ''
              return `    ${provider.name}Id: ${envNamespace}.${envPrefix}${provider.apiKey.env}!,\n`
            })
            .join('') +
          '  })' +
          c
        )
      },
    )

    fs.writeFileSync(configPath, src)
  },
})
