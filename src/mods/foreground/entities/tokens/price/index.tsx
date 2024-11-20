import { Errors } from "@/libs/errors/errors"
import { useUserStorageContext } from "@/mods/foreground/storage/user"
import { EthereumContext } from "@/mods/universal/context/ethereum"
import { PriceV3 } from "@/mods/universal/entities/ethereum/mods/tokens/mods"
import { ZeroHexString } from "@hazae41/cubane"
import { useError, useFetch, useInterval, useQuery, useVisible } from "@hazae41/glacier"
import { Nullable } from "@hazae41/option"

export function useNativeTokenPriceV3(context: Nullable<EthereumContext>, block: Nullable<string>) {
  const storage = useUserStorageContext().getOrThrow()

  const query = useQuery(PriceV3.Native.queryOrThrow, [context, block, storage])
  useFetch(query)
  useVisible(query)
  useInterval(query, 10 * 1000)
  useError(query, Errors.onQueryError)

  return query
}

export function useContractTokenPriceV3(context: Nullable<EthereumContext>, token: Nullable<ZeroHexString>, block: Nullable<string>) {
  const storage = useUserStorageContext().getOrThrow()

  const query = useQuery(PriceV3.Contract.queryOrThrow, [context, token, block, storage])
  useFetch(query)
  useVisible(query)
  useInterval(query, 10 * 1000)
  useError(query, Errors.onQueryError)

  return query
}