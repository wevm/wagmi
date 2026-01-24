import { attest } from '@ark/attest'
import { abi, config } from '@wagmi/test'
import { test } from 'vitest'
import { multicall } from './multicall.js'

test('default', () => {
  multicall(config, {
    chainId: 1,
    contracts: [
      {
        address: '0x',
        abi: abi.erc20,
        functionName: 'balanceOf',
        args: ['0x'],
      },
      {
        address: '0x',
        abi: abi.wagmiMintExample,
        functionName: 'tokenURI',
        args: [123n],
      },
      {
        address: '0x',
        abi: abi.viewOverloads,
        functionName: 'foo',
      },
      {
        address: '0x',
        abi: abi.viewOverloads,
        functionName: 'foo',
        args: ['0x'],
      },
      {
        address: '0x',
        abi: abi.viewOverloads,
        functionName: 'foo',
        args: ['0x', '0x'],
      },
      {
        abi: abi.wagmigotchi,
        address: '0x',
        functionName: 'love',
        args: ['0x'],
      },
      {
        abi: abi.wagmigotchi,
        address: '0x',
        functionName: 'love',
        args: ['0x'],
      },
      {
        abi: abi.wagmigotchi,
        address: '0x',
        functionName: 'getAlive',
      },
      {
        abi: abi.mloot,
        address: '0x',
        functionName: 'tokenOfOwnerByIndex',
        args: ['0x', 0n],
      },
      {
        abi: abi.erc20,
        address: '0x',
        functionName: 'symbol',
      },
      {
        abi: abi.erc20,
        address: '0x',
        functionName: 'balanceOf',
        args: ['0x'],
      },
    ],
  })
  attest.instantiations([523679, 'instantiations'])
})
