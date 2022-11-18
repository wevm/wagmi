import * as _tanstack_react_query from '@tanstack/react-query';
import { QueryClient, QueryKey, UseInfiniteQueryOptions, QueryFunction, InfiniteQueryObserverResult, UseMutationOptions, UseMutationResult, MutationFunction, MutationKey, UseQueryOptions, QueryObserverResult } from '@tanstack/react-query';
import { Persister, PersistedClient } from '@tanstack/react-query-persist-client';
import * as _wagmi_core from '@wagmi/core';
import { Provider, WebSocketProvider, ClientConfig, Client as Client$1, GetAccountResult, FetchBalanceResult, FetchBalanceArgs, ConnectArgs, ConnectResult, Signer, FetchSignerResult, FetchSignerArgs, SignMessageArgs, SignMessageResult, SignTypedDataArgs, SignTypedDataResult, SwitchNetworkArgs, SwitchNetworkResult, GetContractResult, GetContractArgs, ReadContractsResult, ReadContractsConfig, ReadContractConfig, ReadContractResult, WriteContractArgs, WriteContractResult, PrepareWriteContractResult, PrepareWriteContractConfig, FetchTokenResult, FetchTokenArgs, FetchEnsAddressArgs, FetchEnsAddressResult, FetchEnsAvatarArgs, FetchEnsAvatarResult, FetchEnsNameArgs, FetchEnsNameResult, FetchEnsResolverArgs, FetchEnsResolverResult, FetchBlockNumberArgs, FetchBlockNumberResult, FetchFeeDataResult, FetchFeeDataArgs, GetProviderArgs, GetWebSocketProviderArgs, PrepareSendTransactionResult, PrepareSendTransactionArgs, SendTransactionResult, SendTransactionArgs, SendTransactionPreparedRequest, SendTransactionUnpreparedRequest, FetchTransactionArgs, FetchTransactionResult, WaitForTransactionArgs, WaitForTransactionResult } from '@wagmi/core';
export { AddChainError, Chain, ChainDoesNotSupportMulticallError, ChainMismatchError, ChainNotConfiguredError, ChainProviderFn, Connector, ConnectorAlreadyConnectedError, ConnectorData, ConnectorEvents, ConnectorNotFoundError, ContractMethodDoesNotExistError, ContractMethodNoResultError, ContractMethodRevertedError, ContractResultDecodeError, ProviderChainsNotFound, ProviderRpcError, ResourceUnavailableError, RpcError, Storage, SwitchChainError, SwitchChainNotSupportedError, Unit, UserRejectedRequestError, alchemyRpcUrls, allChains, chain, chainId, configureChains, createStorage, deepEqual, defaultChains, defaultL2Chains, erc20ABI, erc4626ABI, erc721ABI, etherscanBlockExplorers, infuraRpcUrls, publicRpcUrls, readContracts } from '@wagmi/core';
import * as React from 'react';
import { Address, TypedData, TypedDataToPrimitiveTypes, TypedDataDomain, ResolvedConfig, Abi, ExtractAbiEventNames, ExtractAbiEvent, AbiEvent, Narrow, AbiParametersToPrimitiveTypes } from 'abitype';
export { Address } from 'abitype';
import { BigNumber } from 'ethers';
import * as _wagmi_core_internal from '@wagmi/core/internal';
import { Optional, IsNever, Or, NotEqual, Event, ContractsConfig } from '@wagmi/core/internal';
import * as _ethersproject_providers from '@ethersproject/providers';

declare type CreateClientConfig<TProvider extends Provider = Provider, TWebSocketProvider extends WebSocketProvider = WebSocketProvider> = ClientConfig<TProvider, TWebSocketProvider> & {
    queryClient?: QueryClient;
    persister?: Persister | null;
};
declare function createClient<TProvider extends Provider, TWebSocketProvider extends WebSocketProvider>({ queryClient, persister, ...config }: CreateClientConfig<TProvider, TWebSocketProvider>): Client$1<TProvider, TWebSocketProvider> & {
    queryClient: QueryClient;
};
declare type Client<TProvider extends Provider = Provider, TWebSocketProvider extends WebSocketProvider = WebSocketProvider> = Client$1<TProvider, TWebSocketProvider> & {
    queryClient: QueryClient;
};

declare const Context: React.Context<Client<Provider, WebSocketProvider> | undefined>;
declare type WagmiConfigProps<TProvider extends Provider = Provider, TWebSocketProvider extends WebSocketProvider = WebSocketProvider> = {
    /** React-decorated Client instance */
    client: Client<TProvider, TWebSocketProvider>;
};
declare function WagmiConfig<TProvider extends Provider, TWebSocketProvider extends WebSocketProvider>({ children, client, }: React.PropsWithChildren<WagmiConfigProps<TProvider, TWebSocketProvider>>): React.FunctionComponentElement<React.ProviderProps<Client<Provider, WebSocketProvider> | undefined>>;
declare function useClient<TProvider extends Provider, TWebSocketProvider extends WebSocketProvider = WebSocketProvider>(): Client<TProvider, TWebSocketProvider>;

declare type UseAccountConfig = {
    /** Function to invoke when connected */
    onConnect?({ address, connector, isReconnected, }: {
        address?: GetAccountResult['address'];
        connector?: GetAccountResult['connector'];
        isReconnected: boolean;
    }): void;
    /** Function to invoke when disconnected */
    onDisconnect?(): void;
};
declare function useAccount({ onConnect, onDisconnect }?: UseAccountConfig): GetAccountResult<_wagmi_core.Provider>;

