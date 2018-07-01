import { Monad, resolve } from '../monad';
import { filter as rxFilter } from 'rxjs/operators';
import { Iterable as ImmutableIterable } from 'immutable';
import { filter as maybeFilter } from '../maybe';
import { filter as iterableFilter } from './iterable-filter';

const immutableIterableFilter = <T>(predicate: (val: T) => boolean) => (
  iterable: ImmutableIterable<number, T>,
) => iterable.filter(predicate as (val: T | undefined) => boolean);

const arrayFilter = <T>(predicate: (val: T) => boolean) => (array: T[]) =>
  array.filter(predicate);

export const filter = <T>(predicate: (val: T) => boolean) => <
  TMonad extends Monad<T>
>(
  monad: TMonad,
) =>
  resolve(
    rxFilter(predicate),
    immutableIterableFilter(predicate),
    arrayFilter(predicate),
    maybeFilter(predicate),
    iterableFilter(predicate),
    monad,
  ) as TMonad;
