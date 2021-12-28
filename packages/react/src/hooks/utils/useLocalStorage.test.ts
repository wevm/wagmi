import { actHook, renderHook } from '../../../test'
import { useLocalStorage } from './useLocalStorage'

const connectorStorageKey = 'key'

describe('useLocalStorage', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('defaults to null', () => {
    const { result } = renderHook(() => useLocalStorage(connectorStorageKey), {
      initialProps: { connectorStorageKey },
    })
    expect(result.current[0]).toEqual(null)
  })

  it('defaults to value', () => {
    const { result } = renderHook(
      () => useLocalStorage(connectorStorageKey, 'foo'),
      {
        initialProps: { connectorStorageKey },
      },
    )
    expect(result.current[0]).toEqual('foo')
  })

  it('sets value', () => {
    const { result } = renderHook(
      () => useLocalStorage(connectorStorageKey, 'foo'),
      {
        initialProps: { connectorStorageKey },
      },
    )
    expect(result.current[0]).toEqual('foo')
    actHook(() => result.current[1]('bar'))
    expect(result.current[0]).toEqual('bar')
    actHook(() => result.current[1](null))
    expect(result.current[0]).toEqual(null)
  })
})