declare type UseInfiniteQueryResult<TData, TError> = Pick<InfiniteQueryObserverResult<TData, TError>, 'data' | 'error' | 'fetchNextPage' | 'fetchStatus' | 'hasNextPage' | 'isError' | 'isFetched' | 'isFetchedAfterMount' | 'isFetching' | 'isFetchingNextPage' | 'isLoading' | 'isRefetching' | 'isSuccess' | 'refetch'> & {
    isIdle: boolean;
    status: 'idle' | 'loading' | 'success' | 'error';
    internal: Pick<InfiniteQueryObserverResult, 'dataUpdatedAt' | 'errorUpdatedAt' | 'failureCount' | 'isLoadingError' | 'isPaused' | 'isPlaceholderData' | 'isPreviousData' | 'isRefetchError' | 'isStale' | 'remove'>;
};
declare function useInfiniteQuery<TQueryFnData = unknown, TError = unknown, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(options: UseInfiniteQueryOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey>): UseInfiniteQueryResult<TData, TError>;
declare function useInfiniteQuery<TQueryFnData = unknown, TError = unknown, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(queryKey: TQueryKey, options?: Omit<UseInfiniteQueryOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey>, 'queryKey'>): UseInfiniteQueryResult<TData, TError>;
declare function useInfiniteQuery<TQueryFnData = unknown, TError = unknown, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(queryKey: TQueryKey, queryFn: QueryFunction<TQueryFnData, TQueryKey>, options?: Omit<UseInfiniteQueryOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey>, 'queryKey' | 'queryFn'>): UseInfiniteQueryResult<TData, TError>;

declare function useMutation<TData = unknown, TError = unknown, TVariables = void, TContext = unknown>(options: UseMutationOptions<TData, TError, TVariables, TContext>): UseMutationResult<TData, TError, TVariables, TContext>;
declare function useMutation<TData = unknown, TError = unknown, TVariables = void, TContext = unknown>(mutationFn: MutationFunction<TData, TVariables>, options?: Omit<UseMutationOptions<TData, TError, TVariables, TContext>, 'mutationFn'>): UseMutationResult<TData, TError, TVariables, TContext>;
declare function useMutation<TData = unknown, TError = unknown, TVariables = void, TContext = unknown>(mutationKey: MutationKey, options?: Omit<UseMutationOptions<TData, TError, TVariables, TContext>, 'mutationKey'>): UseMutationResult<TData, TError, TVariables, TContext>;
declare function useMutation<TData = unknown, TError = unknown, TVariables = void, TContext = unknown>(mutationKey: MutationKey, mutationFn?: MutationFunction<TData, TVariables>, options?: Omit<UseMutationOptions<TData, TError, TVariables, TContext>, 'mutationKey' | 'mutationFn'>): UseMutationResult<TData, TError, TVariables, TContext>;

declare type UseQueryResult<TData, TError> = Pick<QueryObserverResult<TData, TError>, 'data' | 'error' | 'fetchStatus' | 'isError' | 'isFetched' | 'isFetchedAfterMount' | 'isFetching' | 'isLoading' | 'isRefetching' | 'isSuccess' | 'refetch'> & {
    isIdle: boolean;
    status: 'idle' | 'loading' | 'success' | 'error';
    internal: Pick<QueryObserverResult, 'dataUpdatedAt' | 'errorUpdatedAt' | 'failureCount' | 'isLoadingError' | 'isPaused' | 'isPlaceholderData' | 'isPreviousData' | 'isRefetchError' | 'isStale' | 'remove'>;
};
declare type DefinedUseQueryResult<TData = unknown, TError = unknown> = Omit<UseQueryResult<TData, TError>, 'data'> & {
    data: TData;
};
declare function useQuery<TQueryFnData = unknown, TError = unknown, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(queryKey: TQueryKey, options?: Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryKey' | 'initialData'> & {
    initialData?: () => undefined;
}): UseQueryResult<TData, TError>;
declare function useQuery<TQueryFnData = unknown, TError = unknown, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(queryKey: TQueryKey, options?: Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryKey' | 'initialData'> & {
    initialData: TQueryFnData | (() => TQueryFnData);
}): DefinedUseQueryResult<TData, TError>;
declare function useQuery<TQueryFnData = unknown, TError = unknown, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(queryKey: TQueryKey, queryFn: QueryFunction<TQueryFnData, TQueryKey>, options?: Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryKey' | 'queryFn' | 'initialData'> & {
    initialData?: () => undefined;
}): UseQueryResult<TData, TError>;
declare function useQuery<TQueryFnData = unknown, TError = unknown, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(queryKey: TQueryKey, queryFn: QueryFunction<TQueryFnData, TQueryKey>, options?: Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryKey' | 'queryFn' | 'initialData'> & {
    initialData: TQueryFnData | (() => TQueryFnData);
}): DefinedUseQueryResult<TData, TError>;

declare const useQueryClient: () => _tanstack_react_query.QueryClient;

