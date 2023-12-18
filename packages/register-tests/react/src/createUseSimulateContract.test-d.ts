import { abi, config as testConfig } from '@wagmi/test'
import { test } from 'vitest'
import { celo, mainnet, optimism } from 'wagmi/chains'
import { createUseSimulateContract } from 'wagmi/codegen'

const useSimulateErc20 = createUseSimulateContract({
  abi: abi.erc20,
})

test('chain formatters', () => {
  useSimulateErc20({
    feeCurrency: '0x',
    gatewayFee: 123n,
    gatewayFeeRecipient: '0x',
  })

  useSimulateErc20({
    chainId: celo.id,
    feeCurrency: '0x',
    gatewayFee: 123n,
    gatewayFeeRecipient: '0x',
  })

  useSimulateErc20({
    chainId: mainnet.id,
    // @ts-expect-error
    feeCurrency: '0x',
    gatewayFee: 123n,
    gatewayFeeRecipient: '0x',
  })

  useSimulateErc20({
    chainId: optimism.id,
    // @ts-expect-error
    feeCurrency: '0x',
    gatewayFee: 123n,
    gatewayFeeRecipient: '0x',
  })
})

test('parameters: config', async () => {
  useSimulateErc20({
    config: testConfig,
    // @ts-expect-error
    feeCurrency: '0x',
  })
})
