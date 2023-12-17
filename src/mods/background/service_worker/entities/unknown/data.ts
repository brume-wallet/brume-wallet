import { FetcherMore, IDBStorage, createQuery } from "@hazae41/glacier"
import { RpcRequestPreinit } from "@hazae41/jsonrpc"
import { BgEthereumContext, EthereumContext, EthereumFetchParams, EthereumQueryKey } from "../wallets/data"

export namespace BgUnknown {

  export function key(chainId: number, request: RpcRequestPreinit<unknown> & EthereumFetchParams) {
    const { method, params, noCheck } = request
    return { chainId, method, params, noCheck }
  }

  export function schema(ethereum: BgEthereumContext, request: RpcRequestPreinit<unknown> & EthereumFetchParams, storage: IDBStorage) {
    const fetcher = async (request: EthereumQueryKey<unknown> & EthereumFetchParams, more: FetcherMore) =>
      await EthereumContext.fetchOrFail<unknown>(ethereum, request, more)

    return createQuery<EthereumQueryKey<unknown> & EthereumFetchParams, any, Error>({
      key: key(ethereum.chain.chainId, request),
      fetcher,
      storage
    })
  }

}