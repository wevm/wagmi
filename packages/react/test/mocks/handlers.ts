import { rest } from 'msw'
import { match } from 'ts-pattern'

import { addressLookup, infuraApiKey } from '../constants'

type EthCallBody<Params = any> = {
  id: number
  jsonrpc: string
  method: 'eth_call'
  params: Array<Params>
}

export const handlers = [
  rest.post<EthCallBody<{ data: string; to: string }>>(
    `https://mainnet.infura.io/v3/${infuraApiKey}`,
    (req, res, ctx) => {
      const named = req.body?.params[0]
      const json = getResponse({
        address: named.to,
        data: named.data,
      })
      return res(ctx.json({ id: req.body.id, jsonrpc: '2.0', ...json }))
    },
  ),
]

const getResponse = ({ address, data }: { address: string; data: string }) => {
  return match(address)
    .with(addressLookup.ensRegistryWithFallback, () =>
      match(data)
        .with(
          '0x0178b8bf0a35b940a35eb254882cebc0df2d04746fe74b9643fdea2e55ada13dee60e299',
          () => ({
            result:
              '0x000000000000000000000000a2c122be93b0074270ebee7f6b7292c7deb45047',
          }),
        )
        .with(
          '0x0178b8bfc31baf175750b79a7dd0e718cb0de8f4694da8cad0e68d5f64503df46d24c298',
          () => ({
            result:
              '0x0000000000000000000000004976fb03c32e5b8cfe2b6ccb31c09ba78ebaba41',
          }),
        )
        .run(),
    )
    .with(addressLookup.ensDefaultReverseResolver, () =>
      match(data)
        .with(
          '0x691f34310a35b940a35eb254882cebc0df2d04746fe74b9643fdea2e55ada13dee60e299',
          () => ({
            result:
              '0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000b6d6561676865722e657468000000000000000000000000000000000000000000',
          }),
        )
        .run(),
    )
    .with(addressLookup.ensPublicResolver, () =>
      match(data)
        .with(
          '0x3b3b57dec31baf175750b79a7dd0e718cb0de8f4694da8cad0e68d5f64503df46d24c298',
          () => ({
            result:
              '0x000000000000000000000000a0cf798816d4b9b9866b5330eea46a18382f251e',
          }),
        )
        .with(
          '0x59d1d43cc31baf175750b79a7dd0e718cb0de8f4694da8cad0e68d5f64503df46d24c298000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000066176617461720000000000000000000000000000000000000000000000000000',
          () => ({
            result:
              '0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000004d68747470733a2f2f7062732e7477696d672e636f6d2f70726f66696c655f696d616765732f313436323239313736303133353235383131352f744a394b384b35765f343030783430302e6a706700000000000000000000000000000000000000',
          }),
        )
        .run(),
    )
    .with(addressLookup.uniToken, () =>
      match(data)
        .with('0x313ce567', () => ({
          result:
            '0x0000000000000000000000000000000000000000000000000000000000000012',
        }))
        .with('0x18160ddd', () => ({
          result:
            '0x0000000000000000000000000000000000000000033b2e3c9fd0803ce8000000',
        }))
        .with('0x95d89b41', () => ({
          result:
            '0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000003554e490000000000000000000000000000000000000000000000000000000000',
        }))
        .run(),
    )
    .run()
}

export class DataNotFoundError extends Error {
  constructor(data: string, address: string) {
    super(`No data "${data}" for address '${address}' found`)
  }
}

export class AddressNotFoundError extends Error {
  constructor(address: string) {
    super(`No address "${address}" found`)
  }
}
