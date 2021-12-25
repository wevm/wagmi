import { ConnectorError } from './errors'

describe('ConnectorError', () => {
  it('inits', () => {
    const error = new ConnectorError('foo bar')
    expect(error.message).toEqual('foo bar')
  })
})
