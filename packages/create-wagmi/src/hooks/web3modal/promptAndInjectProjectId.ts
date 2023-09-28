import fs from 'fs-extra'
import pico from 'picocolors'
import { default as prompts } from 'prompts'

import { Hooks } from '../../types'
import path from 'path'

const log = console.log

export type PromptAndInjectProjectIdContext = {
  walletConnectProjectId: string
}

export const promptAndInjectProjectId =
  (): Hooks<PromptAndInjectProjectIdContext> => ({
    async afterValidate({ context }) {
      const errorMessage = 'Project ID is required.'
      const walletConnectProjectId = (
        await prompts({
          name: 'walletConnectProjectId',
          message: `What is your WalletConnect Cloud Project ID?\n${pico.blue(
            'Find it at: https://cloud.walletconnect.com/sign-in',
          )}\n`,
          type: 'text',
          validate(projectId) {
            if (!projectId) return errorMessage
            return true
          },
        })
      ).walletConnectProjectId
      if (!walletConnectProjectId) throw new Error(errorMessage)
      context.set({ walletConnectProjectId })
    },
    async afterInstall({ context, targetPath }) {
      const { walletConnectProjectId } = context.get()
      if (!walletConnectProjectId) return
      const configPath = path.join(targetPath, 'src', 'wagmi.ts')
      const config = fs.readFileSync(configPath).toString()
      fs.writeFileSync(
        configPath,
        config.replace('<WALLET_CONNECT_PROJECT_ID>', walletConnectProjectId),
      )
      log(pico.green('✔'), 'Added WalletConnect Project ID.')
      log()
    },
  })
