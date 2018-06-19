import { flatMap } from '../../src/flat-map';
import { maybe, nothing, Maybe } from '../../src/maybe';
import { of, Observable } from 'rxjs';
import { flatMap as rxFlatMap } from 'rxjs/operators';
import { List } from 'immutable';

describe('flatMap', () => {
    it('should flatten a non-empty array', () => {
        const array = [1, 2, 3];
        const fn = (x: number) => [x, x - 1];
        const flattened = flatMap(fn)(array);
        expect(flattened).toEqual([1, 0, 2, 1, 3, 2]);
    });

    it('should return empty array when array is empty', () => {
        const array: Array<number> = [];
        const fn = (x: number) => [x, x - 1];
        const flattened = flatMap(fn)(array);
        expect(flattened).toEqual([])
    });

    it('should return empty when elements are empty', () => {
        const array: Array<number> = [1, 2, 3];
        const fn = (x: number) => [];
        const flattened = flatMap(fn)(array);
        expect(flattened).toEqual([]);
    });

    it('should flatten just a number', () => {
        const maybeNumber: Maybe<number> = maybe(1);
        const fn = (x: number) => maybe(1);
        const flattened = flatMap(fn)(maybeNumber);
        expect(flattened).toEqual(maybeNumber);
    });

    it('should not flatten nothing', () => {
        const maybeNumber: Maybe<number> = nothing;
        const fn = (x: number) => maybe(1);
        const flattened = flatMap(fn)(maybeNumber);
        expect(flattened).toEqual(maybeNumber);
    });

    it('should not flatten when elements are nothing', () => {
        const maybeNumber: Maybe<number> = maybe(1);
        const fn = (x: number) => nothing;
        const flattened = flatMap(fn)(maybeNumber);
        expect(flattened).toEqual(nothing);
    });

    it('should flatten a non-empty stream', () => {
        const stream$ = of(1, 2, 3);
        const fn = (x: number) => of(x, x - 1);
        const flattened = flatMap(fn)(stream$);
        expect(flattened).toEqual(rxFlatMap(fn)(stream$));
    });

    it('should not flatten a empty stream', () => {
        const stream$: Observable<number> = of();
        const fn = (x: number) => of(x, x - 1);
        const flattened = flatMap(fn)(stream$);
        expect(flattened).toEqual(rxFlatMap(fn)(stream$));
    });

    it('should not flatten when elements streams are empty', () => {
        const stream$: Observable<number> = of();
        const fn = (x: number) => of<number>();
        const flattened = flatMap(fn)(stream$);
        expect(flattened).toEqual(rxFlatMap(fn)(stream$));
    });

    it('should flatten when list not empty', () => {
        const list = List.of(1, 2, 3);
        const fn = (x: number) => List.of(x, x - 1);
        const flattened = flatMap(fn)(list);
        expect(flattened).toEqual(list.flatMap(fn));
    });

    it('should not flatten a empty list', () => {
        const list = List.of<number>();
        const fn = (x: number) => List.of(x, x - 1);
        const flattened = flatMap(fn)(list);
        expect(flattened).toEqual(list.flatMap(fn));
    });

    it('should not flatten list with empty elements', () => {
        const list = List.of<number>(1, 2, 3);
        const fn = (x: number) => List.of<number>();
        const flattened = flatMap(fn)(list);
        expect(flattened).toEqual(list.flatMap(fn));
    });

});