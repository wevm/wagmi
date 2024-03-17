import { onMounted, ref } from 'vue'

type Sponsor = {
  name: string
  img: string
  url: string
}

type Data = {
  size: 'big' | 'medium' | 'small'
  items: Sponsor[]
  tier: string
  type: 'platinum' | 'gold' | 'silver'
}[]

// shared data across instances so we load only once.
const data = ref<Data>()

// TODO: Data powered
// const dataHost = 'https://sponsors.vuejs.org'
// const dataUrl = `${dataHost}/vite.json`

export function useSponsors() {
  onMounted(async () => {
    if (data.value) return

    // const result = await fetch(dataUrl)
    // const json = await result.json()
    // console.log(json)
    const sponsors = {
      platinum: [
        {
          name: 'Paradigm',
          url: 'https://paradigm.xyz',
          img: 'paradigm-light.svg',
        },
      ],
      gold: [
        {
          name: 'WalletConnect',
          url: 'https://walletconnect.com',
          img: 'walletconnect-light.svg',
        },
        {
          name: 'Stripe',
          url: 'https://www.stripe.com',
          img: 'stripe-light.svg',
        },
        {
          name: 'PancakeSwap',
          url: 'https://pancakeswap.finance',
          img: 'pancake-light.svg',
        },
        {
          name: 'zkSync',
          url: 'https://zksync.io',
          img: 'zksync-light.svg',
        },
      ],
      silver: [
        {
          name: 'Family',
          url: 'https://twitter.com/family',
          img: 'family-light.svg',
        },
        {
          name: 'Context',
          url: 'https://twitter.com/context',
          img: 'context-light.svg',
        },
        {
          name: 'PartyDAO',
          url: 'https://twitter.com/prtyDAO',
          img: 'partydao-light.svg',
        },
        {
          name: 'SushiSwap',
          url: 'https://www.sushi.com',
          img: 'sushi-light.svg',
        },
        {
          name: 'Dynamic',
          url: 'https://www.dynamic.xyz',
          img: 'dynamic-light.svg',
        },
        {
          name: 'Privy',
          url: 'https://privy.io',
          img: 'privy-light.svg',
        },
        {
          name: 'Spruce',
          url: 'https://spruceid.com',
          img: 'spruce-light.svg',
        },
        {
          name: 'rollup.id',
          url: 'https://rollup.id',
          img: 'rollup.id-light.svg',
        },
        {
          name: 'Celo',
          url: 'https://celo.org',
          img: 'celo-light.svg',
        },
        {
          name: 'Rainbow',
          url: 'https://rainbow.me',
          img: 'rainbow-light.svg',
        },
        {
          name: 'Pimlico',
          url: 'https://pimlico.io',
          img: 'pimlico-light.svg',
        },
        {
          name: 'Zora',
          url: 'https://zora.co',
          img: 'zora-light.svg',
        },
        {
          name: 'Lattice',
          url: 'https://lattice.xyz',
          img: 'lattice-light.svg',
        },
        {
          name: 'Supa',
          url: 'https://twitter.com/supafinance',
          img: 'supa-light.svg',
        },
      ],
    }

    data.value = mapSponsors(sponsors)
  })

  return { data }
}

function mapSponsors(sponsors: {
  platinum: Sponsor[]
  gold: Sponsor[]
  silver: Sponsor[]
}) {
  return [
    {
      size: 'big',
      items: mapImgPath(sponsors.platinum),
      tier: 'Collaborators',
      type: 'platinum',
    },
    {
      size: 'medium',
      items: mapImgPath(sponsors.gold),
      tier: 'Large Enterprises',
      type: 'gold',
    },
    {
      size: 'small',
      items: mapImgPath(sponsors.silver),
      tier: 'Small Enterprises',
      type: 'silver',
    },
  ] satisfies Data
}

function mapImgPath(sponsors: Sponsor[]) {
  return sponsors.map((sponsor) => ({
    ...sponsor,
    img: `https://raw.githubusercontent.com/wevm/.github/main/content/sponsors/${sponsor.img}`,
  }))
}
