import Theme from 'vitepress/theme'

import AsideSponsors from './components/AsideSponsors.vue'
import HomeSponsors from './components/HomeSponsors.vue'
import VercelBadge from './components/VercelBadge.vue'
import './style.css'
import 'vitepress-plugin-shiki-twoslash/styles.css'

// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'

export default {
  ...Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      'aside-ads-before': () => h(AsideSponsors),
      'home-features-after': () => h(HomeSponsors),
      'layout-bottom': () => h(VercelBadge),
    })
  },
}
