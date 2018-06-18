import { Observable } from 'rxjs';
import { List } from 'immutable';
import { Maybe } from './maybe/maybe';
export declare type MonadType<TMonad, U> = TMonad extends Observable<infer T> ? Observable<U> : TMonad extends Array<infer T> ? Array<U> : TMonad extends List<infer T> ? List<U> : TMonad extends Maybe<infer T> ? Maybe<U> : never;
export declare type Monad<T> = List<T> | Observable<T> | Array<T> | Maybe<T>;