declare module 'abitype' {
    interface Config {
        BigIntType: BigNumber;
        IntType: number;
    }
}
declare module 'ethers/lib/utils.js' {
    function getAddress(address: string): Address;
    function verifyTypedData<TTypedData extends TypedData, TSchema extends TypedDataToPrimitiveTypes<TTypedData>>(domain: TypedDataDomain, types: TTypedData, value: TSchema[keyof TSchema] extends infer TValue ? {
        [x: string]: any;
    } extends TValue ? Record<string, any> : TValue : never, signature: {
        r: string;
        s?: string;
        _vs?: string;
        recoveryParam?: number;
        v?: number;
    } | ResolvedConfig['BytesType'] | string): string;
}
declare type QueryConfig<Data, Error> = Pick<UseQueryOptions<Data, Error>, 'cacheTime' | 'enabled' | 'isDataEqual' | 'keepPreviousData' | 'select' | 'staleTime' | 'structuralSharing' | 'suspense' | 'onError' | 'onSettled' | 'onSuccess'> & {
    /** Scope the cache to a given context. */
    scopeKey?: string;
};
declare type InfiniteQueryConfig<Data, Error> = Pick<UseInfiniteQueryOptions<Data, Error>, 'cacheTime' | 'enabled' | 'getNextPageParam' | 'isDataEqual' | 'keepPreviousData' | 'select' | 'staleTime' | 'structuralSharing' | 'suspense' | 'onError' | 'onSettled' | 'onSuccess'> & {
    /** Scope the cache to a given context. */
    scopeKey?: string;
};
declare type MutationConfig<Data, Error, Variables = void> = {
    /** Function fires if mutation encounters error */
    onError?: UseMutationOptions<Data, Error, Variables>['onError'];
    /**
     * Function fires before mutation function and is passed same variables mutation function would receive.
     * Value returned from this function will be passed to both onError and onSettled functions in event of a mutation failure.
     */
    onMutate?: UseMutationOptions<Data, Error, Variables>['onMutate'];
    /** Function fires when mutation is either successfully fetched or encounters error */
    onSettled?: UseMutationOptions<Data, Error, Variables>['onSettled'];
    /** Function fires when mutation is successful and will be passed the mutation's result */
    onSuccess?: UseMutationOptions<Data, Error, Variables>['onSuccess'];
};

declare type UseBalanceArgs = Partial<FetchBalanceArgs> & {
    /** Subscribe to changes */
    watch?: boolean;
};
declare type UseBalanceConfig = QueryConfig<FetchBalanceResult, Error>;
declare function useBalance({ address, cacheTime, chainId: chainId_, enabled, formatUnits, scopeKey, staleTime, suspense, token, watch, onError, onSettled, onSuccess, }?: UseBalanceArgs & UseBalanceConfig): UseQueryResult<FetchBalanceResult, Error>;

declare type UseConnectArgs = Partial<ConnectArgs>;
declare type UseConnectConfig = MutationConfig<ConnectResult, Error, ConnectArgs>;
declare function useConnect({ chainId, connector, onError, onMutate, onSettled, onSuccess, }?: UseConnectArgs & UseConnectConfig): {
    readonly connect: (args?: Partial<ConnectArgs>) => void;
    readonly connectAsync: (args?: Partial<ConnectArgs>) => Promise<ConnectResult<_wagmi_core.Provider>>;
    readonly connectors: _wagmi_core.Connector<any, any, any>[];
    readonly data: ConnectResult<_wagmi_core.Provider> | undefined;
    readonly error: Error | null;
    readonly isError: boolean;
    readonly isIdle: boolean;
    readonly isLoading: boolean;
    readonly isSuccess: boolean;
    readonly pendingConnector: _wagmi_core.Connector<any, any, any> | undefined;
    readonly reset: () => void;
    readonly status: "success" | "error" | "loading" | "idle";
    readonly variables: ConnectArgs | undefined;
};

declare type UseDisconnectConfig = {
    /** Function to invoke when an error is thrown while connecting. */
    onError?: (error: Error, context: unknown) => void | Promise<unknown>;
    /**
     * Function fires before mutation function and is passed same variables mutation function would receive.
     * Value returned from this function will be passed to both onError and onSettled functions in event of a mutation failure.
     */
    onMutate?: () => unknown;
    /** Function to invoke when connect is settled (either successfully connected, or an error has thrown). */
    onSettled?: (error: Error | null, context: unknown) => void | Promise<unknown>;
    /** Function fires when mutation is successful and will be passed the mutation's result */
    onSuccess?: (context: unknown) => void | Promise<unknown>;
};
declare function useDisconnect({ onError, onMutate, onSettled, onSuccess, }?: UseDisconnectConfig): {
    readonly disconnect: _tanstack_react_query.UseMutateFunction<void, Error, void, unknown>;
    readonly disconnectAsync: _tanstack_react_query.UseMutateAsyncFunction<void, Error, void, unknown>;
    readonly error: Error | null;
    readonly isError: boolean;
    readonly isIdle: boolean;
    readonly isLoading: boolean;
    readonly isSuccess: boolean;
    readonly reset: () => void;
    readonly status: "success" | "error" | "loading" | "idle";
};

declare function useNetwork(): _wagmi_core.GetNetworkResult;

