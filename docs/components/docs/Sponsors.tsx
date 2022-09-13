import { useTheme } from 'next-themes'

const sponsors = {
  family: {
    dark: 'https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/family-dark.svg',
    light:
      'https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/family-light.svg',
  },
  context: {
    dark: 'https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/context-dark.svg',
    light:
      'https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/context-light.svg',
  },
} as const

export function Sponsors() {
  const { resolvedTheme } = useTheme()
  const mode = (resolvedTheme ?? 'dark') as 'dark' | 'light'
  return (
    <div className="flex my-5 gap-2">
      <a href="https://twitter.com/family">
        <picture>
          <img
            alt="family logo"
            src={sponsors.family[mode]}
            width="auto"
            className="h-12"
          />
        </picture>
      </a>
      <a href="https://twitter.com/context">
        <picture>
          <img
            alt="context logo"
            src={sponsors.context[mode]}
            width="auto"
            className="h-12"
          />
        </picture>
      </a>
    </div>
  )
}
