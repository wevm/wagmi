import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'

const github = 'https://github.com/tmm/wagmi'

const TITLE_WITH_TRANSLATIONS = {
  'en-US': 'React Hooks for Ethereum',
}

const FEEDBACK_LINK_WITH_TRANSLATIONS = {
  'en-US': 'Question? Give us feedback →',
}

export default {
  docsRepositoryBase: `${github}/tree/main/docs/pages`,
  feedbackLabels: 'feedback',
  feedbackLink: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { locale } = useRouter()
    return FEEDBACK_LINK_WITH_TRANSLATIONS[locale || 'en-US']
  },
  floatTOC: true,
  footerEditLink: `Edit this page on GitHub`,
  footerText: () => (
    <div className="text-current text-sm">
      WAGMIT {new Date().getFullYear()} © awkweb.eth
    </div>
  ),
  github,
  head: ({ title, meta }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { systemTheme } = useTheme()
    const description_ =
      meta.description_ ||
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
        <meta name="description" content={description_} />
        <meta name="og:description" content={description_} />
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
  logo: () => {
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
