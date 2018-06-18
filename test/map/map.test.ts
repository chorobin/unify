import { map } from '../../src/map';
import { maybe, nothing } from '../../src/maybe';
import { of, Observable } from 'rxjs';
import { map as rxMap } from 'rxjs/operators';
import { List } from 'immutable';

describe('map', () => {  

    it('should multiply each element in a non-empty array by 2', () => {
        const array = [1, 2, 3];
        const fn = (x: number) => x * 2;
        const timesTwo = map(fn)(array);
        expect(timesTwo).toEqual(array.map(fn));
    });

    it('should return an empty array when applying a function to an empty array', () => {
        const array: Array<number> = [];
        const fn = (x: number) => x * 2;
        const timesTwo = map(fn)(array);
        expect(timesTwo).toEqual(array.map(fn));
    });

    it('should just multiply 1 by 2', () => {
        const maybeNumber = maybe(1);
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
        expect(timesTwo$).toEqual(rxMap(fn)(stream$))
    });

    it('should return an empty stream when applying a function to an empty stream', () => {
        const stream$: Observable<number> = of();
        const fn = (x: number) => x * 2;
        const timesTwo$ = map(fn)(stream$);
        expect(timesTwo$).toEqual(rxMap(fn)(stream$))
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
});


