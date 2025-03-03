import { Mutators } from "@/libs/glacier/mutators"
import { Base64 } from "@hazae41/base64"
import { Bytes } from "@hazae41/bytes"
import { Data, QueryStorage, States, createQuery } from "@hazae41/glacier"
import { AesGcmPbkdf2ParamsBase64, HmacPbkdf2ParamsBase64, Pbdkf2Params, Pbkdf2ParamsBase64, Pbkdf2ParamsBytes } from "./crypto"

export type User =
  | UserRef
  | UserData

export interface UserProps {
  readonly user: User
}

export interface UserDataProps {
  readonly user: UserData
}

export interface UserRef {
  readonly ref: true
  readonly uuid: string
}

export namespace UserRef {

  export function create(uuid: string): UserRef {
    return { ref: true, uuid }
  }

  export function from(user: User): UserRef {
    return create(user.uuid)
  }

}

export interface UserInit {
  readonly uuid: string,
  readonly name: string,
  readonly color: number

  readonly password: string
}

export interface UserData {
  readonly uuid: string,
  readonly name: string,
  readonly color: number

  readonly keyParamsBase64: HmacPbkdf2ParamsBase64
  readonly valueParamsBase64: AesGcmPbkdf2ParamsBase64

  readonly passwordParamsBase64: Pbkdf2ParamsBase64
  readonly passwordHashBase64: string
}

export namespace BgUser {

  export namespace All {

    export type K = string
    export type D = User[]
    export type F = never

    export const key = `users`

    export function schema(storage: QueryStorage) {
      return createQuery<K, D, F>({ key, storage })
    }

  }

  export namespace Current {

    export type K = string
    export type D = User
    export type F = never

    export const key = `user/current`

    export function schema() {
      return createQuery<K, D, F>({ key })
    }

  }

  export type K = string
  export type D = UserData
  export type F = never

  export function key(uuid: string) {
    return `user/${uuid}`
  }

  export function schema(uuid: string, storage: QueryStorage) {
    const indexer = async (states: States<D, F>) => {
      const { current, previous } = states

      const previousData = previous?.real?.current.ok()?.getOrNull()
      const currentData = current.real?.current.ok()?.getOrNull()

      await All.schema(storage).mutateOrThrow(Mutators.mapData((d = new Data([])) => {
        if (previousData?.uuid === currentData?.uuid)
          return d
        if (previousData != null)
          d = d.mapSync(p => p.filter(x => x.uuid !== previousData.uuid))
        if (currentData != null)
          d = d.mapSync(p => [...p, UserRef.from(currentData)])
        return d
      }))
    }

    return createQuery<K, D, F>({ key: key(uuid), storage, indexer })
  }

  export async function createOrThrow(init: UserInit): Promise<UserData> {
    const { uuid, name, color, password } = init

    const pbkdf2 = await crypto.subtle.importKey("raw", Bytes.fromUtf8(password), { name: "PBKDF2" }, false, ["deriveBits"])

    const keyParamsBase64: HmacPbkdf2ParamsBase64 = {
      derivedKeyType: {
        name: "HMAC",
        hash: "SHA-256"
      },
      algorithm: Pbdkf2Params.stringify({
        name: "PBKDF2",
        hash: "SHA-256",
        iterations: 1_000_000,
        salt: Bytes.random(16)
      })
    }

    const valueParamsBase64: AesGcmPbkdf2ParamsBase64 = {
      derivedKeyType: {
        name: "AES-GCM",
        length: 256
      },
      algorithm: Pbdkf2Params.stringify({
        name: "PBKDF2",
        hash: "SHA-256",
        iterations: 1_000_000,
        salt: Bytes.random(16)
      })
    }

    const passwordParamsBytes: Pbkdf2ParamsBytes = {
      name: "PBKDF2",
      hash: "SHA-256",
      iterations: 1_000_000,
      salt: Bytes.random(16)
    }

    const passwordParamsBase64 = Pbdkf2Params.stringify(passwordParamsBytes)
    const passwordHashBytes = new Uint8Array(await crypto.subtle.deriveBits(passwordParamsBytes, pbkdf2, 256))
    const passwordHashBase64 = Base64.get().getOrThrow().encodePaddedOrThrow(passwordHashBytes)

    return { uuid, name, color, keyParamsBase64, valueParamsBase64, passwordParamsBase64, passwordHashBase64 }
  }

}