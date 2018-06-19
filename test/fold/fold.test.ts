import { fold } from '../../src/fold';
import { maybe, nothing, Maybe } from '../../src/maybe';
import { Observable, of } from 'rxjs';
import { reduce as rxReduce } from 'rxjs/operators';
import { List } from 'immutable';

describe('fold', () => {
    it('should aggregate non-empty arrays', () => {
        const array = [1, 2, 3];
        const fn = (acc: number, current: number) => acc + current;
        const folded = fold(fn, 0)(array);
        expect(folded).toEqual(6);
    });

    it('should not aggregate empty arrays', () => {
        const array = [];
        const fn = (acc: number, current: number) => acc + current;
        const folded = fold(fn, 0)(array);
        expect(folded).toEqual(0);
    });

    it('should aggregate just a number', () => {
        const maybeNumber = maybe(1);
        const fn = (acc: number, current: number) => acc + current;
        const folded = fold(fn, 1)(maybeNumber);
        expect(folded).toEqual(2);
    });

    it('should aggregate nothing', () => {
        const maybeNumber: Maybe<number> = nothing;
        const fn = (acc: number, current: number) => acc + current;
        const folded = fold(fn, 1)(maybeNumber);
        expect(folded).toEqual(1);
    });

    it('should aggregate a stream', () => {
        const stream$: Observable<number> = of(1, 2, 3);
        const fn = (acc: number, current: number) => acc + current;
        const folded$ = fold(fn, 1)(stream$);
        expect(folded$).toEqual(rxReduce(fn, 1)(stream$));
    });

    it('should not aggregate empty streams', () => {
        const stream$: Observable<number> = of();
        const fn = (acc: number, current: number) => acc + current;
        const folded$ = fold(fn, 1)(stream$);
        expect(folded$).toEqual(rxReduce(fn, 1)(stream$));
    });

    it('should aggregate non-empty lists', () => {
        const list = List.of(1, 2, 3);
        const fn = (acc: number, current: number) => acc + current;
        const folded = fold(fn, 1)(list);
        expect(folded).toEqual(7);
    });

    it('should not aggregate empty lists', () => {
        const list = List.of<number>();
        const fn = (acc: number, current: number) => acc + current;
        const folded = fold(fn, 1)(list);
        expect(folded).toEqual(1);
    });
});