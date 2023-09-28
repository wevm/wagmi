import pico from 'picocolors'
import { default as prompts } from 'prompts'

import { providers } from '../meta.js'
import { type ProviderApiKeyEnvVars, type ProviderName } from '../types.js'

export async function selectProviders() {
  const envVars = {} as Record<ProviderApiKeyEnvVars, string>

  let providerNames = (
    await prompts({
      name: 'providerNames',
      message: 'What providers would you like to use?',
      type: 'multiselect',
      instructions: pico.blue(
        pico.italic(
          `\n${pico.bold('space')} to select, ${pico.bold(
            'enter',
          )} to submit/skip`,
        ),
      ),
      choices: Object.entries(providers).map(([name, provider]) => ({
        ...provider,
        value: name,
      })),
    })
  ).providerNames as ProviderName[]
  if (providerNames.length === 0) providerNames = ['public']

  for (const providerName of providerNames) {
    const errorMessage = 'API Key is required.'
    const provider = providers[providerName]
    if (!provider) continue
    if (!provider.apiKey) continue
    const apiKey = (
      await prompts({
        name: 'apiKey',
        message: `What is your ${provider.title} API Key?\n${pico.blue(
          `Find it at: ${provider.apiKey.url}`,
        )}\n`,
        type: 'text',
        validate(projectId) {
          if (!projectId) return errorMessage
          return true
        },
      })
    ).apiKey
    if (!apiKey) throw new Error(errorMessage)
    envVars[provider.apiKey.env] = apiKey
  }

  return { envVars, providerNames }
}
