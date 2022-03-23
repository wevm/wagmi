const isServer = typeof window === 'undefined'

export const encodeBase64 = (str: string) => {
  return isServer ? Buffer.from(str).toString('base64') : btoa(str)
}
