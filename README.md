# Unify

Unify provides a generic monad/functor higher order functions which work on multiple libraries. ImmutableJS, Maybe type, RxJS and Arrays. They all work using the same higher
order function.

It uses conditional types in TypeScript 2.8 to not lose type information

## Getting Started

npm install unify --save

### Prerequisites

Map works on an array

```typescript
const array: Array<number> = [1, 2, 3];
const fn = (x: number) => x * 2;
const timesTwo: Array<number> = map(fn)(array);
```

Works on the Maybe type

```typescript
const maybeNumber: Maybe<number> = maybe(1);
const fn = (x: number) => x * 2;
const timesTwo: Maybe<number> = map(fn)(maybeNumber);
```

Works on Observables!

```typescript
const stream$: Observable<number> = of(1, 2, 3);
const fn = (x: number) => x * 2;
const timesTwo$: Observable<number> = map(fn)(stream$);
```

Works on ImmutableJS!

```typescript
const list: List<number> = List.of(1, 2, 3);
const fn = (x: number) => x * 2;
const timesTwo: List<number> = map(fn)(list);
```

### Installing

npm install unify --save

## Running the tests

npm run test

## Authors

* **Christopher Horobin** - *Initial work* - (https://github.com/chorobin)

See also the list of [contributors](https://github.com/chorobin/unify/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* RxJS
* ImmutableJS
* Monads!
