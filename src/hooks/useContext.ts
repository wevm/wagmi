import * as React from 'react'

import { Context } from '../context'

export const useContext = () => {
  const context = React.useContext(Context)
  if (!context) throw Error('Must be used within Provider')
  return context
}
