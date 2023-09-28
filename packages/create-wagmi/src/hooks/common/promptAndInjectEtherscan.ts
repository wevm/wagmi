import fs from 'fs-extra'

import { default as prompts } from 'prompts'

import { Hooks } from '../../types'
import path from 'path'

export type PromptAndInjectEtherscanContext = {
  etherscanApiKey?: string
}

export const promptAndInjectEtherscan =
  (): Hooks<PromptAndInjectEtherscanContext> => ({
    async afterValidate({ context }) {
      const errorMessage = 'Etherscan API Key is required.'
      const etherscanApiKey = (
        await prompts({
          name: 'etherscanApiKey',
          message: 'What is your Etherscan API Key?',
          type: 'text',
          validate(projectId) {
            if (!projectId) return errorMessage
            return true
          },
        })
      ).etherscanApiKey

      context.set({ etherscanApiKey })
    },
    async beforeInstall({ context, targetPath }) {
      const { etherscanApiKey } = context.get()
      if (!etherscanApiKey) return

      if (!fs.existsSync(path.join(targetPath, '.env')))
        fs.writeFileSync(path.join(targetPath, '.env'), '')

      fs.appendFileSync(
        path.join(targetPath, '.env'),
        `ETHERSCAN_API_KEY=${etherscanApiKey}\n`,
      )
    },
  })
