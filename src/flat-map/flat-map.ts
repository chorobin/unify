import { Monad, MapMonad, resolve } from '../monad';
import { Observable, isObservable } from 'rxjs';
import { flatMap as rxFlatMap } from 'rxjs/operators';
import { Iterable } from 'immutable';
import { flatMap as maybeFlatMap, Maybe } from '../maybe';

const iterableFlatMap = <T, U>(f: (val: T) => Iterable<number, U>) => (iter: Iterable<number, T>) =>
    iter.flatMap(f as (val: T | undefined) => Iterable<number, U>);

const arrayFlatMap = <T, U>(f: (val: T) => Array<U>) => 
    (arr: Array<T>) => arr.reduce((acc: Array<U>, current: T) => acc.concat(f(current)), []);

export const flatMap = <T, U, UMonad extends Monad<U>>(f: (val: T) => UMonad) => (monad: MapMonad<UMonad, T>) =>
    resolve(
        rxFlatMap(f as (val: T) => Observable<U>),
        iterableFlatMap(f as (val: T) => Iterable<number, U>),
        arrayFlatMap(f as (val: T) => Array<U>),
        maybeFlatMap(f as (val: T) => Maybe<U>),
        monad
    ) as UMonad;