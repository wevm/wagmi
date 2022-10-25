import { App } from 'vue-demi'

import { CreateClientConfig, createClient, initClient } from './client'

export const wagmiVue = {
  install: (app: App<any>, options: Omit<CreateClientConfig, 'app'>) => {
    const client = createClient({
      app,
      ...options,
    })
    initClient(client, app)
  },
}
