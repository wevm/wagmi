// src/client.ts
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createClient as createCoreClient } from "@wagmi/core";

// src/utils/deserialize.ts
import { BigNumber } from "ethers";
var findAndReplace = (cacheRef, {
  find,
  replace
}) => {
  if (cacheRef && find(cacheRef)) {
    return replace(cacheRef);
  }
  if (typeof cacheRef !== "object") {
    return cacheRef;
  }
  if (Array.isArray(cacheRef)) {
    return cacheRef.map((item) => findAndReplace(item, { find, replace }));
  }
  if (cacheRef instanceof Object) {
    return Object.entries(cacheRef).reduce(
      (curr, [key, value]) => ({
        ...curr,
        [key]: findAndReplace(value, { find, replace })
      }),
      {}
    );
  }
  return cacheRef;
};
function deserialize(cachedString) {
  const cache = JSON.parse(cachedString);
  const deserializedCacheWithBigNumbers = findAndReplace(cache, {
    find: (data) => data.type === "BigNumber",
    replace: (data) => BigNumber.from(data.hex)
  });
  return deserializedCacheWithBigNumbers;
}

// src/utils/serialize.ts
function getReferenceKey(keys, cutoff) {
  return keys.slice(0, cutoff).join(".") || ".";
}
function getCutoff(array, value) {
  const { length } = array;
  for (let index = 0; index < length; ++index) {
    if (array[index] === value) {
      return index + 1;
    }
  }
  return 0;
}
function createReplacer(replacer, circularReplacer) {
  const hasReplacer = typeof replacer === "function";
  const hasCircularReplacer = typeof circularReplacer === "function";
  const cache = [];
  const keys = [];
  return function replace(key, value) {
    if (typeof value === "object") {
      if (cache.length) {
        const thisCutoff = getCutoff(cache, this);
        if (thisCutoff === 0) {
          cache[cache.length] = this;
        } else {
          cache.splice(thisCutoff);
          keys.splice(thisCutoff);
        }
        keys[keys.length] = key;
        const valueCutoff = getCutoff(cache, value);
        if (valueCutoff !== 0) {
          return hasCircularReplacer ? circularReplacer.call(
            this,
            key,
            value,
            getReferenceKey(keys, valueCutoff)
          ) : `[ref=${getReferenceKey(keys, valueCutoff)}]`;
        }
      } else {
        cache[0] = value;
        keys[0] = key;
      }
    }
    return hasReplacer ? replacer.call(this, key, value) : value;
  };
}
function serialize(value, replacer, indent, circularReplacer) {
  return JSON.stringify(
    value,
    createReplacer(replacer, circularReplacer),
    indent ?? void 0
  );
}

// src/client.ts
function createClient({
  queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        cacheTime: 1e3 * 60 * 60 * 24,
        networkMode: "offlineFirst",
        refetchOnWindowFocus: false,
        retry: 0
      },
      mutations: {
        networkMode: "offlineFirst"
      }
    }
  }),
  persister = typeof window !== "undefined" ? createSyncStoragePersister({
    key: "wagmi.cache",
    storage: window.localStorage,
    serialize,
    deserialize
  }) : void 0,
  ...config
}) {
  const client = createCoreClient(config);
  if (persister)
    persistQueryClient({
      queryClient,
      persister,
      dehydrateOptions: {
        shouldDehydrateQuery: (query) => query.cacheTime !== 0 && query.queryKey[0].persist !== false
      }
    });
  return Object.assign(client, { queryClient });
}

// src/context.ts
import { QueryClientProvider } from "@tanstack/react-query";
import * as React from "react";
var Context = React.createContext(void 0);
var queryClientContext = React.createContext(
  void 0
);
function WagmiConfig({
  children,
  client
}) {
  return React.createElement(Context.Provider, {
    children: React.createElement(QueryClientProvider, {
      children,
      client: client.queryClient,
      context: queryClientContext
    }),
    value: client
  });
}
function useClient() {
  const client = React.useContext(Context);
  if (!client)
    throw new Error(
      [
        "`useClient` must be used within `WagmiConfig`.\n",
        "Read more: https://wagmi.sh/docs/WagmiConfig"
      ].join("\n")
    );
  return client;
}

// src/hooks/accounts/useAccount.ts
import { getAccount, watchAccount } from "@wagmi/core";
import * as React7 from "react";

// src/hooks/utils/query/useBaseQuery.ts
import {
  notifyManager,
  useIsRestoring,
  useQueryClient,
  useQueryErrorResetBoundary
} from "@tanstack/react-query";
import * as React2 from "react";

// src/hooks/utils/useSyncExternalStore.ts
import * as pkg from "use-sync-external-store/shim/index.js";
var useSyncExternalStore2 = pkg.useSyncExternalStore;

// src/hooks/utils/query/utils.ts
function isQueryKey(value) {
  return Array.isArray(value);
}
function parseQueryArgs(arg1, arg2, arg3) {
  if (!isQueryKey(arg1)) {
    return arg1;
  }
  if (typeof arg2 === "function") {
    return { ...arg3, queryKey: arg1, queryFn: arg2 };
  }
  return { ...arg2, queryKey: arg1 };
}
function shouldThrowError(_useErrorBoundary, params) {
  if (typeof _useErrorBoundary === "function") {
    return _useErrorBoundary(...params);
  }
  return !!_useErrorBoundary;
}
function trackResult(result, observer) {
  const trackedResult = {};
  Object.keys(result).forEach((key) => {
    Object.defineProperty(trackedResult, key, {
      configurable: false,
      enumerable: true,
      get: () => {
        observer.trackedProps.add(key);
        return result[key];
      }
    });
  });
  return trackedResult;
}

// src/hooks/utils/query/useBaseQuery.ts
function useBaseQuery(options, Observer) {
  const queryClient = useQueryClient({ context: options.context });
  const isRestoring = useIsRestoring();
  const errorResetBoundary = useQueryErrorResetBoundary();
  const defaultedOptions = queryClient.defaultQueryOptions(options);
  defaultedOptions._optimisticResults = isRestoring ? "isRestoring" : "optimistic";
  if (defaultedOptions.onError) {
    defaultedOptions.onError = notifyManager.batchCalls(
      defaultedOptions.onError
    );
  }
  if (defaultedOptions.onSuccess) {
    defaultedOptions.onSuccess = notifyManager.batchCalls(
      defaultedOptions.onSuccess
    );
  }
  if (defaultedOptions.onSettled) {
    defaultedOptions.onSettled = notifyManager.batchCalls(
      defaultedOptions.onSettled
    );
  }
  if (defaultedOptions.suspense) {
    if (typeof defaultedOptions.staleTime !== "number") {
      defaultedOptions.staleTime = 1e3;
    }
  }
  if (defaultedOptions.suspense || defaultedOptions.useErrorBoundary) {
    if (!errorResetBoundary.isReset()) {
      defaultedOptions.retryOnMount = false;
    }
  }
  const [observer] = React2.useState(
    () => new Observer(
      queryClient,
      defaultedOptions
    )
  );
  const result = observer.getOptimisticResult(defaultedOptions);
  useSyncExternalStore2(
    React2.useCallback(
      (onStoreChange) => isRestoring ? () => void 0 : observer.subscribe(notifyManager.batchCalls(onStoreChange)),
      [observer, isRestoring]
    ),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult()
  );
  React2.useEffect(() => {
    errorResetBoundary.clearReset();
  }, [errorResetBoundary]);
  React2.useEffect(() => {
    observer.setOptions(defaultedOptions, { listeners: false });
  }, [defaultedOptions, observer]);
  if (defaultedOptions.suspense && result.isLoading && result.isFetching && !isRestoring) {
    throw observer.fetchOptimistic(defaultedOptions).then(({ data }) => {
      defaultedOptions.onSuccess?.(data);
      defaultedOptions.onSettled?.(data, null);
    }).catch((error) => {
      errorResetBoundary.clearReset();
      defaultedOptions.onError?.(error);
      defaultedOptions.onSettled?.(void 0, error);
    });
  }
  if (result.isError && !errorResetBoundary.isReset() && !result.isFetching && shouldThrowError(defaultedOptions.useErrorBoundary, [
    result.error,
    observer.getCurrentQuery()
  ])) {
    throw result.error;
  }
  const status = result.status === "loading" && result.fetchStatus === "idle" ? "idle" : result.status;
  const isIdle = status === "idle";
  const isLoading = status === "loading" && result.fetchStatus === "fetching";
  return {
    ...result,
    defaultedOptions,
    isIdle,
    isLoading,
    observer,
    status
  };
}

