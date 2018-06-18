import { Observable, isObservable } from 'rxjs';
import { Iterable } from 'immutable';
import { Monad, MonadType } from '../monad';
import { map as rxMap } from 'rxjs/operators';
import { Maybe, isMaybe, map as maybeMap } from '../maybe/maybe';

export const map = <T, U>(f: (val: T) => U) => <TMonad extends Monad<T>>(monad: TMonad) => {
    let result: MonadType<TMonad, U>;
    if (isObservable(monad)) {
        result = rxMap(f)(monad as Observable<T>) as MonadType<TMonad, U>;
    } else if (Iterable.isIterable(monad)) {
        result = (monad as Iterable<number, T>).map(f as (val: T | undefined) => U) as MonadType<TMonad, U>
    } else if (isMaybe(monad)) {
        result = maybeMap(f)(monad as Maybe<T>) as MonadType<TMonad, U>;
    } else if (Array.isArray(monad)) {
        result = (monad as Array<T>).map(f) as MonadType<TMonad, U>;
    } else {
        throw new Error('Invalid type');
    }
    return result;
}
