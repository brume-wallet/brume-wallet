import { Errors } from "@/libs/errors/errors"
import { ChainData } from "@/libs/ethereum/mods/chain"
import { useEffectButNotFirstTime } from "@/libs/react/effect"
import { WebAuthnStorage } from "@/libs/webauthn/webauthn"
import { ContractTokenData } from "@/mods/background/service_worker/entities/tokens/data"
import { BgWallet, EthereumAuthPrivateKeyWalletData, EthereumFetchParams, EthereumQueryKey, EthereumSeededWalletData, EthereumUnauthPrivateKeyWalletData, EthereumWalletData, Wallet } from "@/mods/background/service_worker/entities/wallets/data"
import { Base16 } from "@hazae41/base16"
import { Base64 } from "@hazae41/base64"
import { Abi, Fixed } from "@hazae41/cubane"
import { Data, Fetched, FetcherMore, createQuery, useError, useFallback, useFetch, useInterval, useQuery, useVisible } from "@hazae41/glacier"
import { RpcRequestPreinit } from "@hazae41/jsonrpc"
import { Nullable, Option } from "@hazae41/option"
import { Ok, Panic, Result } from "@hazae41/result"
import { Transaction, ethers } from "ethers"
import { useMemo } from "react"
import { Background } from "../../background/background"
import { useBackgroundContext } from "../../background/context"
import { useSubscribe } from "../../storage/storage"
import { UserStorage, useUserStorageContext } from "../../storage/user"
import { SeedInstance } from "../seeds/all/helpers"
import { FgSeed } from "../seeds/data"

export interface WalletProps {
  readonly wallet: Wallet
}

export namespace FgWallet {

  export namespace All {

    export namespace BySeed {

      export type Key = BgWallet.All.BySeed.Key
      export type Data = BgWallet.All.BySeed.Data
      export type Fail = BgWallet.All.BySeed.Fail

      export const key = BgWallet.All.BySeed.key

      export function schema(uuid: Nullable<string>, storage: UserStorage) {
        if (uuid == null)
          return

        return createQuery<Key, Data, Fail>({ key: key(uuid), storage })
      }

    }

    export type Key = BgWallet.All.Key
    export type Data = BgWallet.All.Data
    export type Fail = BgWallet.All.Fail

    export const key = BgWallet.All.key

    export function schema(storage: UserStorage) {
      return createQuery<Key, Data, Fail>({ key, storage })
    }

  }

  export type Key = BgWallet.Key
  export type Data = BgWallet.Data
  export type Fail = BgWallet.Fail

  export const key = BgWallet.key

  export function schema(uuid: Nullable<string>, storage: UserStorage) {
    if (uuid == null)
      return

    return createQuery<Key, Data, Fail>({ key: key(uuid), storage })
  }

}

export function useWallet(uuid: Nullable<string>) {
  const storage = useUserStorageContext().unwrap()
  const query = useQuery(FgWallet.schema, [uuid, storage])
  useSubscribe(query, storage)
  return query
}

export function useWallets() {
  const storage = useUserStorageContext().unwrap()
  const query = useQuery(FgWallet.All.schema, [storage])
  useSubscribe(query, storage)
  return query
}

export function useWalletsBySeed(uuid: Nullable<string>) {
  const storage = useUserStorageContext().unwrap()
  const query = useQuery(FgWallet.All.BySeed.schema, [uuid, storage])
  useSubscribe(query, storage)
  return query
}

export type EthereumWalletInstance =
  | EthereumUnauthPrivateKeyWalletInstance
  | EthereumAuthPrivateKeyWalletInstance
  | EthereumSeededWalletInstance

export namespace EthereumWalletInstance {

  export async function tryFrom(wallet: EthereumWalletData, background: Background) {
    if (wallet.type === "privateKey")
      return await EthereumUnauthPrivateKeyWalletInstance.tryNew(wallet, background)
    if (wallet.type === "authPrivateKey")
      return await EthereumAuthPrivateKeyWalletInstance.tryNew(wallet, background)
    if (wallet.type === "seeded")
      return await EthereumSeededWalletInstance.tryNew(wallet, background)
    throw new Panic()
  }

}

export class EthereumSeededWalletInstance {

  constructor(
    readonly data: EthereumSeededWalletData,
    readonly seed: SeedInstance,
  ) { }