// src/hooks/utils/query/useInfiniteQuery.ts
import { InfiniteQueryObserver } from "@tanstack/react-query";
function useInfiniteQuery(arg1, arg2, arg3) {
  const parsedOptions = parseQueryArgs(arg1, arg2, arg3);
  const baseQuery = useBaseQuery(
    { context: queryClientContext, ...parsedOptions },
    InfiniteQueryObserver
  );
  const result = {
    data: baseQuery.data,
    error: baseQuery.error,
    fetchNextPage: baseQuery.fetchNextPage,
    fetchStatus: baseQuery.fetchStatus,
    hasNextPage: baseQuery.hasNextPage,
    isError: baseQuery.isError,
    isFetched: baseQuery.isFetched,
    isFetchedAfterMount: baseQuery.isFetchedAfterMount,
    isFetching: baseQuery.isFetching,
    isFetchingNextPage: baseQuery.isFetchingNextPage,
    isIdle: baseQuery.isIdle,
    isLoading: baseQuery.isLoading,
    isRefetching: baseQuery.isRefetching,
    isSuccess: baseQuery.isSuccess,
    refetch: baseQuery.refetch,
    status: baseQuery.status,
    internal: {
      dataUpdatedAt: baseQuery.dataUpdatedAt,
      errorUpdatedAt: baseQuery.errorUpdatedAt,
      failureCount: baseQuery.failureCount,
      isFetchedAfterMount: baseQuery.isFetchedAfterMount,
      isLoadingError: baseQuery.isLoadingError,
      isPaused: baseQuery.isPaused,
      isPlaceholderData: baseQuery.isPlaceholderData,
      isPreviousData: baseQuery.isPreviousData,
      isRefetchError: baseQuery.isRefetchError,
      isStale: baseQuery.isStale,
      remove: baseQuery.remove
    }
  };
  return !baseQuery.defaultedOptions.notifyOnChangeProps ? trackResult(result, baseQuery.observer) : result;
}

// src/hooks/utils/query/useMutation.ts
import {
  parseMutationArgs,
  useMutation as useMutation_
} from "@tanstack/react-query";
function useMutation(arg1, arg2, arg3) {
  const options = parseMutationArgs(arg1, arg2, arg3);
  return useMutation_({ context: queryClientContext, ...options });
}

// src/hooks/utils/query/useQuery.ts
import { QueryObserver } from "@tanstack/react-query";
function useQuery(arg1, arg2, arg3) {
  const parsedOptions = parseQueryArgs(arg1, arg2, arg3);
  const baseQuery = useBaseQuery({ context: queryClientContext, ...parsedOptions }, QueryObserver);
  const result = {
    data: baseQuery.data,
    error: baseQuery.error,
    fetchStatus: baseQuery.fetchStatus,
    isError: baseQuery.isError,
    isFetched: baseQuery.isFetched,
    isFetchedAfterMount: baseQuery.isFetchedAfterMount,
    isFetching: baseQuery.isFetching,
    isIdle: baseQuery.isIdle,
    isLoading: baseQuery.isLoading,
    isRefetching: baseQuery.isRefetching,
    isSuccess: baseQuery.isSuccess,
    refetch: baseQuery.refetch,
    status: baseQuery.status,
    internal: {
      dataUpdatedAt: baseQuery.dataUpdatedAt,
      errorUpdatedAt: baseQuery.errorUpdatedAt,
      failureCount: baseQuery.failureCount,
      isFetchedAfterMount: baseQuery.isFetchedAfterMount,
      isLoadingError: baseQuery.isLoadingError,
      isPaused: baseQuery.isPaused,
      isPlaceholderData: baseQuery.isPlaceholderData,
      isPreviousData: baseQuery.isPreviousData,
      isRefetchError: baseQuery.isRefetchError,
      isStale: baseQuery.isStale,
      remove: baseQuery.remove
    }
  };
  return !baseQuery.defaultedOptions.notifyOnChangeProps ? trackResult(result, baseQuery.observer) : result;
}

// src/hooks/utils/query/useQueryClient.ts
import { useQueryClient as useQueryClient_ } from "@tanstack/react-query";
var useQueryClient2 = () => useQueryClient_({ context: queryClientContext });

// src/hooks/providers/useProvider.ts
import { getProvider, watchProvider } from "@wagmi/core";
import { useSyncExternalStoreWithSelector } from "use-sync-external-store/shim/with-selector.js";
function useProvider({
  chainId: chainId2
} = {}) {
  return useSyncExternalStoreWithSelector(
    (cb) => watchProvider({ chainId: chainId2 }, cb),
    () => getProvider({ chainId: chainId2 }),
    () => getProvider({ chainId: chainId2 }),
    (x) => x,
    (a, b) => a.network.chainId === b.network.chainId
  );
}

// src/hooks/providers/useWebSocketProvider.ts
import { getWebSocketProvider, watchWebSocketProvider } from "@wagmi/core";
import { useSyncExternalStoreWithSelector as useSyncExternalStoreWithSelector2 } from "use-sync-external-store/shim/with-selector.js";
function useWebSocketProvider({ chainId: chainId2 } = {}) {
  return useSyncExternalStoreWithSelector2(
    (cb) => watchWebSocketProvider({ chainId: chainId2 }, cb),
    () => getWebSocketProvider({ chainId: chainId2 }),
    () => getWebSocketProvider({ chainId: chainId2 }),
    (x) => x,
    (a, b) => a?.network.chainId === b?.network.chainId
  );
}

// src/hooks/utils/useChainId.ts
function useChainId({ chainId: chainId2 } = {}) {
  const provider = useProvider({ chainId: chainId2 });
  return provider.network.chainId;
}

// src/hooks/utils/useForceUpdate.ts
import * as React3 from "react";
function useForceUpdate() {
  const [, forceUpdate] = React3.useReducer((x) => x + 1, 0);
  return forceUpdate;
}

