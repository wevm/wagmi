import { defineConfig } from 'vitepress'
import { withTwoslash } from 'vitepress-plugin-shiki-twoslash'

// https://vitepress.dev/reference/site-config
export default withTwoslash(
  defineConfig({
    title: 'wagmi',
    description: 'React Hooks for Ethereum',
    themeConfig: {
      // https://vitepress.dev/reference/default-theme-config
      nav: [
        { text: 'Home', link: '/' },
        { text: 'Examples', link: '/markdown-examples' },
      ],

      sidebar: [
        {
          text: 'Examples',
          items: [
            { text: 'Markdown Examples', link: '/markdown-examples' },
            { text: 'Runtime API Examples', link: '/api-examples' },
          ],
        },
      ],

      socialLinks: [
        { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
      ],
    },
  }),
)
