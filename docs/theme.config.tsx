import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'
import type { DocsThemeConfig } from 'nextra-theme-docs'
import { useConfig } from 'nextra-theme-docs'

const github = 'https://github.com/wagmi-dev/wagmi'

const translations = {
  'en-US': {
    description: {
      core: 'Documentation for @wagmi/core',
      cli: 'Documentation for CLI tools',
      examples: 'Examples',
      react:
        'wagmi is a collection of React Hooks containing everything you need to start working with Ethereum. wagmi makes it easy to "Connect Wallet," display ENS and balance information, sign messages, interact with contracts, and much more — all with caching, request deduplication, and persistence.',
    },
    feedbackLink: 'Question? Give us feedback →',
    poweredBy: 'Powered by',
    subTitle: {
      core: 'VanillaJS for Ethereum',
      cli: 'wagmi CLI tools',
      examples: 'wagmi Examples',
      react: 'React Hooks for Ethereum',
    },
  },
} as const
type Language = keyof typeof translations

function getSectionName(path: string) {
  if (/^\/core\/*/.test(path)) return 'core'
  if (/^\/cli\/*/.test(path)) return 'cli'
  if (/^\/examples\/*/.test(path)) return 'examples'
  return 'react'
}

function Head() {
  const { frontMatter } = useConfig()
  const { locale, pathname } = useRouter()
  const { systemTheme } = useTheme()

  const sectionName = getSectionName(pathname)
  const description =
    frontMatter.description ||
    translations[locale as Language].description[sectionName]
  const title_ =
    frontMatter.title && !frontMatter.title.startsWith('wagmi')
      ? frontMatter.title + ' – wagmi'
      : `wagmi: ${translations[locale as Language].subTitle[sectionName]}`

  return (
    <>
      {/* General */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="en" />
      <title>{title_}</title>

      {/* SEO */}
      <meta name="description" content={description} />
      <meta name="og:description" content={description} />
      <meta name="og:title" content={title_} />
      <meta name="og:image" content="https://wagmi.sh/og.png" />
      <meta name="twitter:card" content="summary_large_image" />

      {/* Misc */}
      <meta name="apple-mobile-web-app-title" content="wagmi" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="theme-color" content="#ffffff" />

      {/* Dynamic favicon */}
      <link
        rel="icon"
        type="image/svg+xml"
        href="/favicons/favicon.svg"
        key="dynamic-favicon"
      />
      {!systemTheme || systemTheme === 'dark' ? (
        <link
          rel="alternate icon"
          type="image/png"
          href="/favicons/dark.png"
          key="dark-favicon"
        />
      ) : (
        <link
          rel="alternate icon"
          type="image/png"
          href="/favicons/light.png"
          key="light-favicon"
        />
      )}
    </>
  )
}

function FeedbackContent() {
  const { locale } = useRouter()
  return <>{translations[locale as Language].feedbackLink}</>
}

function FooterText() {
  const { locale } = useRouter()
  return (
    <a
      href="https://vercel.com/?utm_source=wagmi-dev&utm_campaign=oss"
      target="_blank"
      rel="noopener"
      className="inline-flex items-center no-underline text-current font-semibold"
    >
      <span className="mr-1">{translations[locale as Language].poweredBy}</span>
      <span>
        <VercelLogo />
      </span>
    </a>
  )
}

function Logo() {
  const { locale, pathname } = useRouter()
  const sectionName = getSectionName(pathname)
  return (
    <>
      <svg
        className="h-5 w-auto mr-4"
        viewBox="0 0 421 198"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M47.9961 119.99C47.9961 133.244 58.7404 143.988 71.9942 143.988H119.99C133.244 143.988 143.988 133.244 143.988 119.99V23.9981C143.988 10.7443 154.733 0 167.986 0C181.24 0 191.984 10.7443 191.984 23.9981V119.99C191.984 133.244 202.729 143.988 215.983 143.988H263.979C277.232 143.988 287.977 133.244 287.977 119.99V23.9981C287.977 10.7443 298.721 0 311.975 0C325.229 0 335.973 10.7443 335.973 23.9981V167.986C335.973 181.24 325.229 191.984 311.975 191.984H23.9981C10.7443 191.984 0 181.24 0 167.986L8.47642e-06 23.9981C9.4127e-06 10.7443 10.7443 0 23.9981 0C37.2518 0 47.9961 10.7443 47.9961 23.9981L47.9961 119.99ZM388.54 197.698C406.212 197.698 420.538 183.373 420.538 165.701C420.538 148.029 406.212 133.704 388.54 133.704C370.869 133.704 356.543 148.029 356.543 165.701C356.543 183.373 370.869 197.698 388.54 197.698Z"
          fill="white"
        />
      </svg>

      <span className="text-gray-600 font-normal hidden md:inline">
        {translations[locale as Language].subTitle[sectionName]}
      </span>
    </>
  )
}

function VercelLogo({ height = 20 }) {
  return (
    <svg height={height} viewBox="0 0 283 64" fill="none">
      <path
        fill="currentColor"
        d="M141.04 16c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99zm-9.46 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zM248.72 16c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99zm-9.45 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zM200.24 34c0 6 3.92 10 10 10 4.12 0 7.21-1.87 8.8-4.92l7.68 4.43c-3.18 5.3-9.14 8.49-16.48 8.49-11.05 0-19-7.2-19-18s7.96-18 19-18c7.34 0 13.29 3.19 16.48 8.49l-7.68 4.43c-1.59-3.05-4.68-4.92-8.8-4.92-6.07 0-10 4-10 10zm82.48-29v46h-9V5h9zM36.95 0L73.9 64H0L36.95 0zm92.38 5l-27.71 48L73.91 5H84.3l17.32 30 17.32-30h10.39zm58.91 12v9.69c-1-.29-2.06-.49-3.2-.49-5.81 0-10 4-10 10V51h-9V17h9v9.2c0-5.08 5.91-9.2 13.2-9.2z"
      />
    </svg>
  )
}

const config: DocsThemeConfig = {
  chat: {
    icon: null,
  },
  darkMode: true,
  docsRepositoryBase: `${github}/tree/main/docs/pages`,
  feedback: {
    content: FeedbackContent,
    labels: 'feedback',
  },
  footer: {
    text: FooterText,
  },
  gitTimestamp: false,
  head: Head,
  i18n: [{ locale: 'en-US', text: 'English' }],
  logo: Logo,
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
    defaultMenuCollapseLevel: 0,
  },
  toc: {
    float: true,
  },
}

export default config