// src/hooks/network-status/useBlockNumber.ts
import { fetchBlockNumber } from "@wagmi/core";
import { debounce } from "@wagmi/core/internal";
import * as React4 from "react";
function queryKey({ chainId: chainId2, scopeKey }) {
  return [{ entity: "blockNumber", chainId: chainId2, scopeKey }];
}
function queryFn({
  queryKey: [{ chainId: chainId2 }]
}) {
  return fetchBlockNumber({ chainId: chainId2 });
}
function useBlockNumber({
  cacheTime = 0,
  chainId: chainId_,
  enabled = true,
  scopeKey,
  staleTime,
  suspense,
  watch = false,
  onBlock,
  onError,
  onSettled,
  onSuccess
} = {}) {
  const chainId2 = useChainId({ chainId: chainId_ });
  const provider = useProvider({ chainId: chainId2 });
  const webSocketProvider = useWebSocketProvider({ chainId: chainId2 });
  const queryClient = useQueryClient2();
  React4.useEffect(() => {
    if (!watch && !onBlock)
      return;
    const listener = debounce((blockNumber) => {
      if (watch)
        queryClient.setQueryData(queryKey({ chainId: chainId2, scopeKey }), blockNumber);
      if (onBlock)
        onBlock(blockNumber);
    }, 1);
    const provider_ = webSocketProvider ?? provider;
    provider_.on("block", listener);
    return () => {
      provider_.off("block", listener);
    };
  }, [
    chainId2,
    scopeKey,
    onBlock,
    provider,
    queryClient,
    watch,
    webSocketProvider
  ]);
  return useQuery(queryKey({ scopeKey, chainId: chainId2 }), queryFn, {
    cacheTime,
    enabled,
    staleTime,
    suspense,
    onError,
    onSettled,
    onSuccess
  });
}

// src/hooks/network-status/useFeeData.ts
import { fetchFeeData } from "@wagmi/core";
import * as React5 from "react";
function queryKey2({
  chainId: chainId2,
  formatUnits,
  scopeKey
}) {
  return [{ entity: "feeData", chainId: chainId2, formatUnits, scopeKey }];
}
function queryFn2({
  queryKey: [{ chainId: chainId2, formatUnits }]
}) {
  return fetchFeeData({ chainId: chainId2, formatUnits });
}
function useFeeData({
  cacheTime,
  chainId: chainId_,
  enabled = true,
  formatUnits = "wei",
  scopeKey,
  staleTime,
  suspense,
  watch,
  onError,
  onSettled,
  onSuccess
} = {}) {
  const chainId2 = useChainId({ chainId: chainId_ });
  const queryKey_ = React5.useMemo(
    () => queryKey2({
      chainId: chainId2,
      formatUnits,
      scopeKey
    }),
    [chainId2, formatUnits, scopeKey]
  );
  const feeDataQuery = useQuery(queryKey_, queryFn2, {
    cacheTime,
    enabled,
    staleTime,
    suspense,
    onError,
    onSettled,
    onSuccess
  });
  useInvalidateOnBlock({
    chainId: chainId2,
    enabled: enabled && watch,
    queryKey: queryKey_
  });
  return feeDataQuery;
}

// src/hooks/utils/useInvalidateOnBlock.ts
function useInvalidateOnBlock({
  chainId: chainId2,
  enabled,
  queryKey: queryKey17
}) {
  const queryClient = useQueryClient2();
  useBlockNumber({
    chainId: chainId2,
    onBlock: enabled ? () => queryClient.invalidateQueries(queryKey17) : void 0,
    scopeKey: enabled ? void 0 : "idle"
  });
}

// src/hooks/utils/useSyncExternalStoreWithTracked.ts
import { deepEqual } from "@wagmi/core";
import * as React6 from "react";
import { useSyncExternalStoreWithSelector as useSyncExternalStoreWithSelector3 } from "use-sync-external-store/shim/with-selector.js";
var isPlainObject = (obj) => typeof obj === "object" && !Array.isArray(obj);
function useSyncExternalStoreWithTracked(subscribe, getSnapshot, getServerSnapshot = getSnapshot, isEqual = deepEqual) {
  const trackedKeys = React6.useRef([]);
  const result = useSyncExternalStoreWithSelector3(
    subscribe,
    getSnapshot,
    getServerSnapshot,
    (x) => x,
    (a, b) => {
      if (isPlainObject(a) && isPlainObject(b)) {
        for (const key of trackedKeys.current) {
          const equal = isEqual(
            a[key],
            b[key]
          );
          if (!equal)
            return false;
        }
        return true;
      }
      return isEqual(a, b);
    }
  );
  if (isPlainObject(result)) {
    const trackedResult = { ...result };
    Object.defineProperties(
      trackedResult,
      Object.entries(trackedResult).reduce(
        (res, [key, value]) => {
          return {
            ...res,
            [key]: {
              configurable: false,
              enumerable: true,
              get: () => {
                if (!trackedKeys.current.includes(key)) {
                  trackedKeys.current.push(key);
                }
                return value;
              }
            }
          };
        },
        {}
      )
    );
    return trackedResult;
  }
  return result;
}

// src/hooks/accounts/useAccount.ts
function useAccount({ onConnect, onDisconnect } = {}) {
  const account = useSyncExternalStoreWithTracked(watchAccount, getAccount);
  const previousAccountRef = React7.useRef();
  const previousAccount = previousAccountRef.current ?? {};
  if (!!onConnect && (previousAccount.status !== "connected" || previousAccount.status === void 0) && account.status === "connected")
    onConnect({
      address: account.address,
      connector: account.connector,
      isReconnected: previousAccount.status === "reconnecting" || previousAccount.status === void 0
    });
  if (!!onDisconnect && previousAccount.status === "connected" && account.status === "disconnected")
    onDisconnect();
  previousAccountRef.current = account;
  return account;
}

// src/hooks/accounts/useBalance.ts
import { fetchBalance } from "@wagmi/core";
import * as React8 from "react";
function queryKey3({
  address,
  chainId: chainId2,
  formatUnits,
  scopeKey,
  token
}) {
  return [
    {
      entity: "balance",
      address,
      chainId: chainId2,
      formatUnits,
      scopeKey,
      token
    }
  ];
}
function queryFn3({
  queryKey: [{ address, chainId: chainId2, formatUnits, token }]
}) {
  if (!address)
    throw new Error("address is required");
  return fetchBalance({ address, chainId: chainId2, formatUnits, token });
}
function useBalance({
  address,
  cacheTime,
  chainId: chainId_,
  enabled = true,
  formatUnits,
  scopeKey,
  staleTime,
  suspense,
  token,
  watch,
  onError,
  onSettled,
  onSuccess
} = {}) {
  const chainId2 = useChainId({ chainId: chainId_ });
  const queryKey_ = React8.useMemo(
    () => queryKey3({ address, chainId: chainId2, formatUnits, scopeKey, token }),
    [address, chainId2, formatUnits, scopeKey, token]
  );
  const balanceQuery = useQuery(queryKey_, queryFn3, {
    cacheTime,
    enabled: Boolean(enabled && address),
    staleTime,
    suspense,
    onError,
    onSettled,
    onSuccess
  });
  useInvalidateOnBlock({
    chainId: chainId2,
    enabled: Boolean(enabled && watch && address),
    queryKey: queryKey_
  });
  return balanceQuery;
}