declare type UseSignerConfig = Omit<QueryConfig<FetchSignerResult, Error>, 'cacheTime' | 'staleTime' | 'enabled'> & FetchSignerArgs;
declare function useSigner<TSigner extends Signer>({ chainId: chainId_, suspense, onError, onSettled, onSuccess, }?: UseSignerConfig): UseQueryResult<FetchSignerResult<TSigner>, Error>;

declare type UseSignMessageArgs = Partial<SignMessageArgs>;
declare type UseSignMessageConfig = MutationConfig<SignMessageResult, Error, SignMessageArgs>;
declare function useSignMessage({ message, onError, onMutate, onSettled, onSuccess, }?: UseSignMessageArgs & UseSignMessageConfig): {
    data: `0x${string}` | undefined;
    error: Error | null;
    isError: boolean;
    isIdle: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    reset: () => void;
    signMessage: (args?: SignMessageArgs) => void;
    signMessageAsync: (args?: SignMessageArgs) => Promise<`0x${string}`>;
    status: "success" | "error" | "loading" | "idle";
    variables: SignMessageArgs | undefined;
};

declare type UseSignTypedDataArgs<TTypedData = unknown> = Optional<SignTypedDataArgs<TTypedData>, 'domain' | 'types' | 'value'>;
declare type UseSignTypedDataConfig<TTypedData = unknown> = MutationConfig<SignTypedDataResult, Error, SignTypedDataArgs<TTypedData>> & UseSignTypedDataArgs<TTypedData>;
declare function useSignTypedData<TTypedData extends TypedData>({ domain, types, value, onError, onMutate, onSettled, onSuccess, }?: UseSignTypedDataConfig<TTypedData>): {
    data: string | undefined;
    error: Error | null;
    isError: boolean;
    isIdle: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    reset: () => void;
    signTypedData: <TTypedDataMutate extends TypedData = TTypedData>(args?: UseSignTypedDataArgs<TTypedDataMutate> | undefined) => void;
    signTypedDataAsync: <TTypedDataMutate_1 extends TypedData = TTypedData>(args?: UseSignTypedDataArgs<TTypedDataMutate_1> | undefined) => Promise<string>;
    status: "success" | "error" | "loading" | "idle";
    variables: SignTypedDataArgs<TTypedData> | undefined;
};

declare type UseSwitchNetworkArgs = Partial<SwitchNetworkArgs>;
declare type UseSwitchNetworkConfig = MutationConfig<SwitchNetworkResult, Error, SwitchNetworkArgs> & {
    throwForSwitchChainNotSupported?: boolean;
};
declare function useSwitchNetwork({ chainId, throwForSwitchChainNotSupported, onError, onMutate, onSettled, onSuccess, }?: UseSwitchNetworkArgs & UseSwitchNetworkConfig): {
    readonly chains: _wagmi_core.Chain[];
    readonly data: _wagmi_core.Chain | undefined;
    readonly error: Error | null;
    readonly isError: boolean;
    readonly isIdle: boolean;
    readonly isLoading: boolean;
    readonly isSuccess: boolean;
    readonly pendingChainId: number | undefined;
    readonly reset: () => void;
    readonly status: "success" | "error" | "loading" | "idle";
    readonly switchNetwork: ((chainId_?: SwitchNetworkArgs['chainId']) => void) | undefined;
    readonly switchNetworkAsync: ((chainId_?: SwitchNetworkArgs['chainId']) => Promise<_wagmi_core.Chain>) | undefined;
    readonly variables: SwitchNetworkArgs | undefined;
};

declare type UseContractConfig<TAbi extends Abi | readonly unknown[] = Abi> = Partial<Pick<GetContractArgs<TAbi>, 'abi' | 'address'>> & {
    /** Signer or provider to attach to contract */
    signerOrProvider?: GetContractArgs['signerOrProvider'] | null;
};
declare function useContract<TAbi extends Abi | readonly unknown[]>({ address, abi, signerOrProvider, }?: UseContractConfig<TAbi>): GetContractResult<TAbi> | null;

declare type GetListener<TAbiEvent extends AbiEvent, TAbi = unknown> = AbiParametersToPrimitiveTypes<TAbiEvent['inputs']> extends infer TArgs extends readonly unknown[] ? Or<IsNever<TArgs>, NotEqual<TAbi, Abi>> extends true ? {
    /**
     * Callback when event is emitted
     *
     * Use a [const assertion](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions) on {@link abi} for type inference.
     */
    listener: (...args: any) => void;
} : {
    /** Callback when event is emitted */
    listener: (...args: [...args: TArgs, event: Event<TAbiEvent>]) => void;
} : never;
declare type ContractEventConfig<TAbi extends Abi | readonly unknown[] = Abi, TEventName extends string = string, TEvent extends AbiEvent = TAbi extends Abi ? ExtractAbiEvent<TAbi, TEventName> : never> = {
    /** Contract address */
    address?: string;
    /** Contract ABI */
    abi?: Narrow<TAbi>;
    /** Chain id to use for provider */
    chainId?: number;
    /** Event to listen for */
    eventName?: IsNever<TEventName> extends true ? string : TEventName;
    /** Receive only a single event */
    once?: boolean;
} & GetListener<TEvent, TAbi>;
declare type GetConfig<T> = T extends {
    abi: infer TAbi extends Abi;
    eventName: infer TEventName extends string;
} ? ContractEventConfig<TAbi, ExtractAbiEventNames<TAbi>, ExtractAbiEvent<TAbi, TEventName>> : T extends {
    abi: infer TAbi extends readonly unknown[];
    eventName: infer TEventName extends string;
} ? ContractEventConfig<TAbi, TEventName> : ContractEventConfig;
declare type UseContractEventConfig<TAbi = Abi, TEventName = string> = GetConfig<{
    abi: TAbi;
    eventName: TEventName;
}>;
declare function useContractEvent<TAbi extends Abi | readonly unknown[], TEventName extends string>({ address, chainId, abi, listener, eventName, once, }?: UseContractEventConfig<TAbi, TEventName>): void;

