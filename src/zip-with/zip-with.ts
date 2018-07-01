import { Monad, resolveZip, MapMonad } from '../monad';
import { Observable, pipe } from 'rxjs';
import { map as rxMap, zip as rxZip } from 'rxjs/operators';
import { Iterable } from 'immutable';
import { zipWith as maybeZipWith, Maybe } from '../maybe';
import { zipWith as iterableZipWith } from './iterable-zip-with';

const rxZipWith = <TFirst, TSecond, TZipped>(
  zipper: (first: TFirst, second: TSecond) => TZipped,
) => (firstMonad: Observable<TFirst>, secondMonad: Observable<TSecond>) =>
  firstMonad.pipe(
    rxZip(secondMonad),
    rxMap(([first, second]: [TFirst, TSecond]) => zipper(first, second)),
  );

const immutableIterableZipWith = <TFirst, TSecond, TZipped>(
  zipper: (first: TFirst, second: TSecond) => TZipped,
) => (
  firstMonad: Iterable.Indexed<TFirst>,
  secondMonad: Iterable.Indexed<TSecond>,
) => firstMonad.zipWith(zipper, secondMonad);

const arrayZipWith = <TFirst, TSecond, TZipped>(
  zipper: (first: TFirst, second: TSecond) => TZipped,
) => (firstMonad: TFirst[], secondMonad: TSecond[]) => {
  const result: TZipped[] = [];
  const length = Math.min(firstMonad.length, secondMonad.length);

  for (let i = 0; i < length; i += 1) {
    result.push(zipper(firstMonad[i], secondMonad[i]));
  }

  return result;
};

const maybeZipWithNotCurried = <TFirst, TSecond, TZipped>(
  zipper: (first: TFirst, second: TSecond) => TZipped,
) => (first: Maybe<TFirst>, second: Maybe<TSecond>) =>
  maybeZipWith(zipper)(first)(second);

export const zipWith = <TFirst, TSecond, TZipped>(
  zipper: (first: TFirst, second: TSecond) => TZipped,
) => <TFirstMonad extends Monad<TFirst>, TSecondMonad extends Monad<TSecond>>(
  first: TFirstMonad,
  second: TSecondMonad,
) =>
  resolveZip(
    rxZipWith(zipper),
    immutableIterableZipWith(zipper),
    arrayZipWith(zipper),
    maybeZipWithNotCurried(zipper),
    iterableZipWith(zipper),
    first,
    second,
  ) as MapMonad<TFirstMonad, TZipped>;
