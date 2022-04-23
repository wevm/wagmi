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
    return (
      <>
        {/* General */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Language" content="en" />

        {/* SEO */}
        <meta
          name="description"
          content={meta.description || 'React Hooks for Ethereum.'}
        />
        <meta
          name="og:description"
          content={meta.description || 'React Hooks for Ethereum.'}
        />
        <meta
          name="og:title"
          content={
            title ? title + ' – wagmi' : 'wagmi: React Hooks for Ethereum'
          }
        />
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