// src/hooks/accounts/useConnect.ts
import { connect } from "@wagmi/core";
import * as React9 from "react";
var mutationKey = (args) => [{ entity: "connect", ...args }];
var mutationFn = (args) => {
  const { connector, chainId: chainId2 } = args;
  if (!connector)
    throw new Error("connector is required");
  return connect({ connector, chainId: chainId2 });
};
function useConnect({
  chainId: chainId2,
  connector,
  onError,
  onMutate,
  onSettled,
  onSuccess
} = {}) {
  const client = useClient();
  const {
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    mutate,
    mutateAsync,
    reset,
    status,
    variables
  } = useMutation(mutationKey({ connector, chainId: chainId2 }), mutationFn, {
    onError,
    onMutate,
    onSettled,
    onSuccess
  });
  const connect2 = React9.useCallback(
    (args) => {
      return mutate({
        chainId: args?.chainId ?? chainId2,
        connector: args?.connector ?? connector
      });
    },
    [chainId2, connector, mutate]
  );
  const connectAsync = React9.useCallback(
    (args) => {
      return mutateAsync({
        chainId: args?.chainId ?? chainId2,
        connector: args?.connector ?? connector
      });
    },
    [chainId2, connector, mutateAsync]
  );
  return {
    connect: connect2,
    connectAsync,
    connectors: client.connectors,
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    pendingConnector: variables?.connector,
    reset,
    status,
    variables
  };
}

// src/hooks/accounts/useDisconnect.ts
import { disconnect } from "@wagmi/core";
var mutationKey2 = [{ entity: "disconnect" }];
var mutationFn2 = () => disconnect();
function useDisconnect({
  onError,
  onMutate,
  onSettled,
  onSuccess
} = {}) {
  const {
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    mutate: disconnect2,
    mutateAsync: disconnectAsync,
    reset,
    status
  } = useMutation(mutationKey2, mutationFn2, {
    ...onError ? {
      onError(error2, _variables, context) {
        onError(error2, context);
      }
    } : {},
    onMutate,
    ...onSettled ? {
      onSettled(_data, error2, _variables, context) {
        onSettled(error2, context);
      }
    } : {},
    ...onSuccess ? {
      onSuccess(_data, _variables, context) {
        onSuccess(context);
      }
    } : {}
  });
  return {
    disconnect: disconnect2,
    disconnectAsync,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    reset,
    status
  };
}

// src/hooks/accounts/useNetwork.ts
import { getNetwork, watchNetwork } from "@wagmi/core";
function useNetwork() {
  return useSyncExternalStoreWithTracked(watchNetwork, getNetwork);
}

// src/hooks/accounts/useSigner.ts
import { fetchSigner, watchSigner } from "@wagmi/core";
import * as React10 from "react";
function queryKey4({ chainId: chainId2 }) {
  return [{ entity: "signer", chainId: chainId2, persist: false }];
}
function queryFn4({
  queryKey: [{ chainId: chainId2 }]
}) {
  return fetchSigner({ chainId: chainId2 });
}
function useSigner({
  chainId: chainId_,
  suspense,
  onError,
  onSettled,
  onSuccess
} = {}) {
  const chainId2 = useChainId({ chainId: chainId_ });
  const signerQuery = useQuery(queryKey4({ chainId: chainId2 }), queryFn4, {
    cacheTime: 0,
    staleTime: Infinity,
    suspense,
    onError,
    onSettled,
    onSuccess
  });
  const queryClient = useQueryClient2();
  React10.useEffect(() => {
    const unwatch = watchSigner(
      { chainId: chainId2 },
      (signer) => queryClient.setQueryData(queryKey4({ chainId: chainId2 }), signer)
    );
    return unwatch;
  }, [queryClient, chainId2]);
  return signerQuery;
}

// src/hooks/accounts/useSignMessage.ts
import { signMessage } from "@wagmi/core";
import * as React11 from "react";
var mutationKey3 = (args) => [{ entity: "signMessage", ...args }];
var mutationFn3 = (args) => {
  const { message } = args;
  if (!message)
    throw new Error("message is required");
  return signMessage({ message });
};
function useSignMessage({
  message,
  onError,
  onMutate,
  onSettled,
  onSuccess
} = {}) {
  const {
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    mutate,
    mutateAsync,
    reset,
    status,
    variables
  } = useMutation(mutationKey3({ message }), mutationFn3, {
    onError,
    onMutate,
    onSettled,
    onSuccess
  });
  const signMessage2 = React11.useCallback(
    (args) => mutate(args || { message }),
    [message, mutate]
  );
  const signMessageAsync = React11.useCallback(
    (args) => mutateAsync(args || { message }),
    [message, mutateAsync]
  );
  return {
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    reset,
    signMessage: signMessage2,
    signMessageAsync,
    status,
    variables
  };
}

// src/hooks/accounts/useSignTypedData.ts
import { signTypedData } from "@wagmi/core";
import * as React12 from "react";
function mutationKey4({
  domain,
  types,
  value
}) {
  return [{ entity: "signTypedData", domain, types, value }];
}
function mutationFn4(args) {
  const { domain, types, value } = args;
  if (!domain)
    throw new Error("domain is required");
  if (!types)
    throw new Error("types is required");
  if (!value)
    throw new Error("value is required");
  return signTypedData({
    domain,
    types,
    value
  });
}
function useSignTypedData({
  domain,
  types,
  value,
  onError,
  onMutate,
  onSettled,
  onSuccess
} = {}) {
  const {
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    mutate,
    mutateAsync,
    reset,
    status,
    variables
  } = useMutation(
    mutationKey4({
      domain,
      types,
      value
    }),
    mutationFn4,
    {
      onError,
      onMutate,
      onSettled,
      onSuccess
    }
  );
  const signTypedData2 = React12.useCallback(
    (args) => mutate({
      domain: args?.domain ?? domain,
      types: args?.types ?? types,
      value: args?.value ?? value
    }),
    [domain, types, value, mutate]
  );
  const signTypedDataAsync = React12.useCallback(
    (args) => mutateAsync({
      domain: args?.domain ?? domain,
      types: args?.types ?? types,
      value: args?.value ?? value
    }),
    [domain, types, value, mutateAsync]
  );
  return {
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    reset,
    signTypedData: signTypedData2,
    signTypedDataAsync,
    status,
    variables
  };
}

// src/hooks/accounts/useSwitchNetwork.ts
import { switchNetwork } from "@wagmi/core";
import * as React13 from "react";
var mutationKey5 = (args) => [{ entity: "switchNetwork", ...args }];
var mutationFn5 = (args) => {
  const { chainId: chainId2 } = args;
  if (!chainId2)
    throw new Error("chainId is required");
  return switchNetwork({ chainId: chainId2 });
};
function useSwitchNetwork({
  chainId: chainId2,
  throwForSwitchChainNotSupported,
  onError,
  onMutate,
  onSettled,
  onSuccess
} = {}) {
  const client = useClient();
  const forceUpdate = useForceUpdate();
  const {
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    mutate,
    mutateAsync,
    reset,
    status,
    variables
  } = useMutation(mutationKey5({ chainId: chainId2 }), mutationFn5, {
    onError,
    onMutate,
    onSettled,
    onSuccess
  });
  const switchNetwork_ = React13.useCallback(
    (chainId_) => mutate({ chainId: chainId_ ?? chainId2 }),
    [chainId2, mutate]
  );
  const switchNetworkAsync_ = React13.useCallback(
    (chainId_) => mutateAsync({ chainId: chainId_ ?? chainId2 }),
    [chainId2, mutateAsync]
  );
  React13.useEffect(() => {
    const unwatch = client.subscribe(
      ({ chains, connector }) => ({
        chains,
        connector
      }),
      forceUpdate
    );
    return unwatch;
  }, [client, forceUpdate]);
  let switchNetwork2;
  let switchNetworkAsync;
  const supportsSwitchChain = !!client.connector?.switchChain;
  if (throwForSwitchChainNotSupported || supportsSwitchChain) {
    switchNetwork2 = switchNetwork_;
    switchNetworkAsync = switchNetworkAsync_;
  }
  return {
    chains: client.chains ?? [],
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    pendingChainId: variables?.chainId,
    reset,
    status,
    switchNetwork: switchNetwork2,
    switchNetworkAsync,
    variables
  };
}

