import {
  Connector,
  UserRejectedRequestError,
  normalizeChainId
} from "../../chunk-2BWSAGQS.js";
import "../../chunk-3YHVCSSL.js";
import {
  __privateAdd,
  __privateGet,
  __privateMethod,
  __privateSet
} from "../../chunk-MQXBDTVK.js";

// src/connectors/mock/connector.ts
import { getAddress as getAddress2 } from "ethers/lib/utils.js";

// src/connectors/mock/provider.ts
import { providers } from "ethers";
import { getAddress } from "ethers/lib/utils.js";
import { default as EventEmitter } from "eventemitter3";
var _options, _signer;
var MockProvider = class extends providers.BaseProvider {
  constructor(options) {
    super({ name: "Network", chainId: options.chainId ?? 1 });
    this.events = new EventEmitter();
    __privateAdd(this, _options, void 0);
    __privateAdd(this, _signer, void 0);
    __privateSet(this, _options, options);
  }
  async enable() {
    if (__privateGet(this, _options).flags?.failConnect)
      throw new UserRejectedRequestError(new Error("Failed to connect"));
    if (!__privateGet(this, _signer))
      __privateSet(this, _signer, __privateGet(this, _options).signer);
    const address = await __privateGet(this, _signer).getAddress();
    this.events.emit("accountsChanged", [address]);
    return [address];
  }
  async disconnect() {
    this.events.emit("disconnect");
    __privateSet(this, _signer, void 0);
  }
  async getAccounts() {
    const address = await __privateGet(this, _signer)?.getAddress();
    if (!address)
      return [];
    return [getAddress(address)];
  }
  getSigner() {
    const signer = __privateGet(this, _signer);
    if (!signer)
      throw new Error("Signer not found");
    return signer;
  }
  async switchChain(chainId) {
    if (__privateGet(this, _options).flags?.failSwitchChain)
      throw new UserRejectedRequestError(new Error("Failed to switch chain"));
    __privateGet(this, _options).chainId = chainId;
    this.network.chainId = chainId;
    this.events.emit("chainChanged", chainId);
  }
  async watchAsset(_asset) {
    return true;
  }
  on(event, listener) {
    this.events.on(event, listener);
    return this;
  }
  once(event, listener) {
    this.events.once(event, listener);
    return this;
  }
  removeListener(event, listener) {
    this.events.removeListener(event, listener);
    return this;
  }
  off(event, listener) {
    this.events.off(event, listener);
    return this;
  }
  toJSON() {
    return "<MockProvider>";
  }
};
_options = new WeakMap();
_signer = new WeakMap();

// src/connectors/mock/connector.ts
var _provider, _switchChain, switchChain_fn;
var MockConnector = class extends Connector {
  constructor(config) {
    super(config);
    __privateAdd(this, _switchChain);
    this.id = "mock";
    this.name = "Mock";
    this.ready = true;
    __privateAdd(this, _provider, void 0);
    this.onAccountsChanged = (accounts) => {
      if (accounts.length === 0)
        this.emit("disconnect");
      else
        this.emit("change", { account: getAddress2(accounts[0]) });
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
    const provider = await this.getProvider({ chainId });
    provider.on("accountsChanged", this.onAccountsChanged);
    provider.on("chainChanged", this.onChainChanged);
    provider.on("disconnect", this.onDisconnect);
    this.emit("message", { type: "connecting" });
    const accounts = await provider.enable();
    const account = getAddress2(accounts[0]);
    const id = normalizeChainId(provider._network.chainId);
    const unsupported = this.isChainUnsupported(id);
    const data = { account, chain: { id, unsupported }, provider };
    if (!this.options.flags?.noSwitchChain)
      this.switchChain = __privateMethod(this, _switchChain, switchChain_fn);
    return new Promise(
      (res) => setTimeout(() => res(data), 100)
    );
  }
  async disconnect() {
    const provider = await this.getProvider();
    await provider.disconnect();
    provider.removeListener("accountsChanged", this.onAccountsChanged);
    provider.removeListener("chainChanged", this.onChainChanged);
    provider.removeListener("disconnect", this.onDisconnect);
  }
  async getAccount() {
    const provider = await this.getProvider();
    const accounts = await provider.getAccounts();
    const account = accounts[0];
    if (!account)
      throw new Error("Failed to get account");
    return getAddress2(account);
  }
  async getChainId() {
    const provider = await this.getProvider();
    return normalizeChainId(provider.network.chainId);
  }
  async getProvider({ chainId } = {}) {
    if (!__privateGet(this, _provider) || chainId)
      __privateSet(this, _provider, new MockProvider({ ...this.options, chainId }));
    return __privateGet(this, _provider);
  }
  async getSigner() {
    const provider = await this.getProvider();
    return provider.getSigner();
  }
  async isAuthorized() {
    try {
      const provider = await this.getProvider();
      const account = await provider.getAccounts();
      return this.options.flags?.isAuthorized ?? !!account;
    } catch {
      return false;
    }
  }
  async watchAsset(asset) {
    const provider = await this.getProvider();
    return provider.watchAsset(asset);
  }
  toJSON() {
    return "<MockConnector>";
  }
};
_provider = new WeakMap();
_switchChain = new WeakSet();
switchChain_fn = async function(chainId) {
  const provider = await this.getProvider();
  await provider.switchChain(chainId);
  return this.chains.find((x) => x.id === chainId) ?? {
    id: chainId,
    name: `Chain ${chainId}`,
    network: `${chainId}`,
    rpcUrls: { default: "" }
  };
};
export {
  MockConnector,
  MockProvider
};
