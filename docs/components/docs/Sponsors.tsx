import { useTheme } from 'next-themes'

const sponsors = [
  {
    id: 'family',
    name: 'Family',
    href: 'https://twitter.com/family',
    logo: {
      dark: 'https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/family-dark.svg',
      light:
        'https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/family-light.svg',
    },
  },
  {
    id: 'context',
    name: 'Context',
    href: 'https://twitter.com/context',
    logo: {
      dark: 'https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/context-dark.svg',
      light:
        'https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/context-light.svg',
    },
  },
  {
    id: 'walletconnect',
    name: 'WalletConnect',
    href: 'https://walletconnect.com',
    logo: {
      dark: 'https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/walletconnect-dark.svg',
      light:
        'https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/walletconnect-light.svg',
    },
  },
  {
    id: 'looksrare',
    name: 'LooksRare',
    href: 'https://looksrare.org',
    logo: {
      dark: 'https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/looksrare-dark.svg',
      light:
        'https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/looksrare-light.svg',
    },
  },
] as const

export function Sponsors() {
  const { resolvedTheme } = useTheme()
  const mode = (resolvedTheme ?? 'dark') as 'dark' | 'light'
  return (
    <div className="flex my-5 gap-2">
      {sponsors.map((sponsor) => (
        <a href={sponsor.href} key={sponsor.id}>
          <picture>
            <img
              alt={sponsor.name}
              src={sponsor.logo[mode]}
              width="auto"
              className="h-12"
            />
          </picture>
        </a>
      ))}
    </div>
  )
}
