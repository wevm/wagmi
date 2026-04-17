import * as chains from '@wagmi/core/chains'
import { defineChain, zeroHash } from 'viem'
import { Storage } from 'viem/tempo'
import { zone } from 'viem/tempo/zones'

export const zoneId = 7
export const zoneRpcPort = 4001
export const zoneRpcUrl = `http://localhost:${zoneRpcPort}`
export const zonePortalAddress = '0x1c00000000000000000000000000000000000007'
export const zonePortalEncryptionKey = {
  x: '0x79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798',
  yParity: 2,
} as const
export const zonePortalEncryptionKeyCount = 1n
export const zoneSequencer = '0x0000000000000000000000000000000000000007'
export const zoneTokens = [
  '0x20c0000000000000000000000000000000000001',
] as const

export const zoneInfo = {
  chainId: zone(zoneId).id,
  sequencer: zoneSequencer,
  zoneId,
  zoneTokens,
} as const

export const zoneInfoRpcReturnValue = {
  chainId: `0x${zoneInfo.chainId.toString(16)}`,
  sequencer: zoneInfo.sequencer,
  zoneId: `0x${zoneInfo.zoneId.toString(16)}`,
  zoneTokens: zoneInfo.zoneTokens,
} as const

export const zoneDepositStatus = {
  deposits: [
    {
      amount: 123_000_000n,
      depositHash:
        '0x1111111111111111111111111111111111111111111111111111111111111111',
      kind: 'regular',
      memo: zeroHash,
      recipient: '0x20c0000000000000000000000000000000000002',
      sender: '0x20c0000000000000000000000000000000000000',
      status: 'processed',
      token: zoneTokens[0],
    },
  ],
  processed: true,
  tempoBlockNumber: 42n,
  zoneProcessedThrough: 42n,
} as const

export const zoneDepositStatusRpcReturnValue = {
  deposits: zoneDepositStatus.deposits.map((deposit) => ({
    amount: `0x${deposit.amount.toString(16)}`,
    depositHash: deposit.depositHash,
    kind: deposit.kind,
    memo: deposit.memo,
    recipient: deposit.recipient,
    sender: deposit.sender,
    status: deposit.status,
    token: deposit.token,
  })),
  processed: zoneDepositStatus.processed,
  tempoBlockNumber: `0x${zoneDepositStatus.tempoBlockNumber.toString(16)}`,
  zoneProcessedThrough: `0x${zoneDepositStatus.zoneProcessedThrough.toString(16)}`,
} as const

export const zoneLocal = defineChain({
  ...zone(zoneId),
  rpcUrls: { default: { http: [zoneRpcUrl] } },
  sourceId: chains.tempoLocalnet.id,
})

export const zoneStorage = Storage.memory()
