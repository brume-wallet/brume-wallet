import { Mutators } from "@/libs/xswr/mutators"
import { BgContractToken, ContractTokenData, ContractTokenRef } from "@/mods/background/service_worker/entities/tokens/data"
import { useSubscribe } from "@/mods/foreground/storage/storage"
import { UserStorage, useUserStorageContext } from "@/mods/foreground/storage/user"
import { Data, States, createQuery, useQuery } from "@hazae41/glacier"

export namespace FgContractToken {

  export namespace All {

    export function schema(storage: UserStorage) {
      return createQuery<string, ContractTokenRef[], never>({ key: BgContractToken.All.key, storage })
    }

  }

  export function schema(chainId: number, address: string, storage: UserStorage) {
    const indexer = async (states: States<ContractTokenData, never>) => {
      const { current, previous } = states

      const previousData = previous?.real?.data?.inner
      const currentData = current.real?.data?.inner

      if (previousData?.uuid === currentData?.uuid)
        return

      if (previousData != null) {
        await All.schema(storage)?.mutate(Mutators.mapData((d = new Data([])) => {
          return d.mapSync(p => p.filter(x => x.uuid !== previousData.uuid))
        }))
      }

      if (currentData != null) {
        await All.schema(storage)?.mutate(Mutators.mapData((d = new Data([])) => {
          return d.mapSync(p => [...p, ContractTokenRef.from(currentData)])
        }))
      }
    }

    return createQuery<string, ContractTokenData, never>({
      key: BgContractToken.key(chainId, address),
      indexer,
      storage
    })
  }

}

export function useToken(chainId: number, address: string) {
  const storage = useUserStorageContext().unwrap()
  const query = useQuery(FgContractToken.schema, [chainId, address, storage])
  useSubscribe(query as any, storage)
  return query
}

export function useTokens() {
  const storage = useUserStorageContext().unwrap()
  const query = useQuery(FgContractToken.All.schema, [storage])
  useSubscribe(query as any, storage)
  return query
}