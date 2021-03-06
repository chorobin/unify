import { map } from '../../src/map';
import { maybe, nothing, Maybe } from '../../src/maybe';
import { of, Observable } from 'rxjs';
import { map as rxMap } from 'rxjs/operators';
import { List } from 'immutable';
import 'babel-polyfill';

describe('map', () => {
  it('should multiply each element in a non-empty array by 2', () => {
    const array: number[] = [1, 2, 3];
    const fn = (x: number) => x * 2;
    const timesTwo = map(fn)(array);
    expect(timesTwo).toEqual(array.map(fn));
  });

  it('should return an empty array when applying a function to an empty array', () => {
    const array: number[] = [];
    const fn = (x: number) => x * 2;
    const timesTwo = map(fn)(array);
    expect(timesTwo).toEqual(array.map(fn));
  });

  it('should just multiply 1 by 2', () => {
    const maybeNumber: Maybe<number> = maybe(1);
    const fn = (x: number) => x * 2;
    const timesTwo = map(fn)(maybeNumber);
    expect(timesTwo).toEqual(maybe(2));
  });

  it('should nothing multiply 1 by 2', () => {
    const maybeNumber = nothing;
    const fn = (x: number) => x * 2;
    const timesTwo = map(fn)(maybeNumber);
    expect(timesTwo).toEqual(nothing);
  });

  it('should multiply each element in a non-empty stream by 2', () => {
    const stream$ = of(1, 2, 3);
    const fn = (x: number) => x * 2;
    const timesTwo$ = map(fn)(stream$);
    expect(timesTwo$).toEqual(rxMap(fn)(stream$));
  });

  it('should return an empty stream when applying a function to an empty stream', () => {
    const stream$: Observable<number> = of();
    const fn = (x: number) => x * 2;
    const timesTwo$ = map(fn)(stream$);
    expect(timesTwo$).toEqual(rxMap(fn)(stream$));
  });

  it('should multiply each element in a non-empty list by 2', () => {
    const list = List.of(1, 2, 3);
    const fn = (x: number) => x * 2;
    const timesTwo = map(fn)(list);
    expect(timesTwo).toEqual(list.map(fn as (val: number | undefined) => number));
  });

  it('should return an empty list when applying a function to an empty list', () => {
    const list: List<number> = List.of();
    const fn = (x: number) => x * 2;
    const timesTwo = map(fn)(list);
    expect(timesTwo).toEqual(list.map(fn as (val: number | undefined) => number));
  });

  it('should map a non-empty iterable', () => {
    const iterable: Iterable<number> = [1, 2, 3].values();
    const fn = (x: number) => x * 2;
    const newIterable = map(fn)(iterable);
    const newArray = Array.from(newIterable);
    expect(newArray).toEqual([2, 4, 6]);
  });

  it('should not map a empty iterable', () => {
    const iterable: Iterable<number> = [].values();
    const fn = (x: number) => x * 2;
    const newIterable = map(fn)(iterable);
    const newArray = Array.from(newIterable);
    expect(newArray).toEqual([]);
  });

  it('should map an iterable of 1 length', () => {
    const iterable: Iterable<number> = [1].values();
    const fn = (x: number) => x * 2;
    const newIterable = map(fn)(iterable);
    const newArray = Array.from(newIterable);
    expect(newArray).toEqual([2]);
  });
});
