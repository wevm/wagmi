export default {
  customSearch: null, // customizable, you can use algolia for example
  darkMode: true,
  docsRepositoryBase: 'https://github.com/tmm/wagmi/tree/main/docs', // base URL for the docs repository
  footer: true,
  footerEditLink: `Edit this page on GitHub`,
  footerText: `MIT ${new Date().getFullYear()} © Tom Meagher.`,
  nextLinks: true,
  prevLinks: true,
  projectLink: 'https://github.com/tmm/wagmi', // GitHub link in the navbar
  search: true,
  titleSuffix: ' – wagmi',

  logo: (
    <>
      <span className="mr-2 font-extrabold hidden md:inline">wagmi</span>
      <span className="text-gray-600 font-normal hidden md:inline">React Hooks library for Ethereum</span>
    </>
  ),
  head: (
    <>
      <meta content="width=device-width, initial-scale=1.0" name="viewport" />
      <meta content="wagmi: React Hooks library for Ethereum" name="description" />
      <meta content="wagmi: React Hooks library for Ethereum" name="og:title" />
    </>
  ),
}