  static async tryNew(data: EthereumSeededWalletData, background: Background): Promise<Result<EthereumSeededWalletInstance, Error>> {
    return await Result.unthrow(async t => {
      const storage = new UserStorage(background)
      const seedQuery = FgSeed.schema(data.seed.uuid, storage)
      const seedState = await seedQuery?.state
      const seedData = Option.wrap(seedState?.data?.inner).ok().throw(t)

      const seed = await SeedInstance.tryFrom(seedData, background).then(r => r.throw(t))

      return new Ok(new EthereumSeededWalletInstance(data, seed))
    })
  }

  async tryGetPrivateKey(background: Background): Promise<Result<string, Error>> {
    return await this.seed.tryGetPrivateKey(this.data.path, background)
  }

  async trySignPersonalMessage(message: string, background: Background): Promise<Result<string, Error>> {
    return await this.seed.trySignPersonalMessage(this.data.path, message, background)
  }

  async trySignTransaction(transaction: Transaction, background: Background): Promise<Result<string, Error>> {
    return await this.seed.trySignTransaction(this.data.path, transaction, background)
  }

  async trySignEIP712HashedMessage(data: Abi.Typed.TypedData, background: Background): Promise<Result<string, Error>> {
    return await this.seed.trySignEIP712HashedMessage(this.data.path, data, background)
  }

}

export class EthereumUnauthPrivateKeyWalletInstance {

  constructor(
    readonly data: EthereumUnauthPrivateKeyWalletData
  ) { }

  static async tryNew(data: EthereumUnauthPrivateKeyWalletData, background: Background): Promise<Result<EthereumUnauthPrivateKeyWalletInstance, Error>> {
    return new Ok(new EthereumUnauthPrivateKeyWalletInstance(data))
  }

  async tryGetPrivateKey(background: Background): Promise<Result<string, Error>> {
    return new Ok(this.data.privateKey)
  }

  async trySignPersonalMessage(message: string, background: Background): Promise<Result<string, Error>> {
    return await Result.unthrow(async t => {
      const privateKey = await this.tryGetPrivateKey(background).then(r => r.throw(t))

      const signature = await Result.runAndDoubleWrap(async () => {
        return await new ethers.Wallet(privateKey).signMessage(message)
      }).then(r => r.throw(t))

      return new Ok(signature)
    })
  }

  async trySignTransaction(transaction: Transaction, background: Background): Promise<Result<string, Error>> {
    return await Result.unthrow(async t => {
      const privateKey = await this.tryGetPrivateKey(background).then(r => r.throw(t))

      const signature = Result.runAndDoubleWrapSync(() => {
        return new ethers.Wallet(privateKey).signingKey.sign(transaction.unsignedHash).serialized
      }).throw(t)

      return new Ok(signature)
    })
  }

  async trySignEIP712HashedMessage(data: Abi.Typed.TypedData, background: Background): Promise<Result<string, Error>> {
    return await Result.unthrow(async t => {
      const privateKey = await this.tryGetPrivateKey(background).then(r => r.throw(t))

      delete (data.types as any)["EIP712Domain"]

      const signature = await Result.runAndDoubleWrap(async () => {
        return await new ethers.Wallet(privateKey).signTypedData(data.domain as any, data.types as any, data.message)
      }).then(r => r.throw(t))

      return new Ok(signature)
    })
  }

}

export class EthereumAuthPrivateKeyWalletInstance {

  constructor(
    readonly data: EthereumAuthPrivateKeyWalletData
  ) { }

  static async tryNew(data: EthereumAuthPrivateKeyWalletData, background: Background): Promise<Result<EthereumAuthPrivateKeyWalletInstance, Error>> {
    return new Ok(new EthereumAuthPrivateKeyWalletInstance(data))
  }

  async tryGetPrivateKey(background: Background): Promise<Result<string, Error>> {
    return await Result.unthrow(async t => {
      const { idBase64, ivBase64 } = this.data.privateKey

      const id = Base64.get().tryDecodePadded(idBase64).throw(t).copyAndDispose()
      const cipher = await WebAuthnStorage.tryGet(id).then(r => r.throw(t))
      const cipherBase64 = Base64.get().tryEncodePadded(cipher).throw(t)

      const privateKeyBase64 = await background.tryRequest<string>({
        method: "brume_decrypt",
        params: [ivBase64, cipherBase64]
      }).then(r => r.throw(t).throw(t))

      using privateKeyMemory = Base64.get().tryDecodePadded(privateKeyBase64).throw(t)
      return new Ok(`0x${Base16.get().tryEncode(privateKeyMemory).throw(t)}`)
    })
  }

