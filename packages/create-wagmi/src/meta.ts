import { type Provider, type ProviderName } from './types.js'

export const providers: Record<ProviderName, Provider> = {
  alchemy: {
    name: 'alchemy',
    title: 'Alchemy',
    description: 'Learn more: https://wagmi.sh/react/providers/alchemy',
    apiKey: {
      env: 'ALCHEMY_API_KEY',
      url: 'https://dashboard.alchemyapi.io/',
    },
  },
  infura: {
    name: 'infura',
    title: 'Infura',
    description: 'Learn more: https://wagmi.sh/react/providers/infura',
    apiKey: {
      env: 'INFURA_API_KEY',
      url: 'https://infura.io/login',
    },
  },
  public: {
    name: 'public',
    title: 'Public RPC',
    description: 'Learn more: https://wagmi.sh/react/providers/public',
    apiKey: null,
  },
}
