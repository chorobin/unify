import { Monad, MapMonad, resolve } from '../monad';
import { Observable, isObservable } from 'rxjs';
import { flatMap as rxFlatMap } from 'rxjs/operators';
import { Iterable as ImmutableIterable } from 'immutable';
import { flatMap as maybeFlatMap, Maybe } from '../maybe';
import { flatMap as iterableFlatMap } from './iterable-flat-map';

const immutableIterableFlatMap = <T, U>(
  f: (val: T) => ImmutableIterable<number, U>,
) => (iter: ImmutableIterable<number, T>) =>
  iter.flatMap(f as (val: T | undefined) => ImmutableIterable<number, U>);

const arrayFlatMap = <T, U>(f: (val: T) => U[]) => (arr: T[]) =>
  arr.reduce((acc: U[], current: T) => acc.concat(f(current)), []);

export const flatMap = <T, U, UMonad extends Monad<U>>(
  f: (val: T) => UMonad,
) => (monad: MapMonad<UMonad, T>) =>
  resolve(
    rxFlatMap(f as (val: T) => Observable<U>),
    immutableIterableFlatMap(f as (val: T) => ImmutableIterable<number, U>),
    arrayFlatMap(f as (val: T) => U[]),
    maybeFlatMap(f as (val: T) => Maybe<U>),
    iterableFlatMap(f as (val: T) => Iterable<U>),
    monad,
  ) as UMonad;
