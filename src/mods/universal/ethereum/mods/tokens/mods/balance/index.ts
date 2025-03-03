import { ZeroHexBigInt } from "@/libs/bigints/bigints"
import { EthereumChainlessRpcRequestPreinit } from "@/mods/background/service_worker/entities/wallets/data"
import { Ethereum } from "@/mods/universal/ethereum"
import { EthereumContext } from "@/mods/universal/ethereum/mods/context"
import { User } from "@/mods/universal/user"
import { Address, Fixed } from "@hazae41/cubane"
import { createQuery, Data, JsonRequest, QueryStorage, States } from "@hazae41/glacier"
import { None, Nullable, Option, Some } from "@hazae41/option"
import { Tokens } from "../.."
import { BlockNumber } from "../../../blocks"
import { ERC20, ERC20Metadata } from "../erc20"

export namespace Balance {

  export namespace Native {

    export type K = JsonRequest.From<EthereumChainlessRpcRequestPreinit<unknown>>
    export type D = Fixed.From
    export type F = Error

    export function keyOrThrow(chainId: number, account: Address, block: BlockNumber) {
      const body = {
        method: "eth_getNativeTokenBalance",
        params: [account, block]
      } as const

      return new JsonRequest(`app:/ethereum/${chainId}`, { method: "POST", body })
    }

    export function queryOrThrow(context: Nullable<EthereumContext>, account: Nullable<Address>, block: Nullable<BlockNumber>, storage: QueryStorage) {
      if (context == null)
        return
      if (account == null)
        return
      if (block == null)
        return

      const fetcher = async (_: K, init: RequestInit) => {
        const { signal, cache } = init

        const balanceFetched = await Ethereum.GetBalance.queryOrThrow(context, account, block, storage)!.fetchOrThrow({ signal, cache }).then(r => Option.wrap(r.getAny().real?.current).getOrThrow())

        if (balanceFetched.isErr())
          return balanceFetched

        const balanceBigInt = ZeroHexBigInt.from(balanceFetched.get()).value
        const balanceFixed = new Fixed(balanceBigInt, 18)

        return new Data(balanceFixed, balanceFetched)
      }

      return createQuery<K, D, F>({
        key: keyOrThrow(context.chain.chainId, account, block),
        fetcher,
        storage
      })
    }

  }

  export namespace Contract {

    export type K = JsonRequest.From<EthereumChainlessRpcRequestPreinit<unknown>>
    export type D = Fixed.From
    export type F = Error

    export function keyOrThrow(chainId: number, contract: Address, account: Address, block: BlockNumber) {
      const body = {
        method: "eth_getContractTokenBalance",
        params: [contract, account, block]
      } as const

      return new JsonRequest(`app:/ethereum/${chainId}`, { method: "POST", body })
    }

    export function queryOrThrow(context: Nullable<EthereumContext>, contract: Nullable<Address>, account: Nullable<Address>, block: Nullable<BlockNumber>, storage: QueryStorage) {
      if (context == null)
        return
      if (contract == null)
        return
      if (account == null)
        return
      if (block == null)
        return

      const fetcher = async (_: K, init: RequestInit) => {
        const { signal, cache } = init

        const decimalsFetched = await ERC20Metadata.Decimals.queryOrThrow(context, contract, block, storage)!.fetchOrThrow().then(r => Option.wrap(r.getAny().real?.current).getOrThrow())

        if (decimalsFetched.isErr())
          return decimalsFetched

        const balanceFetched = await ERC20.BalanceOf.queryOrThrow(context, contract, account, block, storage)!.fetchOrThrow({ signal, cache }).then(r => Option.wrap(r.getAny().real?.current).getOrThrow())

        if (balanceFetched.isErr())
          return balanceFetched

        const balanceBigInt = ZeroHexBigInt.from(balanceFetched.get()).value
        const balanceFixed = new Fixed(balanceBigInt, decimalsFetched.get())

        return new Data(balanceFixed, balanceFetched)
      }

      return createQuery<K, D, F>({
        key: keyOrThrow(context.chain.chainId, contract, account, block),
        fetcher,
        storage
      })
    }

  }

  export namespace Priced {

    export namespace Total {

      export namespace ByWallet {

        export type K = JsonRequest.From<EthereumChainlessRpcRequestPreinit<unknown>>
        export type D = Fixed.From
        export type F = never

        export function keyOrThrow(account: Address) {
          const body = {
            method: "eth_getTotalBalance",
            params: [account]
          } as const

          return new JsonRequest(`app:/ethereum`, { method: "POST", body })
        }

