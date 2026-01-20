# Overview

| Action | Description |
|--------|-------------|
| **AMM Actions** | |
| [`amm.burn`](/tempo/actions/amm.burn) | Burns liquidity tokens and receives the underlying token pair |
| [`amm.getLiquidityBalance`](/tempo/actions/amm.getLiquidityBalance) | Gets the liquidity balance for an address in a specific pool |
| [`amm.getPool`](/tempo/actions/amm.getPool) | Gets the reserves for a liquidity pool |
| [`amm.mint`](/tempo/actions/amm.mint) | Mints liquidity tokens by providing a token pair |
| [`amm.rebalanceSwap`](/tempo/actions/amm.rebalanceSwap) | Performs a rebalance swap between user and validator tokens |
| [`amm.watchBurn`](/tempo/actions/amm.watchBurn) | Watches for liquidity burn events |
| [`amm.watchMint`](/tempo/actions/amm.watchMint) | Watches for liquidity mint events |
| [`amm.watchRebalanceSwap`](/tempo/actions/amm.watchRebalanceSwap) | Watches for rebalance swap events |
| **Faucet Actions** | |
| [`faucet.fund`](/tempo/actions/faucet.fund) | Funds an account with testnet tokens |
| **Fee Actions** | |
| [`fee.getUserToken`](/tempo/actions/fee.getUserToken) | Gets the user's default fee token preference |
| [`fee.setUserToken`](/tempo/actions/fee.setUserToken) | Sets the user's default fee token preference |
| [`fee.watchSetUserToken`](/tempo/actions/fee.watchSetUserToken) | Watches for user token set events |
| **Nonce Actions** | |
| [`nonce.getNonce`](/tempo/actions/nonce.getNonce) | Gets the nonce for an account and nonce key |
| [`nonce.watchNonceIncremented`](/tempo/actions/nonce.watchNonceIncremented) | Watches for nonce incremented events |
| **Policy Actions** | |
| [`policy.create`](#TODO) | Creates a new transfer policy for token access control |
| [`policy.getData`](#TODO) | Gets the data for a transfer policy, including its type and admin address |
| [`policy.isAuthorized`](#TODO) | Checks if an address is authorized by a transfer policy |
| [`policy.modifyBlacklist`](#TODO) | Modifies the blacklist for a blacklist-type transfer policy |
| [`policy.modifyWhitelist`](#TODO) | Modifies the whitelist for a whitelist-type transfer policy |
| [`policy.setAdmin`](#TODO) | Sets the admin for a transfer policy |
| [`policy.watchAdminUpdated`](#TODO) | Watches for policy admin update events |
| [`policy.watchBlacklistUpdated`](#TODO) | Watches for blacklist update events |
| [`policy.watchCreate`](#TODO) | Watches for policy creation events |
| [`policy.watchWhitelistUpdated`](#TODO) | Watches for whitelist update events |
| **Reward Actions** | |
| [`reward.claim`](/tempo/actions/reward.claim) | Claims accumulated rewards for the caller |
| [`reward.getUserRewardInfo`](/tempo/actions/reward.getUserRewardInfo) | Gets reward information for a specific account |
| [`reward.setRecipient`](/tempo/actions/reward.setRecipient) | Sets or changes the reward recipient for a token holder |
| [`reward.distribute`](/tempo/actions/reward.distribute) | Distributes tokens to opted-in holders |
| [`reward.watchRewardRecipientSet`](/tempo/actions/reward.watchRewardRecipientSet) | Watches for reward recipient set events |
| [`reward.watchRewardDistributed`](/tempo/actions/reward.watchRewardDistributed) | Watches for reward distributed events |
| **Stablecoin DEX Actions** | |
| [`dex.buy`](/tempo/actions/dex.buy) | Buys a specific amount of tokens from the Stablecoin DEX orderbook |
| [`dex.cancel`](/tempo/actions/dex.cancel) | Cancels an order from the orderbook |
| [`dex.createPair`](/tempo/actions/dex.createPair) | Creates a new trading pair on the DEX |
| [`dex.getBalance`](/tempo/actions/dex.getBalance) | Gets a user's token balance on the Stablecoin DEX |
| [`dex.getBuyQuote`](/tempo/actions/dex.getBuyQuote) | Gets the quote for buying a specific amount of tokens |
| [`dex.getOrder`](/tempo/actions/dex.getOrder) | Gets an order's details from the orderbook |
| [`dex.getTickLevel`](/tempo/actions/dex.getTickLevel) | Gets the price level information at a specific tick |
| [`dex.getSellQuote`](/tempo/actions/dex.getSellQuote) | Gets the quote for selling a specific amount of tokens |
| [`dex.place`](/tempo/actions/dex.place) | Places a limit order on the orderbook |
| [`dex.placeFlip`](/tempo/actions/dex.placeFlip) | Places a flip order that automatically flips when filled |
| [`dex.sell`](/tempo/actions/dex.sell) | Sells a specific amount of tokens from the Stablecoin DEX orderbook |
| [`dex.watchFlipOrderPlaced`](/tempo/actions/dex.watchFlipOrderPlaced) | Watches for flip order placed events |
| [`dex.watchOrderCancelled`](/tempo/actions/dex.watchOrderCancelled) | Watches for order cancelled events |
| [`dex.watchOrderFilled`](/tempo/actions/dex.watchOrderFilled) | Watches for order filled events |
| [`dex.watchOrderPlaced`](/tempo/actions/dex.watchOrderPlaced) | Watches for order placed events |
| [`dex.withdraw`](/tempo/actions/dex.withdraw) | Withdraws tokens from the DEX to the caller's wallet |
| **Token Actions** | |
| [`token.approve`](/tempo/actions/token.approve) | Approves a spender to transfer TIP-20 tokens on behalf of the caller |
| [`token.burn`](/tempo/actions/token.burn) | Burns TIP-20 tokens from the caller's balance |
| [`token.burnBlocked`](/tempo/actions/token.burnBlocked) | Burns TIP-20 tokens from a blocked address |
| [`token.changeTransferPolicy`](/tempo/actions/token.changeTransferPolicy) | Changes the transfer policy for a TIP-20 token |
| [`token.create`](/tempo/actions/token.create) | Creates a new TIP-20 token and assigns the admin role to the calling account |
| [`token.getAllowance`](/tempo/actions/token.getAllowance) | Gets the amount of tokens that a spender is approved to transfer on behalf of an owner |
| [`token.getBalance`](/tempo/actions/token.getBalance) | Gets the token balance of an address |
| [`token.getMetadata`](/tempo/actions/token.getMetadata) | Gets the metadata for a TIP-20 token, including name, symbol, decimals, currency, and total supply |
| [`token.grantRoles`](/tempo/actions/token.grantRoles) | Grants one or more roles to an address |
| [`token.mint`](/tempo/actions/token.mint) | Mints new TIP-20 tokens to a recipient |
| [`token.pause`](/tempo/actions/token.pause) | Pauses a TIP-20 token, preventing all transfers |
| [`token.renounceRoles`](/tempo/actions/token.renounceRoles) | Renounces one or more roles from the caller's address |
| [`token.revokeRoles`](/tempo/actions/token.revokeRoles) | Revokes one or more roles from an address |
| [`token.setRoleAdmin`](/tempo/actions/token.setRoleAdmin) | Sets the admin role for another role |
| [`token.setSupplyCap`](/tempo/actions/token.setSupplyCap) | Sets the supply cap for a TIP-20 token |
| [`token.transfer`](/tempo/actions/token.transfer) | Transfers TIP-20 tokens from the caller to a recipient |
| [`token.unpause`](/tempo/actions/token.unpause) | Unpauses a TIP-20 token, allowing transfers to resume |
| [`token.watchAdminRole`](/tempo/actions/token.watchAdminRole) | Watches for role admin update events |
| [`token.watchApprove`](/tempo/actions/token.watchApprove) | Watches for token approval events |
| [`token.watchBurn`](/tempo/actions/token.watchBurn) | Watches for token burn events |
| [`token.watchCreate`](/tempo/actions/token.watchCreate) | Watches for new token creation events |
| [`token.watchMint`](/tempo/actions/token.watchMint) | Watches for token mint events |
| [`token.watchRole`](/tempo/actions/token.watchRole) | Watches for role membership update events |
| [`token.watchTransfer`](/tempo/actions/token.watchTransfer) | Watches for token transfer events |
