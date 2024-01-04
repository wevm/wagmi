import { expect, test, vi } from 'vitest'

import type { ConnectorEventMap } from './connectors/createConnector.js'
import { createEmitter } from './createEmitter.js'
import { uid } from './utils/uid.js'

test('default', () => {
  const emitter = createEmitter<ConnectorEventMap>(uid())

  const onMessage = vi.fn()
  emitter.on('message', onMessage)
  emitter.emit('message', { type: 'bar', data: 'baz' })

  expect(onMessage).toHaveBeenCalledWith({
    type: 'bar',
    data: 'baz',
    uid: emitter.uid,
  })
})