declare type UseContractInfiniteReadsConfig<TContracts extends unknown[] = unknown[], TPageParam = unknown> = Pick<ReadContractsConfig<TContracts>, 'allowFailure' | 'overrides'> & {
    cacheKey: string;
    contracts(pageParam: TPageParam): readonly [
        ...ContractsConfig<TContracts, {
            /** Chain id to use for provider */
            chainId?: number;
        }>
    ];
} & InfiniteQueryConfig<ReadContractsResult<TContracts>, Error>;
declare function useContractInfiniteReads<TAbi extends Abi | readonly unknown[], TFunctionName extends string, TContracts extends {
    abi: TAbi;
    functionName: TFunctionName;
}[], TPageParam = any>({ allowFailure, cacheKey, cacheTime, contracts, enabled: enabled_, getNextPageParam, isDataEqual, keepPreviousData, onError, onSettled, onSuccess, overrides, scopeKey, select, staleTime, structuralSharing, suspense, }: UseContractInfiniteReadsConfig<TContracts, TPageParam>): UseInfiniteQueryResult<ReadContractsResult<TContracts>, Error>;
declare function paginatedIndexesConfig<TAbi extends Abi | readonly unknown[], TFunctionName extends string, TContracts extends {
    abi: TAbi;
    functionName: TFunctionName;
}[]>(fn: UseContractInfiniteReadsConfig<TContracts>['contracts'], { perPage, start, direction, }: {
    perPage: number;
    start: number;
    direction: 'increment' | 'decrement';
}): {
    contracts: UseContractInfiniteReadsConfig<TContracts>['contracts'];
    getNextPageParam: InfiniteQueryConfig<unknown[], Error>['getNextPageParam'];
};

declare type UseContractReadConfig<TAbi = Abi, TFunctionName = string> = ReadContractConfig<TAbi, TFunctionName, {
    isAbiOptional: true;
    isAddressOptional: true;
    isArgsOptional: true;
    isFunctionNameOptional: true;
}> & QueryConfig<ReadContractResult<TAbi, TFunctionName>, Error> & {
    /** If set to `true`, the cache will depend on the block number */
    cacheOnBlock?: boolean;
    /** Subscribe to changes */
    watch?: boolean;
};
declare function useContractRead<TAbi extends Abi | readonly unknown[], TFunctionName extends string>({ abi, address, args, cacheOnBlock, cacheTime, chainId: chainId_, enabled: enabled_, functionName, isDataEqual, onError, onSettled, onSuccess, overrides, scopeKey, select, staleTime, structuralSharing, suspense, watch, }?: UseContractReadConfig<TAbi, TFunctionName>): UseQueryResult<_wagmi_core_internal.GetReturnType<{
    abi: TAbi;
    functionName: TFunctionName;
}>, Error>;

declare type UseContractReadsConfig<TContracts extends unknown[]> = ReadContractsConfig<TContracts, {
    isAbiOptional: true;
    isAddressOptional: true;
    isArgsOptional: true;
    isContractsOptional: true;
    isFunctionNameOptional: true;
}> & QueryConfig<ReadContractsResult<TContracts>, Error> & {
    /** If set to `true`, the cache will depend on the block number */
    cacheOnBlock?: boolean;
    /** Subscribe to changes */
    watch?: boolean;
};
declare function useContractReads<TAbi extends Abi | readonly unknown[], TFunctionName extends string, TContracts extends {
    abi: TAbi;
    functionName: TFunctionName;
}[]>({ allowFailure, cacheOnBlock, cacheTime, contracts, enabled: enabled_, isDataEqual, keepPreviousData, onError, onSettled, onSuccess, overrides, scopeKey, select, staleTime, structuralSharing, suspense, watch, }?: UseContractReadsConfig<TContracts>): UseQueryResult<ReadContractsResult<TContracts>, Error>;

