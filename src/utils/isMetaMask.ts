import { hasInjected } from './hasInjected'

export const isMetaMask = () => hasInjected() && window.ethereum?.isMetaMask
