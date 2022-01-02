import * as React from 'react'
import { BigNumber } from 'ethers/lib/ethers'
import { parseEther } from 'ethers/lib/utils'
import { useContractWrite, useNetwork, useWaitForTransaction } from 'wagmi'

import { MirrorERC20FactoryContract } from '../generated/contracts'

export const ContractFunction = () => {
  const [{ data: networkData }] = useNetwork()
  const [state, setState] = React.useState<{
    address: string
    name: string
    symbol: string
    totalSupply: string
  }>({
    address: '',
    name: '',
    symbol: '',
    totalSupply: '',
  })
  const [transactionResult, execute] = useContractWrite(
    {
      addressOrName: MirrorERC20FactoryContract.address,
      contractInterface: MirrorERC20FactoryContract.abi,
    },
    'create',
    {
      args: [
        state.address,
        state.name,
        state.symbol,
        state.totalSupply ? parseEther(state.totalSupply) : undefined,
        BigNumber.from('18'),
      ],
    },
  )
  const [waitResult] = useWaitForTransaction({
    wait: transactionResult.data?.wait,
  })

  const blockExplorer = networkData.chain?.blockExplorers?.[0]
  const hash = transactionResult.data?.hash

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        execute()
      }}
    >
      <div>
        <label htmlFor="address">Owner Address</label>
      </div>
      <input
        placeholder="0xA0Cf798816D4b9b9866b5330EEa46a18382f251e"
        id="address"
        value={state.address}
        onChange={(event) =>
          setState((x) => ({ ...x, address: event.target.value }))
        }
      />

      <div>
        <label htmlFor="name">Token Name</label>
      </div>
      <input
        placeholder="Mirror $WRITE token"
        id="name"
        value={state.name}
        onChange={(event) =>
          setState((x) => ({ ...x, name: event.target.value }))
        }
      />

      <div>
        <label htmlFor="symbol">Token Symbol</label>
      </div>
      <input
        placeholder="$WRITE"
        id="symbol"
        value={state.symbol}
        onChange={(event) =>
          setState((x) => ({ ...x, symbol: event.target.value }))
        }
      />

      <div>
        <label htmlFor="supply">Total Supply</label>
      </div>
      <input
        placeholder="1"
        id="amount"
        value={state.totalSupply}
        type="number"
        onChange={(event) =>
          setState((x) => ({ ...x, totalSupply: event.target.value }))
        }
      />
      <button
        disabled={
          transactionResult.loading ||
          waitResult.loading ||
          !state.address ||
          !state.name ||
          !state.symbol ||
          !state.totalSupply
        }
      >
        {transactionResult.loading ? 'Check Wallet' : 'Deploy Token'}
      </button>

      {waitResult.loading
        ? 'Processing…'
        : waitResult.error
        ? waitResult.error
        : waitResult.data?.status === 1
        ? `Confirmed ${waitResult.data.status}`
        : null}
      {transactionResult.error && <div>{transactionResult.error.message}</div>}
      {blockExplorer && hash && (
        <a href={`${blockExplorer.url}/tx/${hash}`}>
          View on {blockExplorer.name}
        </a>
      )}
    </form>
  )
}
