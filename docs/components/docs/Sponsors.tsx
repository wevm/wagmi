import { useTheme } from 'next-themes'

const sponsors = {
  family: {
    dark: 'https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/family-dark.svg',
    light:
      'https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/family-light.svg',
  },
} as const

export function Sponsors() {
  const { resolvedTheme } = useTheme()
  const mode = (resolvedTheme ?? 'dark') as 'dark' | 'light'
  return (
    <div className="flex my-6 gap-6">
      <a href="https://twitter.com/family">
        <picture>
          <img
            alt="family logo"
            src={sponsors.family[mode]}
            width="auto"
            height="35"
          />
        </picture>
      </a>
    </div>
  )
}
