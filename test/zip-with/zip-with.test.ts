import { zipWith } from '../../src/zip-with';
import { maybe, nothing } from '../../src/maybe';
import { of } from 'rxjs';
import 'babel-polyfill';

describe('zipWith', () => {
  it('should zip arrays of the same length together', () => {
    const first = [1, 2];
    const second = ['Pizza', 'Bread'];
    const fn = (first: number, second: string) => ({ first, second });
    const zipped = zipWith(fn)(first, second);
    expect(zipped).toEqual([
      { first: 1, second: 'Pizza' },
      { first: 2, second: 'Bread' },
    ]);
  });

  it('should zip arrays where the first is longer than the second and take the first length', () => {
    const first = [1, 2, 3, 4];
    const second = ['Pizza', 'Bread'];
    const fn = (first: number, second: string) => ({ first, second });
    const zipped = zipWith(fn)(first, second);
    expect(zipped).toEqual([
      { first: 1, second: 'Pizza' },
      { first: 2, second: 'Bread' },
    ]);
  });

  it('should zip arrays where the second is longer than the first and take the second length', () => {
    const first = [1, 2];
    const second = ['Pizza', 'Bread', 'Onions'];
    const fn = (first: number, second: string) => ({ first, second });
    const zipped = zipWith(fn)(first, second);
    expect(zipped).toEqual([
      { first: 1, second: 'Pizza' },
      { first: 2, second: 'Bread' },
    ]);
  });

  it('should not zip empty arrays', () => {
    const first: Array<number> = [];
    const second: Array<number> = [];
    const fn = (first: number, second: number) => ({ first, second });
    const zipped = zipWith(fn)(first, second);
    expect(zipped).toEqual([]);
  });

  it('should zip just numbers', () => {
    const first = maybe(1);
    const second = maybe(2);
    const fn = (first: number, second: number) => first + second;
    const zipped = zipWith(fn)(first, second);
    expect(zipped).toEqual(maybe(3));
  });

  it('should not zip if just 1 and nothing', () => {
    const first = maybe(1);
    const second = nothing;
    const fn = (first: number, second: number) => first + second;
    const zipped = zipWith(fn)(first, second);
    expect(zipped).toEqual(nothing);
  });

  it('should not zip if nothing and just 1', () => {
    const first = nothing;
    const second = maybe(1);
    const fn = (first: number, second: number) => first + second;
    const zipped = zipWith(fn)(first, second);
    expect(zipped).toEqual(nothing);
  });

  it('should zip two steams of the same length', (done) => {
    const first$ = of(1);
    const second$ = of('Christopher');
    const fn = (first: number, second: string) => [first, second];
    const zipped$ = zipWith(fn)(first$, second$);
    zipped$.subscribe((tuple) => {
      expect(tuple).toEqual([1, 'Christopher']);
      done();
    });
  });

  it('should zip two streams where the first is less than the second and have the first length', (done) => {
    const first$ = of(1);
    const second$ = of('Christopher', 'Horobin');
    const fn = (first: number, second: string) => [first, second];
    const zipped$ = zipWith(fn)(first$, second$);
    zipped$.subscribe((tuple) => {
      expect(tuple).toEqual([1, 'Christopher']);
      done();
    });
  });

  it('should zip two streams where the second is less than the first and have the second length', (done) => {
    const first$ = of(1, 2);
    const second$ = of('Christopher');
    const fn = (first: number, second: string) => [first, second];
    const zipped$ = zipWith(fn)(first$, second$);
    zipped$.subscribe((tuple) => {
      expect(tuple).toEqual([1, 'Christopher']);
      done();
    });
  });

  it('should zip two non-empty iterables', () => {
    const first = [1, 2, 3].values();
    const second = ['Christopher', 'Tony', 'Glass'].values();
    const fn = (first: number, second: string) => [first, second];
    const zipped = zipWith(fn)(first, second);
    expect(Array.from(zipped)).toEqual([
      [1, 'Christopher'],
      [2, 'Tony'],
      [3, 'Glass'],
    ]);
  });

  it('should have the length of first iterable if smallest', () => {
    const first = [1, 2].values();
    const second = ['Christopher', 'Tony', 'Glass'].values();
    const fn = (first: number, second: string) => [first, second];
    const zipped = zipWith(fn)(first, second);
    expect(Array.from(zipped)).toEqual([[1, 'Christopher'], [2, 'Tony']]);
  });

  it('should have the length of second iterable if smallest', () => {
    const first = [1, 2, 3].values();
    const second = ['Christopher', 'Tony'].values();
    const fn = (first: number, second: string) => [first, second];
    const zipped = zipWith(fn)(first, second);
    expect(Array.from(zipped)).toEqual([[1, 'Christopher'], [2, 'Tony']]);
  });

  it('should not zip empty iterables', () => {
    const first = [].values();
    const second = [].values();
    const fn = (first: number, second: string) => [first, second];
    const zipped = zipWith(fn)(first, second);
    expect(Array.from(zipped)).toEqual([]);
  });
});