declare type UseContractWriteArgs<TAbi extends Abi | readonly unknown[] = Abi, TFunctionName extends string = string> = WriteContractArgs<TAbi, TFunctionName, {
    isAbiOptional: true;
    isAddressOptional: true;
    isArgsOptional: true;
    isFunctionNameOptional: true;
    isRequestOptional: true;
}>;
declare type UseContractWriteConfig<TAbi extends Abi | readonly unknown[] = Abi, TFunctionName extends string = string> = MutationConfig<WriteContractResult, Error, UseContractWriteArgs> & UseContractWriteArgs<TAbi, TFunctionName>;
declare type UseContractWriteMutationArgs<Mode extends 'prepared' | 'recklesslyUnprepared', TAbi extends Abi | readonly unknown[] = Abi, TFunctionName extends string = string> = Mode extends 'prepared' ? undefined : {
    /**
     * Recklessly pass through unprepared config. Note: This has
     * [UX pitfalls](https://wagmi.sh/docs/prepare-hooks/intro#ux-pitfalls-without-prepare-hooks),
     * it is highly recommended to not use this and instead prepare the config upfront
     * using the `usePrepareContractWrite` function.
     */
    recklesslySetUnpreparedArgs?: WriteContractArgs<TAbi, TFunctionName>['args'];
    recklesslySetUnpreparedOverrides?: WriteContractArgs<TAbi, TFunctionName>['overrides'];
};
/**
 * @description Hook for calling an ethers Contract [write](https://docs.ethers.io/v5/api/contract/contract/#Contract--write)
 * method.
 *
 * It is highly recommended to pair this with the [`usePrepareContractWrite` hook](/docs/prepare-hooks/usePrepareContractWrite)
 * to [avoid UX pitfalls](https://wagmi.sh/docs/prepare-hooks/intro#ux-pitfalls-without-prepare-hooks).
 *
 * @example
 * import { useContractWrite, usePrepareContractWrite } from 'wagmi'
 *
 * const { config } = usePrepareContractWrite({
 *  address: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
 *  abi: wagmigotchiABI,
 *  functionName: 'feed',
 * })
 * const { data, isLoading, isSuccess, write } = useContractWrite(config)
 *
 */
declare function useContractWrite<TAbi extends Abi | readonly unknown[], TFunctionName extends string>({ address, args, chainId, abi, functionName, mode, overrides, request, onError, onMutate, onSettled, onSuccess, }?: UseContractWriteConfig<TAbi, TFunctionName>): {
    data: _wagmi_core.SendTransactionResult | undefined;
    error: Error | null;
    isError: boolean;
    isIdle: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    reset: () => void;
    status: "success" | "error" | "loading" | "idle";
    variables: UseContractWriteArgs<Abi, string> | undefined;
    write: ((overrideConfig?: UseContractWriteMutationArgs<typeof mode, TAbi, TFunctionName>) => void) | undefined;
    writeAsync: ((overrideConfig?: UseContractWriteMutationArgs<typeof mode, TAbi, TFunctionName>) => Promise<_wagmi_core.SendTransactionResult>) | undefined;
};

declare type UsePrepareContractWriteConfig<TAbi = Abi, TFunctionName extends string = string, TSigner extends Signer = Signer> = PrepareWriteContractConfig<TAbi, TFunctionName, TSigner, {
    isAbiOptional: true;
    isAddressOptional: true;
    isArgsOptional: true;
    isFunctionNameOptional: true;
}> & QueryConfig<PrepareWriteContractResult<TAbi, TFunctionName>, Error>;
/**
 * @description Hook for preparing a contract write to be sent via [`useContractWrite`](/docs/hooks/useContractWrite).
 *
 * Eagerly fetches the parameters required for sending a contract write transaction such as the gas estimate.
 *
 * @example
 * import { useContractWrite, usePrepareContractWrite } from 'wagmi'
 *
 * const { config } = usePrepareContractWrite({
 *  address: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
 *  abi: wagmigotchiABI,
 *  functionName: 'feed',
 * })
 * const { data, isLoading, isSuccess, write } = useContractWrite(config)
 *
 */
declare function usePrepareContractWrite<TAbi extends Abi | readonly unknown[], TFunctionName extends string>({ address, abi, functionName, chainId, args, overrides, cacheTime, enabled, scopeKey, staleTime, suspense, onError, onSettled, onSuccess, }?: UsePrepareContractWriteConfig<TAbi, TFunctionName>): Pick<_tanstack_react_query.QueryObserverResult<PrepareWriteContractResult<TAbi, TFunctionName>, Error>, "data" | "error" | "isError" | "isLoading" | "isSuccess" | "isFetched" | "isFetchedAfterMount" | "isFetching" | "isRefetching" | "refetch" | "fetchStatus"> & {
    isIdle: boolean;
    status: "success" | "error" | "loading" | "idle";
    internal: Pick<_tanstack_react_query.QueryObserverResult<unknown, unknown>, "isLoadingError" | "isRefetchError" | "dataUpdatedAt" | "errorUpdatedAt" | "failureCount" | "isPaused" | "isPlaceholderData" | "isPreviousData" | "isStale" | "remove">;
} & {
    config: PrepareWriteContractResult<TAbi, TFunctionName>;
};

declare type UseTokenArgs = Partial<FetchTokenArgs>;
declare type UseTokenConfig = QueryConfig<FetchTokenResult, Error>;
declare function useToken({ address, chainId: chainId_, formatUnits, cacheTime, enabled, scopeKey, staleTime, // 24 hours
suspense, onError, onSettled, onSuccess, }?: UseTokenArgs & UseTokenConfig): UseQueryResult<FetchTokenResult, Error>;

declare type UseEnsAddressArgs = Partial<FetchEnsAddressArgs>;
declare type UseEnsAddressConfig = QueryConfig<FetchEnsAddressResult, Error>;
declare function useEnsAddress({ cacheTime, chainId: chainId_, enabled, name, scopeKey, staleTime, // 24 hours
suspense, onError, onSettled, onSuccess, }?: UseEnsAddressArgs & UseEnsAddressConfig): UseQueryResult<`0x${string}` | null, Error>;

