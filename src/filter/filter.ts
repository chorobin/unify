import { Monad, resolve } from "../monad";
import { filter as rxFilter } from 'rxjs/operators';
import { Iterable } from 'immutable';
import { filter as maybeFilter } from '../maybe';

const iterableFilter = <T>(predicate: (val: T) => boolean) => (iterable: Iterable<number, T>) =>
    iterable.filter(predicate as (val: T | undefined) => boolean);

const arrayFilter = <T>(predicate: (val: T) => boolean) => (array: Array<T>) =>
    array.filter(predicate);

export const filter = <T>(predicate: (val: T) => boolean) => <TMonad extends Monad<T>>(monad: TMonad) => 
    resolve(rxFilter(predicate), iterableFilter(predicate), arrayFilter(predicate), maybeFilter(predicate), monad) as TMonad;