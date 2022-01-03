const github = 'https://github.com/tmm/wagmi'

export default {
  docsRepositoryBase: `${github}/tree/main/docs`,
  floatTOC: true,
  footerEditLink: `Edit this page on GitHub`,
  footerText: `MIT ${new Date().getFullYear()} © awkweb.eth`,
  github,
  head: ({ title, meta }) => {
    return (
      <>
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Language" content="en" />
        <meta
          name="description"
          content={
            meta.description || 'wagmi is a React Hooks library for Ethereum.'
          }
        />
        <meta
          name="og:description"
          content={
            meta.description || 'wagmi is a React Hooks library for Ethereum.'
          }
        />
        <meta
          name="og:title"
          content={
            title ? title + ' – wagmi' : 'wagmi: React Hooks for Ethereum'
          }
        />
      </>
    )
  },
  logo: (
    <>
      <span className="mr-2 font-extrabold">wagmi</span>
      <span className="text-gray-600 font-normal hidden md:inline">
        React Hooks library for Ethereum
      </span>
    </>
  ),
  nextLinks: true,
  prevLinks: true,
  projectLink: github,
  search: true,
  titleSuffix: ' – wagmi',
  unstable_stork: true,
}