declare type UseEnsAvatarArgs = Partial<FetchEnsAvatarArgs>;
declare type UseEnsLookupConfig = QueryConfig<FetchEnsAvatarResult, Error>;
declare function useEnsAvatar({ address, cacheTime, chainId: chainId_, enabled, scopeKey, staleTime, // 24 hours
suspense, onError, onSettled, onSuccess, }?: UseEnsAvatarArgs & UseEnsLookupConfig): UseQueryResult<string | null, Error>;

declare type UseEnsNameArgs = Partial<FetchEnsNameArgs>;
declare type UseEnsNameConfig = QueryConfig<FetchEnsNameResult, Error>;
declare function useEnsName({ address, cacheTime, chainId: chainId_, enabled, scopeKey, staleTime, // 24 hours
suspense, onError, onSettled, onSuccess, }?: UseEnsNameArgs & UseEnsNameConfig): UseQueryResult<string | null, Error>;

declare type UseEnsResolverArgs = Partial<FetchEnsResolverArgs>;
declare type UseEnsResolverConfig = QueryConfig<FetchEnsResolverResult, Error>;
declare function useEnsResolver({ cacheTime, chainId: chainId_, name, enabled, scopeKey, staleTime, // 24 hours
suspense, onError, onSettled, onSuccess, }?: UseEnsResolverArgs & UseEnsResolverConfig): UseQueryResult<_ethersproject_providers.Resolver | null, Error>;

declare type UseBlockNumberArgs = Partial<FetchBlockNumberArgs> & {
    /** Function fires when a new block is created */
    onBlock?: (blockNumber: number) => void;
    /** Subscribe to changes */
    watch?: boolean;
};
declare type UseBlockNumberConfig = QueryConfig<FetchBlockNumberResult, Error>;
declare function useBlockNumber({ cacheTime, chainId: chainId_, enabled, scopeKey, staleTime, suspense, watch, onBlock, onError, onSettled, onSuccess, }?: UseBlockNumberArgs & UseBlockNumberConfig): UseQueryResult<number, Error>;

declare type UseFeeDataArgs = Partial<FetchFeeDataArgs> & {
    /** Subscribe to changes */
    watch?: boolean;
};
declare type UseFeedDataConfig = QueryConfig<FetchFeeDataResult, Error>;
declare function useFeeData({ cacheTime, chainId: chainId_, enabled, formatUnits, scopeKey, staleTime, suspense, watch, onError, onSettled, onSuccess, }?: UseFeeDataArgs & UseFeedDataConfig): UseQueryResult<FetchFeeDataResult, Error>;

declare type UseProviderArgs = Partial<GetProviderArgs>;
declare function useProvider<TProvider extends Provider>({ chainId, }?: UseProviderArgs): TProvider;

declare type UseWebSocketProviderArgs = Partial<GetWebSocketProviderArgs>;
declare function useWebSocketProvider<TWebSocketProvider extends WebSocketProvider>({ chainId }?: UseWebSocketProviderArgs): _wagmi_core.GetWebSocketProviderResult<TWebSocketProvider>;

declare type UsePrepareSendTransactionConfig = Partial<PrepareSendTransactionArgs> & QueryConfig<PrepareSendTransactionResult, Error>;
/**
 * @description Hook for preparing a transaction to be sent via [`useSendTransaction`](/docs/hooks/useSendTransaction).
 *
 * Eagerly fetches the parameters required for sending a transaction such as the gas estimate and resolving an ENS address (if required).
 *
 * @example
 * import { useSendTransaction, usePrepareSendTransaction } from 'wagmi'
 *
 * const config = usePrepareSendTransaction({
 *   to: 'moxey.eth',
 *   value: parseEther('1'),
 * })
 * const result = useSendTransaction(config)
 */
declare function usePrepareSendTransaction({ chainId, request, cacheTime, enabled, scopeKey, staleTime, // 24 hours
suspense, onError, onSettled, onSuccess, }?: UsePrepareSendTransactionConfig): Pick<_tanstack_react_query.QueryObserverResult<PrepareSendTransactionResult, Error>, "data" | "error" | "isError" | "isLoading" | "isSuccess" | "isFetched" | "isFetchedAfterMount" | "isFetching" | "isRefetching" | "refetch" | "fetchStatus"> & {
    isIdle: boolean;
    status: "success" | "error" | "loading" | "idle";
    internal: Pick<_tanstack_react_query.QueryObserverResult<unknown, unknown>, "isLoadingError" | "isRefetchError" | "dataUpdatedAt" | "errorUpdatedAt" | "failureCount" | "isPaused" | "isPlaceholderData" | "isPreviousData" | "isStale" | "remove">;
} & {
    config: PrepareSendTransactionResult;
};