// src/hooks/contracts/useContract.ts
import { getContract } from "@wagmi/core";
import * as React14 from "react";
function useContract({
  address,
  abi,
  signerOrProvider
} = {}) {
  return React14.useMemo(() => {
    if (!address || !abi)
      return null;
    return getContract({
      address,
      abi,
      signerOrProvider: signerOrProvider === null ? void 0 : signerOrProvider
    });
  }, [address, abi, signerOrProvider]);
}

// src/hooks/contracts/useContractEvent.ts
import * as React15 from "react";
function useContractEvent({
  address,
  chainId: chainId2,
  abi,
  listener,
  eventName,
  once
} = {}) {
  const provider = useProvider({ chainId: chainId2 });
  const webSocketProvider = useWebSocketProvider({ chainId: chainId2 });
  const contract = useContract({
    address,
    abi,
    signerOrProvider: webSocketProvider ?? provider
  });
  const callbackRef = React15.useRef(listener);
  callbackRef.current = listener;
  React15.useEffect(() => {
    if (!contract || !eventName)
      return;
    const handler = (...event) => callbackRef.current(...event);
    if (once)
      contract.once(eventName, handler);
    else
      contract.on(eventName, handler);
    return () => {
      contract.off(eventName, handler);
    };
  }, [contract, eventName]);
}

// src/hooks/contracts/useContractInfiniteReads.ts
import { replaceEqualDeep } from "@tanstack/react-query";
import { deepEqual as deepEqual2, readContracts } from "@wagmi/core";
import * as React16 from "react";
function queryKey5({
  allowFailure,
  cacheKey,
  overrides,
  scopeKey
}) {
  return [
    {
      entity: "readContractsInfinite",
      allowFailure,
      cacheKey,
      overrides,
      scopeKey
    }
  ];
}
function queryFn5({
  contracts
}) {
  return ({
    queryKey: [{ allowFailure, overrides }],
    pageParam
  }) => {
    return readContracts({
      allowFailure,
      contracts: contracts(pageParam || void 0),
      overrides
    });
  };
}
function useContractInfiniteReads({
  allowFailure,
  cacheKey,
  cacheTime,
  contracts,
  enabled: enabled_ = true,
  getNextPageParam,
  isDataEqual,
  keepPreviousData,
  onError,
  onSettled,
  onSuccess,
  overrides,
  scopeKey,
  select,
  staleTime,
  structuralSharing = (oldData, newData) => deepEqual2(oldData, newData) ? oldData : replaceEqualDeep(oldData, newData),
  suspense
}) {
  const queryKey_ = React16.useMemo(
    () => queryKey5({ allowFailure, cacheKey, overrides, scopeKey }),
    [allowFailure, cacheKey, overrides, scopeKey]
  );
  const enabled = React16.useMemo(() => {
    const enabled2 = Boolean(enabled_ && contracts);
    return enabled2;
  }, [contracts, enabled_]);
  return useInfiniteQuery(queryKey_, queryFn5({ contracts }), {
    cacheTime,
    enabled,
    getNextPageParam,
    isDataEqual,
    keepPreviousData,
    select,
    staleTime,
    structuralSharing,
    suspense,
    onError,
    onSettled,
    onSuccess
  });
}
function paginatedIndexesConfig(fn, {
  perPage,
  start,
  direction
}) {
  const contracts = (page = 0) => [...Array(perPage).keys()].map((index) => {
    return direction === "increment" ? start + index + page * perPage : start - index - page * perPage;
  }).filter((index) => index >= 0).map(fn).flat();
  return {
    contracts,
    getNextPageParam(lastPage, pages) {
      return lastPage?.length === perPage ? pages.length : void 0;
    }
  };
}

// src/hooks/contracts/useContractRead.ts
import { replaceEqualDeep as replaceEqualDeep2 } from "@tanstack/react-query";
import { deepEqual as deepEqual3, parseContractResult, readContract } from "@wagmi/core";
import * as React17 from "react";
function queryKey6({
  address,
  args,
  blockNumber,
  chainId: chainId2,
  functionName,
  overrides,
  scopeKey
}) {
  return [
    {
      entity: "readContract",
      address,
      args,
      blockNumber,
      chainId: chainId2,
      functionName,
      overrides,
      scopeKey
    }
  ];
}
function queryFn6({ abi }) {
  return async ({
    queryKey: [{ address, args, chainId: chainId2, functionName, overrides }]
  }) => {
    if (!abi)
      throw new Error("abi is required");
    if (!address)
      throw new Error("address is required");
    return await readContract({
      address,
      args,
      chainId: chainId2,
      abi,
      functionName,
      overrides
    }) ?? null;
  };
}
function useContractRead({
  abi,
  address,
  args,
  cacheOnBlock = false,
  cacheTime,
  chainId: chainId_,
  enabled: enabled_ = true,
  functionName,
  isDataEqual,
  onError,
  onSettled,
  onSuccess,
  overrides,
  scopeKey,
  select,
  staleTime,
  structuralSharing = (oldData, newData) => deepEqual3(oldData, newData) ? oldData : replaceEqualDeep2(oldData, newData),
  suspense,
  watch
} = {}) {
  const chainId2 = useChainId({ chainId: chainId_ });
  const { data: blockNumber } = useBlockNumber({
    chainId: chainId2,
    enabled: watch || cacheOnBlock,
    scopeKey: watch || cacheOnBlock ? void 0 : "idle",
    watch
  });
  const queryKey_ = React17.useMemo(
    () => queryKey6({
      address,
      args,
      blockNumber: cacheOnBlock ? blockNumber : void 0,
      chainId: chainId2,
      functionName,
      overrides,
      scopeKey
    }),
    [
      address,
      args,
      blockNumber,
      cacheOnBlock,
      chainId2,
      functionName,
      overrides,
      scopeKey
    ]
  );
  const enabled = React17.useMemo(() => {
    let enabled2 = Boolean(enabled_ && abi && address && functionName);
    if (cacheOnBlock)
      enabled2 = Boolean(enabled2 && blockNumber);
    return enabled2;
  }, [abi, address, blockNumber, cacheOnBlock, enabled_, functionName]);
  useInvalidateOnBlock({
    chainId: chainId2,
    enabled: watch && !cacheOnBlock,
    queryKey: queryKey_
  });
  return useQuery(
    queryKey_,
    queryFn6({
      abi
    }),
    {
      cacheTime,
      enabled,
      isDataEqual,
      select(data) {
        const result = abi && functionName ? parseContractResult({
          abi,
          data,
          functionName
        }) : data;
        return select ? select(result) : result;
      },
      staleTime,
      structuralSharing,
      suspense,
      onError,
      onSettled,
      onSuccess
    }
  );
}

