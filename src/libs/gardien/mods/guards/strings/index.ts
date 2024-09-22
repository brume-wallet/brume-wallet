import { Errorer } from "../../errorer"
import { Guard } from "../../guard"
import { Super } from "../../super"
import { LengthGuard, Max, MaxLengthGuard, Min, MinLengthGuard } from "../lengths"
import { InterGuard } from "../logicals"

export function string(message?: string) {
  return new StringGuardBuilder(new Errorer(StringGuard, () => new Error(message)))
}

export function stringable(message?: string) {
  return new StringGuardBuilder(new Errorer(StringableGuard, () => new Error(message)))
}

export class StringableGuard {

  constructor() { }

  static asOrThrow(value?: any): string {
    return String(value)
  }

  asOrThrow(value?: any): string {
    return String(value)
  }

}

export class StringGuard {

  constructor() { }

  static asOrThrow<X extends string>(value: X): X

  static asOrThrow<X>(value: Super<X, string>): string

  static asOrThrow(value: unknown): string {
    if (typeof value !== "string")
      throw new Error()
    return value
  }

  asOrThrow<X extends string>(value: X): X

  asOrThrow<X>(value: Super<X, string>): string

  asOrThrow(value: unknown): string {
    if (typeof value !== "string")
      throw new Error()
    return value
  }

}

export class StringGuardBuilder<I, O extends string> {

  constructor(
    readonly guard: Guard<I, O>
  ) { }

  asOrThrow(value: I): string {
    return this.guard.asOrThrow(value)
  }

  pipe<P extends string>(guard: Guard<O, P>, message?: string): StringGuardBuilder<I, P> {
    return new StringGuardBuilder<I, P>(new Errorer(new InterGuard(this.guard, guard), () => new Error(message)))
  }

  min<N extends number>(length: N, message?: string): StringGuardBuilder<I, O & { length: Min<N> }> {
    return this.pipe(new MinLengthGuard<O, N>(length), message)
  }

  max<N extends number>(length: N, message?: string): StringGuardBuilder<I, O & { length: Max<N> }> {
    return this.pipe(new MaxLengthGuard<O, N>(length), message)
  }

  minmax<A extends number, B extends number>(min: A, max: B, message?: string): StringGuardBuilder<I, O & { length: Min<A> & Max<B> }> {
    return this.pipe(new InterGuard(new MinLengthGuard<O, A>(min), new MaxLengthGuard<O & { length: Min<A> }, B>(max)), message)
  }

  length<N extends number>(length: N, message?: string): StringGuardBuilder<I, O & { length: N }> {
    return this.pipe(new LengthGuard<O, N>(length), message)
  }

  includes<S extends string>(value: S, message?: string): StringGuardBuilder<I, O & StringIncludes<S>> {
    return this.pipe(new StringIncludesGuard<O, S>(value), message)
  }

}

declare const StringIncludesSymbol: unique symbol

export interface StringIncludes<S extends string> {
  readonly [StringIncludesSymbol]: S
}

export class StringIncludesGuard<T extends string, S extends string> {

  constructor(
    readonly value: S
  ) { }

  asOrThrow(value: T): T & StringIncludes<S> {
    if (!value.includes(this.value))
      throw new Error()
    return value as T & StringIncludes<S>
  }

}