declare type UseSendTransactionArgs = Omit<SendTransactionArgs, 'request' | 'type'> & ({
    /**
     * `recklesslyUnprepared`: Allow to pass through an unprepared `request`. Note: This has
     * [UX pitfalls](https://wagmi.sh/docs/prepare-hooks/intro#ux-pitfalls-without-prepare-hooks), it
     * is highly recommended to not use this and instead prepare the request upfront
     * using the `usePrepareSendTransaction` hook.
     *
     * `prepared`: The request has been prepared with parameters required for sending a transaction
     * via the [`usePrepareSendTransaction` hook](https://wagmi.sh/docs/prepare-hooks/usePrepareSendTransaction)
     * */
    mode: 'prepared';
    /** The prepared request to send the transaction. */
    request: SendTransactionPreparedRequest['request'] | undefined;
} | {
    mode: 'recklesslyUnprepared';
    /** The unprepared request to send the transaction. */
    request?: SendTransactionUnpreparedRequest['request'];
});
declare type UseSendTransactionMutationArgs = {
    /**
     * Recklessly pass through an unprepared `request`. Note: This has
     * [UX pitfalls](https://wagmi.sh/docs/prepare-hooks/intro#ux-pitfalls-without-prepare-hooks), it is
     * highly recommended to not use this and instead prepare the request upfront
     * using the `usePrepareSendTransaction` hook.
     */
    recklesslySetUnpreparedRequest: SendTransactionUnpreparedRequest['request'];
};
declare type UseSendTransactionConfig = MutationConfig<SendTransactionResult, Error, SendTransactionArgs>;
declare type SendTransactionFn = (overrideConfig?: UseSendTransactionMutationArgs) => void;
declare type SendTransactionAsyncFn = (overrideConfig?: UseSendTransactionMutationArgs) => Promise<SendTransactionResult>;
declare type MutateFnReturnValue<Args, Fn> = Args extends {
    mode: 'recklesslyUnprepared';
} ? Fn : Fn | undefined;
/**
 * @description Hook for sending a transaction.
 *
 * It is recommended to pair this with the [`usePrepareSendTransaction` hook](/docs/prepare-hooks/usePrepareSendTransaction)
 * to [avoid UX pitfalls](https://wagmi.sh/docs/prepare-hooks/intro#ux-pitfalls-without-prepare-hooks).
 *
 * @example
 * import { useSendTransaction, usePrepareSendTransaction } from 'wagmi'
 *
 * const config = usePrepareSendTransaction({
 *   request: {
 *     to: 'moxey.eth',
 *     value: parseEther('1'),
 *   }
 * })
 * const result = useSendTransaction(config)
 */
declare function useSendTransaction<Args extends UseSendTransactionArgs = UseSendTransactionArgs>({ chainId, mode, request, onError, onMutate, onSettled, onSuccess, }: Args & UseSendTransactionConfig): {
    data: SendTransactionResult | undefined;
    error: Error | null;
    isError: boolean;
    isIdle: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    reset: () => void;
    sendTransaction: MutateFnReturnValue<Args, SendTransactionFn>;
    sendTransactionAsync: MutateFnReturnValue<Args, SendTransactionAsyncFn>;
    status: "success" | "error" | "loading" | "idle";
    variables: SendTransactionArgs | undefined;
};

declare type UseTransactionArgs = Partial<FetchTransactionArgs>;
declare type UseTransactionConfig = QueryConfig<FetchTransactionResult, Error>;
/**
 * @description Fetches transaction for hash
 *
 * @example
 * import { useTransaction } from 'wagmi'
 *
 * const result = useTransaction({
 *  chainId: 1,
 *  hash: '0x...',
 * })
 */
declare function useTransaction({ cacheTime, chainId: chainId_, enabled, hash, scopeKey, staleTime, suspense, onError, onSettled, onSuccess, }?: UseTransactionArgs & UseTransactionConfig): UseQueryResult<_ethersproject_providers.TransactionResponse, Error>;

declare type UseWaitForTransactionArgs = Partial<WaitForTransactionArgs>;
declare type UseWaitForTransactionConfig = QueryConfig<WaitForTransactionResult, Error>;
declare function useWaitForTransaction({ chainId: chainId_, confirmations, hash, timeout, wait, cacheTime, enabled, scopeKey, staleTime, suspense, onError, onSettled, onSuccess, }?: UseWaitForTransactionArgs & UseWaitForTransactionConfig): UseQueryResult<_ethersproject_providers.TransactionReceipt, Error>;

declare function deserialize(cachedString: string): PersistedClient;

declare type StandardReplacer = (key: string, value: any) => any;
declare type CircularReplacer = (key: string, value: any, referenceKey: string) => any;
/**
 * @function stringify
 *
 * @description
 * stringifier that handles circular values
 * Forked from https://github.com/planttheidea/fast-stringify
 *
 * @param value to stringify
 * @param [replacer] a custom replacer function for handling standard values
 * @param [indent] the number of spaces to indent the output by
 * @param [circularReplacer] a custom replacer function for handling circular values
 * @returns the stringified output
 */
declare function serialize(value: any, replacer?: StandardReplacer | null | undefined, indent?: number | null | undefined, circularReplacer?: CircularReplacer | null | undefined): string;

export { Client, Context, CreateClientConfig, WagmiConfig, WagmiConfigProps, createClient, deserialize, paginatedIndexesConfig, serialize, useAccount, useBalance, useBlockNumber, useClient, useConnect, useContract, useContractEvent, useContractInfiniteReads, useContractRead, useContractReads, useContractWrite, useDisconnect, useEnsAddress, useEnsAvatar, useEnsName, useEnsResolver, useFeeData, useInfiniteQuery, useMutation, useNetwork, usePrepareContractWrite, usePrepareSendTransaction, useProvider, useQuery, useQueryClient, useSendTransaction, useSignMessage, useSignTypedData, useSigner, useSwitchNetwork, useToken, useTransaction, useWaitForTransaction, useWebSocketProvider };
