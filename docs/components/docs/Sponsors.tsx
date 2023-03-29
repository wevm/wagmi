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
  {
    id: 'partydao',
    name: 'PartyDAO',
    href: 'https://twitter.com/prtyDAO',
    logo: {
      dark: 'https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/partydao-dark.svg',
      light:
        'https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/partydao-light.svg',
    },
  },
  {
    id: 'dynamic',
    name: 'Dynamic',
    href: 'https://www.dynamic.xyz',
    logo: {
      dark: 'https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/dynamic-dark.svg',
      light:
        'https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/dynamic-light.svg',
    },
  },
  {
    id: 'sushi',
    name: 'Sushi',
    href: 'https://www.sushi.com',
    logo: {
      dark: 'https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/sushi-dark.svg',
      light:
        'https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/sushi-light.svg',
    },
  },
  {
    id: 'stripe',
    name: 'Stripe',
    href: 'https://www.stripe.com',
    logo: {
      dark: 'https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/stripe-dark.svg',
      light:
        'https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/stripe-light.svg',
    },
  },
  {
    id: 'bitkeep',
    name: 'BitKeep',
    href: 'https://bitkeep.com/',
    logo: {
      dark: 'https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/bitkeep-dark.svg',
      light:
        'https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/bitkeep-light.svg',
    },
  },
] as const

export function Sponsors() {
  const { resolvedTheme } = useTheme()
  const mode = (resolvedTheme ?? 'dark') as 'dark' | 'light'
  return (
    <div className="my-5">
      <div className="mb-2 -ml-2">
        <a href="https://paradigm.xyz" className="inline-block">
          <picture>
            <img
              alt="Paradigm"
              src={
                {
                  dark: 'https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/paradigm-dark.svg',
                  light:
                    'https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/paradigm-light.svg',
                }[mode]
              }
              width="auto"
              className="h-24"
            />
          </picture>
        </a>
      </div>
      <div className="flex gap-2 flex-wrap">
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
    </div>
  )
}