// src/hooks/contracts/useContractReads.ts
import { replaceEqualDeep as replaceEqualDeep3 } from "@tanstack/react-query";
import { deepEqual as deepEqual4, parseContractResult as parseContractResult2, readContracts as readContracts2 } from "@wagmi/core";
import * as React18 from "react";
function queryKey7({
  allowFailure,
  blockNumber,
  chainId: chainId2,
  contracts,
  overrides,
  scopeKey
}) {
  return [
    {
      entity: "readContracts",
      allowFailure,
      blockNumber,
      chainId: chainId2,
      scopeKey,
      contracts: (contracts ?? []).map(
        ({ address, args, chainId: chainId3, functionName }) => ({
          address,
          args,
          chainId: chainId3,
          functionName
        })
      ),
      overrides
    }
  ];
}
function queryFn7({ abis }) {
  return ({
    queryKey: [{ allowFailure, contracts: contracts_, overrides }]
  }) => {
    const contracts = contracts_.map(
      (contract, i) => ({
        ...contract,
        abi: abis[i]
      })
    );
    return readContracts2({
      allowFailure,
      contracts,
      overrides
    });
  };
}
function useContractReads({
  allowFailure = true,
  cacheOnBlock = false,
  cacheTime,
  contracts,
  enabled: enabled_ = true,
  isDataEqual,
  keepPreviousData,
  onError,
  onSettled,
  onSuccess,
  overrides,
  scopeKey,
  select,
  staleTime,
  structuralSharing = (oldData, newData) => deepEqual4(oldData, newData) ? oldData : replaceEqualDeep3(oldData, newData),
  suspense,
  watch
} = {}) {
  const { data: blockNumber } = useBlockNumber({
    enabled: watch || cacheOnBlock,
    watch
  });
  const chainId2 = useChainId();
  const queryKey_ = React18.useMemo(
    () => queryKey7({
      allowFailure,
      blockNumber: cacheOnBlock ? blockNumber : void 0,
      chainId: chainId2,
      contracts,
      overrides,
      scopeKey
    }),
    [
      allowFailure,
      blockNumber,
      cacheOnBlock,
      chainId2,
      scopeKey,
      contracts,
      overrides
    ]
  );
  const enabled = React18.useMemo(() => {
    let enabled2 = Boolean(
      enabled_ && contracts?.every((x) => x.abi && x.address && x.functionName)
    );
    if (cacheOnBlock)
      enabled2 = Boolean(enabled2 && blockNumber);
    return enabled2;
  }, [blockNumber, cacheOnBlock, contracts, enabled_]);
  useInvalidateOnBlock({ enabled: watch && !cacheOnBlock, queryKey: queryKey_ });
  const abis = (contracts ?? []).map(
    ({ abi }) => abi
  );
  return useQuery(queryKey_, queryFn7({ abis }), {
    cacheTime,
    enabled,
    isDataEqual,
    keepPreviousData,
    staleTime,
    select(data) {
      const result = data.map((data2, i) => {
        const { abi, functionName } = contracts?.[i] ?? {};
        return abi && functionName ? parseContractResult2({ abi, functionName, data: data2 }) : data2;
      });
      return select ? select(result) : result;
    },
    structuralSharing,
    suspense,
    onError,
    onSettled,
    onSuccess
  });
}

// src/hooks/contracts/useContractWrite.ts
import { writeContract } from "@wagmi/core";
import * as React19 from "react";
function mutationKey6({
  address,
  args,
  chainId: chainId2,
  abi,
  functionName,
  overrides,
  request
}) {
  return [
    {
      entity: "writeContract",
      address,
      args,
      chainId: chainId2,
      abi,
      functionName,
      overrides,
      request
    }
  ];
}
function mutationFn6({
  address,
  args,
  chainId: chainId2,
  abi,
  functionName,
  mode,
  overrides,
  request
}) {
  if (!address)
    throw new Error("address is required");
  if (!abi)
    throw new Error("abi is required");
  if (!functionName)
    throw new Error("functionName is required");
  switch (mode) {
    case "prepared": {
      if (!request)
        throw new Error("request is required");
      return writeContract({
        mode: "prepared",
        address,
        chainId: chainId2,
        abi,
        functionName,
        request
      });
    }
    case "recklesslyUnprepared":
      return writeContract({
        address,
        abi,
        functionName,
        args,
        chainId: chainId2,
        mode: "recklesslyUnprepared",
        overrides
      });
  }
}
function useContractWrite({
  address,
  args,
  chainId: chainId2,
  abi,
  functionName,
  mode,
  overrides,
  request,
  onError,
  onMutate,
  onSettled,
  onSuccess
} = {}) {
  const {
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    mutate,
    mutateAsync,
    reset,
    status,
    variables
  } = useMutation(
    mutationKey6({
      address,
      abi,
      functionName,
      args,
      chainId: chainId2,
      mode,
      overrides,
      request
    }),
    mutationFn6,
    {
      onError,
      onMutate,
      onSettled,
      onSuccess
    }
  );
  const write = React19.useCallback(
    (overrideConfig) => {
      return mutate({
        address,
        args: overrideConfig?.recklesslySetUnpreparedArgs ?? args,
        chainId: chainId2,
        abi,
        functionName,
        mode: overrideConfig ? "recklesslyUnprepared" : mode,
        overrides: overrideConfig?.recklesslySetUnpreparedOverrides ?? overrides,
        request
      });
    },
    [
      address,
      args,
      chainId2,
      abi,
      functionName,
      mode,
      mutate,
      overrides,
      request
    ]
  );
  const writeAsync = React19.useCallback(
    (overrideConfig) => {
      return mutateAsync({
        address,
        args: overrideConfig?.recklesslySetUnpreparedArgs ?? args,
        chainId: chainId2,
        abi,
        functionName,
        mode: overrideConfig ? "recklesslyUnprepared" : mode,
        overrides: overrideConfig?.recklesslySetUnpreparedOverrides ?? overrides,
        request
      });
    },
    [
      address,
      args,
      chainId2,
      abi,
      functionName,
      mode,
      mutateAsync,
      overrides,
      request
    ]
  );
  return {
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    reset,
    status,
    variables,
    write: mode === "prepared" && !request ? void 0 : write,
    writeAsync: mode === "prepared" && !request ? void 0 : writeAsync
  };
}

// src/hooks/contracts/usePrepareContractWrite.ts
import { prepareWriteContract } from "@wagmi/core";
function queryKey8({
  activeChainId,
  args,
  address,
  chainId: chainId2,
  functionName,
  overrides,
  signerAddress
}) {
  return [
    {
      entity: "prepareContractTransaction",
      activeChainId,
      address,
      args,
      chainId: chainId2,
      functionName,
      overrides,
      signerAddress
    }
  ];
}
function queryFn8({
  abi,
  signer
}) {
  return ({
    queryKey: [{ args, address, chainId: chainId2, functionName, overrides }]
  }) => {
    if (!abi)
      throw new Error("abi is required");
    return prepareWriteContract({
      abi,
      args,
      address,
      chainId: chainId2,
      functionName,
      overrides,
      signer
    });
  };
}
function usePrepareContractWrite({
  address,
  abi,
  functionName,
  chainId: chainId2,
  args,
  overrides,
  cacheTime,
  enabled = true,
  scopeKey,
  staleTime,
  suspense,
  onError,
  onSettled,
  onSuccess
} = {}) {
  const { chain: activeChain } = useNetwork();
  const { data: signer } = useSigner({ chainId: chainId2 });
  const prepareContractWriteQuery = useQuery(
    queryKey8({
      activeChainId: activeChain?.id,
      address,
      args,
      chainId: chainId2,
      functionName,
      scopeKey,
      signerAddress: signer?._address,
      overrides
    }),
    queryFn8({
      abi,
      signer
    }),
    {
      cacheTime,
      enabled: Boolean(enabled && abi && address && functionName && signer),
      staleTime,
      suspense,
      onError,
      onSettled,
      onSuccess
    }
  );
  return Object.assign(prepareContractWriteQuery, {
    config: {
      abi,
      address,
      args,
      functionName,
      mode: "prepared",
      overrides,
      request: void 0,
      ...prepareContractWriteQuery.data
    }
  });
}

