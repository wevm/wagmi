export const hasInjected = () =>
  typeof window !== 'undefined' && !!window.ethereum