        export function queryOrThrow(account: Nullable<Address>, storage: QueryStorage) {
          if (account == null)
            return

          const indexer = async (states: States<D, F>) => {
            const { current } = states

            const data = current.real?.current.checkOrNull()
            const [value = new Fixed(0n, 0)] = [data?.get()]

            await User.Balance.Priced.Index.queryOrThrow(storage)?.mutateOrThrow(s => {
              const { current } = s

              const [count = 0] = [current?.getOrNull()?.[account]?.count]

              if (current == null)
                return new Some(new Data({ [account]: { value, count } }))
              if (current.isErr())
                return new None()

              return new Some(current.mapSync(c => ({ ...c, [account]: { value, count } })))
            })
          }

          return createQuery<K, D, F>({
            key: keyOrThrow(account),
            indexer,
            storage
          })
        }

      }

      export namespace ByWalletAndChain {

        export type K = JsonRequest.From<EthereumChainlessRpcRequestPreinit<unknown>>
        export type D = Fixed.From
        export type F = never

        export function keyOrThrow(chainId: number, account: Address, block: BlockNumber) {
          const body = {
            method: "eth_getTotalBalance",
            params: [account, block]
          } as const

          return new JsonRequest(`app:/ethereum/${chainId}`, { method: "POST", body })
        }

        export function queryOrThrow(context: Nullable<EthereumContext>, account: Nullable<Address>, block: Nullable<BlockNumber>, storage: QueryStorage) {
          if (context == null)
            return
          if (account == null)
            return
          if (block == null)
            return

          const indexer = async (states: States<D, F>) => {
            const { current } = states

            const data = current.real?.current.checkOrNull()
            const [value = new Fixed(0n, 0)] = [data?.get()]

            await Index.ByWallet.queryOrThrow(account, storage)?.mutateOrThrow(s => {
              const { current } = s

              if (current == null)
                return new Some(new Data({ [context.chain.chainId]: value }))
              if (current.isErr())
                return new None()

              return new Some(current.mapSync(c => ({ ...c, [context.chain.chainId]: value })))
            })
          }

          return createQuery<K, D, F>({
            key: keyOrThrow(context.chain.chainId, account, block),
            indexer,
            storage
          })
        }

      }

    }

    export namespace Index {

      export namespace ByWallet {

        export type K = JsonRequest.From<EthereumChainlessRpcRequestPreinit<unknown>>
        export type D = Record<string, Fixed.From>
        export type F = never

        export function keyOrThrow(account: Address) {
          const body = {
            method: "eth_getBalances",
            params: [account]
          } as const

          return new JsonRequest(`app:/ethereum`, { method: "POST", body })
        }

        export function queryOrThrow(account: Nullable<Address>, storage: QueryStorage) {
          if (account == null)
            return

          const indexer = async (states: States<D, F>) => {
            const values = Option.wrap(states.current.real?.data).mapSync(d => d.inner).getOr({})
            const total = Object.values(values).reduce<Fixed>((x, y) => Fixed.from(y).add(x), new Fixed(0n, 0))

            const totalQuery = Total.ByWallet.queryOrThrow(account, storage)
            await totalQuery!.mutateOrThrow(() => new Some(new Data(total)))
          }

          return createQuery<K, D, F>({
            key: keyOrThrow(account),
            indexer,
            storage
          })
        }

      }

      export namespace ByWalletAndChain {

        export type K = JsonRequest.From<EthereumChainlessRpcRequestPreinit<unknown>>
        export type D = Record<string, Fixed.From>
        export type F = never

        export function keyOrThrow(chainId: number, account: Address, block: BlockNumber) {
          const body = {
            method: "eth_getBalances",
            params: [account, block]
          } as const

          return new JsonRequest(`app:/ethereum/${chainId}`, { method: "POST", body })
        }

        export function queryOrThrow(context: Nullable<EthereumContext>, account: Nullable<Address>, block: Nullable<BlockNumber>, storage: QueryStorage) {
          if (context == null)
            return
          if (account == null)
            return
          if (block == null)
            return

          const indexer = async (states: States<D, F>) => {
            const values = Option.wrap(states.current.real?.data).mapSync(d => d.inner).getOr({})
            const total = Object.values(values).reduce<Fixed>((x, y) => Fixed.from(y).add(x), new Fixed(0n, 0))

            const totalQuery = Total.ByWalletAndChain.queryOrThrow(context, account, block, storage)
            await totalQuery!.mutateOrThrow(() => new Some(new Data(total)))
          }

          return createQuery<K, D, F>({
            key: keyOrThrow(context.chain.chainId, account, block),
            indexer,
            storage
          })
        }

      }

    }

    export namespace Native {

      export type K = JsonRequest.From<EthereumChainlessRpcRequestPreinit<unknown>>
      export type D = Fixed.From
      export type F = Error

