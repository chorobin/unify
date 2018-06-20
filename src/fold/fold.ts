import { Monad, FoldMonad, resolve } from '../monad';
import { reduce as rxReduce } from 'rxjs/operators';
import { foldLeft as maybeFold } from '../maybe';
import { Iterable } from 'immutable';

const iterableFold = <T, U>(f: (acc: U, val: T) => U, seed: U) => (iter: Iterable<number, T>) =>
    iter.reduce(f as (acc: U | undefined, current: T | undefined) => U, seed);

const arrayFold = <T, U>(f: (acc: U, val: T) => U, seed: U) => (array: Array<T>) =>
    array.reduce(f, seed);

export const fold = <T, U>(f: (acc: U, val: T) => U, seed: U) => <TMonad extends Monad<T>>(monad: TMonad) =>
    resolve(rxReduce(f, seed), iterableFold(f, seed), arrayFold(f, seed), maybeFold(f, seed), monad) as FoldMonad<TMonad, U>;
