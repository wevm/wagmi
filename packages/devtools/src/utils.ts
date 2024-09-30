// Sets up the goober stylesheet
// Adds a nonce to the style tag if needed
export const setupStyleSheet = (nonce?: string, target?: ShadowRoot) => {
  if (!nonce) return
  const styleExists =
    document.querySelector('#_goober') || target?.querySelector('#_goober')

  if (styleExists) return
  const styleTag = document.createElement('style')
  const textNode = document.createTextNode('')
  styleTag.appendChild(textNode)
  styleTag.id = '_goober'
  styleTag.setAttribute('nonce', nonce)
  if (target) {
    target.appendChild(styleTag)
  } else {
    document.head.appendChild(styleTag)
  }
}
