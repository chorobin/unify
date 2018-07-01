import { Observable, isObservable as rxIsObservable } from 'rxjs';
import { Iterable as ImmutableIterable, Seq } from 'immutable';
import { Maybe } from './maybe/maybe';

export type MapMonad<TMonad, U> = TMonad extends Observable<infer T>
  ? Observable<U>
  : TMonad extends Array<infer T>
    ? Array<U>
    : TMonad extends ImmutableIterable<infer K, infer T>
      ? ImmutableIterable<K, U>
      : TMonad extends ImmutableIterable.Indexed<infer T>
        ? ImmutableIterable.Indexed<U>
        : TMonad extends Maybe<infer T>
          ? Maybe<U>
          : TMonad extends Iterable<infer T> ? Iterable<U> : never;

export type FoldMonad<TMonad, U> = TMonad extends Observable<infer T>
  ? Observable<U>
  : TMonad extends Array<infer T>
    ? U
    : TMonad extends ImmutableIterable<infer K, infer T>
      ? U
      : TMonad extends Maybe<infer T>
        ? U
        : TMonad extends Iterable<infer T> ? Iterable<U> : never;

export type Monad<T> =
  | ImmutableIterable<number, T>
  | Observable<T>
  | Array<T>
  | Maybe<T>
  | ImmutableIterable.Indexed<T>
  | Iterable<T>;

export function isObservable<T>(monad: Monad<T>): monad is Observable<T> {
  return rxIsObservable(monad);
}

export function isImmutableIterable<T>(
  monad: Monad<T>,
): monad is ImmutableIterable<number, T> {
  return ImmutableIterable.isIterable(monad);
}

export function isIterableIndexed<T>(monad: Monad<T>): monad is Seq.Indexed<T> {
  return isImmutableIterable<T>(monad) && ImmutableIterable.isIndexed(monad);
}

export function isArray<T>(monad: Monad<T>): monad is Array<T> {
  return Array.isArray(monad);
}

export function isMaybe<T>(couldBeMaybe: Monad<T>): couldBeMaybe is Maybe<T> {
  return (couldBeMaybe as Maybe<T>).isNothing !== undefined;
}

export function isIterable<T>(
  couldBeIterable: Monad<T>,
): couldBeIterable is Iterable<T> {
  return !!(couldBeIterable as Iterable<T>)[Symbol.iterator];
}

export const resolve = <T, R1, R2, R3, R4, R5, TMonad extends Monad<T>>(
  ifObservable: (observable: Observable<T>) => R1,
  ifImmutableIterable: (iterable: ImmutableIterable<number, T>) => R2,
  ifArray: (array: T[]) => R3,
  ifMaybe: (maybe: Maybe<T>) => R4,
  ifIterable: (iter: Iterable<T>) => R5,
  monad: TMonad,
) => {
  if (isObservable<T>(monad)) {
    return ifObservable(monad);
  } else if (isImmutableIterable<T>(monad)) {
    return ifImmutableIterable(monad);
  } else if (isArray<T>(monad)) {
    return ifArray(monad);
  } else if (isMaybe<T>(monad)) {
    return ifMaybe(monad);
  } else if (isIterable<T>(monad)) {
    return ifIterable(monad);
  } else {
    throw new Error('Invlid type!');
  }
};

export const resolveZip = <
  TFirst,
  TSecond,
  R1,
  R2,
  R3,
  R4,
  R5,
  TFirstMonad extends Monad<TFirst>,
  TSecondMonad extends Monad<TSecond>
>(
  ifObservable: (first: Observable<TFirst>, second: Observable<TSecond>) => R1,
  ifIndexSeq: (
    first: ImmutableIterable.Indexed<TFirst>,
    second: ImmutableIterable.Indexed<TSecond>,
  ) => R2,
  ifArray: (first: TFirst[], second: TSecond[]) => R3,
  ifMaybe: (first: Maybe<TFirst>, second: Maybe<TSecond>) => R4,
  ifIterable: (first: Iterable<TFirst>, second: Iterable<TSecond>) => R5,
  first: TFirstMonad,
  second: TSecondMonad,
) => {
  if (isObservable<TFirst>(first) && isObservable<TSecond>(second)) {
    return ifObservable(first, second);
  } else if (
    isIterableIndexed<TFirst>(first) &&
    isIterableIndexed<TSecond>(second)
  ) {
    return ifIndexSeq(first, second);
  } else if (isArray<TFirst>(first) && isArray<TSecond>(second)) {
    return ifArray(first, second);
  } else if (isMaybe<TFirst>(first) && isMaybe<TSecond>(second)) {
    return ifMaybe(first, second);
  } else if (isIterable<TFirst>(first) && isIterable<TSecond>(second)) {
    return ifIterable(first, second);
  } else {
    throw new Error('Invalid type!');
  }
};
