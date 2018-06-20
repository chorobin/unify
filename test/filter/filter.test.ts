import { filter } from '../../src/filter';
import { List } from '../../node_modules/immutable';
import { Maybe, maybe, nothing } from '../../src/maybe';
import { of } from 'rxjs';
import { filter as rxFilter } from 'rxjs/operators';

describe('filter', () => {
    it('should filter out non-empty arrays', () => {
        const array = [1, 2, 3, 4];
        const fn = (x: number) => x < 3;
        const filtered = filter(fn)(array);
        expect(filtered).toEqual(array.filter(fn));
    });

    it('should not filter non-empty arrays which match the predicate', () => {
        const array = [1, 2, 3, 4];
        const fn = (x: number) => x < 5;
        const filtered = filter(fn)(array);
        expect(filtered).toEqual(array.filter(fn));
    });

    it('should not filter empty arrays', () => {
        const array: Array<number> = [];
        const fn = (x: number) => x < 5;
        const filtered = filter(fn)(array);
        expect(filtered).toEqual(array.filter(fn));
    });

    it('should filter out non-empty lists', () => {
        const list = List.of(1, 2, 3, 4);
        const fn = (x: number) => x < 3;
        const filtered = filter(fn)(list);
        expect(filtered).toEqual(list.filter(fn));
    });

    it('should not filter non-empty lists which match the predicate', () => {
        const list: List<number> = List.of(1, 2, 3);
        const fn = (x: number) => x < 4;
        const filtered = filter(fn)(list);
        expect(filtered).toEqual(list.filter(fn));
    });

    it('should not filter out empty lists', () => {
        const list: List<number> = List.of();
        const fn = (x: number) => x < 5;
        const filtered = filter(fn)(list);
        expect(filtered).toEqual(list.filter(fn));
    });

    it('should filter out just number', () => {
        const maybeNumber: Maybe<number> = maybe(5);
        const fn = (x: number) => x < 5;
        const filtered = filter(fn)(maybeNumber);
        expect(filtered).toEqual(nothing);
    });

    it('should not filter out just number when the predicate returns true', () => {
        const maybeNumber: Maybe<number> = maybe(5);
        const fn = (x: number) => x < 6;
        const filtered = filter(fn)(maybeNumber);
        expect(filtered).toEqual(maybe(5));
    });

    it('should not filter out nothing', () => {
        const maybeNumber: Maybe<number> = nothing;
        const fn = (x: number) => x < 6;
        const filtered = filter(fn)(maybeNumber);
        expect(filtered).toEqual(nothing);
    });

    it('should filter out a non-empty stream', () => {
        const stream$ = of(1, 2, 3);
        const fn = (x: number) => x < 2;
        const filtered$ = filter(fn)(stream$);
        expect(filtered$).toEqual(rxFilter(fn)(stream$));
    });

    it('should not filter out a stream when the predicate is true', () => {
        const stream$ = of(1, 2, 3);
        const fn = (x: number) => x < 4;
        const filtered$ = filter(fn)(stream$);
        expect(filtered$).toEqual(rxFilter(fn)(stream$));
    });

    it('should not filter out an empty stream', () => {
        const stream$ = of(1, 2, 3);
        const fn = (x: number) => x < 4;
        const filtered$ = filter(fn)(stream$);
        expect(filtered$).toEqual(rxFilter(fn)(stream$));
    });
})