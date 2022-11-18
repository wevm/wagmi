import {
  AddChainError,
  ChainNotConfiguredError,
  Connector,
  SwitchChainError,
  UserRejectedRequestError,
  normalizeChainId
} from "../chunk-2BWSAGQS.js";
import "../chunk-3YHVCSSL.js";
import {
  __privateAdd,
  __privateGet,
  __privateMethod,
  __privateSet
} from "../chunk-MQXBDTVK.js";

// src/connectors/coinbaseWallet.ts
import { providers } from "ethers";
import { getAddress, hexValue } from "ethers/lib/utils.js";
var _client, _provider, _isUserRejectedRequestError, isUserRejectedRequestError_fn;
var CoinbaseWalletConnector = class extends Connector {
  constructor({ chains, options }) {
    super({
      chains,
      options: {
        reloadOnDisconnect: false,
        ...options
      }
    });
    __privateAdd(this, _isUserRejectedRequestError);
    this.id = "coinbaseWallet";
    this.name = "Coinbase Wallet";
    this.ready = true;
    __privateAdd(this, _client, void 0);
    __privateAdd(this, _provider, void 0);
    this.onAccountsChanged = (accounts) => {
      if (accounts.length === 0)
        this.emit("disconnect");
      else
        this.emit("change", { account: getAddress(accounts[0]) });
    };
    this.onChainChanged = (chainId) => {
      const id = normalizeChainId(chainId);
      const unsupported = this.isChainUnsupported(id);
      this.emit("change", { chain: { id, unsupported } });
    };
    this.onDisconnect = () => {
      this.emit("disconnect");
    };
  }
  async connect({ chainId } = {}) {
    try {
      const provider = await this.getProvider();
      provider.on("accountsChanged", this.onAccountsChanged);
      provider.on("chainChanged", this.onChainChanged);
      provider.on("disconnect", this.onDisconnect);
      this.emit("message", { type: "connecting" });
      const accounts = await provider.enable();
      const account = getAddress(accounts[0]);
      let id = await this.getChainId();
      let unsupported = this.isChainUnsupported(id);
      if (chainId && id !== chainId) {
        const chain = await this.switchChain(chainId);
        id = chain.id;
        unsupported = this.isChainUnsupported(id);
      }
      return {
        account,
        chain: { id, unsupported },
        provider: new providers.Web3Provider(
          provider
        )
      };
    } catch (error) {
      if (/(user closed modal|accounts received is empty)/i.test(
        error.message
      ))
        throw new UserRejectedRequestError(error);
      throw error;
    }
  }
  async disconnect() {
    if (!__privateGet(this, _provider))
      return;
    const provider = await this.getProvider();
    provider.removeListener("accountsChanged", this.onAccountsChanged);
    provider.removeListener("chainChanged", this.onChainChanged);
    provider.removeListener("disconnect", this.onDisconnect);
    provider.disconnect();
    provider.close();
  }
  async getAccount() {
    const provider = await this.getProvider();
    const accounts = await provider.request({
      method: "eth_accounts"
    });
    return getAddress(accounts[0]);
  }
  async getChainId() {
    const provider = await this.getProvider();
    const chainId = normalizeChainId(provider.chainId);
    return chainId;
  }
  async getProvider() {
    if (!__privateGet(this, _provider)) {
      let CoinbaseWalletSDK = (await import("@coinbase/wallet-sdk")).default;
      if (typeof CoinbaseWalletSDK !== "function" && typeof CoinbaseWalletSDK.default === "function")
        CoinbaseWalletSDK = CoinbaseWalletSDK.default;
      __privateSet(this, _client, new CoinbaseWalletSDK(this.options));
      class WalletProvider {
      }
      class Client {
      }
      const walletExtensionChainId = __privateGet(this, _client).walletExtension?.getChainId();
      const chain = this.chains.find(
        (chain2) => this.options.chainId ? chain2.id === this.options.chainId : chain2.id === walletExtensionChainId
      ) || this.chains[0];
      const chainId = this.options.chainId || chain?.id;
      const jsonRpcUrl = this.options.jsonRpcUrl || chain?.rpcUrls.default;
      __privateSet(this, _provider, __privateGet(this, _client).makeWeb3Provider(jsonRpcUrl, chainId));
    }
    return __privateGet(this, _provider);
  }
  async getSigner({ chainId } = {}) {
    const [provider, account] = await Promise.all([
      this.getProvider(),
      this.getAccount()
    ]);
    return new providers.Web3Provider(
      provider,
      chainId
    ).getSigner(account);
  }
  async isAuthorized() {
    try {
      const account = await this.getAccount();
      return !!account;
    } catch {
      return false;
    }
  }
  async switchChain(chainId) {
    const provider = await this.getProvider();
    const id = hexValue(chainId);
    try {
      await provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: id }]
      });
      return this.chains.find((x) => x.id === chainId) ?? {
        id: chainId,
        name: `Chain ${id}`,
        network: `${id}`,
        rpcUrls: { default: "" }
      };
    } catch (error) {
      const chain = this.chains.find((x) => x.id === chainId);
      if (!chain)
        throw new ChainNotConfiguredError({ chainId, connectorId: this.id });
      if (error.code === 4902) {
        try {
          await provider.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: id,
                chainName: chain.name,
                nativeCurrency: chain.nativeCurrency,
                rpcUrls: [chain.rpcUrls.public ?? chain.rpcUrls.default],
                blockExplorerUrls: this.getBlockExplorerUrls(chain)
              }
            ]
          });
          return chain;
        } catch (addError) {
          if (__privateMethod(this, _isUserRejectedRequestError, isUserRejectedRequestError_fn).call(this, addError))
            throw new UserRejectedRequestError(addError);
          throw new AddChainError();
        }
      }
      if (__privateMethod(this, _isUserRejectedRequestError, isUserRejectedRequestError_fn).call(this, error))
        throw new UserRejectedRequestError(error);
      throw new SwitchChainError(error);
    }
  }
  async watchAsset({
    address,
    decimals = 18,
    image,
    symbol
  }) {
    const provider = await this.getProvider();
    return provider.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20",
        options: {
          address,
          decimals,
          image,
          symbol
        }
      }
    });
  }
};
_client = new WeakMap();
_provider = new WeakMap();
_isUserRejectedRequestError = new WeakSet();
isUserRejectedRequestError_fn = function(error) {
  return /(user rejected)/i.test(error.message);
};
export {
  CoinbaseWalletConnector
};