  async trySignPersonalMessage(message: string, background: Background): Promise<Result<string, Error>> {
    return await Result.unthrow(async t => {
      const privateKey = await this.tryGetPrivateKey(background).then(r => r.throw(t))

      const signature = await Result.runAndDoubleWrap(async () => {
        return await new ethers.Wallet(privateKey).signMessage(message)
      }).then(r => r.throw(t))

      return new Ok(signature)
    })
  }

  async trySignTransaction(transaction: Transaction, background: Background): Promise<Result<string, Error>> {
    return await Result.unthrow(async t => {
      const privateKey = await this.tryGetPrivateKey(background).then(r => r.throw(t))

      const signature = Result.runAndDoubleWrapSync(() => {
        return new ethers.Wallet(privateKey).signingKey.sign(transaction.unsignedHash).serialized
      }).throw(t)

      return new Ok(signature)
    })
  }

  async trySignEIP712HashedMessage(data: Abi.Typed.TypedData, background: Background): Promise<Result<string, Error>> {
    return await Result.unthrow(async t => {
      const privateKey = await this.tryGetPrivateKey(background).then(r => r.throw(t))

      delete (data.types as any)["EIP712Domain"]

      const signature = await Result.runAndDoubleWrap(async () => {
        return await new ethers.Wallet(privateKey).signTypedData(data.domain as any, data.types as any, data.message)
      }).then(r => r.throw(t))

      return new Ok(signature)
    })
  }

}

export interface FgEthereumContext {
  readonly uuid: string,
  readonly chain: ChainData,
  readonly background: Background
}

export interface EthereumContextProps {
  readonly context: FgEthereumContext
}

export function useEthereumContext(uuid: Nullable<string>, chain: Nullable<ChainData>) {
  const background = useBackgroundContext().unwrap()

  return useMemo<Nullable<FgEthereumContext>>(() => {
    if (uuid == null)
      return
    if (chain == null)
      return
    return { uuid, chain, background }
  }, [uuid, chain, background])
}

export async function fetchOrFail<T>(request: RpcRequestPreinit<unknown> & EthereumFetchParams, ethereum: FgEthereumContext): Promise<Fetched<T, Error>> {
  const { uuid, background, chain } = ethereum

  return await background.tryRequest<T>({
    method: "brume_eth_fetch",
    params: [uuid, chain.chainId, request]
  }).then(r => Fetched.rewrap(r.unwrap()))
}

export async function indexOrThrow(request: RpcRequestPreinit<unknown>, ethereum: FgEthereumContext) {
  const { uuid, background, chain } = ethereum

  await background.tryRequest({
    method: "brume_eth_index",
    params: [uuid, chain.chainId, request]
  }).then(r => r.unwrap().unwrap())
}

export function getTotalPricedBalance(coin: "usd", storage: UserStorage) {
  return createQuery<string, Fixed.From, never>({ key: `totalPricedBalance/${coin}`, storage })
}

export function useTotalPricedBalance(coin: "usd") {
  const storage = useUserStorageContext().unwrap()
  const query = useQuery(getTotalPricedBalance, [coin, storage])
  useFetch(query)
  useVisible(query)
  useSubscribe(query, storage)
  useError(query, Errors.onQueryError)
  useFallback(query, () => new Data(new Fixed(0n, 0)))
  return query
}

export function getTotalWalletPricedBalance(address: string, coin: "usd", storage: UserStorage) {
  return createQuery<string, Fixed.From, never>({ key: `totalWalletPricedBalance/${address}/${coin}`, storage })
}

export function useTotalWalletPricedBalance(address: string, coin: "usd") {
  const storage = useUserStorageContext().unwrap()
  const query = useQuery(getTotalWalletPricedBalance, [address, coin, storage])
  useFetch(query)
  useVisible(query)
  useSubscribe(query, storage)
  useError(query, Errors.onQueryError)
  useFallback(query, () => new Data(new Fixed(0n, 0)))
  return query
}

