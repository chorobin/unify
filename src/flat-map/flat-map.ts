import { Monad, MapMonad } from '../monad';
import { Observable, isObservable } from 'rxjs';
import { flatMap as rxFlatMap } from 'rxjs/operators';
import { Iterable } from 'immutable';
import { isMaybe, flatMap as maybeFlatMap, Maybe } from '../maybe';

const flatMapArray = <T, U>(f: (val: T) => Array<U>) => (arr: Array<T>) => arr.reduce((acc: Array<U>, current: T) => acc.concat(f(current)), []);

export const flatMap = <T, U, UMonad extends Monad<U>>(f: (val: T) => UMonad) => (monad: MapMonad<UMonad, T>) => {
    let result: UMonad;

    if (isObservable(monad)) {
        result = rxFlatMap(f as (val: T) => Observable<U>)(monad as Observable<T>) as UMonad
    } else if (Iterable.isIterable(monad)) {
        result = (monad as Iterable<number, T>).flatMap(f as ((val: T | undefined) => UMonad)) as UMonad
    } else if (isMaybe(monad)) {
        result = maybeFlatMap(f as (val: T) => Maybe<U>)(monad as Maybe<T>) as UMonad;
    } else if (Array.isArray(monad)) {
        result = flatMapArray(f as (val: T) => Array<U>)(monad as Array<T>) as UMonad
    } else {
        throw new Error('Invalid type');
    }

    return result;
}
