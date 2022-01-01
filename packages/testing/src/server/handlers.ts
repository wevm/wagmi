import { rest } from 'msw'
import { match, select } from 'ts-pattern'

import { contracts, infuraApiKey } from '../constants'

type EthRequest<Params = any> = {
  id: number
  jsonrpc: string
  method:
    | 'eth_blockNumber'
    | 'eth_call'
    | 'eth_gasPrice'
    | 'eth_getBalance'
    | 'eth_getBlockByNumber'
  params: Array<Params>
}

export const handlers = [
  rest.post<EthRequest>(
    `https://mainnet.infura.io/v3/${infuraApiKey}`,
    (req, res, ctx) => {
      const {
        body: { id, jsonrpc },
        body,
      } = req
      const json = getResponse(body)
      return res(ctx.json({ id, jsonrpc, ...json }))
    },
  ),
]

const getResponse = ({ method, params }: EthRequest) => {
  return match(method)
    .with('eth_blockNumber', () => ({
      result: '0xd410a9',
    }))
    .with('eth_call', () =>
      match<{ to: string; data: string }>(params[0])
        .with({ to: contracts.bogusToken, data: select() }, (data) =>
          match(data)
            .with('0x95d89b41', () => ({
              result: '0x',
            }))
            .run(),
        )
        .with(
          { to: contracts.ensRegistryWithFallback, data: select() },
          (data) =>
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
        .with(
          { to: contracts.ensDefaultReverseResolver, data: select() },
          (data) =>
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
        .with({ to: contracts.ensPublicResolver, data: select() }, (data) =>
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
        .with({ to: contracts.uniToken, data: select() }, (data) =>
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
        .run(),
    )
    .with('eth_getBalance', () =>
      match<[string, string]>(<[string, string]>params)
        .with(['0x012363d61bdc53d0290a0f25e9c89f8257550fb8', 'latest'], () => ({
          result: '0x2b0bbdd89170d79',
        }))
        .run(),
    )
    .with('eth_gasPrice', () => ({
      result: '0x113816c015',
    }))
    .with('eth_getBlockByNumber', () =>
      match<[string, boolean]>(<[string, boolean]>params)
        .with(['latest', false], () => ({
          result: {
            baseFeePerGas: '0x10deae9115',
            difficulty: '0x29bec1a3de91f1',
            extraData: '0x534730322f4254432e636f6d2f783007640033b864',
            gasLimit: '0x1c9c32b',
            gasUsed: '0x1c98370',
            hash: '0x7e2cfd51c50e0145f52b03da6914ec1977640ee56bc55508f2d2db7693f80d76',
            logsBloom:
              '0x9bafe7bf30ff3fafb8c7b9d7ee36d7efd2e7d859acd15b7cdabd3b6bdd7bff06dd7d71f7c03e3bf5df5d75f7a599ef7eeffc9eb96fb7fda9f3e4ffe3ba3e7afbdde6cc8a0978f179ebff55ebe1f05bfd6df7fb76ef7df9cd775af7b7ba2dd1f8bb7a47fd2a374bd5bfcc9fb75c79bffb3ef6cff8a65f7d6d5e6bff3bd9df9af8b9f98d1ee34675f290fc0bfae9eb4d3ddecd5dbd6bbedf58e732b9567e7b99ed6fdbdf7d7fc7ef63eeb546df1fbd7ffffed4ea3eeca74f56c9ddf85e7dc3fb546759b6f7c7949b72e24f21f7f916dda5f754d29236eabe1dc76fbfea2b7fa71f71fda5bffc29cdedc93c9db2ebfceebc9ea2fb70fd560dde36cec8bddaea377b',
            miner: '0xeea5b82b61424df8020f5fedd81767f2d0d25bfb',
            mixHash:
              '0x16eb88d81fd1fdc7857fa7bdd1864e69e605bd16a9421f1e6e545b73c113fe6f',
            nonce: '0xf42c03315db824fb',
            number: '0xd41106',
            parentHash:
              '0xd977c04f046a70de23d735199f2cd227b5481d78603506444efdc6f0bf9d9713',
            receiptsRoot:
              '0x3f0d2ca6dcfbab68a75322084d353d32d8dc00a507ab756effe93e3bf28d2225',
            sha3Uncles:
              '0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347',
            size: '0x25bee',
            stateRoot:
              '0x32a5a0cd831cc3796c11fb0413d487674574549898a1ae2bebbd8c74a102d6c0',
            timestamp: '0x61cbe0d6',
            totalDifficulty: '0x7f9c3ddef8ad25002fc',
            transactions: [
              '0x529172c043274dcec142137614e8a494b50844afe5a2005f171cff20709a4a0a',
              '0xfb63607157b6d9419c6ecb15b3ec3c861e078d29e51eb2c846d76346e136c950',
              '0x53096f20e2c868c48cc54de064503fc1682b154379524cf4b1fc9dc57e17655c',
            ],
            transactionsRoot:
              '0x2df12b79648193bb69f3db9309d9dfb7eca201b5d1cdc54e1f20e160590e3591',
            uncles: [],
          },
        }))

        .run(),
    )
    .run()
}
