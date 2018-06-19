import { Monad, MapMonad } from '../monad';
export declare const map: <T, U>(f: (val: T) => U) => <TMonad extends Monad<T>>(monad: TMonad) => MapMonad<TMonad, U>;
