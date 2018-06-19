import { Monad, FoldMonad } from '../monad';
import { reduce as rxReduce } from 'rxjs/operators';
import { Observable, of, isObservable } from 'rxjs';
import { isMaybe, foldLeft as maybeFold, Maybe } from '../maybe';
import { Iterable } from 'immutable';

export const fold = <T, U>(f: (acc: U, val: T) => U, seed: U) => <TMonad extends Monad<T>>(monad: TMonad) => {
    let result: FoldMonad<TMonad, U>;

    if (isObservable(monad)) {
        result = rxReduce(f, seed)(monad as Observable<T>) as FoldMonad<TMonad, U>;
    } else if (isMaybe(monad)) {
        result = maybeFold(f, seed)(monad as Maybe<T>) as FoldMonad<TMonad, U>;
    } else if (Iterable.isIterable(monad)) {
        result = (monad as Iterable<number, T>).reduce(f as (acc: U | undefined, val: T | undefined) => U, seed) as FoldMonad<TMonad, U>;
    } else if (Array.isArray(monad)) {
        result = (monad as Array<T>).reduce(f, seed) as FoldMonad<TMonad, U>;
    } else {
        throw new Error('Invalid type!');
    }

    return result;
}
