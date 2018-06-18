import { Monad, MonadType } from '../monad';
import { Observable, isObservable } from 'rxjs';
import { flatMap as rxFlatMap } from 'rxjs/operators';
import { Iterable } from 'immutable';

const flatMapArray = <T, U>(f: (val: T) => Array<U>) => (arr: Array<T>) => arr.reduce((acc: Array<U>, current: T) => acc.concat(f(current)), []);

export const flatMap = <T, U, UMonad extends Monad<U>>(f: (val: T) => UMonad) => (monad: MonadType<UMonad, T>) => {
    let result: UMonad;

    if (isObservable(monad)) {
        result = rxFlatMap(f as (val: T) => Observable<U>)(monad as Observable<T>) as UMonad
    } else if (Iterable.isIterable(monad)) {
        result = (monad as Iterable<number, T>).flatMap(f as ((val: T | undefined) => UMonad)) as UMonad
    } else if (Array.isArray(monad)) {
        result = flatMapArray(f as (val: T) => Array<U>)(monad as Array<T>) as UMonad
    } else {
        throw new Error('Invalid type');
    }

    return result;
}
