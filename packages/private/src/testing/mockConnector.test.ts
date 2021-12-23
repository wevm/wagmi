import { MockConnector } from './mockConnector'

describe('MockConnector', () => {
  it('inits', () => {
    const connector = new MockConnector()
    expect(connector.name).toEqual('Mock')
    expect(connector.ready).toEqual(true)
  })
})