// src/hooks/contracts/useToken.ts
import { fetchToken } from "@wagmi/core";
function queryKey9({
  address,
  chainId: chainId2,
  formatUnits,
  scopeKey
}) {
  return [{ entity: "token", address, chainId: chainId2, formatUnits, scopeKey }];
}
function queryFn9({
  queryKey: [{ address, chainId: chainId2, formatUnits }]
}) {
  if (!address)
    throw new Error("address is required");
  return fetchToken({ address, chainId: chainId2, formatUnits });
}
function useToken({
  address,
  chainId: chainId_,
  formatUnits = "ether",
  cacheTime,
  enabled = true,
  scopeKey,
  staleTime = 1e3 * 60 * 60 * 24,
  suspense,
  onError,
  onSettled,
  onSuccess
} = {}) {
  const chainId2 = useChainId({ chainId: chainId_ });
  return useQuery(
    queryKey9({ address, chainId: chainId2, formatUnits, scopeKey }),
    queryFn9,
    {
      cacheTime,
      enabled: Boolean(enabled && address),
      staleTime,
      suspense,
      onError,
      onSettled,
      onSuccess
    }
  );
}

// src/hooks/ens/useEnsAddress.ts
import { fetchEnsAddress } from "@wagmi/core";
function queryKey10({ chainId: chainId2, name, scopeKey }) {
  return [{ entity: "ensAddress", chainId: chainId2, name, scopeKey }];
}
function queryFn10({
  queryKey: [{ chainId: chainId2, name }]
}) {
  if (!name)
    throw new Error("name is required");
  return fetchEnsAddress({ chainId: chainId2, name });
}
function useEnsAddress({
  cacheTime,
  chainId: chainId_,
  enabled = true,
  name,
  scopeKey,
  staleTime = 1e3 * 60 * 60 * 24,
  suspense,
  onError,
  onSettled,
  onSuccess
} = {}) {
  const chainId2 = useChainId({ chainId: chainId_ });
  return useQuery(queryKey10({ chainId: chainId2, name, scopeKey }), queryFn10, {
    cacheTime,
    enabled: Boolean(enabled && chainId2 && name),
    staleTime,
    suspense,
    onError,
    onSettled,
    onSuccess
  });
}

// src/hooks/ens/useEnsAvatar.ts
import { fetchEnsAvatar } from "@wagmi/core";
function queryKey11({
  address,
  chainId: chainId2,
  scopeKey
}) {
  return [{ entity: "ensAvatar", address, chainId: chainId2, scopeKey }];
}
function queryFn11({
  queryKey: [{ address, chainId: chainId2 }]
}) {
  if (!address)
    throw new Error("address is required");
  return fetchEnsAvatar({ address, chainId: chainId2 });
}
function useEnsAvatar({
  address,
  cacheTime,
  chainId: chainId_,
  enabled = true,
  scopeKey,
  staleTime = 1e3 * 60 * 60 * 24,
  suspense,
  onError,
  onSettled,
  onSuccess
} = {}) {
  const chainId2 = useChainId({ chainId: chainId_ });
  return useQuery(queryKey11({ address, chainId: chainId2, scopeKey }), queryFn11, {
    cacheTime,
    enabled: Boolean(enabled && address && chainId2),
    staleTime,
    suspense,
    onError,
    onSettled,
    onSuccess
  });
}

// src/hooks/ens/useEnsName.ts
import { fetchEnsName } from "@wagmi/core";
function queryKey12({
  address,
  chainId: chainId2,
  scopeKey
}) {
  return [{ entity: "ensName", address, chainId: chainId2, scopeKey }];
}
function queryFn12({
  queryKey: [{ address, chainId: chainId2 }]
}) {
  if (!address)
    throw new Error("address is required");
  return fetchEnsName({ address, chainId: chainId2 });
}
function useEnsName({
  address,
  cacheTime,
  chainId: chainId_,
  enabled = true,
  scopeKey,
  staleTime = 1e3 * 60 * 60 * 24,
  suspense,
  onError,
  onSettled,
  onSuccess
} = {}) {
  const chainId2 = useChainId({ chainId: chainId_ });
  return useQuery(queryKey12({ address, chainId: chainId2, scopeKey }), queryFn12, {
    cacheTime,
    enabled: Boolean(enabled && address && chainId2),
    staleTime,
    suspense,
    onError,
    onSettled,
    onSuccess
  });
}

// src/hooks/ens/useEnsResolver.ts
import { fetchEnsResolver } from "@wagmi/core";
function queryKey13({ chainId: chainId2, name, scopeKey }) {
  return [{ entity: "ensResolver", chainId: chainId2, name, scopeKey }];
}
function queryFn13({
  queryKey: [{ chainId: chainId2, name }]
}) {
  if (!name)
    throw new Error("name is required");
  return fetchEnsResolver({ chainId: chainId2, name });
}
function useEnsResolver({
  cacheTime,
  chainId: chainId_,
  name,
  enabled = true,
  scopeKey,
  staleTime = 1e3 * 60 * 60 * 24,
  suspense,
  onError,
  onSettled,
  onSuccess
} = {}) {
  const chainId2 = useChainId({ chainId: chainId_ });
  return useQuery(queryKey13({ chainId: chainId2, name, scopeKey }), queryFn13, {
    cacheTime,
    enabled: Boolean(enabled && chainId2 && name),
    staleTime,
    suspense,
    onError,
    onSettled,
    onSuccess
  });
}

// src/hooks/transactions/usePrepareSendTransaction.ts
import { prepareSendTransaction } from "@wagmi/core";
function queryKey14({
  activeChainId,
  chainId: chainId2,
  request,
  scopeKey,
  signerAddress
}) {
  return [
    {
      entity: "prepareSendTransaction",
      activeChainId,
      chainId: chainId2,
      request,
      scopeKey,
      signerAddress
    }
  ];
}
function queryFn14({ signer }) {
  return ({
    queryKey: [{ chainId: chainId2, request }]
  }) => {
    if (!request?.to)
      throw new Error("request.to is required");
    return prepareSendTransaction({
      chainId: chainId2,
      request: { ...request, to: request.to },
      signer
    });
  };
}
function usePrepareSendTransaction({
  chainId: chainId2,
  request,
  cacheTime,
  enabled = true,
  scopeKey,
  staleTime = 1e3 * 60 * 60 * 24,
  suspense,
  onError,
  onSettled,
  onSuccess
} = {}) {
  const { chain: activeChain } = useNetwork();
  const { data: signer } = useSigner({ chainId: chainId2 });
  const prepareSendTransactionQuery = useQuery(
    queryKey14({
      activeChainId: activeChain?.id,
      chainId: chainId2,
      request,
      scopeKey,
      signerAddress: signer?._address
    }),
    queryFn14({ signer }),
    {
      cacheTime,
      enabled: Boolean(enabled && signer && request && request.to),
      staleTime,
      suspense,
      onError,
      onSettled,
      onSuccess
    }
  );
  return Object.assign(prepareSendTransactionQuery, {
    config: {
      request: void 0,
      mode: "prepared",
      ...prepareSendTransactionQuery.data
    }
  });
}

