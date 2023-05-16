import { DefaultTheme } from 'vitepress'

export const sidebar: DefaultTheme.Sidebar = {
  '/react/': [
    {
      text: 'Introduction',
      items: [
        { text: 'Why wagmi', link: '/react/introduction' },
        { text: 'Getting Started', link: '/react/getting-started' },
        { text: 'Migration Guide', link: '/react/migration-guide' },
        { text: 'TypeScript', link: '/react/typescript' },
        { text: 'Platform Compatibility', link: '/react/compatibility' },
      ],
    }
  ],
  '/core/': [
    {
      text: 'Introduction',
      items: [
        { text: 'Why wagmi', link: '/core/introduction' },
        { text: 'Getting Started', link: '/core/getting-started' },
        { text: 'Migration Guide', link: '/core/migration-guide' },
        { text: 'TypeScript', link: '/core/typescript' },
        { text: 'Platform Compatibility', link: '/core/compatibility' },
      ],
    }
  ],
}
