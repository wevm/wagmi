import { VueQueryPlugin } from '@tanstack/vue-query'
import { WagmiPlugin } from '@wagmi/vue'
import { createApp } from 'vue'

import App from './App.vue'
import './style.css'
import { config } from './wagmi'

const app = createApp(App)

app
  .use(WagmiPlugin, {
    config,
    reconnectOnMount: true,
  })
  .use(VueQueryPlugin, {})

app.mount('#app')
