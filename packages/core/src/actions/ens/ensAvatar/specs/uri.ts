import { resolveURI } from '../utils'

export default class URI {
  async getMetadata(uri: string) {
    const { uri: resolvedURI, isOnChain } = resolveURI(uri)
    if (isOnChain) {
      return resolvedURI
    }

    // check if resolvedURI is an image, if it is return the url
    const isImage = await isImageURI(resolvedURI)
    if (isImage) {
      return { image: resolvedURI }
    }

    // if resolvedURI is not an image, try retrieve the data.
    const response = await fetch(resolvedURI)
    return await response?.json()
  }
}

const isImageURI = (url: string) => {
  return new Promise((resolve) => {
    fetch(url, { method: 'HEAD' })
      .then((result) => {
        if (result.status === 200) {
          // retrieve content type header to check if content is image
          const contentType = result.headers.get('content-type')
          resolve(contentType?.startsWith('image/'))
        } else {
          resolve(false)
        }
      })
      .catch((error) => {
        // if error is not cors related then fail
        if (typeof error.response !== 'undefined') {
          // in case of cors, use image api to validate if given url is an actual image
          resolve(false)
          return
        }
        // eslint-disable-next-line no-prototype-builtins
        if (!globalThis.hasOwnProperty('Image')) {
          // fail in NodeJS, since the error is not cors but any other network issue
          resolve(false)
          return
        }
        const img = new Image()
        img.onload = () => {
          resolve(true)
        }
        img.onerror = () => {
          resolve(false)
        }
        img.src = url
      })
  })
}
