# Overview

| Hook   | Description |
|--------|-------------|
| **AMM Hooks** | |
| [`amm.useBurn`](/tempo/hooks/amm.useBurn) | Hook for burning liquidity tokens and receiving the underlying token pair |
| [`amm.useLiquidityBalance`](/tempo/hooks/amm.useLiquidityBalance) | Hook for getting the liquidity balance for an address in a specific pool |
| [`amm.useMint`](/tempo/hooks/amm.useMint) | Hook for minting liquidity tokens by providing a token pair |
| [`amm.usePool`](/tempo/hooks/amm.usePool) | Hook for getting the reserves for a liquidity pool |
| [`amm.useRebalanceSwap`](/tempo/hooks/amm.useRebalanceSwap) | Hook for performing a rebalance swap between user and validator tokens |
| [`amm.useWatchBurn`](/tempo/hooks/amm.useWatchBurn) | Hook for watching liquidity burn events |
| [`amm.useWatchMint`](/tempo/hooks/amm.useWatchMint) | Hook for watching liquidity mint events |
| [`amm.useWatchRebalanceSwap`](/tempo/hooks/amm.useWatchRebalanceSwap) | Hook for watching rebalance swap events |
| **Faucet Hooks** | |
| [`faucet.useFund`](/tempo/hooks/faucet.useFund) | Hook for funding an account with testnet tokens |
| **Fee Hooks** | |
| [`fee.useSetUserToken`](/tempo/hooks/fee.useSetUserToken) | Hook for setting the user's default fee token preference |
| [`fee.useUserToken`](/tempo/hooks/fee.useUserToken) | Hook for getting the user's default fee token preference |
| [`fee.useWatchSetUserToken`](/tempo/hooks/fee.useWatchSetUserToken) | Hook for watching user token set events |
| **Nonce Hooks** | |
| [`nonce.useNonce`](/tempo/hooks/nonce.useNonce) | Hook for getting the nonce for an account and nonce key |
| [`nonce.useWatchNonceIncremented`](/tempo/hooks/nonce.useWatchNonceIncremented) | Hook for watching nonce incremented events |
| **Policy Hooks** | |
| [`policy.useCreate`](#TODO) | Hook for creating a new transfer policy for token access control |
| [`policy.useData`](#TODO) | Hook for getting the data for a transfer policy, including its type and admin address |
| [`policy.useIsAuthorized`](#TODO) | Hook for checking if an address is authorized by a transfer policy |
| [`policy.useModifyBlacklist`](#TODO) | Hook for modifying the blacklist for a blacklist-type transfer policy |
| [`policy.useModifyWhitelist`](#TODO) | Hook for modifying the whitelist for a whitelist-type transfer policy |
| [`policy.useSetAdmin`](#TODO) | Hook for setting the admin for a transfer policy |
| [`policy.useWatchAdminUpdated`](#TODO) | Hook for watching policy admin update events |
| [`policy.useWatchBlacklistUpdated`](#TODO) | Hook for watching blacklist update events |
| [`policy.useWatchCreate`](#TODO) | Hook for watching policy creation events |
| [`policy.useWatchWhitelistUpdated`](#TODO) | Hook for watching whitelist update events |
| **Reward Hooks** | |
| [`reward.useClaim`](/tempo/hooks/reward.useClaim) | Hook for claiming accumulated rewards |
| [`reward.useSetRecipient`](/tempo/hooks/reward.useSetRecipient) | Hook for setting or changing the reward recipient for a token holder |
| [`reward.useDistribute`](/tempo/hooks/reward.useDistribute) | Hook for distributing tokens to opted-in holders |
| [`reward.useUserRewardInfo`](/tempo/hooks/reward.useUserRewardInfo) | Hook for getting reward information for a specific account |
| [`reward.useWatchRewardRecipientSet`](/tempo/hooks/reward.useWatchRewardRecipientSet) | Hook for watching reward recipient set events |
| [`reward.useWatchRewardDistributed`](/tempo/hooks/reward.useWatchRewardDistributed) | Hook for watching reward distributed events |
| **Stablecoin DEX Hooks** | |
| [`dex.useBalance`](/tempo/hooks/dex.useBalance) | Hook for getting a user's token balance on the Stablecoin DEX |
| [`dex.useBuy`](/tempo/hooks/dex.useBuy) | Hook for buying a specific amount of tokens from the Stablecoin DEX orderbook |
| [`dex.useBuyQuote`](/tempo/hooks/dex.useBuyQuote) | Hook for getting the quote for buying a specific amount of tokens |
| [`dex.useCancel`](/tempo/hooks/dex.useCancel) | Hook for canceling an order from the orderbook |
| [`dex.useCreatePair`](/tempo/hooks/dex.useCreatePair) | Hook for creating a new trading pair on the DEX |
| [`dex.useOrder`](/tempo/hooks/dex.useOrder) | Hook for getting an order's details from the orderbook |
| [`dex.usePlace`](/tempo/hooks/dex.usePlace) | Hook for placing a limit order on the orderbook |
| [`dex.usePlaceFlip`](/tempo/hooks/dex.usePlaceFlip) | Hook for placing a flip order that automatically flips when filled |
| [`dex.useTickLevel`](/tempo/hooks/dex.useTickLevel) | Hook for getting the price level information at a specific tick |
| [`dex.useSell`](/tempo/hooks/dex.useSell) | Hook for selling a specific amount of tokens from the Stablecoin DEX orderbook |
| [`dex.useSellQuote`](/tempo/hooks/dex.useSellQuote) | Hook for getting the quote for selling a specific amount of tokens |
| [`dex.useWatchFlipOrderPlaced`](/tempo/hooks/dex.useWatchFlipOrderPlaced) | Hook for watching flip order placed events |
| [`dex.useWatchOrderCancelled`](/tempo/hooks/dex.useWatchOrderCancelled) | Hook for watching order cancelled events |
| [`dex.useWatchOrderFilled`](/tempo/hooks/dex.useWatchOrderFilled) | Hook for watching order filled events |
| [`dex.useWatchOrderPlaced`](/tempo/hooks/dex.useWatchOrderPlaced) | Hook for watching order placed events |
| [`dex.useWithdraw`](/tempo/hooks/dex.useWithdraw) | Hook for withdrawing tokens from the DEX to the caller's wallet |
| **Token Hooks** | |
| [`token.useAllowance`](/tempo/hooks/token.useGetAllowance) | Hook for getting the amount of tokens that a spender is approved to transfer on behalf of an owner |
| [`token.useApprove`](/tempo/hooks/token.useApprove) | Hook for approving a spender to transfer TIP-20 tokens on behalf of the caller |
| [`token.useBalance`](/tempo/hooks/token.useGetBalance) | Hook for getting the token balance of an address |
| [`token.useBurn`](/tempo/hooks/token.useBurn) | Hook for burning TIP-20 tokens from the caller's balance |
| [`token.useBurnBlocked`](/tempo/hooks/token.useBurnBlocked) | Hook for burning TIP-20 tokens from a blocked address |
| [`token.useChangeTransferPolicy`](/tempo/hooks/token.useChangeTransferPolicy) | Hook for changing the transfer policy for a TIP-20 token |
| [`token.useCreate`](/tempo/hooks/token.useCreate) | Hook for creating a new TIP-20 token and assigning the admin role to the calling account |
| [`token.useGrantRoles`](/tempo/hooks/token.useGrantRoles) | Hook for granting one or more roles to an address |
| [`token.useHasRole`](/tempo/hooks/token.useHasRole) | Hook for checking if an address has a specific role |
| [`token.useMetadata`](/tempo/hooks/token.useGetMetadata) | Hook for getting the metadata for a TIP-20 token, including name, symbol, decimals, currency, and total supply |
| [`token.useMint`](/tempo/hooks/token.useMint) | Hook for minting new TIP-20 tokens to a recipient |
| [`token.usePause`](/tempo/hooks/token.usePause) | Hook for pausing a TIP-20 token, preventing all transfers |
| [`token.useRenounceRoles`](/tempo/hooks/token.useRenounceRoles) | Hook for renouncing one or more roles from the caller's address |
| [`token.useRevokeRoles`](/tempo/hooks/token.useRevokeRoles) | Hook for revoking one or more roles from an address |
| [`token.useSetRoleAdmin`](/tempo/hooks/token.useSetRoleAdmin) | Hook for setting the admin role for another role |
| [`token.useSetSupplyCap`](/tempo/hooks/token.useSetSupplyCap) | Hook for setting the supply cap for a TIP-20 token |
| [`token.useTransfer`](/tempo/hooks/token.useTransfer) | Hook for transferring TIP-20 tokens from the caller to a recipient |
| [`token.useUnpause`](/tempo/hooks/token.useUnpause) | Hook for unpausing a TIP-20 token, allowing transfers to resume |
| [`token.useWatchAdminRole`](/tempo/hooks/token.useWatchAdminRole) | Hook for watching role admin update events |
| [`token.useWatchApprove`](/tempo/hooks/token.useWatchApprove) | Hook for watching token approval events |
| [`token.useWatchBurn`](/tempo/hooks/token.useWatchBurn) | Hook for watching token burn events |
| [`token.useWatchCreate`](/tempo/hooks/token.useWatchCreate) | Hook for watching new token creation events |
| [`token.useWatchMint`](/tempo/hooks/token.useWatchMint) | Hook for watching token mint events |
| [`token.useWatchRole`](/tempo/hooks/token.useWatchRole) | Hook for watching role membership update events |
| [`token.useWatchTransfer`](/tempo/hooks/token.useWatchTransfer) | Hook for watching token transfer events |
