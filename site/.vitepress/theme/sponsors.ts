export type Sponsors = {
  size?: 'medium' | 'big'
  items: Sponsor[]
}[]

export type Sponsor = {
  name: string
  img: string
  url: string
}

export const sponsors = [
  {
    size: 'big',
    items: [
      {
        name: 'Paradigm',
        url: 'https://paradigm.xyz',
        img: 'https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/paradigm-light.svg',
      },
    ],
  },
  {
    size: 'medium',
    items: [
      {
        name: 'LooksRare',
        url: 'https://looksrare.org',
        img: 'https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/looksrare-light.svg',
      },
      {
        name: 'WalletConnect',
        url: 'https://walletconnect.com',
        img: 'https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/walletconnect-light.svg',
      },
      {
        name: 'Stripe',
        url: 'https://www.stripe.com',
        img: 'https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/stripe-light.svg',
      },
    ],
  },
  {
    size: 'medium',
    items: [
      {
        name: 'Family',
        url: 'https://twitter.com/family',
        img: 'https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/family-light.svg',
      },
      {
        name: 'Context',
        url: 'https://twitter.com/context',
        img: 'https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/context-light.svg',
      },
      {
        name: 'PartyDAO',
        url: 'https://twitter.com/prtyDAO',
        img: 'https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/partydao-light.svg',
      },
    ],
  },
  {
    size: 'medium',
    items: [
      {
        name: 'SushiSwap',
        url: 'https://www.sushi.com',
        img: 'https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/sushi-light.svg',
      },
      {
        name: 'Dynamic',
        url: 'https://www.dynamic.xyz',
        img: 'https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/dynamic-light.svg',
      },
      {
        name: 'BitKeep',
        url: 'https://bitkeep.com',
        img: 'https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/bitkeep-light.svg',
      },
    ],
  },
  {
    size: 'medium',
    items: [
      {
        name: 'Privy',
        url: 'https://privy.io',
        img: 'https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/privy-light.svg',
      },
      {
        name: 'Spruce',
        url: 'https://spruceid.com',
        img: 'https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/spruce-light.svg',
      },
    ],
  },
] satisfies Sponsors
