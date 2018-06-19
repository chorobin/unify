import { Monad, MapMonad } from '../monad';
export declare const flatMap: <T, U, UMonad extends Monad<U>>(f: (val: T) => UMonad) => (monad: MapMonad<UMonad, T>) => UMonad;
