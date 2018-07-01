import { Monad, MapMonad, resolve } from '../monad';
import { map as rxMap } from 'rxjs/operators';
import { map as maybeMap } from '../maybe/maybe';
import { Iterable as ImmutableIterable } from 'immutable';
import { map as iterableMap } from './iteratable-map';

const arrayMap = <T, U>(f: (val: T) => U) => (arr: T[]) => arr.map(f);

const immutableIterableMap = <T, U>(f: (val: T) => U) => (
  iter: ImmutableIterable<number, T>,
) => iter.map(f as (val: T | undefined) => U);

export const map = <T, U>(f: (val: T) => U) => <TMonad extends Monad<T>>(
  monad: TMonad,
) =>
  resolve(
    rxMap(f),
    immutableIterableMap(f),
    arrayMap(f),
    maybeMap(f),
    iterableMap(f),
    monad,
  ) as MapMonad<TMonad, U>;
