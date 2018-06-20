import { Monad, MapMonad, resolve } from '../monad';
import { map as rxMap } from 'rxjs/operators';
import { map as maybeMap } from '../maybe/maybe';
import { Iterable } from 'immutable';

const arrayMap = <T, U>(f: (val: T) => U) => (arr: Array<T>) =>
    arr.map(f);

const iterableMap = <T, U>(f: (val: T) => U) => (iter: Iterable<number, T>) =>
    iter.map(f as (val: T | undefined) => U);

export const map = <T, U>(f: (val: T) => U) => <TMonad extends Monad<T>>(monad: TMonad) => 
    resolve(rxMap(f), iterableMap(f), arrayMap(f), maybeMap(f), monad) as MapMonad<TMonad, U>;
