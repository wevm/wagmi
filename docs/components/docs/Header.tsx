import { useRouter } from 'next/router'
// eslint-disable-next-line import/no-unresolved
import Callout from 'nextra-theme-docs/callout'

import { LogoType } from '../core'

const TITLE_WITH_TRANSLATIONS: Record<string, string> = {
  'en-US': 'React Hooks for Ethereum',
}

type Props = {
  showGitcoinBanner?: boolean
}

export function Header({ showGitcoinBanner }: Props) {
  const { locale, defaultLocale = 'en-US' } = useRouter()
  const resolvedLocale = locale || defaultLocale
  const title = TITLE_WITH_TRANSLATIONS[resolvedLocale]

  return (
    <header className="mb-10 flex flex-col items-center">
      {showGitcoinBanner && (
        <div className="mb-4">
          <Callout emoji="🚀">
            wagmi is participating in{' '}
            <a
              target="_blank"
              href="https://gitcoin.co/grants/4493/wagmi-react-hooks-library-for-ethereum"
              rel="noopener noreferrer"
            >
              Gitcoin Grant Round 15
            </a>{' '}
            until September 22. Contributions are matched with{' '}
            <a
              href="https://finematics.com/quadratic-funding-explained"
              rel="noopener noreferrer"
              target="_blank"
            >
              Quadratic Funding
            </a>{' '}
            (e.g. $1 turns into $27). If you find wagmi useful, please consider
            supporting development{' '}
            <a
              target="_blank"
              href="https://gitcoin.co/grants/4493/wagmi-react-hooks-library-for-ethereum"
              rel="noopener noreferrer"
            >
              here
            </a>
            . Thank you 🙏
          </Callout>
        </div>
      )}

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
            src="https://img.shields.io/github/license/wagmi-dev/wagmi?colorA=2B323B&colorB=1e2329&style=flat&label=License"
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
          href="https://github.com/wagmi-dev/wagmi"
          className="h-5"
        >
          <img
            alt=""
            src="https://img.shields.io/github/stars/wagmi-dev/wagmi?colorA=2B323B&colorB=1e2329&style=flat&label=Stars"
          />
        </a>

        <a
          aria-label="Best of JS"
          href="https://bestofjs.org/projects/wagmi"
          className="h-5"
        >
          <img
            alt=""
            src="https://img.shields.io/endpoint?colorA=2B323B&colorB=1e2329&style=flat&url=https://bestofjs-serverless.now.sh/api/project-badge?fullName=wagmi-dev%2Fwagmi%26since=daily"
          />
        </a>

        <a
          aria-label="Sponsors"
          href="https://github.com/sponsors/wagmi-dev?metadata_campaign=docs_header"
          className="h-5"
        >
          <img
            alt=""
            src="https://img.shields.io/github/sponsors/wagmi-dev?colorA=2B323B&colorB=1e2329&style=flat&label=Sponsors"
          />
        </a>
      </div>
    </header>
  )
}
