import { Buffer } from 'buffer'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { WagmiPlugin } from '@wagmi/vue'
import { createApp } from 'vue'

// `@coinbase-wallet/sdk` uses `Buffer`
globalThis.Buffer = Buffer

import App from './App.vue'
import './style.css'
import { config } from './wagmi'

const app = createApp(App)

app.use(WagmiPlugin, { config }).use(VueQueryPlugin, {})

app.mount('#app')
