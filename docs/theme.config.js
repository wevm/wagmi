import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'

const github = 'https://github.com/wagmi-dev/wagmi'

const TITLE_WITH_TRANSLATIONS = {
  'en-US': 'React Hooks for Ethereum',
}

const FEEDBACK_LINK_WITH_TRANSLATIONS = {
  'en-US': 'Question? Give us feedback →',
}

function Vercel({ height = 20 }) {
  return (
    <svg height={height} viewBox="0 0 283 64" fill="none">
      <path
        fill="currentColor"
        d="M141.04 16c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99zm-9.46 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zM248.72 16c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99zm-9.45 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zM200.24 34c0 6 3.92 10 10 10 4.12 0 7.21-1.87 8.8-4.92l7.68 4.43c-3.18 5.3-9.14 8.49-16.48 8.49-11.05 0-19-7.2-19-18s7.96-18 19-18c7.34 0 13.29 3.19 16.48 8.49l-7.68 4.43c-1.59-3.05-4.68-4.92-8.8-4.92-6.07 0-10 4-10 10zm82.48-29v46h-9V5h9zM36.95 0L73.9 64H0L36.95 0zm92.38 5l-27.71 48L73.91 5H84.3l17.32 30 17.32-30h10.39zm58.91 12v9.69c-1-.29-2.06-.49-3.2-.49-5.81 0-10 4-10 10V51h-9V17h9v9.2c0-5.08 5.91-9.2 13.2-9.2z"
      />
    </svg>
  )
}

export default {
  docsRepositoryBase: `${github}/tree/main/docs/pages`,
  feedbackLabels: 'feedback',
  feedbackLink() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { locale } = useRouter()
    return FEEDBACK_LINK_WITH_TRANSLATIONS[locale || 'en-US']
  },
  floatTOC: true,
  footerEditLink: `Edit this page on GitHub`,
  footerText({ locale }) {
    switch (locale) {
      case 'en-US':
      default:
        return (
          <a
            href="https://vercel.com/?utm_source=wagmi-dev&utm_campaign=oss"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center no-underline text-current font-semibold"
          >
            <span className="mr-1">Powered by</span>
            <span>
              <Vercel />
            </span>
          </a>
        )
    }
  },
  github,
  head({ meta, title }) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { systemTheme } = useTheme()
    const description =
      meta.description ||
      'wagmi is a collection of React Hooks containing everything you need to start working with Ethereum. wagmi makes it easy to "Connect Wallet," display ENS and balance information, sign messages, interact with contracts, and much more — all with caching, request deduplication, and persistence.'
    const title_ =
      title && !title.startsWith('wagmi')
        ? title + ' – wagmi'
        : 'wagmi: React Hooks for Ethereum'
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
  },
  i18n: [{ locale: 'en-US', text: 'English' }],
  logo() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { locale } = useRouter()
    return (
      <>
        <span className="mr-2 font-extrabold">wagmi</span>
        <span className="text-gray-600 font-normal hidden md:inline">
          {TITLE_WITH_TRANSLATIONS[locale || 'en-US']}
        </span>
      </>
    )
  },
  nextLinks: true,
  nextThemes: {
    defaultTheme: 'dark',
  },
  prevLinks: true,
  projectLink: github,
  search: true,
  titleSuffix: ' – wagmi',
  unstable_flexsearch: true,
}
