import Theme from 'vitepress/theme'

import VercelBadge from './VercelBadge.vue'
import './style.css'
import 'vitepress-plugin-shiki-twoslash/styles.css'

// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'

export default {
  ...Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      'layout-bottom': () => h(VercelBadge),
    })
  },
}
