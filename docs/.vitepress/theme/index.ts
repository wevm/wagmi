import Theme from 'vitepress/theme'

import 'uno.css'
import 'vitepress-plugin-shiki-twoslash/styles.css'

import AsideSponsors from './components/AsideSponsors.vue'
// import Banner from './components/Banner.vue'
import HomePage from './components/HomePage.vue'

import './style.css'

// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'

export default {
  ...Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      'aside-ads-before': () => h(AsideSponsors),
      'home-features-after': () => h(HomePage),
      // 'layout-top': () => h(Banner),
    })
  },
}
