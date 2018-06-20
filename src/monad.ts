import { Observable, isObservable as rxIsObservable } from 'rxjs';
import { Iterable } from 'immutable';
import { Maybe } from './maybe/maybe';

export type MapMonad<TMonad, U> = TMonad extends Observable<infer T> ? Observable<U>
    : TMonad extends Array<infer T> ? Array<U>
    : TMonad extends Iterable<infer K, infer T> ? Iterable<K, U>
    : TMonad extends Maybe<infer T> ? Maybe<U> 
    : never;

export type FoldMonad<TMonad, U> = TMonad extends Observable<infer T> ? Observable<U>
    : TMonad extends Array<infer T> ? U
    : TMonad extends Iterable<infer K, infer T> ? U
    : TMonad extends Maybe<infer T> ? U
    : never;

export type Monad<T> = Iterable<number, T> | Observable<T> | Array<T> | Maybe<T>;

export function isObservable<T>(monad: Monad<T>): monad is Observable<T> {
    return rxIsObservable(monad);
}

export function isIterable<T>(monad: Monad<T>): monad is Iterable<number, T> {
    return Iterable.isIterable(monad);
}

export function isArray<T>(monad: Monad<T>): monad is Array<T> {
    return Array.isArray(monad);
}

export function isMaybe<T>(couldBeMaybe: Monad<T>): couldBeMaybe is Maybe<T> {
    return (couldBeMaybe as Maybe<T>).isNothing !== undefined;
}

export const resolve = <T, R1, R2, R3, R4, TMonad extends Monad<T>>(
    ifObservable: (observable: Observable<T>) => R1,
    ifIterable: (iterable: Iterable<number, T>) => R2,
    ifArray: (array: Array<T>) => R3,
    ifMaybe: (maybe: Maybe<T>) => R4,
    monad: TMonad
) => {
    if (isObservable<T>(monad)) {
        return ifObservable(monad);
    } else if (isIterable<T>(monad)) {
        return ifIterable(monad);
    } else if (isArray<T>(monad)) {
        return ifArray(monad);
    } else if (isMaybe(monad)) {
        return ifMaybe(monad);
    } else {
        throw new Error('Invlid type!');
    }
};