import { RefObject, SetStateAction, useCallback, useRef, useState } from "react"
import { Setter } from "./state"

export type RefState<T> = [RefObject<T>, Setter<T>]

export function useRefState<T>(init?: T): RefState<T | undefined>;

export function useRefState<T>(init: T): RefState<T> {
  const ref = useRef(init)

  const [, setCounter] = useState(0)

  const setter = useCallback((action: SetStateAction<T>) => {
    const result = action instanceof Function
      ? action(ref.current)
      : action
    ref.current = result
    setCounter(x => x + 1)
  }, [])

  return [ref, setter]
}