export function getPricedBalance(account: string, coin: "usd", context: Nullable<FgEthereumContext>, storage: UserStorage) {
  if (context == null)
    return

  return createQuery<EthereumQueryKey<unknown>, Fixed.From, Error>({
    key: {
      chainId: context.chain.chainId,
      method: "eth_getPricedBalance",
      params: [account, coin]
    },
    storage
  })
}

export function usePricedBalance(address: string, coin: "usd", context: Nullable<FgEthereumContext>) {
  const storage = useUserStorageContext().unwrap()
  const query = useQuery(getPricedBalance, [address, coin, context, storage])
  useFetch(query)
  useVisible(query)
  useSubscribe(query, storage)
  useError(query, Errors.onQueryError)
  useFallback(query, () => new Data(new Fixed(0n, 0)))
  return query
}

export function getBalance(address: string, context: Nullable<FgEthereumContext>, storage: UserStorage) {
  if (context == null)
    return

  const fetcher = async (request: RpcRequestPreinit<unknown>, more: FetcherMore = {}) =>
    await fetchOrFail<Fixed.From>(request, context)

  return createQuery<EthereumQueryKey<unknown>, Fixed.From, Error>({
    key: {
      version: 2,
      chainId: context.chain.chainId,
      method: "eth_getBalance",
      params: [address, "pending"]
    },
    fetcher,
    storage
  })
}

export function useBalance(address: string, context: Nullable<FgEthereumContext>, prices: Nullable<Fixed.From>[]) {
  const storage = useUserStorageContext().unwrap()
  const query = useQuery(getBalance, [address, context, storage])
  useFetch(query)
  useVisible(query)
  useInterval(query, 10 * 1000)
  useSubscribe(query, storage)
  useError(query, Errors.onQueryError)
  useFallback(query, () => new Data(new Fixed(0n, 0)))

  useEffectButNotFirstTime(() => {
    if (context == null)
      return
    indexOrThrow(query.key, context).catch(() => { })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context, ...prices])

  return query
}

export function getTokenPricedBalance(context: Nullable<FgEthereumContext>, account: string, token: ContractTokenData, coin: "usd", storage: UserStorage) {
  if (context == null)
    return

  return createQuery<EthereumQueryKey<unknown>, Fixed.From, Error>({
    key: {
      chainId: context.chain.chainId,
      method: "eth_getTokenPricedBalance",
      params: [account, token.address, coin]
    },
    storage
  })
}

export function useTokenPricedBalance(context: Nullable<FgEthereumContext>, address: string, token: ContractTokenData, coin: "usd") {
  const storage = useUserStorageContext().unwrap()
  const query = useQuery(getTokenPricedBalance, [context, address, token, coin, storage])
  useFetch(query)
  useVisible(query)
  useSubscribe(query, storage)
  useError(query, Errors.onQueryError)
  useFallback(query, () => new Data(new Fixed(0n, 0)))
  return query
}

export function getTokenBalance(address: string, token: ContractTokenData, context: Nullable<FgEthereumContext>, storage: UserStorage) {
  if (context == null)
    return

  const fetcher = async (request: RpcRequestPreinit<unknown>, more: FetcherMore = {}) =>
    await fetchOrFail<Fixed.From>(request, context)

  return createQuery<EthereumQueryKey<unknown>, Fixed.From, Error>({
    key: {
      chainId: context.chain.chainId,
      method: "eth_getTokenBalance",
      params: [address, token.address, "pending"]
    },
    fetcher,
    storage
  })
}

export function useTokenBalance(address: string, token: ContractTokenData, context: Nullable<FgEthereumContext>, prices: Nullable<Fixed.From>[]) {
  const storage = useUserStorageContext().unwrap()
  const query = useQuery(getTokenBalance, [address, token, context, storage])
  useFetch(query)
  useVisible(query)
  useSubscribe(query, storage)
  useError(query, Errors.onQueryError)
  useFallback(query, () => new Data(new Fixed(0n, 0)))

  useEffectButNotFirstTime(() => {
    if (context == null)
      return
    indexOrThrow(query.key, context).catch(() => { })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context, ...prices])

  return query
}