      export function keyOrThrow(chainId: number, account: Address, block: BlockNumber) {
        const body = {
          method: "eth_getNativeTokenPricedBalance",
          params: [account, block]
        } as const

        return new JsonRequest(`app:/ethereum/${chainId}`, { method: "POST", body })
      }

      export function queryOrThrow(context: Nullable<EthereumContext>, account: Nullable<Address>, block: Nullable<BlockNumber>, storage: QueryStorage) {
        if (context == null)
          return
        if (account == null)
          return
        if (block == null)
          return

        const fetcher = async (_: K, init: RequestInit) => {
          const { signal, cache } = init

          const valuedBalanceFetched = await Balance.Native.queryOrThrow(context, account, block, storage)!.fetchOrThrow({ signal, cache }).then(r => Option.wrap(r.getAny().real?.current).getOrThrow())

          if (valuedBalanceFetched.isErr())
            return valuedBalanceFetched

          const priceFetched = await Tokens.Price.Native.queryOrThrow(context, block, storage)!.fetchOrThrow({ signal, cache }).then(r => Option.wrap(r.getAny().real?.current).getOrThrow())

          if (priceFetched.isErr())
            return priceFetched

          const priceFixed = Fixed.from(priceFetched.get())

          const valuedBalanceFixed = Fixed.from(valuedBalanceFetched.get())
          const pricedBalanceFixed = valuedBalanceFixed.mul(priceFixed)

          return new Data(pricedBalanceFixed, valuedBalanceFetched)
        }

        const indexer = async (states: States<D, F>) => {
          const { current } = states

          const data = current.real?.current.checkOrNull()
          const [value = new Fixed(0n, 0)] = [data?.get()]

          await Index.ByWalletAndChain.queryOrThrow(context, account, block, storage)!.mutateOrThrow(s => {
            const { current } = s

            if (current == null)
              return new Some(new Data({ ["0x0"]: value }))
            if (current.isErr())
              return new None()

            return new Some(current.mapSync(c => ({ ...c, ["0x0"]: value })))
          })
        }

        return createQuery<K, D, F>({
          key: keyOrThrow(context.chain.chainId, account, block),
          fetcher,
          indexer,
          storage
        })
      }

    }

    export namespace Contract {

      export type K = JsonRequest.From<EthereumChainlessRpcRequestPreinit<unknown>>
      export type D = Fixed.From
      export type F = Error

      export function keyOrThrow(chainId: number, contract: Address, account: Address, block: BlockNumber) {
        const body = {
          method: "eth_getContractTokenPricedBalance",
          params: [contract, account, block]
        } as const

        return new JsonRequest(`app:/ethereum/${chainId}`, { method: "POST", body })
      }

      export function queryOrThrow(context: Nullable<EthereumContext>, contract: Nullable<Address>, account: Nullable<Address>, block: Nullable<BlockNumber>, storage: QueryStorage) {
        if (context == null)
          return
        if (contract == null)
          return
        if (account == null)
          return
        if (block == null)
          return

        const fetcher = async (_: K, init: RequestInit) => {
          const { signal, cache } = init

          const valuedBalanceFetched = await Balance.Contract.queryOrThrow(context, contract, account, block, storage)!.fetchOrThrow({ signal, cache }).then(r => Option.wrap(r.getAny().real?.current).getOrThrow())

          if (valuedBalanceFetched.isErr())
            return valuedBalanceFetched

          const priceFetched = await Tokens.Price.Contract.queryOrThrow(context, contract, block, storage)!.fetchOrThrow({ signal, cache }).then(r => Option.wrap(r.getAny().real?.current).getOrThrow())

          if (priceFetched.isErr())
            return priceFetched

          const priceFixed = Fixed.from(priceFetched.get())

          const valuedBalanceFixed = Fixed.from(valuedBalanceFetched.get())
          const pricedBalanceFixed = valuedBalanceFixed.mul(priceFixed)

          return new Data(pricedBalanceFixed, valuedBalanceFetched)
        }

        const indexer = async (states: States<D, F>) => {
          const { current } = states

          const data = current.real?.current.checkOrNull()
          const [value = new Fixed(0n, 0)] = [data?.get()]

          await Index.ByWalletAndChain.queryOrThrow(context, account, block, storage)!.mutateOrThrow(s => {
            const { current } = s

            if (current == null)
              return new Some(new Data({ [contract]: value }))
            if (current.isErr())
              return new None()

            return new Some(current.mapSync(c => ({ ...c, [contract]: value })))
          })
        }

        return createQuery<K, D, F>({
          key: keyOrThrow(context.chain.chainId, contract, account, block),
          fetcher,
          indexer,
          storage
        })
      }

    }

  }
}