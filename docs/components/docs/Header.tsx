import { useRouter } from 'next/router'

const TITLE_WITH_TRANSLATIONS: Record<string, string> = {
  'en-US': 'React Hooks for Ethereum',
}

export function Header() {
  const { locale, defaultLocale = 'en-US' } = useRouter()
  const resolvedLocale = locale || defaultLocale
  const title = TITLE_WITH_TRANSLATIONS[resolvedLocale]

  return (
    <header className="mb-10">
      <h1 className="text-center font-extrabold md:text-5xl mt-8">wagmi</h1>

      <p className="text-center text-lg mb-6 text-gray-500 md:!text-2xl">
        {title}
      </p>

      <div className="flex gap-4 justify-center">
        <a
          aria-label="Stars"
          href="https://github.com/tmm/wagmi"
          className="h-5"
        >
          <img
            alt=""
            src="https://img.shields.io/github/stars/tmm/wagmi?colorA=292929&colorB=3c82f6&label=Stars"
          />
        </a>

        <a
          aria-label="Best of JS"
          href="https://bestofjs.org/projects/wagmi"
          className="h-5"
        >
          <img
            alt=""
            src="https://img.shields.io/endpoint?colorA=292929&colorB=3c82f6&url=https://bestofjs-serverless.now.sh/api/project-badge?fullName=tmm%2Fwagmi%26since=daily"
          />
        </a>

        <a
          aria-label="Downloads"
          href="https://www.npmjs.com/package/wagmi"
          className="h-5"
        >
          <img
            alt=""
            src="https://img.shields.io/npm/dm/wagmi?colorA=292929&colorB=3c82f6&label=Downloads"
          />
        </a>
        <a
          aria-label="Sponsors"
          href="https://github.com/sponsors/tmm"
          className="h-5"
        >
          <img
            alt=""
            src="https://img.shields.io/github/sponsors/tmm?colorA=292929&colorB=3c82f6&label=Sponsors"
          />
        </a>
      </div>
    </header>
  )
}
