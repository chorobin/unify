import { Monad, MonadType } from '../monad';
export declare const flatMap: <T, U, UMonad extends Monad<U>>(f: (val: T) => UMonad) => (monad: MonadType<UMonad, T>) => UMonad;
