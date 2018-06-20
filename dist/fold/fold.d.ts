import { Monad, FoldMonad } from '../monad';
export declare const fold: <T, U>(f: (acc: U, val: T) => U, seed: U) => <TMonad extends Monad<T>>(monad: TMonad) => FoldMonad<TMonad, U>;
