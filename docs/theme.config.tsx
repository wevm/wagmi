import { useRouter } from 'next/router'
import type { DocsThemeConfig } from 'nextra-theme-docs'
import { useConfig } from 'nextra-theme-docs'

const github = 'https://github.com/wagmi-dev/wagmi'

const translations = {
  'en-US': {
    editLink: 'Edit this page on GitHub →',
    feedbackLink: 'Question? Give us feedback →',
    gitcoinBanner:
      'wagmi is in the Gitcoin Grants Alpha Round. Click here to support development. Thank you 🙏',
    poweredBy: 'Powered by',
    tagline: {
      core: 'VanillaJS for Ethereum',
      cli: 'CLI tools for Ethereum',
      react: 'React Hooks for Ethereum',
    },
  },
  'zh-CN': {
    editLink: '在 GitHub 上编辑此页面 →',
    feedbackLink: '有疑问? 点击给我们反馈 →',
    gitcoinBanner:
      'wagmi is in the Gitcoin Grants Alpha Round. Click here to support development. Thank you 🙏',
    poweredBy: 'Powered by',
    tagline: {
      core: 'VanillaJS for Ethereum',
      cli: 'CLI tools for Ethereum',
      react: 'React Hooks for Ethereum',
    },
  },
} as const
type Language = keyof typeof translations

function useLocale() {
  return useRouter().locale as Language
}

