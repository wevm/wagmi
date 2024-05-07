# Why Wagmi CLI

## The Problem

The most common way to interact with smart contracts is through [Application Binary Interfaces](https://docs.soliditylang.org/en/latest/abi-spec.html). ABIs describe smart contracts' public functionality (e.g. functions, events, errors) as well as how to encode and decode related data (e.g. arguments and results).

While ABIs are extremely powerful, there isn't a uniform way developers manage them in their apps. Developers do a bunch of different things, like:

- Publish packages on npm containing ABIs
- Write custom scripts to fetch ABIs from external sources
- Compile contracts into application project
- Copy and paste ABIs from local projects or block explorers

All these approaches take time that you could spend doing more important things, like interacting with your smart contracts!

## The Solution

The Wagmi CLI is an attempt to automate manual work so you can build faster. In short, the CLI manages ABIs and generates code. It takes ABIs as inputs and outputs ABIs and generated code. For example, the [Etherscan plugin](/cli/api/plugins/etherscan) allows you to fetch ABIs across multiple chains and deployments and immediately start importing them into your project.

Code generation is another big advantage of the CLI. Using the [React plugin](/cli/api/plugins/react), you can generate [Wagmi Hooks](/react/api/hooks) for ABIs. When you combine this with the CLI's different ABI sources, like Etherscan, Foundry/Hardhat, and more, you reduce a lot of boilerplate code.

::: code-group
```ts [Diff]
import { useReadContract, useWriteContract } from 'wagmi' // [!code --]
import { froggyFriendsAbi, froggyFriendsAddress } from './generated' // [!code --]
import { useReadFroggyFriends, useWriteFroggyFriends } from './generated' // [!code ++]

function App() {
  const { data } = useReadContract({ // [!code --]
  const { data } = useReadFroggyFriends({ // [!code ++]
    abi: froggyFriendsAbi, // [!code --]
    address: froggyFriendsAddress, // [!code --]
    functionName: 'tokenURI',
    args: [123n],
  })

  const { write } = useWriteContract() // [!code --]
  const { write } = useWriteFroggyFriends() // [!code ++]
  const onClick = React.useCallback(() => {
    write({
      abi: froggyFriendsAbi, // [!code --]
      address: froggyFriendsAddress, // [!code --]
      functionName: 'mint',
      args: ['foo', 123n],
    })
  }, [write])
}
```
```ts [Before]
import { useReadContract, useWriteContract } from 'wagmi'
import { froggyFriendsAbi, froggyFriendsAddress } from './generated'

function App() {
  const { data } = useReadContract({
    abi: froggyFriendsAbi,
    address: froggyFriendsAddress,
    functionName: 'tokenURI',
    args: [123n],
  })

  const { write } = useWriteContract()
  const onClick = React.useCallback(() => {
    write({
      abi: froggyFriendsAbi,
      address: froggyFriendsAddress,
      functionName: 'mint',
      args: ['foo', 123n],
    })
  }, [write])
}
```
```ts [After]
import { useReadFroggyFriends, useWriteFroggyFriends } from './generated'

function App() {
  const { data } = useReadFroggyFriends({
    functionName: 'tokenURI',
    args: [123n],
  })

  const { write } = useWriteFroggyFriends()
  const onClick = React.useCallback(() => {
    write({
      functionName: 'mint',
      args: ['foo', 123n],
    })
  }, [write])
}
```
:::

Finally, the Wagmi CLI supports popular smart contract development tools, [Foundry](/cli/api/plugins/foundry) and [Hardhat](/cli/api/plugins/hardhat). You can run the CLI in [watch mode](/cli/api/commands/generate#w-watch), make changes to your contracts, and the CLI will automatically pick up ABI changes and run plugins over those changes. A major boon to working a monorepo and shortening the feedback loop across your stack.
