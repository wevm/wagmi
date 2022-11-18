import {
  ConnectorNotFoundError,
  InjectedConnector,
  ResourceUnavailableError,
  UserRejectedRequestError,
  getClient
} from "../chunk-2BWSAGQS.js";
import "../chunk-3YHVCSSL.js";
import {
  __privateAdd,
  __privateGet,
  __privateMethod,
  __privateSet
} from "../chunk-MQXBDTVK.js";

// src/connectors/metaMask.ts
var _provider, _UNSTABLE_shimOnConnectSelectAccount, _getReady, getReady_fn, _findProvider, findProvider_fn;
var MetaMaskConnector = class extends InjectedConnector {
  constructor({
    chains,
    options: options_
  } = {}) {
    const options = {
      name: "MetaMask",
      shimDisconnect: true,
      shimChainChangedDisconnect: true,
      ...options_
    };
    super({ chains, options });
    __privateAdd(this, _getReady);
    __privateAdd(this, _findProvider);
    this.id = "metaMask";
    this.ready = typeof window != "undefined" && !!__privateMethod(this, _findProvider, findProvider_fn).call(this, window.ethereum);
    __privateAdd(this, _provider, void 0);
    __privateAdd(this, _UNSTABLE_shimOnConnectSelectAccount, void 0);
    __privateSet(this, _UNSTABLE_shimOnConnectSelectAccount, options.UNSTABLE_shimOnConnectSelectAccount);
  }
  async connect({ chainId } = {}) {
    try {
      const provider = await this.getProvider();
      if (!provider)
        throw new ConnectorNotFoundError();
      if (provider.on) {
        provider.on("accountsChanged", this.onAccountsChanged);
        provider.on("chainChanged", this.onChainChanged);
        provider.on("disconnect", this.onDisconnect);
      }
      this.emit("message", { type: "connecting" });
      if (__privateGet(this, _UNSTABLE_shimOnConnectSelectAccount) && this.options?.shimDisconnect && !getClient().storage?.getItem(this.shimDisconnectKey)) {
        const accounts = await provider.request({
          method: "eth_accounts"
        }).catch(() => []);
        const isConnected = !!accounts[0];
        if (isConnected)
          await provider.request({
            method: "wallet_requestPermissions",
            params: [{ eth_accounts: {} }]
          });
      }
      const account = await this.getAccount();
      let id = await this.getChainId();
      let unsupported = this.isChainUnsupported(id);
      if (chainId && id !== chainId) {
        const chain = await this.switchChain(chainId);
        id = chain.id;
        unsupported = this.isChainUnsupported(id);
      }
      if (this.options?.shimDisconnect)
        getClient().storage?.setItem(this.shimDisconnectKey, true);
      return { account, chain: { id, unsupported }, provider };
    } catch (error) {
      if (this.isUserRejectedRequestError(error))
        throw new UserRejectedRequestError(error);
      if (error.code === -32002)
        throw new ResourceUnavailableError(error);
      throw error;
    }
  }
  async getProvider() {
    if (typeof window !== "undefined") {
      __privateSet(this, _provider, __privateMethod(this, _findProvider, findProvider_fn).call(this, window.ethereum));
    }
    return __privateGet(this, _provider);
  }
};
_provider = new WeakMap();
_UNSTABLE_shimOnConnectSelectAccount = new WeakMap();
_getReady = new WeakSet();
getReady_fn = function(ethereum) {
  const isMetaMask = !!ethereum?.isMetaMask;
  if (!isMetaMask)
    return;
  if (ethereum.isBraveWallet && !ethereum._events && !ethereum._state)
    return;
  if (ethereum.isAvalanche)
    return;
  if (ethereum.isKuCoinWallet)
    return;
  if (ethereum.isPortal)
    return;
  if (ethereum.isTokenPocket)
    return;
  if (ethereum.isTokenary)
    return;
  return ethereum;
};
_findProvider = new WeakSet();
findProvider_fn = function(ethereum) {
  if (ethereum?.providers)
    return ethereum.providers.find(__privateMethod(this, _getReady, getReady_fn));
  return __privateMethod(this, _getReady, getReady_fn).call(this, ethereum);
};
export {
  MetaMaskConnector
};
