import { useRouter } from 'next/router'

import { LogoType } from '../core'

const TITLE_WITH_TRANSLATIONS: Record<string, string> = {
  'en-US': 'React Hooks for Ethereum',
}

export function Header() {
  const { locale, defaultLocale = 'en-US' } = useRouter()
  const resolvedLocale = locale || defaultLocale
  const title = TITLE_WITH_TRANSLATIONS[resolvedLocale]

  return (
    <header className="mb-10 flex flex-col items-center">
      <div className="mt-8 w-auto h-12 md:h-14">
        <h1 className="sr-only">wagmi</h1>
        <LogoType />
      </div>

      <p className="text-center text-lg mb-6 text-gray-500 md:!text-2xl">
        {title}
      </p>

      <div className="flex flex-wrap gap-2 justify-center max-w-[28rem] min-h-[3rem]">
        <a
          aria-label="Version"
          href="https://www.npmjs.com/package/wagmi"
          className="h-5"
        >
          <img
            alt=""
            src="https://img.shields.io/npm/v/wagmi?colorA=2B323B&colorB=1e2329&style=flat&label=Version"
          />
        </a>

        <a
          aria-label="License"
          href="https://www.npmjs.com/package/wagmi"
          className="h-5"
        >
          <img
            alt=""
            src="https://img.shields.io/npm/l/wagmi?colorA=2B323B&colorB=1e2329&style=flat&label=License"
          />
        </a>

        <a
          aria-label="Downloads"
          href="https://www.npmjs.com/package/wagmi"
          className="h-5"
        >
          <img
            alt=""
            src="https://img.shields.io/npm/dm/wagmi?colorA=2B323B&colorB=1e2329&style=flat&label=Downloads"
          />
        </a>

        <a
          aria-label="Stars"
          href="https://github.com/tmm/wagmi"
          className="h-5"
        >
          <img
            alt=""
            src="https://img.shields.io/github/stars/tmm/wagmi?colorA=2B323B&colorB=1e2329&style=flat&label=Stars"
          />
        </a>

        <a
          aria-label="Best of JS"
          href="https://bestofjs.org/projects/wagmi"
          className="h-5"
        >
          <img
            alt=""
            src="https://img.shields.io/endpoint?colorA=2B323B&colorB=1e2329&style=flat&url=https://bestofjs-serverless.now.sh/api/project-badge?fullName=tmm%2Fwagmi%26since=daily"
          />
        </a>

        <a
          aria-label="Sponsors"
          href="https://github.com/sponsors/tmm?metadata_campaign=docs_header"
          className="h-5"
        >
          <img
            alt=""
            src="https://img.shields.io/github/sponsors/tmm?colorA=2B323B&colorB=1e2329&style=flat&label=Sponsors"
          />
        </a>
      </div>
    </header>
  )
}
