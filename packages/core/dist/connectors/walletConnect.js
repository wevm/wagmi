import {
  Connector,
  SwitchChainError,
  UserRejectedRequestError,
  getClient,
  normalizeChainId
} from "../chunk-2BWSAGQS.js";
import "../chunk-3YHVCSSL.js";
import {
  __privateAdd,
  __privateGet,
  __privateMethod,
  __privateSet
} from "../chunk-MQXBDTVK.js";

// src/connectors/walletConnect.ts
import { providers } from "ethers";
import { getAddress, hexValue } from "ethers/lib/utils.js";
var switchChainAllowedRegex = /(imtoken|metamask|rainbow|trust wallet)/i;
var _provider, _switchChain, switchChain_fn;
var WalletConnectConnector = class extends Connector {
  constructor(config) {
    super(config);
    __privateAdd(this, _switchChain);
    this.id = "walletConnect";
    this.name = "WalletConnect";
    this.ready = true;
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
      let targetChainId = chainId;
      if (!targetChainId) {
        const lastUsedChainId = getClient().lastUsedChainId;
        if (lastUsedChainId && !this.isChainUnsupported(lastUsedChainId))
          targetChainId = lastUsedChainId;
      }
      const provider = await this.getProvider({
        chainId: targetChainId,
        create: true
      });
      provider.on("accountsChanged", this.onAccountsChanged);
      provider.on("chainChanged", this.onChainChanged);
      provider.on("disconnect", this.onDisconnect);
      setTimeout(() => this.emit("message", { type: "connecting" }), 0);
      const accounts = await provider.enable();
      const account = getAddress(accounts[0]);
      const id = await this.getChainId();
      const unsupported = this.isChainUnsupported(id);
      const walletName = provider.connector?.peerMeta?.name ?? "";
      if (switchChainAllowedRegex.test(walletName))
        this.switchChain = __privateMethod(this, _switchChain, switchChain_fn);
      return {
        account,
        chain: { id, unsupported },
        provider: new providers.Web3Provider(
          provider
        )
      };
    } catch (error) {
      if (/user closed modal/i.test(error.message))
        throw new UserRejectedRequestError(error);
      throw error;
    }
  }
  async disconnect() {
    const provider = await this.getProvider();
    await provider.disconnect();
    provider.removeListener("accountsChanged", this.onAccountsChanged);
    provider.removeListener("chainChanged", this.onChainChanged);
    provider.removeListener("disconnect", this.onDisconnect);
    typeof localStorage !== "undefined" && localStorage.removeItem("walletconnect");
  }
  async getAccount() {
    const provider = await this.getProvider();
    const accounts = provider.accounts;
    return getAddress(accounts[0]);
  }
  async getChainId() {
    const provider = await this.getProvider();
    const chainId = normalizeChainId(provider.chainId);
    return chainId;
  }
  async getProvider({
    chainId,
    create
  } = {}) {
    if (!__privateGet(this, _provider) || chainId || create) {
      const rpc = !this.options?.infuraId ? this.chains.reduce(
        (rpc2, chain) => ({ ...rpc2, [chain.id]: chain.rpcUrls.default }),
        {}
      ) : {};
      const WalletConnectProvider = (await import("@walletconnect/ethereum-provider")).default;
      __privateSet(this, _provider, new WalletConnectProvider({
        ...this.options,
        chainId,
        rpc: { ...rpc, ...this.options?.rpc }
      }));
    }
    return __privateGet(this, _provider);
  }
  async getSigner({ chainId } = {}) {
    const [provider, account] = await Promise.all([
      this.getProvider({ chainId }),
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
};
_provider = new WeakMap();
_switchChain = new WeakSet();
switchChain_fn = async function(chainId) {
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
    const message = typeof error === "string" ? error : error?.message;
    if (/user rejected request/i.test(message))
      throw new UserRejectedRequestError(error);
    throw new SwitchChainError(error);
  }
};
export {
  WalletConnectConnector
};
