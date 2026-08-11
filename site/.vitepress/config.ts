import { createTwoslashWithInlineCache } from '@shikijs/vitepress-twoslash/cache-inline'
import unocss from 'unocss/vite'
import { defineConfig } from 'vitepress'
import {
  groupIconMdPlugin,
  groupIconVitePlugin,
} from 'vitepress-plugin-group-icons'
import llmstxt, { copyOrDownloadAsMarkdownButtons } from 'vitepress-plugin-llms'

import { getSidebar } from './sidebar'

const withTwoslashInlineCache = createTwoslashWithInlineCache()

const searchFrameworkLabels = [
  ['react/', 'React'],
  ['vue/', 'Vue'],
  ['solid/', 'Solid'],
  ['core/', 'Core'],
  ['cli/', 'CLI'],
  ['components/', 'Components'],
  ['tempo/', 'Tempo'],
] as const

function getSearchFrameworkLabel(file: string) {
  const normalizedFile = file.replaceAll('\\', '/')
  return searchFrameworkLabels.find(([dir]) =>
    normalizedFile.includes(`/site/${dir}`),
  )?.[1]
}

const headingRegex = /<h(\d*).*?>(.*?<a.*? href="#.*?".*?>.*?<\/a>)<\/h\1>/gi
const headingContentRegex = /(.*?)<a.*? href="#(.*?)".*?>.*?<\/a>/i

function* splitSearchPageIntoSections(html: string, frameworkLabel?: string) {
  const result = html.split(headingRegex)
  result.shift()
  let parentTitles: string[] = []
  for (let i = 0; i < result.length; i += 3) {
    const level = Number.parseInt(result[i]!, 10) - 1
    const heading = result[i + 1]!
    const headingResult = headingContentRegex.exec(heading)
    const title = clearHtmlTags(headingResult?.[1] ?? '').trim()
    const anchor = headingResult?.[2] ?? ''
    const content = result[i + 2]
    if (!title || !content) continue
    const titles = parentTitles.slice(0, level)
    titles[level] = title
    const filteredTitles = titles.filter(Boolean)
    if (frameworkLabel) filteredTitles.unshift(frameworkLabel)
    yield { anchor, titles: filteredTitles, text: clearHtmlTags(content) }
    if (level === 0) parentTitles = [title]
    else parentTitles[level] = title
  }
}

function clearHtmlTags(str: string) {
  return str.replace(/<[^>]*>/g, '')
}

// https://vitepress.dev/reference/site-config
export default withTwoslashInlineCache(
  defineConfig({
    cleanUrls: true,
    description: 'Reactivity for Ethereum apps',
    head: [
      [
        'meta',
        {
          name: 'keywords',
          content:
            'react, ethereum, typescript, react, react hooks, open source',
        },
      ],
      ['link', { rel: 'icon', href: '/favicon.svg' }],
      ['meta', { name: 'theme-color', content: '#646cff' }],
      // Open Graph
      ['meta', { property: 'og:type', content: 'website' }],
      ['meta', { property: 'og:image', content: 'https://wagmi.sh/og.png' }],
      ['meta', { property: 'og:url', content: 'https://wagmi.sh' }],
      // Twitter
      ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
      ['meta', { name: 'twitter:creator', content: '@wevm_dev' }],
      ['meta', { name: 'twitter:image', content: 'https://wagmi.sh/og.png' }],
      ['meta', { name: 'twitter:site', content: 'wagmi.sh' }],
      // Fathom
      [
        'script',
        {
          src: 'https://cdn.usefathom.com/script.js',
          'data-site': 'QWAXSUPT',
          defer: '',
        },
      ],
    ],
    ignoreDeadLinks: false,
    lang: 'en-US',
    lastUpdated: true,
    markdown: {
      config(md) {
        md.use(copyOrDownloadAsMarkdownButtons).use(groupIconMdPlugin)
      },
      languages: ['js', 'jsx', 'ts', 'tsx'],
      theme: {
        light: 'vitesse-light',
        dark: 'vitesse-dark',
      },
    },
    themeConfig: {
      editLink: {
        pattern: 'https://github.com/wevm/wagmi/edit/main/site/:path',
        text: 'Suggest changes to this page',
      },
      footer: {
        message:
          'Released under the <a href="https://github.com/wevm/wagmi/blob/main/LICENSE">MIT License</a>.',
        copyright: 'Copyright © 2022-present Weth, LLC',
      },
      logo: {
        light: '/logo-light.svg',
        dark: '/logo-dark.svg',
        alt: 'wagmi logo',
      },
      nav: [
        { text: 'React', link: '/react/getting-started' },
        { text: 'Core', link: '/core/getting-started' },
        { text: 'Tempo', link: '/tempo/getting-started' },
        { text: 'CLI', link: '/cli/getting-started' },
        {
          text: '<span class="frameworks-nav-label">Frameworks</span>',
          activeMatch: '$^',
          items: [
            { text: 'React', link: '/react/getting-started' },
            { text: 'Solid', link: '/solid/getting-started' },
            { text: 'Vue', link: '/vue/getting-started' },
          ],
        },
        // { text: 'Examples', link: '/examples/connect-wallet' },
        {
          text: 'More',
          items: [
            {
              text: 'Discussions ',
              link: 'https://github.com/wevm/wagmi/discussions',
            },
            {
              text: 'Release Notes ',
              link: 'https://github.com/wevm/wagmi/releases',
            },
            {
              text: 'Contributing ',
              link: '/dev/contributing',
            },
          ],
        },
      ],
      outline: [2, 3],
      search: {
        provider: 'local',
        options: {
          _render(src, env, md) {
            const html = md.render(src, env)
            if (env.frontmatter?.search === false) return ''
            if (env.relativePath.startsWith('shared')) return ''
            return html
          },
          miniSearch: {
            _splitIntoSections(file, html) {
              return splitSearchPageIntoSections(
                html,
                getSearchFrameworkLabel(file),
              )
            },
          },
        },
      },
      sidebar: getSidebar(),
      siteTitle: false,
      socialLinks: [
        { icon: 'github', link: 'https://github.com/wevm/wagmi' },
        { icon: 'x', link: 'https://twitter.com/wevm_dev' },
        { icon: 'bluesky', link: 'https://bsky.app/profile/wevm.dev' },
        { icon: 'discord', link: 'https://discord.gg/9zHPXuBpqy' },
      ],
    },
    title: 'Wagmi',
    vite: {
      plugins: [
        llmstxt({ ignoreFiles: ['shared/'] }),
        groupIconVitePlugin(),
        unocss(),
      ],
    },
  }),
)
