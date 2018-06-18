import { Just } from './just';
import { Nothing } from './nothing';
export declare type Maybe<T> = Just<T> | Nothing;
export declare const isMaybe: <T>(couldBeMaybe: {}) => boolean;
export declare const isNothing: <T>(maybe: Maybe<T>) => boolean;
export declare const maybe: <T>(get: T) => Nothing;
export declare const fold: <T, U>(ifJust: (get: T) => U, ifNothing: U) => (maybe: Maybe<T>) => U;
export declare const map: <T, U>(f: (get: T) => U) => (maybe: Maybe<T>) => Nothing;
export declare const flatMap: <T, U>(f: (get: T) => Maybe<U>) => (maybe: Maybe<T>) => Nothing;
