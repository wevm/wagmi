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
        <span>
          <LogoType />
          <style jsx>{`
            span {
              padding: 0.5rem 0.5rem 0.5rem 0;
              mask-image: linear-gradient(
                60deg,
                black 25%,
                rgba(0, 0, 0, 0.2) 50%,
                black 75%
              );
              mask-size: 400%;
              mask-position: 0%;
            }
            span:hover {
              mask-position: 100%;
              transition: mask-position 1s ease, -webkit-mask-position 1s ease;
            }
          `}</style>
        </span>
      </div>

      <p className="text-center text-lg mb-6 mt-3 text-gray-500 md:!text-xl">
        {title}
      </p>

      <div className="flex flex-wrap gap-2 justify-center max-w-[28rem] min-h-[3rem]">
        <a
          aria-label="Version"
          href="https://www.npmjs.com/package/wagmi"
          className="h-5"
        >
          <img
            alt="wagmi-version"
            src="https://img.shields.io/npm/v/wagmi?colorA=2B323B&colorB=1e2329&style=flat&label=Version"
          />
        </a>

        <a
          aria-label="License"
          href="https://www.npmjs.com/package/wagmi"
          className="h-5"
        >
          <img
            alt="wagmi-license"
            src="https://img.shields.io/github/license/wagmi-dev/wagmi?colorA=2B323B&colorB=1e2329&style=flat&label=License"
          />
        </a>

        <a
          aria-label="Downloads"
          href="https://www.npmjs.com/package/wagmi"
          className="h-5"
        >
          <img
            alt="wagmi-downloads"
            src="https://img.shields.io/npm/dm/wagmi?colorA=2B323B&colorB=1e2329&style=flat&label=Downloads"
          />
        </a>

        <a
          aria-label="Stars"
          href="https://github.com/wagmi-dev/wagmi"
          className="h-5"
        >
          <img
            alt="wagmi-stars"
            src="https://img.shields.io/github/stars/wagmi-dev/wagmi?colorA=2B323B&colorB=1e2329&style=flat&label=Stars"
          />
        </a>

        <a
          aria-label="Best of JS"
          href="https://bestofjs.org/projects/wagmi"
          className="h-5"
        >
          <img
            alt="wagmi-best-of-js"
            src="https://img.shields.io/endpoint?colorA=2B323B&colorB=1e2329&style=flat&url=https://bestofjs-serverless.now.sh/api/project-badge?fullName=wagmi-dev%2Fwagmi%26since=daily"
          />
        </a>

        <a
          aria-label="Sponsors"
          href="https://github.com/sponsors/wagmi-dev?metadata_campaign=docs_header"
          className="h-5"
        >
          <img
            alt="wagmi-sponsors"
            src="https://img.shields.io/github/sponsors/wagmi-dev?colorA=2B323B&colorB=1e2329&style=flat&label=Sponsors"
          />
        </a>
      </div>
    </header>
  )
}