// src/hooks/transactions/useSendTransaction.ts
import { sendTransaction } from "@wagmi/core";
import * as React20 from "react";
var mutationKey7 = (args) => [{ entity: "sendTransaction", ...args }];
var mutationFn7 = ({ chainId: chainId2, mode, request }) => {
  return sendTransaction({
    chainId: chainId2,
    mode,
    request
  });
};
function useSendTransaction({
  chainId: chainId2,
  mode,
  request,
  onError,
  onMutate,
  onSettled,
  onSuccess
}) {
  const {
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    mutate,
    mutateAsync,
    reset,
    status,
    variables
  } = useMutation(
    mutationKey7({
      chainId: chainId2,
      mode,
      request
    }),
    mutationFn7,
    {
      onError,
      onMutate,
      onSettled,
      onSuccess
    }
  );
  const sendTransaction2 = React20.useCallback(
    (args) => mutate({
      chainId: chainId2,
      mode,
      request: args?.recklesslySetUnpreparedRequest ?? request
    }),
    [chainId2, mode, mutate, request]
  );
  const sendTransactionAsync = React20.useCallback(
    (args) => mutateAsync({
      chainId: chainId2,
      mode,
      request: args?.recklesslySetUnpreparedRequest ?? request
    }),
    [chainId2, mode, mutateAsync, request]
  );
  return {
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    reset,
    sendTransaction: mode === "prepared" && !request ? void 0 : sendTransaction2,
    sendTransactionAsync: mode === "prepared" && !request ? void 0 : sendTransactionAsync,
    status,
    variables
  };
}

// src/hooks/transactions/useTransaction.ts
import { fetchTransaction } from "@wagmi/core";
function queryKey15({ chainId: chainId2, hash, scopeKey }) {
  return [{ entity: "transaction", chainId: chainId2, hash, scopeKey }];
}
function queryFn15({
  queryKey: [{ chainId: chainId2, hash }]
}) {
  if (!hash)
    throw new Error("hash is required");
  return fetchTransaction({ chainId: chainId2, hash });
}
function useTransaction({
  cacheTime = 0,
  chainId: chainId_,
  enabled = true,
  hash,
  scopeKey,
  staleTime,
  suspense,
  onError,
  onSettled,
  onSuccess
} = {}) {
  const chainId2 = useChainId({ chainId: chainId_ });
  return useQuery(queryKey15({ chainId: chainId2, hash, scopeKey }), queryFn15, {
    cacheTime,
    enabled: Boolean(enabled && hash),
    staleTime,
    suspense,
    onError,
    onSettled,
    onSuccess
  });
}

// src/hooks/transactions/useWaitForTransaction.ts
import { waitForTransaction } from "@wagmi/core";
function queryKey16({
  confirmations,
  chainId: chainId2,
  hash,
  scopeKey,
  timeout,
  wait
}) {
  return [
    {
      entity: "waitForTransaction",
      confirmations,
      chainId: chainId2,
      hash,
      scopeKey,
      timeout,
      wait
    }
  ];
}
function queryFn16({
  queryKey: [{ chainId: chainId2, confirmations, hash, timeout, wait }]
}) {
  return waitForTransaction({ chainId: chainId2, confirmations, hash, timeout, wait });
}
function useWaitForTransaction({
  chainId: chainId_,
  confirmations,
  hash,
  timeout,
  wait,
  cacheTime,
  enabled = true,
  scopeKey,
  staleTime,
  suspense,
  onError,
  onSettled,
  onSuccess
} = {}) {
  const chainId2 = useChainId({ chainId: chainId_ });
  return useQuery(
    queryKey16({ chainId: chainId2, confirmations, hash, scopeKey, timeout, wait }),
    queryFn16,
    {
      cacheTime,
      enabled: Boolean(enabled && (hash || wait)),
      staleTime,
      suspense,
      onError,
      onSettled,
      onSuccess
    }
  );
}

// src/index.ts
import {
  AddChainError,
  ChainDoesNotSupportMulticallError,
  ChainMismatchError,
  ChainNotConfiguredError,
  Connector,
  ConnectorAlreadyConnectedError,
  ConnectorNotFoundError,
  ContractMethodDoesNotExistError,
  ContractMethodNoResultError,
  ContractMethodRevertedError,
  ContractResultDecodeError,
  ProviderChainsNotFound,
  ProviderRpcError,
  ResourceUnavailableError,
  RpcError,
  SwitchChainError,
  SwitchChainNotSupportedError,
  UserRejectedRequestError,
  alchemyRpcUrls,
  allChains,
  chain,
  chainId,
  configureChains,
  createStorage,
  deepEqual as deepEqual5,
  defaultChains,
  defaultL2Chains,
  erc20ABI,
  erc721ABI,
  erc4626ABI,
  etherscanBlockExplorers,
  infuraRpcUrls,
  publicRpcUrls,
  readContracts as readContracts3
} from "@wagmi/core";
export {
  AddChainError,
  ChainDoesNotSupportMulticallError,
  ChainMismatchError,
  ChainNotConfiguredError,
  Connector,
  ConnectorAlreadyConnectedError,
  ConnectorNotFoundError,
  Context,
  ContractMethodDoesNotExistError,
  ContractMethodNoResultError,
  ContractMethodRevertedError,
  ContractResultDecodeError,
  ProviderChainsNotFound,
  ProviderRpcError,
  ResourceUnavailableError,
  RpcError,
  SwitchChainError,
  SwitchChainNotSupportedError,
  UserRejectedRequestError,
  WagmiConfig,
  alchemyRpcUrls,
  allChains,
  chain,
  chainId,
  configureChains,
  createClient,
  createStorage,
  deepEqual5 as deepEqual,
  defaultChains,
  defaultL2Chains,
  deserialize,
  erc20ABI,
  erc4626ABI,
  erc721ABI,
  etherscanBlockExplorers,
  infuraRpcUrls,
  paginatedIndexesConfig,
  publicRpcUrls,
  readContracts3 as readContracts,
  serialize,
  useAccount,
  useBalance,
  useBlockNumber,
  useClient,
  useConnect,
  useContract,
  useContractEvent,
  useContractInfiniteReads,
  useContractRead,
  useContractReads,
  useContractWrite,
  useDisconnect,
  useEnsAddress,
  useEnsAvatar,
  useEnsName,
  useEnsResolver,
  useFeeData,
  useInfiniteQuery,
  useMutation,
  useNetwork,
  usePrepareContractWrite,
  usePrepareSendTransaction,
  useProvider,
  useQuery,
  useQueryClient2 as useQueryClient,
  useSendTransaction,
  useSignMessage,
  useSignTypedData,
  useSigner,
  useSwitchNetwork,
  useToken,
  useTransaction,
  useWaitForTransaction,
  useWebSocketProvider
};