const config: DocsThemeConfig = {
  // banner: {
  //   key: 'gitcoin-1',
  //   text() {
  //     return (
  //       <a
  //         target="_blank"
  //         href="https://grant-explorer.gitcoin.co/#/round/1/0xe575282b376e3c9886779a841a2510f1dd8c2ce4/0x50f3dbb23d121a397941e827ce2f10a0aea7f5cf311de6e3abcfe3847c56c405-0xe575282b376e3c9886779a841a2510f1dd8c2ce4"
  //         rel="noopener noreferrer"
  //       >
  //         {/* eslint-disable-next-line react-hooks/rules-of-hooks */}
  //         {translations[useLocale()].gitcoinBanner}
  //       </a>
  //     )
  //   },
  // },
  chat: {
    icon: null,
  },
  darkMode: true,
  docsRepositoryBase: `${github}/tree/main/docs`,
  editLink: {
    text() {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return <>{translations[useLocale()].editLink}</>
    },
  },
  feedback: {
    content() {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return <>{translations[useLocale()].feedbackLink}</>
    },
    labels: 'feedback',
  },
  footer: {
    text() {
      return (
        <div>
          <div className="mb-6 block">
            <a
              className="flex items-center gap-1 text-current"
              target="_blank"
              rel="noopener noreferrer"
              title="vercel.com homepage"
              href="https://vercel.com?utm_source=nextra.site"
            >
              {/* eslint-disable-next-line react-hooks/rules-of-hooks */}
              <span>{translations[useLocale()].poweredBy}</span>
              <svg height={20} viewBox="0 0 283 64" fill="none">
                <title>Vercel</title>
                <path
                  fill="currentColor"
                  d="M141.04 16c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99zm-9.46 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zM248.72 16c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99zm-9.45 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zM200.24 34c0 6 3.92 10 10 10 4.12 0 7.21-1.87 8.8-4.92l7.68 4.43c-3.18 5.3-9.14 8.49-16.48 8.49-11.05 0-19-7.2-19-18s7.96-18 19-18c7.34 0 13.29 3.19 16.48 8.49l-7.68 4.43c-1.59-3.05-4.68-4.92-8.8-4.92-6.07 0-10 4-10 10zm82.48-29v46h-9V5h9zM36.95 0L73.9 64H0L36.95 0zm92.38 5l-27.71 48L73.91 5H84.3l17.32 30 17.32-30h10.39zm58.91 12v9.69c-1-.29-2.06-.49-3.2-.49-5.81 0-10 4-10 10V51h-9V17h9v9.2c0-5.08 5.91-9.2 13.2-9.2z"
                />
              </svg>
            </a>
          </div>
          <p className="mt-6 text-xs">
            © {new Date().getFullYear()} wagmi-dev.eth
          </p>
        </div>
      )
    },
  },
  gitTimestamp: false,
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="en" />

      <link rel="icon" type="image/svg+xml" href="/favicons/favicon.svg" />
      <link rel="icon" type="image/png" href="/favicons/light.png" />
      <link
        rel="icon"
        type="image/png"
        href="/favicons/dark.png"
        media="(prefers-color-scheme: dark)"
      />
    </>
  ),
  i18n: [
    { locale: 'en-US', text: 'English' },
    { locale: 'zh-CN', text: '简体中文' },
  ],
  logo() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { pathname, locale } = useRouter()
    let tagline: 'core' | 'cli' | 'react'
    if (/^\/core*/.test(pathname)) tagline = 'core'
    else if (/^\/cli*/.test(pathname)) tagline = 'cli'
    else tagline = 'react'

    return (
      <>
        <span>
          <svg
            className="h-5 w-auto mr-4 fill-current"
            viewBox="0 0 421 198"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M47.9961 119.99C47.9961 133.244 58.7404 143.988 71.9942 143.988H119.99C133.244 143.988 143.988 133.244 143.988 119.99V23.9981C143.988 10.7443 154.733 0 167.986 0C181.24 0 191.984 10.7443 191.984 23.9981V119.99C191.984 133.244 202.729 143.988 215.983 143.988H263.979C277.232 143.988 287.977 133.244 287.977 119.99V23.9981C287.977 10.7443 298.721 0 311.975 0C325.229 0 335.973 10.7443 335.973 23.9981V167.986C335.973 181.24 325.229 191.984 311.975 191.984H23.9981C10.7443 191.984 0 181.24 0 167.986L8.47642e-06 23.9981C9.4127e-06 10.7443 10.7443 0 23.9981 0C37.2518 0 47.9961 10.7443 47.9961 23.9981L47.9961 119.99ZM388.54 197.698C406.212 197.698 420.538 183.373 420.538 165.701C420.538 148.029 406.212 133.704 388.54 133.704C370.869 133.704 356.543 148.029 356.543 165.701C356.543 183.373 370.869 197.698 388.54 197.698Z"
              fill="inherit"
            />
          </svg>
        </span>
        <span className="text-gray-600 font-normal hidden md:inline">
          {translations[locale as Language].tagline[tagline]}
        </span>
      </>
    )
  },
  navigation: {
    next: true,
    prev: true,
  },
  nextThemes: {
    defaultTheme: 'dark',
  },
  project: {
    link: github,
  },
  sidebar: {
    titleComponent: ({ title, type }) => {
      if (type === 'separator')
        return <span className="cursor-default">{title}</span>
      return <>{title}</>
    },
    defaultMenuCollapseLevel: 0,
  },
  toc: {
    float: true,
  },
  useNextSeoProps() {
    const { route, pathname } = useRouter()
    const { frontMatter } = useConfig()

    const defaultSeoProps = {
      description:
        'wagmi is a collection of React Hooks containing everything you need to start working with Ethereum.',
      openGraph: {
        description:
          'wagmi is a collection of React Hooks containing everything you need to start working with Ethereum.',
        title: 'wagmi: React Hooks for Ethereum',
        images: [{ url: 'https://wagmi.sh/og.png' }],
      },
      themeColor: '#ffffff',
      twitter: {
        cardType: 'summary_large_image',
        handle: '@wagmi_sh',
        site: 'wagmi.sh',
      },
    } as const

    let tagline
    if (/^\/core*/.test(pathname)) tagline = '@wagmi/core'
    else if (/^\/cli*/.test(pathname)) tagline = '@wagmi/cli'
    else tagline = 'wagmi'

    if (!/^\/index/.test(route))
      return {
        ...defaultSeoProps,
        description: frontMatter.description,
        openGraph: {
          ...defaultSeoProps.openGraph,
          description: frontMatter.description,
          images: frontMatter.image
            ? [{ url: frontMatter.image }]
            : defaultSeoProps.openGraph.images,
          title: frontMatter.title,
        },
        titleTemplate: `%s – ${tagline}`,
      }
    return { ...defaultSeoProps, title: 'wagmi: React Hooks for Ethereum' }
  },
}

export default config
